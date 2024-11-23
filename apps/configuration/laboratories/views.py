from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from django.db import transaction

from apps.configuration.laboratories.serializers import (
    LaboratorySerializer,
    LaboratoryListSerializer,
    LaboratoryRetrieveSerializer, 
    ActiveLaboratoriesSerializer
)
from utils.utils import validate_files, remove_directory

class LaboratoryViewSet(ModelViewSet):
    serializer_class = LaboratorySerializer
    parser_classes = (JSONParser, MultiPartParser, )

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.all()
        return self.get_serializer().Meta.model.objects.filter(id=pk).first()

    def list(self, request):
        serializer = LaboratoryListSerializer(self.get_queryset(), many=True)        
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        serializer = LaboratoryRetrieveSerializer(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Laboratorio creado exitosamente!'}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def retrieve(self, request, pk=None):
        laboratory = self.get_queryset(pk)        
        if laboratory:
            serializer = LaboratoryRetrieveSerializer(laboratory)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'Ningun laboratorio coincide con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            data = validate_files(request.data, 'logo', True)
            serializer = LaboratoryRetrieveSerializer(self.get_queryset(pk), data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Laboratorio modificado exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar el laboratorio porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        laboratory = self.get_queryset(pk)
        if laboratory:
            try:
                laboratory.delete()
                remove_directory(f'laboratories/{laboratory.name}/')
                return Response({'message': 'Laboratorio eliminado exitosamente!'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({'message':'', 'error':'No se pudo eliminar el laboratorio porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
  
    @action(detail=False)
    def active_laboratories(self, request):
        laboratory = self.get_serializer().Meta.model
        data = laboratory.objects.filter(is_active=True)
        serializer = ActiveLaboratoriesSerializer(data, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        laboratory = self.get_serializer().Meta.model
        try:
            laboratory.objects.filter(id__in=ids).delete()
            return Response({'message': 'Laboratorios eliminados exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        data = request.data
        laboratory = self.get_serializer().Meta.model
        try:
            if data['action'] == 'disable':
                disabled = laboratory.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': 'Laboratorios inactivados exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = laboratory.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': 'Laboratorios activados exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    