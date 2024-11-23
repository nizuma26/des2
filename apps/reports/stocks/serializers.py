from rest_framework import serializers

from apps.inventory.models import Inventory

class StocksSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventory
        fields = "__all__"

    def to_representation(self, instance):
        representation = {
            "id": instance.id,
            "name": instance.item.name,
            "category": instance.item.category.name,
            "brand": self.get_brand(instance),
            "model": self.get_model(instance),
            "stock": instance.stock,
            "min_stock": instance.min_stock,
            "max_stock": instance.max_stock,
            "price": instance.price,
            "reserved": instance.reserved,
            "available": instance.available,
        }
    
        return representation
    
    def get_model(self, instance):
        if instance.item.model is None:
            return None
        return instance.item.model.name
    
    def get_brand(self, instance):
        if instance.item.model is None:
            return None
        return instance.item.model.brand.name


