import json

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from apps.procurement.models import PurchaseRequisition
from .serializers import (
    RequisitionSerializer, RequisitionListSerializer, RequisitionRetrieveSerializer
)
from apps.procurement.choices import REQUISITION_STATUS_CHOICES

class PurchaseRequisitionViewSet(ModelViewSet):
    serializer_class = RequisitionSerializer
    queryset = PurchaseRequisition.objects.prefetch_related('requisition_detail_set')

    def get_queryset(self, pk=None, state=None):

        queryset = self.queryset.select_related('laboratory', 'requester')
        #Si el parametro pk y el state son None devolvemos todos lso objetos
        if pk is None and state is None:
            return queryset
        
        #Si state no es None filtramos los objetos por su status 
        elif state is not None:
            return queryset.filter(status=state)
        
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(queryset, pk=pk)

    def list(self, request):
        param = request.query_params.get('state', None)
        purchase_requisitions = {}

        #Si el parametro es None consultamos todas las requisiciones
        if param is None:
            purchase_requisitions = self.get_queryset()

        #Verificar que el valor del parametro sea valido
        elif any(param.capitalize() in tup for tup in REQUISITION_STATUS_CHOICES):
            purchase_requisitions = self.get_queryset(state=param.capitalize())

        else:
            return Response({'error': 'el parametro "state" no es valido'})

        serializer = RequisitionListSerializer(purchase_requisitions, many=True)
        return Response(serializer.data)   
        
    def validate_detail(self, data):
        if 'detail' not in data:
            return False, 'Debe tener al menos un artículo en su detalle.'
        
        try:
            data['detail'] = json.loads(data['detail'])
        except (TypeError, ValueError):
            return False, '"detail" debe ser una cadena JSON válida.'
    
        return True, None
    
    def create(self, request):
        data = request.data
        data['requester'] = request.user.id

        #Validar que el detalle no este vacio
        is_valid, error_message = self.validate_detail(data)
        
        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Requisicion creada exitosamente!'}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        purchase = self.get_queryset(pk)
        serializer = RequisitionRetrieveSerializer(purchase)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        requisition = self.get_queryset(pk)

        data = request.data
        data['requester'] = request.user.id

        #Validar que el detalle no este vacio
        is_valid, error_message = self.validate_detail(data)
        
        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(requisition, data=data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Requisicion modificada exitosamente!'}, status=status.HTTP_200_OK)  
        return Response({'message':'', 'error':'No se pudo modificar la requisición porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
