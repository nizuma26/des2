from rest_framework import serializers

from django.contrib.auth.models import Group, Permission

class RoleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Group
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'permissions': instance.permissions.count()
        }
    
class RoleRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Group
        fields = "__all__"

class PermissionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Permission
        fields = ('id', 'name')