from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser

from django.db import transaction
from django.db.models import OuterRef, Subquery, Q, IntegerField, DecimalField
from django.db.models.functions import Coalesce

from .serializers import ItemSerializer, ItemListSerializer, ItemRetrieveSerializer
from utils.utils import validate_files, remove_directory
from apps.inventory.models import Item, Inventory

MODULE_NAME = 'Artículo'
MODULE_NAME_PLURAL = 'Artículos'

class ItemViewSet(ModelViewSet):
    serializer_class = ItemSerializer
    parser_classes = (JSONParser, MultiPartParser)
    queryset = Item.objects.select_related('category', 'measure_unit', 'model')
    
    def get_queryset(self, pk=None, state=True):
        queryset = self.queryset
        if pk is None:
            return queryset.filter(is_active=state).order_by('-id')
        return get_object_or_404(queryset, pk=pk)

    def list(self, request):
        param = request.query_params.get('state', 'true')        
        state = param.lower() == 'true'
        serializer = ItemListSerializer(self.get_queryset(state=state), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = validate_files(request.data, 'image')
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} creado exitosamente!'}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        item = self.get_queryset(pk)
        if item:
            serializer = ItemRetrieveSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'', 'error': f'Ningun {MODULE_NAME.lower()} coincide con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        if self.get_queryset(pk):
            data = validate_files(request.data, 'image', True)
            serializer = self.serializer_class(self.get_queryset(pk), data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} modificado exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error': f'No se pudo modificar el {MODULE_NAME.lower()} porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        item = self.get_queryset(pk)
        if item:
            try:
                item.delete()
                remove_directory(f'items/{item.name}/')
                return Response({'message': f'{MODULE_NAME} eliminado exitosamente!'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        return Response({'message':'', 'error':'No se pudo eliminar el Artículo porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        try:
            self.get_queryset(state=False).filter(id__in=ids).delete()
            return Response({'message': 'Artículos eliminados exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        ids = request.data.get('ids', [])
        action = request.data.get('action', None)

        try:
            if action == 'disable' and action is not None:
                disabled = self.get_queryset(state=True).filter(id__in=ids).update(is_active=False)
                return Response({'message': f'{MODULE_NAME_PLURAL} inactivados exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = self.get_queryset(state=False).filter(id__in=ids).update(is_active=True)
                return Response({'message': f'{MODULE_NAME_PLURAL} activados exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
    def get_stock(self, laboratory_id, item_ids, text):

        inventory = Inventory.objects.filter(
            item=OuterRef('pk'), 
            laboratory_id=int(laboratory_id)
        ).values('item', 'stock', 'price')[0:10]

        stocks = Item.objects.annotate(
            quantity=Coalesce(Subquery(inventory.values('stock')), 0, output_field=IntegerField()),
            price=Coalesce(Subquery(inventory.values('price')), 0, output_field=DecimalField())
        ).exclude(id__in=item_ids)

        if text is not None:
            stocks = stocks.filter(Q(code__icontains=text)|Q(name__icontains=text)|Q(category__name__icontains=text))
        return stocks

    @action(detail=False, methods=['POST'], url_path='stock-items')
    def stock_items(self, request, pk=None):

        laboratory = request.user.laboratory
        item_ids = request.data.get('itemIds', [])
        text = request.data.get("search")

        print(item_ids)

        if laboratory is None:
            return Response({
                "error": "Debe estar asociado a un laboratorio antes de consultar los artículos"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        stocks = self.get_stock(laboratory.id, item_ids, text)

        data = []

        for item in stocks:
            product = {
                "id": item.id,
                "code": item.code,
                "name": item.name,
                "description": item.description,
                "image": item.image.url,
                "category": item.category.name,
                "measure_unit": item.measure_unit.name,
                "stock": item.quantity,
                "price": item.price,
                "with_tax": item.with_tax,
            }
            data.append(product)

        #serializer = ItemActiveSerializer(items, many=True)
        return Response(data, status=status.HTTP_200_OK)
