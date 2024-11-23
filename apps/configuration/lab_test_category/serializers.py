from rest_framework import serializers

from apps.orders.models import LabTestCategory

# ------------------------------------------------

class LabTestCategorySerializer(serializers.ModelSerializer):
     
    class Meta:
        model = LabTestCategory
        fields = '__all__'

