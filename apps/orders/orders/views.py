from decimal import Decimal
import json

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from apps.orders.choices import COST_TYPE_CHOICES
from apps.orders.models import Order, Patient
from .serializers import (
    OrderSerializer, OrderListSerializer, OrderRetrieveSerializer, PatientSearchSerializer
)
from apps.orders.choices import ORDER_STATUS_CHOICES

class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    

    def get_queryset(self, pk=None, state=None, laboratory=None):
        queryset = Order.objects.prefetch_related('order_detail').select_related('patient', 'tax').defer(
            'laboratory',
            'user',
            'main_currency', 
            'secondary_currency',
            'comment',
            'created_at',
            'keep_patient_number',
        )
        #Si el parametro pk y el state son None devolvemos todos lso objetos
        if pk is None and state is None:
            return queryset.filter(laboratory=laboratory)
        
        #Si state no es None filtramos los objetos por su status 
        elif state is not None:
            return queryset.filter(laboratory=laboratory, status=state)
        
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(queryset, pk=pk)

    def list(self, request):
        param = request.query_params.get('state', None)
        order = {}

        laboratory = request.user.laboratory

        #Si el parametro es None consultamos todas las requisiciones
        if param is None:
            order = self.get_queryset(laboratory=laboratory)

        #Verificar que el valor del parametro sea valido
        elif any(param.capitalize() in tup for tup in ORDER_STATUS_CHOICES):
            order = self.get_queryset(state=param.capitalize(), laboratory=laboratory)

        else:
            return Response({'error': 'el parametro "state" no es valido'})

        serializer = OrderListSerializer(order, many=True)
        return Response(serializer.data)   
        
    def validate_detail(self, data):
        if 'detail' not in data:
            return False, 'Debe tener al menos un examen en el detalle de la orden.'
        
        try:
            data['detail'] = json.loads(data['detail'])
            data['payments'] = json.loads(data['payments'])
        except (TypeError, ValueError):
            return False, '"detail" debe ser una cadena JSON válida.'
    
        return True, None
    
    def validate_cost_type(self, cost):
        for value, costType in COST_TYPE_CHOICES:
            if costType == cost:  # Comparamos el primer elemento de cada tupla
                return value
            else:
                COST_TYPE_CHOICES[0][0]
    
    def create(self, request):

        if (request.user.cash_register is None):
            return Response({
                "error": "Debe tener una caja asignada para guardar la orden"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = request.data

        is_valid, error_message = self.validate_detail(data)
        
        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        data['user'] = request.user.id
        data['laboratory'] = request.user.laboratory.id
        data['cash_register'] = request.user.cash_register.id
        data['cost_type'] = self.validate_cost_type(data['cost_type'])
        data['main_total'] = round(Decimal(data['main_total']), 2)
        data['secondary_total'] = round(Decimal(data['secondary_total']), 2)

        #Validar que el detalle no este vacio        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Orden creada exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        order = self.get_queryset(pk)
        serializer = OrderRetrieveSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        if (request.user.cash_register is None):
            return Response({
                "error": "Debe tener una caja asignada para guardar la orden"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        order = self.get_queryset(pk)

        data = request.data
        data['user'] = request.user.id
        data['laboratory'] = request.user.laboratory.id
        data['cash_register'] = request.user.cash_register.id

        #Validar que el detalle no este vacio
        is_valid, error_message = self.validate_detail(data)
        
        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(order, data=data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Requisicion modificada exitosamente!'}, status=status.HTTP_200_OK)  
        return Response({
                'message':'', 
                'error':'No se pudo modificar la requisición porque no se encontraron coincidencias'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=False, methods=['GET'])
    def search_by_cedula(self, request):
        cedula = request.query_params.get("search", "")
        laboratory_id = request.user.laboratory.id
        try:
            patients = Patient.objects.prefetch_related('affiliations').filter(
                is_active=True, 
                cedula__icontains=cedula
            )
            serializer = PatientSearchSerializer(patients, context={"laboratory_id": laboratory_id}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
