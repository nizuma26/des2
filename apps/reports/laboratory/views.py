from django.db.models import Count, functions
from decimal import Decimal

from rest_framework import status
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from apps.orders.models import OrderDetail

from .serializers import MostRequestedLabTestSerializer

# -------------------------------------------------------------------------------

class MostRequestedLabTestsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    def list(self, request, *args, **kwargs):
        try:
            start_date = request.query_params.get("start_date", None)
            end_date = request.query_params.get("end_date", None)
            status_exclude = ["Anulado", "Borrador"]
            laboratory = request.user.laboratory
            queryset = (
                OrderDetail.objects
                .select_related("lab_test")
                .filter(order__laboratory=laboratory)
                .exclude(status=status_exclude)
                .values('lab_test_id', 'lab_test__name', 'lab_test__category__name')
                .annotate(total_requests=Count('id', distinct=True))
                .order_by('-total_requests')
            )
            if len(start_date) and len(end_date):
                queryset = queryset.filter(order__order_date__range=[start_date, end_date])

            serialized_data = MostRequestedLabTestSerializer(queryset, many=True).data
            print(serialized_data)
            return Response({"lab_tests": serialized_data}, status=status.HTTP_200_OK)
      
        except Exception as e:
            print(f"HA OCURRIDO UN ERROR: {e}")
            return Response({"error": "Ha ocurrido un error al consultar los datos"}, status=500)