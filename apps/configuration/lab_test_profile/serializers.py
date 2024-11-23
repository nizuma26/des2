from decimal import Decimal
from rest_framework import serializers

from apps.orders.models import LabTest, LabTestPrice, LabTestProfile

from ..lab_test_category.serializers import LabTestCategorySerializer

# ------------------------------------------------

class LabTestProfileSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = LabTest
        fields = '__all__'

    def create(self, validated_data):

        data = self.initial_data

        profile = LabTest.objects.create(**validated_data)       

        self.save_lab_test(profile, data['lab_tests'])

        self.save_prices(profile, data['laboratory'], data['prices'])

        return profile

    def update(self, instance, validated_data):

        data = self.initial_data

        profile = super().update(instance, validated_data)

        self.save_prices(profile, data['laboratory'], data['prices'], update=True)

        self.save_lab_test(profile, data['lab_tests'], update=True)

        return profile
    
    def save_prices(self, profile, laboratory, prices, update=False):

        '''Guardar los precios del examen'''

        filtered_prices = {**prices}

        for key, value in prices.items():
            if isinstance(value, str):  # Verificar si el valor es una cadena
                try:
                    num_value = Decimal(value)
                    if num_value >= 0:  # Filtrar valores negativos
                        filtered_prices[key] = num_value
                except ValueError:
                    continue  # Ignorar si no se puede convertir


        if update and len(filtered_prices) > 0:
            instace = LabTestPrice.objects.filter(
                lab_test_id=profile.id, 
                laboratory_id=laboratory
            )
            if instace:
                instace.update(
                    standard=filtered_prices['standard'], 
                    emergency=filtered_prices['emergency'], 
                    affiliated=filtered_prices['affiliated'],
                    home_service=filtered_prices['home_service'],
                    holiday=filtered_prices['holiday']
                )
            else:
                LabTestPrice.objects.create(
                    lab_test=profile,
                    laboratory_id=laboratory,
                    **filtered_prices
                )
            return instace
        
        else:
            prices = LabTestPrice.objects.create(
                lab_test=profile,
                laboratory_id=laboratory,
                **filtered_prices
            )
            return prices
    
    def save_lab_test(self, profile, lab_tests, update=False):

        '''Crear la relación entre examenes simples y el perfil'''

        lab_test_list = []

        if update:
            profile.lab_tests.all().delete()
        
        for i in lab_tests:
            lab_test_profile = LabTestProfile(
                profile=profile,
                lab_test_id=int(i['uuid']), 
            )
            lab_test_list.append(lab_test_profile)               

        LabTestProfile.objects.bulk_create(lab_test_list)

class LabTestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabTest
        fields = ("id", "name", "abbreviation")

    def to_representation(self, instance):
        laboratorio_id = self.context["laboratory_id"]
        return {
            "uuid": instance.lab_test.id,
            "name": instance.lab_test.name,
            "abbreviation": instance.lab_test.abbreviation,
            "standard": self.get_price(instance.lab_test.id, laboratorio_id)
        }
    
    #Obtener el precio del examen en base al laboratorio del usuario
    def get_price(self, lab_test_id, laboratory_id):
        price = LabTestPrice.objects.only(
            "standard", 
            "emergency", 
            "affiliated", 
            "home_service", 
            "holiday", 
            "exempt"
        ).filter(
            lab_test_id=lab_test_id, 
            laboratory_id=laboratory_id
        ).first()
        
        if price is not None:
            return price.standard
        else:
            return 0

class LabTestProfileRetrieveSerializer(serializers.ModelSerializer):

    category = LabTestCategorySerializer()
    prices = serializers.SerializerMethodField()
    lab_tests = LabTestSerializer(many=True, read_only=True)
     
    class Meta:
        model = LabTest
        fields = (
            "id", 
            "abbreviation", 
            "name",
            "description",
            "indications",
            "category",
            "prices",
            "lab_tests"
        )
    
    def get_prices(self, instance):
        laboratory_id = self.context['laboratory_id']

        prices = LabTestPrice.objects.only(
            'standard',
            'emergency',
            'affiliated',
            'home_service',
            'holiday'
            ).filter(
            lab_test_id=instance.id, 
            laboratory_id=laboratory_id
        ).first()

        if prices is not None:
            return {
                'standard': prices.standard,
                'emergency': prices.emergency,
                'affiliated': prices.affiliated,
                'home_service': prices.home_service,
                'holiday': prices.holiday,
            }
        else:
            return {
                'standard': 0,
                'emergency': 0,
                'affiliated': 0,
                'home_service': 0,
                'holiday': 0,
            }

