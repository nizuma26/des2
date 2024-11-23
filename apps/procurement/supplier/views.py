from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from django.db import transaction

from .serializers import (SupplierSerializer, SupplierListSerializer, SupplierActiveSerializer)

class SupplierViewSet(ModelViewSet):
    serializer_class = SupplierSerializer

    def get_queryset(self, pk=None):
        suppliers = self.get_serializer().Meta.model
        if pk is None:
            return suppliers.objects.all().defer('legal_name', 'address', 'description', 'contact_person', 'credit_limit', 'credit_days', 'postal_code')
        return suppliers.objects.filter(id=pk).first()

    def list(self, request):
        suppliers = self.get_queryset()
        serializer = SupplierListSerializer(suppliers, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Proveedor creado exitosamente!', "data": serializer.data}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        supplier = self.get_queryset(pk)        
        if supplier:
            serializer = SupplierSerializer(supplier)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'Ningun proveedor coincide con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        supplier = self.get_queryset(pk)
        if supplier:
            serializer = self.serializer_class(supplier, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Proveedor modificado exitosamente!', "data": serializer.data}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar el proveedor porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        supplier = self.get_queryset(pk)
        if supplier:
            try:
                supplier.delete()
                return Response({'message': 'Proveedor eliminado exitosamente!'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        return Response({
            'message':'', 
            'error':'No se pudo eliminar el proveedor porque no se encontraron coincidencias'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        suppliers = self.get_serializer().Meta.model
        try:
            suppliers.objects.filter(id__in=ids).delete()
            return Response({'message': 'Proveedores eliminados exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        data = request.data
        suppliers = self.get_serializer().Meta.model
        try:
            if data['action'] == 'disable':
                disabled = suppliers.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': 'Proveedores inactivados exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = suppliers.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': 'Proveedores activados exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
    @action(detail=False, methods=['get'])
    def active_suppliers(self, request):
        suppliers = self.get_serializer().Meta.model
        get_suppliers = suppliers.objects.filter(is_active=True).only('id', 'rif', 'trade_name')
        serializer = SupplierActiveSerializer(get_suppliers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
