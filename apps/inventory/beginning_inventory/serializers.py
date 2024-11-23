from rest_framework import serializers
from apps.inventory.models import BeginningInventory, BeginningInventoryDetail, Inventory, Item
from apps.configuration.models import Laboratory
from decimal import Decimal

class BeginningInventorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BeginningInventory
        fields = "__all__"
    
    def create(self, validated_data):
        get_detail = self.initial_data['detail']

        beginning_inventory = BeginningInventory.objects.create(**validated_data)

        detail = []
        inventory = []

        for detail_data in get_detail:
            create_detail = BeginningInventoryDetail(
                beginning_inventory_id=beginning_inventory.id,
                item_id=detail_data['item_id'], 
                stock=detail_data['stock'],
                price=Decimal(detail_data['price'])
            )
            create_inventory = Inventory(
                laboratory_id=beginning_inventory.laboratory_id, 
                item_id=detail_data['item_id'], 
                stock=detail_data['stock'],
                price=Decimal(detail_data['price'])
            )
            detail.append(create_detail)
            inventory.append(create_inventory)

        BeginningInventoryDetail.objects.bulk_create(detail)

        if beginning_inventory.status == 'Finalizado':
            Inventory.objects.bulk_create(inventory)

        return beginning_inventory
    
    def update(self, instance, validated_data):
        
        get_detail = self.initial_data['detail']

        beginning_inventory = super().update(instance, validated_data)

        detail = []
        inventory = []

        for detail_data in get_detail:
            create_detail = BeginningInventoryDetail(
                beginning_inventory_id=beginning_inventory.id, 
                item_id=detail_data['item_id'], 
                stock=detail_data['stock'],
                price=Decimal(detail_data['price'])
            )
            create_inventory = Inventory(
                laboratory_id=beginning_inventory.laboratory_id, 
                item_id=detail_data['item_id'], 
                stock=detail_data['stock'],
                price=Decimal(detail_data['price'])
            )
            detail.append(create_detail)
            inventory.append(create_inventory)
        
        beginning_inventory.beginning_inventory_set.all().delete()
        
        BeginningInventoryDetail.objects.bulk_create(detail)

        if beginning_inventory.status == 'Finalizado':
            Inventory.objects.bulk_create(inventory)

        return beginning_inventory

class BeginningInventoryListSerializer(serializers.ModelSerializer):

    laboratory = serializers.SlugRelatedField(slug_field='name', read_only=True)
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    hour = serializers.TimeField(format='%I:%M %p')
    
    class Meta:
        model = BeginningInventory
        fields = (
            'id',
            'code',
            'laboratory',
            'user',
            'last_date',
            'hour',
            'created_at',
            'status',
            'total',
        )

class BeginningInventoryDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = BeginningInventoryDetail

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'item_id': instance.item_id,
            'name': instance.item.name,
            'category': instance.item.category.name,
            'stock': instance.stock,
            'price': instance.price,
            'subtotal': instance.stock * instance.price
        }

class LaboratorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ('id', 'name')

class BeginningInventoryRetrieveSerializer(serializers.ModelSerializer):

    laboratory = LaboratorySerializer(read_only=True)
    beginning_inventory_set = BeginningInventoryDetailSerializer(many=True, read_only=True)
    
    class Meta:
        model = BeginningInventory
        fields = [
            'id',
            'code',
            'laboratory',
            'user',
            'note',
            'last_date',
            'hour',
            'created_at',
            'status',
            'total',
            'beginning_inventory_set'
        ]

class SearchItemsSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    brand = serializers.SlugRelatedField(slug_field='name', read_only=True)
    model = serializers.SlugRelatedField(slug_field='name', read_only=True)
    
    class Meta:
        model = Item
        fields = (
            'id',
            'code',
            'name',
            'category',
            'brand',
            'model',
        )

