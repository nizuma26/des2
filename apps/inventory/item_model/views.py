import json

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db import transaction

from apps.inventory.models import Model

from .serializers import ModelSerializer

class ModelViewSet(ModelViewSet):
    serializer_class = ModelSerializer
    queryset = Model.objects.select_related('brand')
    
    def get_queryset(self, pk=None, state=True):
        if pk is None:
            return self.queryset.filter(is_active=state).order_by('-id')
        return get_object_or_404(self.queryset, pk=pk)

    def list(self, request):
        param = request.query_params.get('state', 'true')        
        state = param.lower() == 'true'
        serializer = self.serializer_class(self.get_queryset(state=state), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = json.loads(request.data['data'])
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Modelo creado exitosamente!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            data = json.loads(request.data['data'])
            serializer = self.serializer_class(self.get_queryset(pk), data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Modelo modificado exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar el Modelo porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        brand = self.get_queryset(pk)
        if brand:            
            try:
                brand.delete()
                return Response({'message': 'Modelo eliminado exitosamente!'}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)            
        return Response({'message':'', 'error':'No se pudo eliminar el modelo porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        try:
            self.get_serializer().Meta.model.objects.filter(id__in=ids).delete()
            return Response({'message': 'Modelos eliminados exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
