import json
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser
from django.db import transaction
from django.db.models import Q

from .serializers import BeginningInventorySerializer, BeginningInventoryListSerializer, BeginningInventoryRetrieveSerializer, SearchItemsSerializer
from apps.inventory.models import BeginningInventory, Item

class BeginningInventoryViewSet(ModelViewSet):
    serializer_class = BeginningInventorySerializer
    parser_classes = (JSONParser, MultiPartParser, )
    model = BeginningInventory

    def get_queryset(self, pk=None):
        if pk is None:
            return self.model.objects.select_related('laboratory', 'user')
        return self.model.objects.select_related('laboratory', 'user').filter(id=pk).first()

    def list(self, request):
        serializer = BeginningInventoryListSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        data['user'] = request.user.id
        data['laboratory'] = request.user.laboratory.id
        data['detail'] = json.loads(data['detail'])

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Inventario inicial creado exitosamente!'}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        item = self.model.objects.prefetch_related('beginning_inventory_set').get(id=pk)
        if item:
            serializer = BeginningInventoryRetrieveSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'Ningun registro coincide con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):

        beginning_inventory = self.get_queryset(pk)
        
        if beginning_inventory:
            data = request.data
            data['user'] = request.user.id
            data['detail'] = json.loads(data['detail'])

            serializer = self.serializer_class(beginning_inventory, data=data, partial=True)

            if serializer.is_valid():
                with transaction.atomic():
                    serializer.save()
                    return Response({'message': 'Inventario modificado exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar el inventario porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def search_items(self, request):        
        query = request.data['text']

        ids = request.data.get('ids', None)

        if (ids is None): 
            return Response(
                {'error': 'No se ha proporcionado la propiedad ids, en el body de la request'}, 
                status=status.HTTP_400_BAD_REQUEST
                )

        if query is None:
            query = ''
       
        items = Item.objects.filter(
            Q(code__icontains=query)
            |Q(name__icontains=query)
            |Q(category__name__icontains=query)
            |Q(model__name__icontains=query), is_active=True
            ).exclude(id__in=ids).select_related(
            'category', 'measure_unit', 'model'
        )
        
        serializer = SearchItemsSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def toggle_inventory_status(self, request):
        """ Habilitar o anular un inventario inicial """
        pk = request.data['id']
        inventory = self.get_queryset(pk)
        
        if inventory:

            if inventory.status == 'Finalizado': 
                return Response({
                        'message':'No se puede cambiar el estado de este inventario inicial porque ya se encuentra finalizado'}, 
                        status=status.HTTP_202_ACCEPTED
                        ) 

            state = 'Anulado' if inventory.status == 'En proceso' else 'En proceso'
            
            try:
                inventory.status = state
                inventory.save()           
                return Response({'message': 'Estado modificado exitosamente!'}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        return Response({
                  'message':'', 
                  'error':'No se pudo modificar el estado del inventario inicial porque no se encontraron coincidencias'}, 
                  status=status.HTTP_400_BAD_REQUEST
                )