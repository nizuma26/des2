import json
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db import transaction

from .serializers import MeasureUnitSerializer

class MeasureUnitViewSet(ModelViewSet):
    serializer_class = MeasureUnitSerializer

    def get_queryset(self, pk=None, state=True):
        model = self.get_serializer().Meta.model.objects
        if pk is None:
            return model.filter(is_active=state).order_by('-id')        
        return model.filter(id=pk).first()

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
                return Response({'message': 'Unidad de medida creada exitosamente!', 'data': serializer.data}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            data = json.loads(request.data['data'])
            serializer = self.serializer_class(self.get_queryset(pk), data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Undidad de medida modificada exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar la unidad de medida porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        measure_unit = self.get_queryset(pk=pk)
        if measure_unit:
            try:
                measure_unit.delete()
                return Response({'message': 'Unidad de medida eliminada exitosamente!'}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({'message':'', 'error':'No se pudo eliminar la unidad de medida porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
  
    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        try:
            self.get_serializer().Meta.model.objects.filter(id__in=ids).delete()
            return Response({'message': 'Unidades de medida eliminadas exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        data = request.data
        try:
            if data['action'] == 'disable':
                disabled = self.get_serializer().Meta.model.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': 'Unidades de medida inactivadas exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = self.get_serializer().Meta.model.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': 'Unidades de medida activadas exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)