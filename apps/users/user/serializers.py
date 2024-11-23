from rest_framework import serializers
from backend.settings import MEDIA_URL
from apps.users.models import User
from apps.configuration.models import CashRegister
from django.contrib.auth.models import Group

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        exclude = ['user_permissions']

    def create(self, validated_data):
        group = self.initial_data['groups']

        validated_data.pop('groups')

        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        groups = Group.objects.filter(id__in=group)
        user.groups.set(groups)

        return user
    
    def update(self, instance, validated_data):

        group = self.initial_data['groups']
        password = instance.password

        validated_data.pop('groups')

        user = super().update(instance, validated_data)
        if (validated_data['password'] != password):
            user.set_password(validated_data['password'])
        user.save()

        groups = Group.objects.filter(id__in=group)
        user.groups.set(groups)

        return user

class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['user_permissions']

    def to_representation(self, instance):

        role_name = instance.groups.values("name").first()

        return {
            'id': instance.id,
            'username': instance.username,
            'email': instance.email,
            'cedula': instance.cedula,
            'image': instance.get_image,
            'is_active': instance.is_active, 
            'laboratory': instance.get_laboratory,
            'role': role_name['name'] if role_name != None  else 'Sin rol asignado',
        }
    
class UserRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        
    def to_representation(self, instance):

        role = instance.groups.values("id").first()

        return {
            'id': instance.id,
            'names': instance.names,
            'last_names': instance.last_names,
            'email': instance.email,
            'cedula': instance.cedula,
            'username': instance.username,
            'password': instance.password,
            'phone_number': instance.phone_number,
            'image': instance.get_image,
            'address': instance.address,
            'is_active': instance.is_active,
            'laboratory': instance.laboratory_id,
            'cash_register': instance.cash_register_id,
            'groups': role['id'] if role != None  else 'Sin rol',
        }

class CashRegisterSerializer(serializers.ModelSerializer):

    laboratory = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = CashRegister
        fields = ("id", "name", "laboratory")