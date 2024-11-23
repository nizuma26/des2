from rest_framework import serializers

from apps.orders.models import Order

class PatientTreatedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"

    def to_representation(self, instance):
        representation = {
            "id": instance.id,
            "full_name": instance.patient.full_name,
            "order_date": instance.order_date,
            "hour": instance.hour,
            "cedula": instance.patient.cedula,
            "gender": instance.patient.gender,
            "birthdate": instance.patient.birthdate,
            "phone_number": instance.patient.phone_number,
        }

        return representation

