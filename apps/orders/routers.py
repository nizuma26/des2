from rest_framework.routers import DefaultRouter
from .affiliation.views import AffiliationViewSet
from .patients.views import PatientViewSet
from .orders.views import OrderViewSet
from .payments.views import OrderPaymentViewSet
from .invoice.views import OrderInvoiceViewSet
from .results.views import ResultViewSet

router = DefaultRouter()

router.register(r'affiliation', AffiliationViewSet, basename = 'affiliation')
router.register(r'patient', PatientViewSet, basename = 'patient')
router.register(r'order', OrderViewSet, basename = 'order')
router.register(r'payment', OrderPaymentViewSet, basename = 'payment')
router.register(r'invoice', OrderInvoiceViewSet, basename = 'invoice')
router.register(r'result', ResultViewSet, basename='result')

urlpatterns = router.urls
