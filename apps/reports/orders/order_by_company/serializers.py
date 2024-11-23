from rest_framework import serializers

from apps.orders.models import Order, Affiliation

class OrderByCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"

    def to_representation(self, instance):
        representation = {
            "id": instance.id,
            "code": instance.code,
            "order_date": instance.order_date,
            "order_hour": instance.hour,
            "patient": instance.patient.full_name,
            "amount_paid": instance.amount_paid,
            "total": instance.main_total,
            "lab_tests": instance.order_detail.count()
        }

        return representation

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Affiliation
        fields = ("id", "name")

    def to_representation(self, instance):
        return {
            'value': instance['id'], 
            'label': instance['name'], 
        }