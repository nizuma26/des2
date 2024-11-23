from datetime import datetime
from rest_framework import serializers

from ..models import OrderPayment

class OrderPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderPayment
        fields = '__all__'

    def create(self, validated_data):
        order = validated_data.get('order')

        #Se crea el pago
        payment = OrderPayment.objects.create(**validated_data)
        #Se acumula el total abonado por el paciente en la orden
        order.calculate_amount_paid()
        return payment
    
    def calculate_balance(self, current_balance, payment_amount):
        """
        Calcula el nuevo saldo después de aplicar un pago.
        Asegura que el saldo no sea negativo.
        """
        new_balance = current_balance - payment_amount
        return max(new_balance, 0)

class OrderPaymentListSerializer(serializers.ModelSerializer):

    bank = serializers.SlugRelatedField(slug_field="name", read_only=True)
    payment_time = serializers.TimeField(format='%I:%M %p')

    class Meta:
        model = OrderPayment
        fields = (
            "id", 
            "payment_amount", 
            "payment_method", 
            "payment_date", 
            "payment_time", 
            "bank",
            "payment_ref"
        )

