import json

from rest_framework import serializers

from apps.orders.models import Order, OrderDetail, Result, ResultValues, LabTest, Patient, Parameter, ReferenceValue
from apps.configuration.models import Laboratory
from apps.inventory.models import Inventory

# ------------------------------------------------

class ResultSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Result
        fields = '__all__'

    def create(self, validated_data):
        result_values = self.initial_data['result_values']
        lab_test = validated_data.get('lab_test')
        order = validated_data.get('order')

        result = Result.objects.create(**validated_data)

        if order.status != 'Parcialmente procesado':
            order.status = "Parcialmente procesado"
            order.save(update_fields=['status'])

        OrderDetail.objects.filter(order=order, lab_test=lab_test).update(status="Procesado")
        
        order.check_order_status()

        self.save_detail(result, result_values)

        self.update_inventory(lab_test, order.laboratory)

        return result

    def save_detail(self, result, detail_data, update=False):

        '''Guardar los resultados del analisis'''

        sub_value_list = []

        if update:
            result.result_values.all().delete()
        
        for detail in detail_data:

            result_object = ResultValues.objects.create(
                result=result,
                measure_unit=detail['measure_unit'],
                parameter=detail['name'],
                normal_value=detail['normal_value'],
                parameter_type=detail['parameter_type'],
                result_value=detail['result_value']
            )
        
            if detail['parameter_type'] == 'composite' and detail['sub_parameters']:
                for s in detail['sub_parameters']:
                    sub_value = ResultValues(
                        result=result,
                        parent=result_object,
                        measure_unit=s['measure_unit'],
                        parameter=s['name'],
                        normal_value=s['normal_value'],
                        parameter_type=s['parameter_type'],
                        result_value=s['result_value']
                    )
                    sub_value_list.append(sub_value)
        ResultValues.objects.bulk_create(sub_value_list)

    def update_inventory(self, lab_test, laboratory):

        items = lab_test.items.filter(reduction_type="captura_resultados")

        for l in items:    

            inv = Inventory.objects.filter(laboratory=laboratory, item=l.item).first()

            inv.reserved -= l.quantity
            inv.stock -= l.quantity
            inv.save(update_fields=['stock', 'reserved'])

class LabTestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LabTest
        fields = ("id", "abbreviation", "name")

class OrderDetailSerializer(serializers.ModelSerializer):

    lab_test = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = OrderDetail
        fields = ("id", "lab_test", "status")
    
    def to_representation(self, instance):
        return {
            "id": instance.id,
            "lab_test": instance.lab_test.name,
            "lab_test_id": instance.lab_test.id,
            "status": instance.status
        }


class PatientInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = (
            "id", 
            "full_name", 
            "cedula", 
            "birthdate", 
            "gender", 
            "address", 
            "phone_number"
        )

class PendingOrderListSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)
    order_detail = OrderDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            'id',
            'code',
            'patient',
            'order_date',
            'order_detail',
            'cost_type',
            'status',
            'patient_number'
        )

class LaboratorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ("name", "address", "document", "logo")

class OrderSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)
    laboratory = LaboratorySerializer(read_only=True)
    hour = serializers.TimeField(format='%I:%M %p')

    class Meta:
        model = Order
        fields = (
            'id',
            'code',
            'patient',
            'laboratory',
            'order_date',
            'hour',
            'cost_type',
            'patient_number'
        )

class ReferenceValueSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ReferenceValue
        fields = ["name", "normal_value"]

    def to_representation(self, instance):
        return {
            "name": instance.name,
            "normal_value": instance.normal_value,
        }

class SubParameterSerializer(serializers.ModelSerializer):

    reference_values = ReferenceValueSerializer(many=True, read_only=True)
    options = serializers.SerializerMethodField()
    result_value = serializers.SerializerMethodField()
    normal_value = serializers.SerializerMethodField()
    reference_value = serializers.SerializerMethodField()
    
    class Meta:
        model = Parameter
        fields = (
            "id", 
            "name", 
            "measure_unit", 
            "parameter_type", 
            "options", 
            "reference_values",
            "result_value",
            "normal_value",
            "reference_value"
        )

    def get_result_value(self, instance):
        return ""
    
    def get_normal_value(self, instance):
        return ""
    
    def get_reference_value(self, instance):
        return ""
    
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
    result_value = serializers.SerializerMethodField()
    normal_value = serializers.SerializerMethodField()
    reference_value = serializers.SerializerMethodField()
    
    class Meta:
        model = Parameter
        fields = (
            "id", 
            "name", 
            "measure_unit", 
            "parameter_type", 
            "options", 
            "reference_values",
            "sub_parameters",
            "result_value",
            "normal_value",
            "reference_value"
        )

    def get_result_value(self, instance):
        return ""
    
    def get_normal_value(self, instance):
        return ""
    
    def get_reference_value(self, instance):
        return ""

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

    parameters = serializers.SerializerMethodField()
     
    class Meta:
        model = LabTest
        fields = (
            "parameters",
        )
    
    def get_parameters(self, instance):
        return ParameterSerializer(instance.parameters.filter(parent=None), many=True).data

class SubValueSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ResultValues
        fields = (
            "id", 
            "parameter", 
            "measure_unit", 
            "parameter_type", 
            "result_value",
            "normal_value",
            "reference_value"
        )


class ResultValuesSerializer(serializers.ModelSerializer):

    sub_values = SubValueSerializer(many=True, read_only=True)
    
    class Meta:
        model = ResultValues
        fields = (
            "id", 
            "parameter", 
            "measure_unit",
            "parameter_type",
            "sub_values",
            "result_value",
            "normal_value",
            "reference_value"
        )

class ResultRetrieveSerializer(serializers.ModelSerializer):
    order = OrderSerializer()
    result_values = serializers.SerializerMethodField()
    lab_test = serializers.SlugRelatedField(slug_field="name", read_only=True)

    class Meta:
        model = Result
        fields = (
            'id',
            'order',
            'lab_test',
            'result_date',
            'result_values',
            'hour'
        )
    
    def get_result_values(self, instance):
        return ResultValuesSerializer(instance.result_values.filter(parent=None), many=True).data