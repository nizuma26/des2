from django.db.models.functions import Coalesce
from django.db.models import Sum, DecimalField
from decimal import Decimal

from rest_framework import status
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from .serializers import PatientTreatedSerializer

from apps.orders.models import Order

# MODULE_NAME = "Factura"
# MODULE_NAME_PLURAL = "Facturas"

class PatientTreatedReportViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = PatientTreatedSerializer

    def list(self, request, *args, **kwargs):
        try:
            start_date = request.query_params.get("start_date", None)
            end_date = request.query_params.get("end_date", None)
            queryset = Order.objects.select_related(
                "patient"
            ).only(
                "id",
                "patient",
                "order_date",
                "hour",
            ).filter()
            if len(start_date) and len(end_date):
                queryset = queryset.filter(order_date__range=[start_date, end_date])
            serializer = self.serializer_class(queryset, many=True)
            return Response({"patients": serializer.data}, status=status.HTTP_200_OK)
      
        except Exception as e:
            print(f"HA OCURRIDO UN ERROR: {e}")
            return Response({"error": "Ha ocurrido un error al consultar los datos"}, status=500)