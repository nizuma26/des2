from django.db.models.functions import Coalesce
from django.db.models import Sum, DecimalField
from decimal import Decimal

from rest_framework import status
from rest_framework.decorators import action
from rest_framework import mixins, viewsets
from rest_framework.response import Response
from .serializers import OrderByCompanySerializer
from apps.configuration.laboratories.serializers import LaboratorySerializerForReports

from apps.orders.models import Affiliation, Order
from .serializers import CompanySerializer

# MODULE_NAME = "Factura"
# MODULE_NAME_PLURAL = "Facturas"

class OrderByCompanyReportViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = OrderByCompanySerializer

    def calculate_amount_paid(self, queryset):
        amount_paid = Decimal(queryset.aggregate(
            result=Coalesce(Sum("amount_paid"), 0.00, 
            output_field=DecimalField()
        )).get("result"))

        return amount_paid
    
    def calculate_total(self, queryset):
        total = Decimal(queryset.aggregate(
            result=Coalesce(Sum("main_total"), 0.00, 
            output_field=DecimalField()
        )).get("result"))

        return total

    def list(self, request, *args, **kwargs):
        try:
            start_date = request.query_params.get("start_date", None)
            end_date = request.query_params.get("end_date", None)
            company = request.query_params.get("company", "")

            laboratory = request.user.laboratory

            queryset = Order.objects.select_related(
                "patient",
                "order_detail"
            ).only(
                "code",
                "id",
                "patient",
                "order_detail",
                "order_date",
                "amount_paid",
                "main_total",
            ).filter(laboratory=laboratory, affiliation__name__icontains=company)

            lab_data = LaboratorySerializerForReports(laboratory)

            if len(start_date) and len(end_date):
                queryset = queryset.filter(order_date__range=[start_date, end_date])
            serializer = self.serializer_class(queryset, many=True)
            amount_paid = self.calculate_amount_paid(queryset)
            total = self.calculate_total(queryset)
            return Response({"orders": serializer.data, "amount_paid": amount_paid, "total": total, "laboratory": lab_data.data}, status=status.HTTP_200_OK)
      
        except Exception as e:
            print(f"HA OCURRIDO UN ERROR: {e}")
            return Response({"error": "Ha ocurrido un error al consultar los datos"}, status=500)
        
    @action(detail=False, methods=['GET'], url_path="search-company")
    def search_company(self, request):
        try:
            companies = Affiliation.objects.filter(is_active=True).values("id", "name")
            serializer = CompanySerializer(companies, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'message':'', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        