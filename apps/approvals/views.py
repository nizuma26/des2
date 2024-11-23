import json

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from .models import Approvals
from .serializers import ApprovalSerializer

class ApprovalsViewSet(ModelViewSet):
    serializer_class = ApprovalSerializer
    queryset = Approvals.objects.select_related('approver')

    def get_queryset(self, pk=None, state=None):

        if pk is None:
            return self.queryset
        
        #Verificar que exista la instancia. Caso contrario se devuelve un error 404
        return get_object_or_404(self.queryset, pk=pk)

    def list(self, request):
        approvals = self.get_queryset()
        serializer = self.serializer_class(approvals, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        data = request.data
        data['approver'] = request.user.id
        data['detail'] = json.loads(data['detail'])

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Operación realizada exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        approval = self.get_queryset(pk)
        serializer = self.serializer_class(approval)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):

        requisition = self.get_queryset(pk)

        data = request.data
        data['requester'] = request.user.id

        #Validar que el detalle no este vacio
        is_valid, error_message = self.validate_detail(data)
        
        if not is_valid:
            return Response({'message': '', 'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(requisition, data=data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Requisicion modificada exitosamente!'}, status=status.HTTP_200_OK)  
        return Response({'message':'', 'error':'No se pudo modificar la requisición porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
