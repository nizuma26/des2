from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from apps.orders.choices import COST_TYPE_CHOICES
from apps.orders.models import Affiliation
from .serializers import AffiliationSerializer

MODULE_NAME = "Afiliación"
MODULE_NAME_PLURAL = "Afiliaciones"

class AffiliationViewSet(ModelViewSet):
    serializer_class = AffiliationSerializer

    def get_queryset(self, pk=None, state=True):
        if pk is None:
            return Affiliation.objects.filter(is_active=state).order_by('-id')
        return get_object_or_404(Affiliation, pk=pk)

    def list(self, request):
        param = request.query_params.get('state', 'true')        
        state = param.lower() == 'true'
        serializer = self.serializer_class(self.get_queryset(state=state), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        data['price_type'] = self.validate_price_type(data['price_type'])

        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': f'{MODULE_NAME} creado exitosamente!', 'data': serializer.data}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        affiliation = self.get_queryset(pk)
        data = request.data
        data['price_type'] = self.validate_price_type(data['price_type'])

        serializer = self.serializer_class(affiliation, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': f'{MODULE_NAME} modificada exitosamente!', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def validate_price_type(self, price):
        for value, price_type in COST_TYPE_CHOICES:
            if price_type == price:  # Comparamos el primer elemento de cada tupla
                return value
            else:
                COST_TYPE_CHOICES[0][0]

    # def destroy(self, request, pk=None):
    #     currency = self.get_queryset(pk)
    #     if currency:
    #         try:
    #             currency.delete()
    #             return Response({'message': 'Moneda eliminada exitosamente!'}, status=status.HTTP_200_OK)
    #         except Exception as e:
    #             return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
    #     return Response({'message':'', 'error':'No se pudo eliminar la moneda porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=False, methods=['delete'])
    # def bulk_destroy(self, request):
    #     ids = request.data.get('ids', [])
    #     model = self.get_serializer().Meta.model
    #     try:
    #         model.objects.filter(id__in=ids).delete()
    #         return Response({'message': 'Monedas eliminadas exitosamente!'}, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # @action(detail=False, methods=['put'])
    # def change_states(self, request):
    #     data = request.data
    #     model = self.get_serializer().Meta.model
    #     try:
    #         if data['action'] == 'disable':
    #             disabled = model.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
    #             return Response({'message': 'Monedas inactivadas exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
    #         else:
    #             enabled = model.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
    #             return Response({'message': 'Monedas activadas exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response({'message': '', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
