import json

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db import transaction

from apps.orders.models import Sample

from .serializers import SampleSerializer

MODULE_NAME = 'Muestra'
MODULE_NAME_PLURAL = 'Muestras'

class SampleViewSet(ModelViewSet):
    serializer_class = SampleSerializer
    model = Sample
    
    def get_queryset(self, pk=None, state=None):

        queryset = self.model.objects.all()

        if state is not None:
            queryset = queryset.filter(is_active=state)
    
        elif pk is not None:
            return get_object_or_404(self.model, pk=pk)

        return queryset.order_by('-id')

    def list(self, request):
        param = request.query_params.get('status', None)
        state = None

        if param is None:
            state = None

        elif param.lower() == "true":
            state = True

        else:
            state = False

        serializer = self.serializer_class(self.get_queryset(state=state), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} creada exitosamente!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            serializer = self.serializer_class(self.get_queryset(pk), data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} modificada exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error': f'No se pudo modificar la {MODULE_NAME.lower()} porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            brand = self.get_queryset(pk)
            brand.delete()
            return Response({'message': f'{MODULE_NAME} eliminada exitosamente!'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)            

    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        try:
            self.get_serializer().Meta.model.objects.filter(id__in=ids).delete()
            return Response({'message': f'{MODULE_NAME_PLURAL} eliminadas exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
    @action(detail=False, methods=['PUT'], url_path="move-to-trash")
    def move_to_trash(self, request):

        ids = request.data.get("ids", [])
        is_error, count, message = self.change_states(ids, is_active=False)

        if is_error:
            return Response({'message':'', 'error':message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({
                'message': message, 
                'total': count
              }, status=status.HTTP_200_OK
            )
    
    @action(detail=False, methods=['PUT'], url_path="restore-from-trash")
    def restore_from_trash(self, request):

        ids = request.data.get("ids", [])
        is_error, count, message = self.change_states(ids, is_active=True)

        if is_error:
            return Response({'message':'', 'error':message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({
                'message': message, 
                'total': count
              }, status=status.HTTP_200_OK
            )

    def change_states(self, ids, is_active):
        try:
            count = self.model.objects.filter(id__in=ids, is_active=not is_active).update(is_active=is_active)
            message = ""

             # Determinar la acción que se está realizando junto con la preposición
            action = "recuperado" if is_active else "movido"
            preposition = "de" if is_active else "a"
            
            # Mensaje según el número de elementos.
            if count == 1:
                message = f"Se ha {action} {count} elemento {preposition} la papelera exitosamente!"
            else:
                message = f"Se han {action} {count} elementos {preposition} la papelera exitosamente!"
            return False, count, message
        
        except Exception as e:
            return True, 0, str(e)
        