from rest_framework import serializers

from apps.inventory.models import Item, ItemCategory, MeasureUnit, Model

class ItemSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Item
        fields = '__all__'

class ItemListSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    model = serializers.SlugRelatedField(slug_field='name', read_only=True)
    brand = serializers.SerializerMethodField(allow_null=True)
    
    class Meta:
        model = Item
        fields = (
            'id',
            'code',
            'name',
            'item_type',
            'image',
            'is_active',
            'category',
            'model',
            'brand'
        )

    def get_brand(self, instance):
        if instance.model is None:
            return None
        return instance.model.brand.name

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ItemCategory
        fields = ('id', 'name')

class MeasureUnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeasureUnit
        fields = ('id', 'name')

class ModelSerializer(serializers.ModelSerializer):

    brand = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Model
        fields = ('id', 'name', 'brand')

class ItemRetrieveSerializer(serializers.ModelSerializer):

    category = CategorySerializer()
    measure_unit = MeasureUnitSerializer()
    model = ModelSerializer(allow_null=True)
    
    class Meta:
        model = Item
        fields = [
            'id',
            'code',
            'name',
            'item_type',
            'description',
            'image',
            'is_active',
            'is_inventoriable',
            'with_tax',
            'use_in_tests',
            'category',
            'measure_unit',
            'model'
        ]
