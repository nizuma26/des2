from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .income_summary.views import IncomeSummaryReportViewSet
from .stocks.views import StockReportViewSet
from .patients.views import PatientTreatedReportViewSet
from .dashboard.views import TopLabTestsViewSet, PatientsTreatedThisYearViewSet, WidgetSummaryViewSet
from .laboratory.views import MostRequestedLabTestsViewSet

router = DefaultRouter()

router.register(r'income-summary', IncomeSummaryReportViewSet, basename='income-summary')
router.register(r'stocks', StockReportViewSet, basename='stocks')
router.register(r'patient-treated', PatientTreatedReportViewSet, basename='patient-treated')
# dashboard
router.register(r'top-lab-tests', TopLabTestsViewSet, basename='top-lab-tests')
router.register(r'patients-treated-this-year', PatientsTreatedThisYearViewSet, basename='patients-treated-this-year')
# laboratory
router.register(r'most-requested-lab-test', MostRequestedLabTestsViewSet, basename='most-requested-lab-test')


urlpatterns = [
    path('widget-summary/', WidgetSummaryViewSet.as_view(), name='widget-summary'),
    path('', include(router.urls)),
]