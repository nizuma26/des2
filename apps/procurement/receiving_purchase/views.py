from decimal import Decimal
import json

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from apps.procurement.choices import RECEIVING_ORDER_STATUS_CHOICES
from apps.procurement.models import ReceivingOrder, PurchaseOrder
from .serializers import (
    ReceivingOrderSerializer,
    ReceivingOrderListSerializer, 
    ReceivingPurchaseRetrieveSerializer,
    PurchaseOrderRetrieveSerializer,
)

class ReceivingPurchaseOrderViewSet(ModelViewSet):
    serializer_class = ReceivingOrderSerializer
    queryset = ReceivingOrder.objects.select_related('order')

    def get_queryset(self, pk=None, state=None):
        queryset = self.queryset.defer(
            "user", 
        )
        #Si el parametro pk y el state son None devolvemos todos lso objetos
        if pk is None and state is None:
            return queryset
        
        #Si state no es None filtramos los objetos por su status 
        elif state is not None:
            return queryset.filter(status__icontains=state)
        
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(queryset, pk=pk)

    def list(self, request):
        param = request.query_params.get('status', None)
        receptions = {}

        #Si el parametro es None consultamos todas las requisiciones
        if param is None:
            receptions = self.get_queryset()

        #Verificar que el valor del parametro sea valido
        elif any(param in tup for tup in RECEIVING_ORDER_STATUS_CHOICES):
            receptions = self.get_queryset(state=param)

        else:
            return Response([])
        
        serializer = ReceivingOrderListSerializer(receptions, many=True)
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
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Artículos recibidos exitosamente!'}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        reception = self.get_queryset(pk)
        serializer = ReceivingPurchaseRetrieveSerializer(reception)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        reception = self.get_queryset(pk)

        if reception:
            
            data = request.data

            is_valid, error_message = self.validate_detail(data)

            if not is_valid:
                return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = self.serializer_class(reception, data=data, partial=True)
            if serializer.is_valid():
                with transaction.atomic():
                    serializer.save()
                return Response({'message': 'Artículos recibidos exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar la compra porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['GET'], url_path='get-purchase-order')
    def get_purchase_order(self, request, pk=None):
        purchase_order = get_object_or_404(PurchaseOrder, pk=pk)
        serializer = PurchaseOrderRetrieveSerializer(purchase_order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
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
