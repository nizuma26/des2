from decimal import Decimal
from django.utils import timezone

from rest_framework import serializers

from apps.orders.models import Order, OrderDetail, Patient, Affiliation, OrderPayment, LabTest
from apps.configuration.models import Currency, Laboratory, Tax
from apps.inventory.models import Inventory
from apps.orders.patients.serializers import PatientAffiliationSerializer

# ------------------------------------------------

class OrderSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):

        get_detail = self.initial_data['detail']
        get_payments = self.initial_data.get('payments', [])

        order = Order.objects.create(**validated_data)

        self.save_detail(order, get_detail)

        if get_payments:
            self.save_payments(order, get_payments)

        return order

    def update(self, instance, validated_data):

        get_detail = self.initial_data['detail']
        get_payments = self.initial_data['payments']

        order = super().update(instance, validated_data)

        self.save_detail(order, get_detail, True)

        if len(get_payments):
            self.save_payments(order, get_payments, update=True)

        return order
    
    def save_detail(self, order, detail_data, update=False):

        '''Guardar el detalle de la orden'''

        detail_objects_list = []
        lab_test_ids = []

        if update:
            order.order_detail.all().delete()
        
        for detail in detail_data:
            detail_object = OrderDetail(
                order=order,
                lab_test_id=detail['uuid'],
                price=Decimal(detail['price']),
                discount=Decimal(detail['discount']),
            )
            detail_objects_list.append(detail_object)
            lab_test_ids.append(detail['uuid'])


        OrderDetail.objects.bulk_create(detail_objects_list)
        self.update_inventory(lab_test_ids, order.laboratory)

    def update_inventory(self, lab_test_ids, laboratory):

        lab_tests = LabTest.objects.filter(id__in=lab_test_ids).defer("category", "sample", "container")

        inventory_instance_list = {}

        for l in lab_tests:    
            items = l.items.all()

            for i in items:
                inv = Inventory.objects.filter(laboratory=laboratory, item_id=i.item.id).first()

                if inv:
                    if i.reduction_type == "orden":
                        inv.stock -= i.quantity
                    else:
                        inv.reserved += i.quantity

                    if inv.id not in inventory_instance_list:
                        inventory_instance_list[inv.id] = inv
                        
                    else:
                        if i.reduction_type == "orden":
                            inventory_instance_list[inv.id].stock -= i.quantity
                        else:
                            inventory_instance_list[inv.id].reserved += i.quantity


        update_inventory_list = list(inventory_instance_list.values())

        if update_inventory_list:
            Inventory.objects.bulk_update(update_inventory_list, ['stock', 'reserved'])

    def save_payments(self, order, payments, update=False):
        """Guardar los pagos de la orden"""

        if update:
            order.order_payments.all().delete()

        payments_objects_list = []

        for p in payments:
            payment_object = OrderPayment(
                order=order,
                payment_amount=p['payment_amount'],
                payment_method=p['payment_method'],
                payment_ref=p['payment_ref'],
                bank_id=p['bank'],
                comment=p['comment'],
            )
            payments_objects_list.append(payment_object)
        
        OrderPayment.objects.bulk_create(payments_objects_list)

class OrderListSerializer(serializers.ModelSerializer):

    patient_names = serializers.SerializerMethodField()
    patient_last_names = serializers.SerializerMethodField()
    patient_cedula = serializers.SerializerMethodField()
    hour = serializers.TimeField(format='%I:%M %p')

    class Meta:
        model = Order
        fields = (
            'id',
            'code',
            'patient_names',
            'patient_last_names',
            'patient_cedula',
            'order_date',
            'hour',
            'main_total',
            'status',
        )

    def get_patient_names(self, instance):
        return instance.patient.names
    
    def get_patient_last_names(self, instance):
        return instance.patient.last_names
    
    def get_patient_cedula(self, instance):
        return instance.patient.cedula
    
class CurrencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Currency
        fields = ("id", "code", "exchange_rate")

class TaxSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tax
        fields = ("id", "name", "tax")

class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ("id", "full_name", "cedula", "gender", "phone_number", "birthdate", "address")

class AffiliationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Affiliation
        fields = ("id", "name", "rif", "price_type")

class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderDetail
        fields = "__all__"

    def to_representation(self, instance):
        return {
            'uuid': instance.lab_test.id,
            'abbreviation': instance.lab_test.abbreviation,
            'name': instance.lab_test.name,
            'price': instance.price,
            'discount': instance.discount,
            'secondary_price': self.secondary_price(instance),
        }

    def secondary_price(self, instance):
        price = instance.price / instance.order.exchange_rate
        return round(price, 2)

class LaboratorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ("name", "address", "document", "logo")

class OrderRetrieveSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="get_full_name", read_only=True)
    laboratory = LaboratorySerializer()
    cash_register = serializers.SlugRelatedField(slug_field="name", read_only=True)
    patient = PatientSerializer()
    affiliation = AffiliationSerializer()
    main_currency = CurrencySerializer()
    secondary_currency = CurrencySerializer()
    tax = TaxSerializer()
    order_detail = OrderDetailSerializer(many=True, read_only=True)
    hour = serializers.TimeField(format='%I:%M %p')

    class Meta:
        model = Order
        fields = (
            "id",
            "code",
            "user",
            "laboratory",
            "cash_register",
            "patient",
            "affiliation",
            "order_date",
            "hour",
            "tax",
            "main_currency",
            "secondary_currency",
            "main_total",
            "secondary_total",
            "amount_paid",
            "status",
            "comment",
            "exchange_rate",
            "order_detail",
            "cost_type",
            "payment_type",
            "balance"
        )
    
class PatientSearchSerializer(serializers.ModelSerializer):

    affiliations = PatientAffiliationSerializer(many=True)

    patient_number = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = (
            "id", 
            "names", 
            "last_names", 
            "cedula", 
            "email", 
            "birthdate",
            "phone_number",
            "address",
            "gender",
            "is_active",
            "affiliations",
            "patient_number"
        )
    
    def get_patient_number(self, instance):
        laboratory_id = self.context['laboratory_id']
        
        number = Order.objects.filter(
            order_date=timezone.now(),
            laboratory_id=laboratory_id
        ).count()

        return number + 1 if number else 1

        
    