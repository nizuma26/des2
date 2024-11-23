from rest_framework import serializers

from apps.inventory.models import ItemCategory

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemCategory
        fields = '__all__'
