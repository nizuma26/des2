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
    LabTestProfileSerializer, LabTestProfileRetrieveSerializer
)
from ..lab_tests.serializers import LabTestListSerializer

MODULE_NAME = 'Examen'
MODULE_NAME_PLURAL = 'Examenes'

class LabTestProfileViewSet(ModelViewSet):
    serializer_class = LabTestProfileSerializer
    queryset = LabTest.objects.select_related('category')

    def get_queryset(self, pk=None, test_type="simple"):

        #Si el parametro pk es None devolvemos todos los objetos
        if pk is None:
            return self.queryset.filter(test_type=test_type)
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(LabTest, pk=pk)

    def list(self, request):


        lab_tests = self.get_queryset(test_type="perfil")
        serializer = LabTestListSerializer(lab_tests, many=True)
        return Response(serializer.data)   
        
    def has_lab_tests(self, data):
        if 'lab_tests' not in data:
            return False, 'La clave lab_tests no fue proporcionada.'
        
        try:
            data['lab_tests'] = json.loads(data['lab_tests'])
            data['prices'] = json.loads(data['prices'])
        except (TypeError, ValueError):
            return False, '"lab_tests" debe ser una cadena JSON válida.'
    
        return True, None
    
    def create(self, request):
        data = request.data

        #Validar que existan examenes en el perfil
        is_valid, error_message = self.has_lab_tests(data)

        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        data['laboratory'] = request.user.laboratory.id
        data['test_type'] = "perfil"
        
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} creado exitosamente!'}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):

        profile = self.get_queryset(pk)

        laboratory_id = request.user.laboratory.id

        serializer = LabTestProfileRetrieveSerializer(profile, context={"laboratory_id": laboratory_id})
        
        response_data  = serializer.data

        return Response(response_data , status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        lab_test = self.get_queryset(pk)
        data = request.data
        data['laboratory'] = request.user.laboratory.id

        #Validar que el detalle no este vacio
        is_valid, error_message = self.has_lab_tests(data)

        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(lab_test, data=data, partial=True)

        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} modificado exitosamente!'}, status=status.HTTP_200_OK)  
        return Response({'message':'', 'error': f'No se pudo modificar el {MODULE_NAME.lower()} porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
