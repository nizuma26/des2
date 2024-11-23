from rest_framework import serializers

from apps.procurement.models import PurchaseRequisition, PurchaseRequisitionDetail
from apps.users.models import User
from apps.configuration.models import Laboratory

# ------------------------------------------------

class RequisitionSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = PurchaseRequisition
        fields = '__all__'

    def create(self, validated_data):

        get_detail = self.initial_data['detail']        

        requisition = PurchaseRequisition.objects.create(**validated_data)       

        self.save_detail(requisition, get_detail)

        return requisition

    def update(self, instance, validated_data):

        get_detail = self.initial_data['detail']        

        requisition = super().update(instance, validated_data)

        self.save_detail(requisition, get_detail, True)

        return requisition
    
    def save_detail(self, requisition, detail_data, update=False):

        '''Guardar el detalle de la requisición'''

        detail_objects = []

        if update:
            requisition.requisition_detail_set.all().delete()
        
        for detail in detail_data:
            create_detail = PurchaseRequisitionDetail(
                requisition=requisition,
                item_id=detail['item_id'], 
                quantity=int(detail['quantity']),
            )
            detail_objects.append(create_detail)               

        PurchaseRequisitionDetail.objects.bulk_create(detail_objects)        

class RequisitionListSerializer(serializers.ModelSerializer):

    laboratory = serializers.SlugRelatedField(slug_field='name', read_only=True)
    requester = serializers.SlugRelatedField(slug_field='username', read_only=True)
    request_hour = serializers.TimeField(format='%I:%M %p')
    requester = serializers.SerializerMethodField()
    
    class Meta:
        model = PurchaseRequisition
        fields = (
            'id',
            'code',
            'laboratory',
            'requester',
            'request_date',
            'request_hour',
            'required_date',
            'status',
        )
    def get_requester(self, instance):
        return f"{instance.requester.cedula}/{instance.requester.username}"
    
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('names', 'last_names', 'image', 'cedula')

class LaboratorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Laboratory
        fields = ('name', 'code', 'logo')

class RequisitionDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = PurchaseRequisitionDetail
        fields = "__all__"

    def to_representation(self, instance):
        return {
            'detail_id': instance.id,
            'item_id': instance.item.id,
            'item_name': f"{instance.item.name}/{instance.item.description}",
            'item_category': instance.item.category.name,
            'item_code': instance.item.code,
            'item_measure_unit_': instance.item.measure_unit.name,
            'quantity': instance.quantity,
            'approved_amount': instance.quantity,
            'price': 0,
        }

class RequisitionRetrieveSerializer(serializers.ModelSerializer):

    requisition_detail_set = RequisitionDetailSerializer(many=True, read_only=True)
    requester = UserSerializer()
    laboratory = LaboratorySerializer()
    request_hour = serializers.TimeField(format='%I:%M %p')
    created_at = serializers.DateTimeField(format="%Y/%m/%d %I:%M %p")

    class Meta:
        model=PurchaseRequisition
        fields = [
            'id',
            'code',
            'requester',
            'laboratory',
            'comment',
            'status',
            'request_date',
            'created_at',
            'request_hour',
            'required_date',
            'requisition_detail_set'
        ]
