from rest_framework import serializers

from apps.inventory.models import Model

class ModelSerializer(serializers.ModelSerializer):


    class Meta:
        model = Model
        fields = '__all__'

    def to_representation(self, instance):

        return {
            'id': instance.id,
            'name': instance.name,
            'is_active': instance.is_active,
            'brand_name': instance.brand.name,
            'brand_id': instance.brand_id,
        }
