from decimal import Decimal
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from apps.procurement.models import (
    ReceivingOrder, 
    ReceivingOrderDetail, 
    PurchaseOrder, 
    PurchaseOrderDetail, 
    Supplier
)
from apps.configuration.models import Laboratory
from apps.inventory.models import Inventory

# ------------------------------------------------

class ReceivingOrderSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = ReceivingOrder
        fields = '__all__'

    def create(self, validated_data):

        get_detail = self.initial_data['detail']

        receiving_order = ReceivingOrder.objects.create(**validated_data)

        order = validated_data['order']
        
        order.status = validated_data['status']
        order.save(update_fields=['status'])

        self.save_receiving_order_detail(receiving_order, order.laboratory, get_detail)

        return receiving_order

    def update(self, instance, validated_data):

        get_detail = self.initial_data['detail']

        receiving_order = super().update(instance, validated_data)

        order = validated_data.get('order')

        order.status = validated_data['status']
        order.save(update_fields=['status'])

        self.save_receiving_order_detail(receiving_order, order.laboratory, get_detail, True)

        return receiving_order

    def save_receiving_order_detail(self, receiving_order, laboratory, detail_data, update=False):

        if update:
            update_reception_list = []
            update_inventory_list = []
            detail_object = receiving_order.receiving_order_detail.filter(status="Incompleto").order_by('id')

            detail_dict = {r.item.id: r for r in detail_object}

            for d in detail_data:
                r = detail_dict.get(d['item_id'])

                if not r:
                    raise ValidationError(f"No se encontró el detalle para el artículo ID {d['item_id']}.")
                
                expected = r.expected_quantity - r.received_quantity
                if int(d['received_quantity']) > expected:
                    raise ValidationError("La cantidad recibida no puede ser mayor a la cantidad esperada.")
                
                r.received_quantity += int(d['received_quantity'])
                r.status = "Completo" if expected == d['received_quantity'] else "Incompleto"
                r.comment = d.get('comment', '')
                update_reception_list.append(r)
                inventory_instance = Inventory.objects.filter(laboratory=laboratory, item=r.item).first()
                if inventory_instance:
                    inventory_instance.stock += int(d['received_quantity'])
                    update_inventory_list.append(inventory_instance)

            if update_reception_list:
                ReceivingOrderDetail.objects.bulk_update(update_reception_list, ['received_quantity', 'status', 'comment'])

            if update_inventory_list:
                Inventory.objects.bulk_update(update_inventory_list, ['stock'])
            
            return detail_object
        
        else:     
            objects_list = []
            
            for detail in detail_data:
                status = "Completo" if int(detail['expected_quantity']) == int(detail['received_quantity']) else "Incompleto"
                detail_object = ReceivingOrderDetail(
                    receiving_order=receiving_order,
                    item_id=detail['item_id'],
                    comment=detail['comment'],
                    expected_quantity=detail['expected_quantity'],
                    received_quantity=detail['received_quantity'],
                    price=Decimal(detail['price']),
                    status=status
                )
                objects_list.append(detail_object)
                inventory, created = Inventory.objects.get_or_create(
                        laboratory=laboratory, 
                        item_id=detail['item_id'],
                        defaults={
                            'stock': 0,
                            'price': Decimal(detail['price'])
                        }
                    )
                inventory.stock += int(detail['received_quantity'])
                inventory.price = Decimal(detail['price'])
                inventory.save()   

            ReceivingOrderDetail.objects.bulk_create(objects_list)


class ReceivingOrderListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReceivingOrder
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'code': instance.order.code,
            'supplier': instance.order.supplier.trade_name,
            'main_total': instance.order.main_total,
            'reception_date': instance.reception_date,
            'confirmed_date': instance.order.confirmed_date,
            'reception_hour': instance.reception_hour.strftime('%I:%M %p'),
            'status': instance.status,
        }
        
class SupplierSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Supplier
        fields = [
            'id',
            'trade_name',
            'legal_name',
            'address',
            'phone_number',
            'rif',
            'email',
        ]

class LaboratorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ("name", "address", "document", "logo")

class PurchaseOrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = PurchaseOrderDetail
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'uuid': instance.id,
            'item_id': instance.item.id,
            'item_code': instance.item.code,
            'item_name': instance.item.name,
            'item_description': instance.item.description,
            'expected_quantity': instance.quantity,
            'received_quantity': 0,
            'comment': '',
            'price': instance.price,
        }

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
            'purchase_order_detail',
        ]

class SupplierSearchSerializer(serializers.ModelSerializer):

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


class ReceivingPurchaseDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReceivingOrderDetail
        fields = '__all__'

    def to_representation(self, instance):
        return {
            'uuid': instance.id,
            'item_id': instance.item.id,
            'item_code': instance.item.code,
            'item_name': instance.item.name,
            'item_description': instance.item.description,
            'expected_quantity': instance.expected_quantity - instance.received_quantity,
            'received_quantity': 0,
            'comment': instance.comment,
        }

class ReceivingPurchaseRetrieveSerializer(serializers.ModelSerializer):

    receiving_order_detail = serializers.SerializerMethodField()
    supplier = serializers.SerializerMethodField()
    laboratory = serializers.SerializerMethodField()
    order = serializers.SerializerMethodField()

    class Meta:
        model=ReceivingOrder
        fields = [
            'id',
            'order',
            'laboratory',
            'order',
            'supplier',
            'comment',
            'status',
            'receiving_order_detail',
        ]
    
    def get_order(self, instance):
        return {"id": instance.order.id, "code": instance.order.code}
    
    def get_supplier(self, instance):
        return SupplierSerializer(instance.order.supplier).data
    
    def get_laboratory(self, instance):
        return LaboratorySerializer(instance.order.laboratory).data
    
    def get_receiving_order_detail(self, instance):
        detail = instance.receiving_order_detail.select_related("item").filter(status="Incompleto").order_by('id')
        return ReceivingPurchaseDetailSerializer(detail, many=True).data


    