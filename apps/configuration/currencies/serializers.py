from rest_framework import serializers

from apps.configuration.models import Currency

class CurrencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Currency
        fields = '__all__'

class ExchangeRateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Currency
        fields = ('id', 'code', 'exchange_rate', 'type_currency')