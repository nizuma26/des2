import json
from decimal import Decimal
from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from django.db.models import Q
from apps.procurement.choices import PURCHASE_ORDER_STATUS_CHOICES
from apps.procurement.models import PurchaseOrder, Supplier, PurchaseRequisition
from .serializers import (
    PurchaseOrderSerializer, 
    PurchaseOrderListSerializer, 
    PurchaseOrderRetrieveSerializer,
    SupplierSerializer,
    RequisitionSerializer
)

class PurchaseOrderViewSet(ModelViewSet):
    serializer_class = PurchaseOrderSerializer
    queryset = PurchaseOrder.objects.prefetch_related('purchase_order_detail')

    def get_queryset(self, pk=None, state=None):
        queryset = self.queryset.select_related(
            "main_currency", 
            "secondary_currency", 
            "supplier"
        ).defer(
            "user", 
            "laboratory"
        )
        #Si el parametro pk y el state son None devolvemos todos lso objetos
        if pk is None and state is None:
            return queryset
        
        #Si state no es None filtramos los objetos por su status 
        elif state is not None:
            return queryset.filter(status=state)
        
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(queryset, pk=pk)
    

    def list(self, request):
        param = request.query_params.get('status', None)
        purchase_requisitions = {}

        #Si el parametro es None consultamos todas las requisiciones
        if param is None:
            purchase_requisitions = self.get_queryset()

        #Verificar que el valor del parametro sea valido
        elif any(param.capitalize() in tup for tup in PURCHASE_ORDER_STATUS_CHOICES):
            purchase_requisitions = self.get_queryset(state=param.capitalize())

        else:
            return Response({'error': 'el parametro "state" no es valido'})

        serializer = PurchaseOrderListSerializer(purchase_requisitions, many=True)
        return Response(serializer.data) 
    
    def validate_detail(self, data):
        if 'detail' not in data:
            return False, 'El detalle de la orden de compra no puede estar vacio.'
        
        try:
            data['detail'] = json.loads(data['detail'])
        except (TypeError, ValueError):
            return False, 'La clave "detail" debe ser una cadena JSON válida.'
    
        return True, None

    def create(self, request):
        data = request.data
        is_valid, error_message = self.validate_detail(data)

        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        data['user'] = request.user.id
        data['laboratory'] = request.user.laboratory.id
        data['cash_register'] = request.user.cash_register.id
        data['main_total'] = round(Decimal(data['main_total']), 2)
        data['secondary_total'] = round(Decimal(data['secondary_total']), 2)
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Orden de compra creada exitosamente!'}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        purchase_order = self.get_queryset(pk)
        serializer = PurchaseOrderRetrieveSerializer(purchase_order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        purchase = self.get_queryset(pk)

        if purchase:
            data = request.data
            data['user'] = request.user.id

            is_valid, error_message = self.validate_detail(data)

            if not is_valid:
                return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

            serializer = self.serializer_class(purchase, data=data, partial=True)
            if serializer.is_valid():
                with transaction.atomic():
                    serializer.save()
                return Response({'message': 'Compra modificada exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar la compra porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        data = request.data
        try:
            if data['action'] == 'disable':
                disabled = self.get_serializer().Meta.model.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': 'Compras inactivadas exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = self.get_serializer().Meta.model.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': 'Compras activadas exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['GET'], url_path="search-supplier")
    def search_supplier(self, request):
        text = request.query_params.get("search", "")

        try:
            suppliers = Supplier.objects.filter(is_active=True).filter(
                Q(trade_name__icontains=text)
                |Q(legal_name__icontains=text)
                |Q(rif__icontains=text)
                |Q(email__icontains=text)
            )[0:10]
            serializer = SupplierSerializer(suppliers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['GET'], url_path="get-requisition")
    def generate_purchase_order(self, request, pk=None):
        get_id = request.query_params.get("id", None)
        try:
            if (get_id is None): 
                return Response({
                    'error': 'No se ha proporcionado el parametro "id"'
                    }, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            req = get_object_or_404(PurchaseRequisition, pk=int(get_id))
            serializer = RequisitionSerializer(req)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)