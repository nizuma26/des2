from django.db.models import Count, functions
from django.utils import timezone
from django.db.models import FloatField, Sum

from rest_framework.views import APIView
from rest_framework import status
from rest_framework import mixins, viewsets
from rest_framework.response import Response

from apps.orders.models import OrderDetail, Order
from datetime import datetime, timedelta

# --------------------------------------------------------------------

class WidgetSummaryViewSet(APIView):

    def get(self, request, format=None):
        laboratory = request.user.laboratory
        today_earnings = self.today_earnings(laboratory)
        patients_treated_today = self.patients_treated_today(laboratory)
        accounts_receivable = self.accounts_receivable(laboratory)
        
        return Response({
            'today_earnings': today_earnings, 
            'patients_treated_today': patients_treated_today,
            'accounts_receivable': accounts_receivable
        })
    
    def patients_treated_today(self, laboratory):
        return Order.objects.filter(order_date=timezone.now(), laboratory=laboratory).count()
    
    def today_earnings(self, laboratory):
        earnings = (
            Order.objects.filter(order_date=timezone.now(), laboratory=laboratory).aggregate(
                result=functions.Coalesce(Sum('amount_paid'), 0.00, output_field=FloatField())
            )).get('result')
        return earnings
    
    def accounts_receivable(self, laboratory):
        return Order.objects.filter(status="Pendiente", laboratory=laboratory).count()

class TopLabTestsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):

    def list(self, request, *args, **kwargs):
        try:
            # Obtener el primer y último día del mes actual
            today = datetime.now()
            first_day_of_month = today.replace(day=1)
            last_day_of_month = today.replace(day=28) + timedelta(days=4)  # Sumar 4 días para asegurarse de llegar al próximo mes
            last_day_of_month = last_day_of_month - timedelta(days=last_day_of_month.day)
            
            # Consulta para obtener los 10 exámenes más solicitados en el mes actual
            top_tests = OrderDetail.objects.filter(
                order__order_date__range=[first_day_of_month, last_day_of_month]
            ).values('lab_test__name').annotate(total_requests=Count('id')).order_by('-total_requests')[:5]

            return Response({"top_tests": top_tests}, status=status.HTTP_200_OK)
      
        except Exception as e:
            return Response({"error": "Ha ocurrido un error al consultar los datos"}, status=500)
    
class PatientsTreatedThisYearViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):

    def list(self, request, *args, **kwargs):
        try:
            current_year = datetime.now().year

            monthly_patients = [0] * 12

            monthly_data = (
                Order.objects.filter(order_date__year=current_year)
                .values('order_date__month')  # Agrupar por mes
                .annotate(total_patients=Count('patient'))  # Contar pacientes únicos
            )

            for data in monthly_data:
                month_index = data['order_date__month'] - 1
                monthly_patients[month_index] = data['total_patients']

            return Response({"monthly_patients": monthly_patients}, status=status.HTTP_200_OK)
      
        except Exception as e:
            return Response({"error": "Ha ocurrido un error al consultar los datos"}, status=500)