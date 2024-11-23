from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from django.db import transaction

from apps.configuration.models import Currency
from .serializers import CurrencySerializer, ExchangeRateSerializer

class CurrencyViewSet(ModelViewSet):
    serializer_class = CurrencySerializer

    def get_queryset(self, pk=None, state=True):
        if pk is None:
            return Currency.objects.filter(is_active=state).order_by('-id')
        return Currency.objects.filter(id=pk).first()

    def list(self, request):
        param = request.query_params.get('state', 'true')        
        state = param.lower() == 'true'
        serializer = self.serializer_class(self.get_queryset(state=state), many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        if data['type_currency'] == 'null':
            data['type_currency'] = None
        print(data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                serializer.save()
                return Response({'message': 'Moneda creado exitosamente!'}, status=status.HTTP_201_CREATED)   
        return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        currency = self.get_queryset(pk)
        if currency:            
            serializer = self.serializer_class(currency)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message':'', 'error':'Ninguna Moneda coincide con estos datos!'}, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None, *args, **kwargs):
        currency = self.get_queryset(pk)
        data = request.data
        if currency:
            if data['type_currency'] == 'null':
                data['type_currency'] = None
            serializer = self.serializer_class(currency, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Moneda modificada exitosamente!'}, status=status.HTTP_200_OK)
            return Response({'message':'', 'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'', 'error':'No se pudo modificar la moneda porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        currency = self.get_queryset(pk)
        if currency:
            try:
                currency.delete()
                return Response({'message': 'Moneda eliminada exitosamente!'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   
        return Response({'message':'', 'error':'No se pudo eliminar la moneda porque no se encontraron coincidencias'}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['delete'])
    def bulk_destroy(self, request):
        ids = request.data.get('ids', [])
        model = self.get_serializer().Meta.model
        try:
            model.objects.filter(id__in=ids).delete()
            return Response({'message': 'Monedas eliminadas exitosamente!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['put'])
    def change_states(self, request):
        data = request.data
        model = self.get_serializer().Meta.model
        try:
            if data['action'] == 'disable':
                disabled = model.objects.filter(id__in=data['ids'], is_active=True).update(is_active=False)
                return Response({'message': 'Monedas inactivadas exitosamente!', 'total': disabled}, status=status.HTTP_200_OK)
            else:
                enabled = model.objects.filter(id__in=data['ids'], is_active=False).update(is_active=True)
                return Response({'message': 'Monedas activadas exitosamente!', 'total': enabled}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': '', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=False, methods=['GET'], url_path='get-exchange-rate')
    def get_exchange_rate(self, request):

        currencies = []

        main = Currency.objects.filter(type_currency="Principal").first()
        default = Currency.objects.filter(type_currency="Secundaria").first()

        if main:
            currencies.append(main)

        if default:
            currencies.append(default)

        if not currencies:
            new_currencies = {"id": None, "code": None, "name": None, "type_currency": None, "exchange_rate": None}
            currencies.extend([new_currencies, new_currencies])
            return Response(currencies, status=status.HTTP_200_OK)

        serializer = ExchangeRateSerializer(currencies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)