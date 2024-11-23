from rest_framework import serializers

from apps.orders.models import Order

class IncomeSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"

    def to_representation(self, instance):
        representation = {
            "id": instance.id,
            "order_code": instance.code,
            "order_date": instance.order_date,
            "order_hour": instance.hour,
            "patient": instance.patient.full_name,
            "invoice_number": None,
            "invoice_date": None,
            "invoice_hour": None,
            "amount_paid": instance.amount_paid,
            "total": instance.main_total
        }
        if hasattr(instance, 'order_invoice'):
            representation["invoice_number"] = instance.order_invoice.invoice_number
            representation["invoice_date"] = instance.order_invoice.invoice_date.strftime("%Y-%m-%d")
            representation["invoice_hour"] = instance.order_invoice.hour.strftime("%I:%M %p")

        return representation

