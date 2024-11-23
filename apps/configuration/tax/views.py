from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db import transaction

from .serializers import TaxSerializer
from ..models import Tax

MODULE_NAME = "Impuesto"
MODULE_NAME_PLURAL = "Impuestos"

class TaxViewSet(ModelViewSet):
    serializer_class = TaxSerializer

    def get_queryset(self, pk=None, is_active=True, type_tax=None):
        
        queryset = Tax.objects.filter(is_active=is_active).order_by("id")

        if type_tax is not None:
            return queryset.filter(type_tax=type_tax)
        
        if pk is None:
            return queryset
        
        return get_object_or_404(Tax, pk=pk)

    def list(self, request):

        status_param = request.query_params.get("status", "true")
        type_tax_param = request.query_params.get("type", None)
        is_active = status_param.lower() == "true"

        if type_tax_param is not None:
            type_tax_param = type_tax_param.capitalize()

        serializer = self.serializer_class(self.get_queryset(is_active=is_active, type_tax=type_tax_param), many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} creado exitosamente!', 'data': serializer.data}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        tax = self.get_queryset(pk)
        serializer = self.serializer_class(tax)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):
        tax = self.get_queryset(pk)
        serializer = self.serializer_class(tax, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': f'{MODULE_NAME} modificado exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        tax = self.get_queryset(pk)
        try:
            tax.delete()
            return Response({'message': f'{MODULE_NAME} eliminado exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def change_states(self, ids, is_active):

        try:

            count = Tax.objects.filter(id__in=ids, is_active=not is_active).update(is_active=is_active)

            message = f"""Se han {"recuperado" if is_active else "movido"} {count} 
                {"elementos" if count > 1 else "elemento"} de la palera exitosamente!"""
            
            return False, count, message
        
        except Exception as e:
            return True, 0, str(e)
            
    
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
