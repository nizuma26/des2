import json
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from django.db import transaction

from .serializers import (
    UserListSerializer, 
    UserSerializer, 
    UserRetrieveSerializer,
    CashRegisterSerializer
)
from utils.utils import validate_files, remove_directory
from ..models import User
from apps.configuration.models import CashRegister

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    parser_classes = (JSONParser, MultiPartParser, )

    def get_queryset(self, pk=None):
        user = self.get_serializer().Meta.model
        if pk is None:
            return user.objects.prefetch_related('groups').select_related('laboratory').defer('user_permissions')
        return user.objects.filter(id=pk).first()

    def list(self, request):
        serializer = UserListSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = validate_files(request.data, 'image')
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()                
                return Response({'message': 'Usuario creado exitosamente!'}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        user = self.get_queryset(pk)        
        if user:
            serializer = UserRetrieveSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {
             'message':'', 
             'error':'Ningun Usuario coincide con estos datos!'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def update(self, request, pk=None, *args, **kwargs):
        user = self.get_queryset(pk)
        if user:
            data = validate_files(request.data, 'image', True)
            serializer = self.serializer_class(user, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Usuario modificado exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {
             'message':'', 
             'error':'No se pudo modificar al usuario porque no se encontraron coincidencias'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, pk=None):
        user = self.get_queryset(pk)
        if user:
            with transaction.atomic():
                user.delete()
                remove_directory(f'users/{user.username}/')
                return Response({'message': 'Usuario eliminado exitosamente!'}, status=status.HTTP_200_OK)
        return Response(
            {
             'message':'', 
             'error':'No se pudo eliminar al Usuario porque no se encontraron coincidencias'
            }, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    @action(detail=False, methods=['GET'])
    def permissions(self, request):
        user = request.user
        try:
            permissions_dict = {
                "views": [],
                "others": []
            }
            group = user.groups.first()
            if group:
                permissions = group.permissions.values_list("codename", flat=True)

                for p in permissions:
                    if p[0] == "v":
                        permissions_dict['views'].append(p)
                    else:
                        permissions_dict['others'].append(p)
                
            return Response(permissions_dict, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
    @action(detail=False, methods=['DELETE'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        user = self.get_serializer().Meta.model
        try:
            user.objects.filter(id__in=ids).delete()
            return Response({'message': 'Usuarios eliminados exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['PUT'])
    def change_states(self, request):
        data = request.data
        user = self.get_serializer().Meta.model
        print('DATAAAAAA: ', data)
        try:
            if data.get('action') == 'disable':
                disabled = user.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': 'Usuarios inactivados exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = user.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': 'Usuarios activados exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=False, methods=['GET'], url_path="cash-registers")
    def get_cash_registers(self, request):
        
        user_id_param = request.query_params.get("user_id")
        lab_id_param = request.query_params.get("lab_id")

        user_id = self.get_param_id(user_id_param)
        lab_id = self.get_param_id(lab_id_param)

        cash_register_ids = User.objects.filter(
            laboratory_id=lab_id,
            cash_register__isnull=False
        ).exclude(
            id=user_id
        ).values_list(
            "cash_register__id", 
            flat=True
        )
        cash_registers = CashRegister.objects.filter(laboratory_id=lab_id).exclude(
            id__in=cash_register_ids
        )

        serializers = CashRegisterSerializer(cash_registers, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    def get_param_id(self, param):
        if param in (None, 'undefined'):
            return None
        else:
            try:
                return int(param)
            except ValueError:
                # Manejo del error si el valor no se puede convertir a int
                return None
        