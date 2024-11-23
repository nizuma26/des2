from django.db.models.functions import Coalesce
from django.db.models import Sum, DecimalField
from decimal import Decimal

from rest_framework import status
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from .serializers import StocksSerializer
from apps.configuration.laboratories.serializers import LaboratorySerializerForReports

from apps.inventory.models import Inventory

# MODULE_NAME = "Factura"
# MODULE_NAME_PLURAL = "Facturas"

class StockReportViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = StocksSerializer
    
    def calculate_total_stock(self, queryset):
        total = Decimal(queryset.aggregate(
            result=Coalesce(Sum("stock"), 0.00, 
            output_field=DecimalField()
        )).get("result"))

        return total
    
    def calculate_total_price(self, queryset):
        total = Decimal(queryset.aggregate(
            result=Coalesce(Sum("price"), 0.00, 
            output_field=DecimalField()
        )).get("result"))

        return total

    def list(self, request, *args, **kwargs):
        try:
            laboratory = request.user.laboratory

            queryset = Inventory.objects.select_related(
                "item",
                "laboratory"
            ).filter(laboratory=laboratory)

            serializer = self.serializer_class(queryset, many=True)
            total_stock = self.calculate_total_stock(queryset)
            total_price = self.calculate_total_price(queryset)
            lab_data = LaboratorySerializerForReports(laboratory)
            return Response(
                {"stocks": serializer.data, 
                 "total_stock": total_stock, 
                 "total_price":total_price, 
                 "laboratory": lab_data.data 
                }, 
                status=status.HTTP_200_OK
            )
      
        except Exception as e:
            print(f"HA OCURRIDO UN ERROR: {e}")
            return Response({"error": "Ha ocurrido un error al consultar los datos"}, status=500)