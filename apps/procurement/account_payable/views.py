from django.db import transaction
from django.db.models import Sum, OuterRef, Subquery

from rest_framework import mixins, viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from .serializers import (
    AccountPayableSerializer, 
    PaymentSerializer,
    PaymentListSerializer,
    DebtsToSupplierSerializer
)
from ..models import AccountPayable, AccountPayablePayment, Supplier

class AccountPayableViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = AccountPayableSerializer

    def get_queryset(self, supplier_id=None, account_id=None):
        
        if account_id is None:
            queryset = (
                AccountPayable.objects
                .select_related('purchase_order')
                .filter(purchase_order__supplier_id=supplier_id)
            )
            return queryset
        return get_object_or_404(AccountPayable, pk=account_id)
    
    def list(self, request):
        supplier_id = request.query_params.get("supplier_id", None)
        serializer = self.serializer_class(self.get_queryset(supplier_id=supplier_id), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PaymentsToSupplierViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    serializer_class = PaymentSerializer

    def get_queryset(self, account_id=None):
        queryset = AccountPayablePayment.objects.select_related('account_payable')
        if account_id is None:
            return queryset
        
        return queryset.filter(account_payable_id__in=account_id)
    
    def list(self, request):
        account_id = request.query_params.get('account_id', None)
        serializer = PaymentListSerializer(self.get_queryset(account_id=account_id), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({
                    'message': 'Pago realizado exitosamente', 
                    'data': serializer.data
                    }, 
                    status=status.HTTP_200_OK
                )
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):

        payement = get_object_or_404(AccountPayablePayment, pk=pk)

        with transaction.atomic():

            payement.delete()
            old_balance = payement.account_payable.balance
            new_balance = old_balance + payement.payment_amount
            payement.account_payable.balance = new_balance

            if old_balance == 0:
                payement.account_payable.status = 'Pendiente'
                payement.account_payable.purchase_order.status = 'Por pagar'
                payement.account_payable.save(update_fields=['balance', 'status'])

            if payement.account_payable.purchase_order.status == 'Cerrada':
                reception = payement.account_payable.purchase_order.receiving_order.first()
                payement.account_payable.purchase_order.status = reception.status
                payement.account_payable.purchase_order.save(update_fields=['status'])

            else:
                payement.account_payable.save(update_fields=['balance'])

            account_status = payement.account_payable.status
                
            return Response({
                'message': 'Pago eliminado exitosamente', 
                'data': {'balance': new_balance, 'status': account_status}}, 
                status=status.HTTP_200_OK
            )

class DebtsToSuppliersViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = DebtsToSupplierSerializer

    def get_queryset(self, supplier_id=None, laboratory=None):        
        # Subquery para obtener el saldo total por proveedor
        subquery = AccountPayable.objects.filter(
            purchase_order__supplier=OuterRef('pk'),
            purchase_order__laboratory=laboratory,
        ).values('purchase_order__supplier').annotate(
            total_balance=Sum('balance')
        ).values('total_balance')

        # Query principal
        queryset = Supplier.objects.annotate(
            total_debt=Subquery(subquery)
        ).values(
            'id', 'trade_name', 'rif', 'phone_number', 'total_debt'
        )
        if supplier_id is None:
            return queryset
        return get_object_or_404(queryset, pk=supplier_id)
    
    def list(self, request):
        laboratory = request.user.laboratory
        serializer = self.serializer_class(self.get_queryset(laboratory=laboratory), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)