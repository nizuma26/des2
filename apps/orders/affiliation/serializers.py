from rest_framework import serializers

from apps.orders.models import Affiliation

class AffiliationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Affiliation
        fields = '__all__'
