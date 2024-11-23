from rest_framework import serializers

from apps.inventory.models import MeasureUnit

class MeasureUnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeasureUnit
        fields = '__all__'
