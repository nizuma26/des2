from rest_framework import serializers
from rest_framework.generics import get_object_or_404

from .models import Approvals
from apps.procurement.models import PurchaseRequisition, PurchaseRequisitionDetail

class ApprovalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Approvals
        fields = "__all__"

    def create(self, validated_data):

        get_list_approved_quantities = self.initial_data['detail']        

        approval = Approvals.objects.create(**validated_data)

        requisition = get_object_or_404(PurchaseRequisition, code=validated_data['operation_code'])

        requisition.status = approval.action

        requisition.save(update_fields=['status'])

        if approval.action == 'Aprobado':

            self.update_requisition_detail(get_list_approved_quantities)

        return approval

    def update_requisition_detail(self, list_approved_quantities):

        '''Editar las cantidades aprobadas del detalle de la requisición'''

        detail_objects = []
        
        for item in list_approved_quantities:
            req = PurchaseRequisitionDetail(id=item['detail_id'])
            req.approved_amount = int(item['approved_amount'])
            detail_objects.append(req)               

        PurchaseRequisitionDetail.objects.bulk_update(detail_objects, ['approved_amount'])    