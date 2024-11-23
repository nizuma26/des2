import json

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction
from django.db.models import OuterRef, Subquery, IntegerField, DecimalField
from django.db.models.functions import Coalesce

from apps.orders.models import LabTest, LabTestPrice
from apps.inventory.models import Inventory, Item
from .serializers import (
    LabTestSerializer, LabTestListSerializer, LabTestRetrieveSerializer, LabTestPricesSerializer
)
from apps.orders.choices import TEST_TYPES

MODULE_NAME = 'Examen'
MODULE_NAME_PLURAL = 'Examenes'

class LabTestViewSet(ModelViewSet):
    serializer_class = LabTestSerializer
    queryset = LabTest.objects.select_related('container', 'sample', 'category')

    def get_queryset(self, pk=None, test_type="simple"):

        #Si el parametro pk es None devolvemos todos los objetos
        if pk is None:
            return self.queryset.filter(test_type=test_type)
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(LabTest, pk=pk)

    def list(self, request):

        test_type = request.query_params.get("type", "simple")

        test_type = test_type.lower()

        lab_tests = self.get_queryset(test_type=test_type)
        serializer = LabTestListSerializer(lab_tests, many=True)
        return Response(serializer.data)   
    
    def create(self, request):
        data = request.data

        #Validar que el detalle no este vacio
        is_valid, error_message = self.has_parameters(data)

        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        data['laboratory'] = request.user.laboratory.id
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} creado exitosamente!'}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):

        lab_test = self.get_queryset(pk)
        laboratory_id = request.user.laboratory.id
        serializer = LabTestRetrieveSerializer(lab_test, context={"laboratory_id": laboratory_id})
        return Response(serializer.data , status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        lab_test = self.get_queryset(pk)
        data = request.data
        data['laboratory'] = request.user.laboratory.id

        #Validar que el detalle no este vacio
        is_valid, error_message = self.has_parameters(data)

        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(lab_test, data=data, partial=True)

        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} modificado exitosamente!'}, status=status.HTTP_200_OK)  
        return Response({'message':'', 'error': f'No se pudo modificar el {MODULE_NAME.lower()} porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'], url_path='search-items')
    def inventory_items(self, request, pk=None):

        item_ids = request.data.get('ids', [])

        laboratory_id = request.user.laboratory.id

        items = self.get_items(laboratory_id, item_ids)

        item_list = []

        for item in items:
            data = {
               "id": item.id,
               "item_code": item.code,
               "item_name": f"{item.name} {item.description}",
               "item_category": item.category.name,
               "stock": item.quantity,
               "price": item.price,
            }
            item_list.append(data)

        return Response(item_list, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['POST'], url_path='search-lab-test')
    def search_lab_tests(self, request, pk=None):

        test_ids = request.data.get('ids', [])
        test_type = request.data.get('type', None)

        laboratory_id = request.user.laboratory.id

        lab_tests = self.lab_tests_with_prices(laboratory_id, test_ids, test_type)

        lab_test_list = []

        for test in lab_tests:
            data = {
               "id": test.id,
               "abbreviation": test.abbreviation,
               "name": test.name,
               "standard": test.standard,
               "emergency": test.emergency,
               "affiliated": test.affiliated,
               "home_service": test.home_service,
               "holiday": test.holiday,
            }
            lab_test_list.append(data)

        return Response(lab_test_list, status=status.HTTP_200_OK)
    
    def has_parameters(self, data):
        if 'parameters' not in data:
            return False, 'La clave parameters no fue proporcionada.'
        
        try:
            data['parameters'] = json.loads(data['parameters'])
            data['items'] = json.loads(data['items'])
            data['prices'] = json.loads(data['prices'])
        except (TypeError, ValueError):
            return False, '"parameters" debe ser una cadena JSON válida.'
    
        return True, None
    
    def get_items(self, laboratory_id, item_ids):

        inventory = Inventory.objects.filter(
            item=OuterRef('pk'), 
            laboratory_id=laboratory_id
        ).values('item', 'stock', 'price')[0:1]

        items = Item.objects.annotate(
            quantity=Coalesce(Subquery(inventory.values('stock')), 0, output_field=IntegerField()),
            price=Coalesce(Subquery(inventory.values('price')), 0, output_field=DecimalField())
        ).filter(use_in_tests=True).exclude(id__in=item_ids)

        return items

    def lab_tests_with_prices(self, laboratory_id, lab_test_ids, test_type=None):

        prices = LabTestPrice.objects.filter(
            lab_test=OuterRef('pk'), 
            laboratory_id=laboratory_id,
        ).values(
            'lab_test',
            'standard',
            'emergency',
            'affiliated',
            'home_service',
            'holiday',
            'exempt'
        )[0:1]

        if test_type is None:

            lab_tests = LabTest.objects.annotate(
                standard=Coalesce(Subquery(prices.values('standard')), 0, output_field=DecimalField()),
                emergency=Coalesce(Subquery(prices.values('emergency')), 0, output_field=DecimalField()),
                affiliated=Coalesce(Subquery(prices.values('affiliated')), 0, output_field=DecimalField()),
                home_service=Coalesce(Subquery(prices.values('home_service')), 0, output_field=DecimalField()),
                holiday=Coalesce(Subquery(prices.values('holiday')), 0, output_field=DecimalField()),
                exempt=Coalesce(Subquery(prices.values('exempt')), 0, output_field=DecimalField())
            ).filter(is_active=True).exclude(id__in=lab_test_ids)
        
        else:
            test_type.lower()
            lab_tests = LabTest.objects.filter(test_type=test_type).annotate(
                standard=Coalesce(Subquery(prices.values('standard')), 0, output_field=DecimalField()),
                emergency=Coalesce(Subquery(prices.values('emergency')), 0, output_field=DecimalField()),
                affiliated=Coalesce(Subquery(prices.values('affiliated')), 0, output_field=DecimalField()),
                home_service=Coalesce(Subquery(prices.values('home_service')), 0, output_field=DecimalField()),
                holiday=Coalesce(Subquery(prices.values('holiday')), 0, output_field=DecimalField()),
                exempt=Coalesce(Subquery(prices.values('exempt')), 0, output_field=DecimalField())
            ).exclude(id__in=lab_test_ids)


        return lab_tests
    

