from decimal import Decimal
import json

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from apps.orders.choices import COST_TYPE_CHOICES
from apps.orders.models import Result, Order, LabTest, Parameter
from .serializers import (
    ResultSerializer, PendingOrderListSerializer, LabTestRetrieveSerializer, ResultRetrieveSerializer
)
from apps.orders.choices import ORDER_STATUS_CHOICES

class ResultViewSet(ModelViewSet):
    serializer_class = ResultSerializer
    queryset = Result.objects.prefetch_related('result_values').select_related('order', 'lab_test')

    def get_queryset(self, pk=None, state=None):

        #Si el parametro pk y el state son None devolvemos todos lso objetos
        if pk is None and state is None:
            queryset = self.queryset.defer(
                'laboratory',
                'user',
                'main_currency', 
                'secondary_currency',
                'comment',
                'created_at',
                'keep_patient_number',
            )
            return queryset
        
        #Si state no es None filtramos los objetos por su status 
        elif state is not None:
            queryset = self.queryset.defer(
                'laboratory',
                'user',
                'main_currency', 
                'secondary_currency',
                'comment',
                'created_at',
                'keep_patient_number',
            )
            return queryset.filter(status=state)
        
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(self.queryset, pk=pk)

    def list(self, request):
        param = request.query_params.get('state', None)
        order = {}

        #Si el parametro es None consultamos todas las requisiciones
        if param is None:
            order = self.get_queryset()

        #Verificar que el valor del parametro sea valido
        elif any(param.capitalize() in tup for tup in ORDER_STATUS_CHOICES):
            order = self.get_queryset(state=param.capitalize())

        else:
            return Response({'error': 'el parametro "state" no es valido'})

        serializer = PendingOrderListSerializer(order, many=True)
        return Response(serializer.data)   
        
    def validate_detail(self, data):
        if 'result_values' not in data:
            return False, 'Debe tener al menos un examen en el detalle de la orden.'
        
        try:
            data['result_values'] = json.loads(data['result_values'])
        except (TypeError, ValueError):
            return False, '"detail" debe ser una cadena JSON válida.'
    
        return True, None
        
    def create(self, request):
        
        data = request.data

        is_valid, error_message = self.validate_detail(data)
        
        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        data['user'] = request.user.id

        #Validar que el detalle no este vacio        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Resultados cargados exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # def retrieve(self, request, pk=None):
    #     order = self.get_queryset(pk)
    #     serializer = OrderRetrieveSerializer(order)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    
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

    @action(detail=False, methods=['GET'], url_path="pending-orders")
    def pending_orders(self, request):
        laboratory = request.user.laboratory
        status_exclude = ["Anulado"]
        try:
            orders = (
                Order.objects
                .prefetch_related("order_detail")
                .filter(laboratory=laboratory)
                .exclude(status__in=status_exclude)
                .only("id", "order_date", "patient_number", "patient", "code", "cost_type", "status")
                .order_by('id')
            )
            serializer = PendingOrderListSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['GET'], url_path="get-parameters")
    def get_parameters(self, request):
        labtest_id = request.query_params.get("labtest_id", None)
        try:
            parameters = LabTest.objects.prefetch_related("parameters").filter(
                id=int(labtest_id)
            )
            serializer = LabTestRetrieveSerializer(parameters, many=True)
            parameter_list = serializer.data[0]['parameters']
            return Response(parameter_list, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['GET'], url_path="get-results")
    def get_results(self, request):
        order_id = request.query_params.get("order_id", None)
        labtest_id = request.query_params.get("lab_test_id", None)
        print("ID: ", labtest_id)
        try:
            result = Result.objects.select_related("order").prefetch_related("result_values").filter(
                order_id=int(order_id), lab_test_id=int(labtest_id)
            )
            serializer = ResultRetrieveSerializer(result, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
