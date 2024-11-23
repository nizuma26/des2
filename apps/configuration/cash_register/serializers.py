from rest_framework import serializers

from ..models import CashRegister

class CashRegisterListSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = CashRegister
        fields = ("id", "name", "is_active", "user")
    
    def get_user(self, instance):
        return instance.get_user

class CashRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = CashRegister
        fields = "__all__"