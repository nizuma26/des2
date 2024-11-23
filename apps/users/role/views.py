import json
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from django.db import transaction
from django.contrib.auth.models import Permission

from .serializers import RoleSerializer, RoleRetrieveSerializer, PermissionsSerializer

class RoleViewSet(ModelViewSet):
    serializer_class = RoleSerializer
    parser_classes = (JSONParser, MultiPartParser, )

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.prefetch_related('permissions').all().order_by('id')
        return self.get_serializer().Meta.model.objects.filter(id=pk).first()

    def list(self, request):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = json.loads(request.data['data'])
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()                
                return Response({'message': 'Rol creado exitosamente!'}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        laboratory = self.get_queryset(pk)        
        if laboratory:
            serializer = RoleRetrieveSerializer(laboratory)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'Ningun Usuario coincide con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            data = json.loads(request.data['data'])
            serializer = self.serializer_class(self.get_queryset(pk), data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Rol modificado exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar el rol porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        role = self.get_queryset(pk)
        if role:
            with transaction.atomic():                
                role.delete()
                return Response({'message': 'Rol eliminado exitosamente!'}, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'No se pudo eliminar el rol porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
  
    
    @action(detail=False, url_name="permission_list", methods=['get'])
    def permission_list(self, request):
        exclude_permissions = ['logentry', 'contenttype', 'session', 'adjustmentdetail', 'blacklistedtoken', 
        'referencevalue', 'outstandingtoken', 'clinicaltestprice', 'clinicaltestprofile', 'clinicaltestitems', 
        'parameter', 'permission', 'group', 'accountpayabledetail', 'purchasedetail',  'purchaseorderdetail', 
        'beginninginventorydetail']
        try:
            permissions = Permission.objects.exclude(content_type__model__in=exclude_permissions).order_by('id')
            serializer = PermissionsSerializer(permissions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            