from rest_framework import serializers

from apps.configuration.models import Laboratory

class LaboratorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Laboratory
        fields = '__all__'

class LaboratoryListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Laboratory
        fields = ['id', 'code', 'name', 'document', 'email', 'get_logo', 'is_main', 'is_active']

class LaboratoryRetrieveSerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = "__all__"

class ActiveLaboratoriesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Laboratory
        fields = ['id', 'code', 'name']

class LaboratorySerializerForReports(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ("name", "address", "document", "get_logo")