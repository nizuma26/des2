from rest_framework import status
from rest_framework.decorators import action
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from django.db.models import OuterRef, Subquery
from django.db.models.functions import Coalesce

from apps.inventory.models import Item, Inventory

class InventoryViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    
    def get_stock(self, laboratory_id):

        inventory = Inventory.objects.filter(
            item=OuterRef('pk'), 
            laboratory_id=laboratory_id
        ).values('stock')

        stocks = Item.objects.annotate(quantity=Coalesce(Subquery(inventory), 0))

        return stocks


    @action(detail=False, methods=['POST'], url_path='stock-items')
    def stock_items(self, request, pk=None):

        laboratory_id = request.data.get('laboratory_id')

        stocks = self.get_stock(laboratory_id)

        data = []

        for item in stocks:
            product = {"product": {item.name}, "stock": {item.quantity}}
            data.append(product)

        #serializer = ItemActiveSerializer(items, many=True)
        return Response(data, status=status.HTTP_200_OK)
