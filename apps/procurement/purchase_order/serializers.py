from decimal import Decimal
from datetime import datetime, timedelta
from rest_framework import serializers

from apps.procurement.models import (
    AccountPayable, 
    PurchaseOrder, 
    PurchaseOrderDetail, 
    Supplier, 
    PurchaseRequisition, 
    PurchaseRequisitionDetail
)
from apps.configuration.models import Currency, Laboratory

# ------------------------------------------------

class PurchaseOrderSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = PurchaseOrder
        fields = '__all__'

    def create(self, validated_data):

        get_detail = self.initial_data['detail']

        data = validated_data

        purchase_order = PurchaseOrder.objects.create(**data)

        if purchase_order.requisition is not None:
            purchase_order.requisition.status = "Convertido en Orden de Compra"
            purchase_order.requisition.save(update_fields=["status"])

        self.save_purchase_detail(purchase_order, get_detail)
        self.create_account_payable(purchase_order)

        return purchase_order

    def update(self, instance, validated_data):

        get_detail = self.initial_data['detail']        

        purchase = super().update(instance, validated_data)

        self.save_purchase_detail(purchase, get_detail, True)

        return purchase

    def save_purchase_detail(self, purchase_order, detail_data, update=False):

        detail_objects = []

        if update:
            purchase_order.purchase_order_detail.all().delete()
        
        for detail in detail_data:
            create_detail = PurchaseOrderDetail(
                purchase_order=purchase_order,
                item_id=detail['item_id'], 
                quantity=detail['quantity'],
                price=Decimal(detail['price']),
            )
            detail_objects.append(create_detail)

        PurchaseOrderDetail.objects.bulk_create(detail_objects)

    def calculate_due_date(self, days=0):

        today = datetime.now()

        future_date = today + timedelta(days=days)

        return future_date.date()
    
    def create_account_payable(self, purchase_order):

        balance = purchase_order.main_total
        payment_term = purchase_order.payment_term

        # Calcular la fecha de vencimiento si se proporciona credit_days
        due_date = self.calculate_due_date(days=payment_term) if payment_term > 0 else datetime.now()
        
        AccountPayable.objects.create(
            purchase_order=purchase_order,
            status='Pendiente',
            balance=balance,
            due_date=due_date
        )


class PurchaseOrderListSerializer(serializers.ModelSerializer):

    supplier = serializers.SlugRelatedField(slug_field='trade_name', read_only=True)
    order_hour = serializers.TimeField(format='%I:%M %p')
    
    class Meta:
        model = PurchaseOrder
        fields = (
            'id',
            'code',
            'supplier',
            'main_total',
            'order_date',
            'confirmed_date',
            'order_hour',
            'status',
        )

class PurchaseOrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = PurchaseOrderDetail
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'uuid': instance.id,
            'item_id': instance.item.id,
            'item_name': {instance.item.name},
            'item_description': {instance.item.description},
            'item_category': instance.item.category.name,
            'item_code': instance.item.code,
            'item_measure_unit': instance.item.measure_unit.name,
            'quantity': instance.quantity,
            'price': instance.price,
            'with_tax': instance.item.with_tax
        }

class CurrencySerializer(serializers.ModelSerializer):

    class Meta:
        model=Currency
        fields = ['id', 'exchange_rate']

class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = (
            "id", 
            "trade_name", 
            "legal_name", 
            "rif", 
            "email", 
            "phone_number",
            "address",
            "credit_limit",
            "credit_days",
        )

class LaboratorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ("name", "address", "document", "logo")

class PurchaseOrderRetrieveSerializer(serializers.ModelSerializer):

    purchase_order_detail = PurchaseOrderDetailSerializer(many=True, read_only=True)
    supplier = SupplierSerializer()
    laboratory = LaboratorySerializer()

    class Meta:
        model=PurchaseOrder
        fields = [
            'id',
            'code',
            'laboratory',
            'supplier',
            'payment_term',
            'comment',
            'status',
            'tax',
            'main_total',
            'secondary_total',
            'exchange_rate',
            'purchase_order_detail',
        ]

class RequisitionDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = PurchaseRequisitionDetail
        fields = "__all__"

    def to_representation(self, instance):
        return {
            'detail_id': instance.id,
            'item_id': instance.item.id,
            'item_name': f"{instance.item.name}/{instance.item.description}",
            'item_category': instance.item.category.name,
            'item_code': instance.item.code,
            'item_measure_unit_': instance.item.measure_unit.name,
            'quantity': instance.approved_amount,
            'with_tax': instance.item.with_tax,
            'price': 0,
        }

class RequisitionSerializer(serializers.ModelSerializer):
    
    requisition_detail_set = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseRequisition
        fields = ("id", "requisition_detail_set")

    def get_requisition_detail_set(self, instance):
        detail = instance.requisition_detail_set.select_related("item").filter(approved_amount__gt=0)
        return RequisitionDetailSerializer(detail, many=True).data


