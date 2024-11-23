from decimal import Decimal
from rest_framework.generics import get_object_or_404
from django.db import transaction

from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response

from .serializers import OrderPaymentSerializer, OrderPaymentListSerializer
from ..models import OrderPayment

MODULE_NAME = "Abono"
MODULE_NAME_PLURAL = "Abonos"

class OrderPaymentViewSet(ModelViewSet):
    serializer_class = OrderPaymentSerializer

    def get_queryset(self, pk=None, order_id=None):
        queryset = OrderPayment.objects.select_related('order').filter(order_id=order_id).order_by('-id')
        if pk is None:
            return queryset
        return get_object_or_404(OrderPayment, pk)
    
    def list(self, request):
        order_id = request.query_params.get('order_id', None)
        serializer = OrderPaymentListSerializer(self.get_queryset(order_id=order_id), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        data = request.data
        if Decimal(data['payment_amount']) <= 0:
            return Response({'message':'', 'error': "El abono debe ser mayor a 0"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                payment_created = serializer.data
                payment_created['balance'] = serializer.validated_data.get("order", None).balance
                payment_created['amount_paid'] = serializer.validated_data.get("order", None).amount_paid
                return Response({'message': f'{MODULE_NAME} creado exitosamente!', 'data': payment_created}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            payment = self.get_queryset(pk)
            payment.delete()
            payment.order.calculate_amount_paid()            
            return Response({
                'message': f'{MODULE_NAME} eliminado exitosamente', 
                'data': {'balance': payment.order.balance}}, 
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
    