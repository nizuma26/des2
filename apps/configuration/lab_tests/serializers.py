import json
from decimal import Decimal
from rest_framework import serializers

from apps.orders.models import LabTest, Parameter, ReferenceValue, LabTestPrice, LabTestItems

from ..lab_test_category.serializers import LabTestCategorySerializer
from ..containers.serializers import ContainerSerializer
from ..samples.serializers import SampleSerializer

# ------------------------------------------------

class LabTestSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = LabTest
        fields = '__all__'

    def create(self, validated_data):

        data = self.initial_data

        lab_test = LabTest.objects.create(**validated_data)       

        self.save_parameters(lab_test, data['parameters'])

        self.save_prices(lab_test, data['laboratory'], data['prices'])

        if len(data['items']) > 0:
            self.save_items(lab_test, data['items'])

        return lab_test

    def update(self, instance, validated_data):

        data = self.initial_data

        lab_test = super().update(instance, validated_data)

        self.save_parameters(lab_test, data['parameters'], update=True)

        self.save_prices(lab_test, data['laboratory'], data['prices'], update=True)

        if len(data['items']) > 0:
            self.save_items(lab_test, data['items'], update=True)

        return lab_test
    
    def save_parameters(self, lab_test, parameters, update=False):

        '''Guardar los parametros del examen'''

        reference_value_list = []
        sub_parameters_list = []

        if update:
            lab_test.parameters.all().delete()
        
        for param in parameters:
            options = ""
            if param['options'] and param['parameter_type'] == "select":
                options = json.dumps(param['options'])
                
            parameter = Parameter.objects.create(
                lab_test=lab_test,
                name=param['name'],
                parameter_type=param['parameter_type'],
                measure_unit=param['measure_unit'],
                options=options,
            )

            if param['parameter_type'] == 'composite' and param['sub_parameters']:
                for sub_param in param['sub_parameters']:
                    sub_param_options = ""
                    if sub_param['parameter_type'] == "select":
                        sub_param_options = json.dumps(sub_param['options'])
                        
                    sub_parameter = Parameter(
                        lab_test=lab_test,
                        parent=parameter,
                        name=sub_param['name'],
                        parameter_type=sub_param['parameter_type'],
                        measure_unit=sub_param['measure_unit'],
                        options=sub_param_options,
                    )
                    sub_parameters_list.append(sub_parameter)

            if param['reference_values'] and param['parameter_type'] != 'composite':
                for reference in param['reference_values']:
                    reference_value = ReferenceValue(
                        parameter=parameter,
                        name=reference['name'],
                        normal_value=reference['normal_value'],
                    )
                    reference_value_list.append(reference_value)

        if reference_value_list:
            ReferenceValue.objects.bulk_create(reference_value_list)

        if sub_parameters_list:
            Parameter.objects.bulk_create(sub_parameters_list)

    def save_sub_parameters(self, lab_test, parameter):
        sub_parameters = Parameter.objects.filter(lab_test=lab_test, parent=parameter)

    def save_prices(self, lab_test, laboratory, prices, update=False):

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
                lab_test_id=lab_test.id, 
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
                    lab_test=lab_test,
                    laboratory_id=laboratory,
                    **filtered_prices
                )
            return instace
        
        prices = LabTestPrice.objects.create(
            lab_test=lab_test,
            laboratory_id=laboratory,
            **filtered_prices
        )
        return prices
    
    def save_items(self, lab_test, items, update=False):

        '''Guardar los artículos que necesita el examen'''

        item_list = []

        if update:
            lab_test.items.all().delete()
        
        for item in items:
            create_item = LabTestItems(
                lab_test=lab_test,
                item_id=int(item['item_id']), 
                quantity=int(item['quantity']),
                reduction_type=item['reduction_type'],
            )
            item_list.append(create_item)               

        LabTestItems.objects.bulk_create(item_list)        

class LabTestListSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(slug_field="name", read_only=True)
     
    class Meta:
        model = LabTest
        fields = ("id", "abbreviation", "name", "category")

class LabTestPricesSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabTestPrice
        fields = ["price1", "price2", "price3", "price4"]

class LabTestItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabTestItems
        fields = ["item", "quantity"]
    
    def to_representation(self, instance):
        return {
            'item_id': instance.item_id,
            'item_code': instance.item.code,
            'item_name': instance.item.name,
            'quantity': instance.quantity,
            'reduction_type': instance.reduction_type,

        }

class ReferenceValueSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ReferenceValue
        fields = ["name", "normal_value"]


class SubParameterSerializer(serializers.ModelSerializer):

    reference_values = ReferenceValueSerializer(many=True, read_only=True)
    options = serializers.SerializerMethodField()
    
    class Meta:
        model = Parameter
        fields = (
            "name", 
            "measure_unit", 
            "parameter_type", 
            "options", 
            "reference_values",
        )
    
    def get_options(self, instance):
        if instance.options and instance.options[0] == "[":
            try:
                options = json.loads(instance.options)
                return options
            except json.JSONDecodeError:
                return []
        else:
            return []

class ParameterSerializer(serializers.ModelSerializer):

    reference_values = ReferenceValueSerializer(many=True, read_only=True)
    sub_parameters = SubParameterSerializer(many=True, read_only=True)
    options = serializers.SerializerMethodField()
    
    class Meta:
        model = Parameter
        fields = (
            "name", 
            "measure_unit", 
            "parameter_type", 
            "options", 
            "reference_values",
            "sub_parameters"
        )

    def get_options(self, instance):
        if instance.options and instance.options[0] == "[":
            try:
                options = json.loads(instance.options)
                return options
            except json.JSONDecodeError:
                return []
        else:
            return []

class LabTestRetrieveSerializer(serializers.ModelSerializer):

    category = LabTestCategorySerializer()
    container = ContainerSerializer()
    sample = SampleSerializer()
    prices = serializers.SerializerMethodField()
    parameters = serializers.SerializerMethodField()
    items = LabTestItemSerializer(many=True, read_only=True)
     
    class Meta:
        model = LabTest
        fields = (
            "id",
            "abbreviation",
            "name",
            "description",
            "indications",
            "category",
            "sample",
            "container",
            "prices",
            "parameters",
            "items",
        )
    
    def get_parameters(self, instance):
        return ParameterSerializer(instance.parameters.filter(parent=None), many=True).data

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

    