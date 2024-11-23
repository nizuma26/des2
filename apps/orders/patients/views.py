import json

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from django.db.models import Q

from django.db import transaction

from apps.orders.models import Patient, Order
from .serializers import (
    PatientSerializer, PatientListSerializer, PatientRetrieveSerializer
)

MODULE_NAME = 'Paciente'
MODULE_NAME_PLURAL = 'Pacientes'

class PatientViewSet(ModelViewSet):
    serializer_class = PatientSerializer
    model = Patient

    def get_queryset(self, pk=None, state=None):

        queryset = self.model.objects.all().defer("address", "is_active")

        if state is not None:
            return queryset.filter(is_active=state)
    
        elif pk is not None:
            #Verificar que exista una coincidencia. Caso contrario se devuelve un error 404
            return get_object_or_404(self.model, pk=pk)

        return queryset.order_by('-id')
            
    def list(self, request):
        lab_tests = self.get_queryset()
        serializer = PatientListSerializer(lab_tests, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        data['affiliations'] = json.loads(data['affiliations'])
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                patient_data = serializer.data
                patient_data["affiliations"] = data['affiliations']
                return Response({
                        'message': f'{MODULE_NAME} creado exitosamente!', 
                        'data': patient_data, 
                    }, 
                    status=status.HTTP_200_OK
                )   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        patient = self.get_queryset(pk)
        serializer = PatientRetrieveSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        patient = self.get_queryset(pk)
        data = request.data
        data['affiliations'] = json.loads(data['affiliations'])
        
        serializer = self.serializer_class(patient, data=data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                patient_data = serializer.data
                patient_data["affiliations"] = data['affiliations']
                return Response({
                        'message': f'{MODULE_NAME} modificado exitosamente!', 
                        'data': patient_data,
                    }, 
                    status=status.HTTP_200_OK
                )  
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
