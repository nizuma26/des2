from rest_framework import serializers

from apps.orders.models import Sample

# ------------------------------------------------

class SampleSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Sample
        fields = '__all__'

