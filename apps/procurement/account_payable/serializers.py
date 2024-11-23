from decimal import Decimal
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from apps.procurement.models import AccountPayable, AccountPayablePayment, PurchaseOrder

#----------------------------------------------------

class PurchaseOrderSerializer(serializers.ModelSerializer):

    supplier = serializers.SlugRelatedField(slug_field='trade_name', read_only=True)

    class Meta:
        model = PurchaseOrder
        fields = ('code', 'supplier', 'order_date', 'main_total')
        
class AccountPayableSerializer(serializers.ModelSerializer):

    class Meta:
        model=AccountPayable
        fields = "__all__"

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'code': instance.purchase_order.code,
            'created_at': instance.purchase_order.order_date,
            'balance': instance.balance,
            'due_date': instance.due_date,
            'amount_paid': instance.amount_paid,
            'secondary_debt': instance.purchase_order.secondary_total,
        }

class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model=AccountPayablePayment
        fields = '__all__'

    def create(self, validated_data):
        
        account_payable = validated_data.get('account_payable')
        payment_amount = validated_data.get('payment_amount')

        if payment_amount <= 0:
            raise serializers.ValidationError({
                "error": {"payment_amount": 'El pago debe ser mayor a 0!'}
            })
        
        elif payment_amount > account_payable.balance:
            raise serializers.ValidationError({
                "error": {"payment_amount": 'El pago no puede exceder al valor a cancelar!'}
            })

        #Se crea el pago
        payment = AccountPayablePayment.objects.create(**validated_data)

        #Se valida que el saldo deudor sea 0 para actualizar el estado y saldar la deuda
        new_balance = self.calculate_balance(account_payable.balance, payment.payment_amount)
        if new_balance == 0:
            account_payable.status = 'Pagado'
            account_payable.balance = new_balance
            account_payable.purchase_order.status = 'Cerrada'

            account_payable.save(update_fields=['status', 'balance'])
            account_payable.purchase_order.save(update_fields=['status'])

        #Se guarda el saldo deudor restante
        else:
            account_payable.balance = new_balance
            account_payable.save(update_fields=['balance'])

        account_payable.calculate_amount_paid()

        return payment
    
    def calculate_balance(self, current_balance, payment_amount):
        """
        Calcula el nuevo saldo después de aplicar un pago.
        Asegura que el saldo no sea negativo.
        """
        new_balance = current_balance - payment_amount
        return max(new_balance, 0)

class PaymentListSerializer(serializers.ModelSerializer):

    bank = serializers.SlugRelatedField(slug_field="name", read_only=True)
    created_at = serializers.DateTimeField(format="%Y/%m/%d %I:%M %p")

    class Meta:
        model = AccountPayablePayment
        fields = ('id', 'payment_amount', 'payment_method', 'payment_ref', 'payment_date', 'bank', 'created_at')

class DebtsToSupplierSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    trade_name = serializers.CharField()
    phone_number = serializers.CharField()
    rif = serializers.CharField()
    total_debt = serializers.DecimalField(max_digits=14, decimal_places=2)

    class Meta:
        fields = "__all__"