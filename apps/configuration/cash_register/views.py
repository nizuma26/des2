from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db import transaction

from .serializers import CashRegisterSerializer, CashRegisterListSerializer
from ..models import CashRegister

MODULE_NAME = "Caja"
MODULE_NAME_PLURAL = "Cajas"

class CashRegisterViewSet(ModelViewSet):
    serializer_class = CashRegisterSerializer

    def get_queryset(self, pk=None, is_active=True, laboratory=None):
        if pk is None:
            return CashRegister.objects.filter(is_active=is_active, laboratory=laboratory).defer("laboratory")
        return get_object_or_404(CashRegister, pk=pk)

    def list(self, request):
        param = request.query_params.get("status", "true")
        is_active = param.lower() == "true"
        laboratory = request.user.laboratory
        serializer = CashRegisterListSerializer(
            self.get_queryset(is_active=is_active, laboratory=laboratory), 
            many=True
        )
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        data['laboratory'] = request.user.laboratory.id
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                created = serializer.data
                created["user"] = "Sin asignar"
                return Response({'message': f'{MODULE_NAME} creada exitosamente!', 'data': created}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        cash_register = self.get_queryset(pk)
        serializer = CashRegisterListSerializer(cash_register)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def update(self, request, pk=None, *args, **kwargs):
        cash_register = self.get_queryset(pk)
        laboratory_id = request.user.laboratory.id
        data = request.data
        data['laboratory'] = laboratory_id
        serializer = self.serializer_class(cash_register, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': f'{MODULE_NAME} modificada exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        laboratory_id = request.user.laboratory.id
         
        cash_register = self.get_queryset(pk, laboratory_id=laboratory_id)
        try:
            cash_register.delete()
            return Response({'message': f'{MODULE_NAME} eliminada exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        data = request.data
        model = self.get_serializer().Meta.model
        try:
            if data['action'] == 'disable':
                disabled = model.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': f'{MODULE_NAME_PLURAL} inactivadas exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = model.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': f'{MODULE_NAME_PLURAL} activadas exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
