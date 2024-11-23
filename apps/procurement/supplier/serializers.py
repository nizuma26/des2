from rest_framework import serializers

from apps.procurement.models import Supplier


class SupplierSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Supplier
        fields = '__all__'

class SupplierListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Supplier
        fields = (
            'id',
            'trade_name',
            'rif',
            'email',
            'phone_number',
            'is_active',
        )

class SupplierActiveSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Supplier
        fields = (
            'id',
            'trade_name',
            'rif',
            'credit_days',
            'credit_limit',
        )