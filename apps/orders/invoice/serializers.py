from rest_framework import serializers

from ..models import OrderInvoice, Order

class InvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderInvoice
        fields = '__all__'

    def create(self, validated_data):
        order = self.initial_data['orders']
        validated_data.pop('orders')
        #Se crea el pago
        invoice = OrderInvoice.objects.create(**validated_data)
        #Se acumula el total abonado por el paciente en la orden
        orders = Order.objects.filter(id__in=order)
        invoice.orders.set(orders)
        orders.update(is_invoiced=True)
        return invoice

class InvoiceListSerializer(serializers.ModelSerializer):

    order = serializers.SlugRelatedField(slug_field="code", read_only=True)
    hour = serializers.TimeField(format='%I:%M %p')
    patient = serializers.SerializerMethodField()

    class Meta:
        model = OrderInvoice
        fields = (
            "id", 
            "invoice_number",
            "order",
            "payment_type",
            "patient",
            "secondary_total", 
            "total", 
            "invoice_date", 
            "hour",
            "order"
        )
    
    def get_patient(self, instance):
        return instance.order.patient.full_names()

class OrderToBillSerializer(serializers.ModelSerializer):

    patient_full_name = serializers.SerializerMethodField()
    patient_cedula = serializers.SerializerMethodField()
    lab_tests = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id', 
            'code', 
            'order_date', 
            'patient_full_name', 
            'patient_cedula', 
            'main_total',
            'secondary_total',
            'amount_paid',
            'balance', 
            'lab_tests'
        )

    def get_patient_full_name(self, instance):
        return instance.patient.full_name
    
    def get_patient_cedula(self, instance):
        return instance.patient.cedula

    def get_lab_tests(self, instance):
        return instance.order_detail.count()