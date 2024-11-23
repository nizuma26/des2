from rest_framework.routers import DefaultRouter
from .laboratories.views import LaboratoryViewSet
from .currencies.views import CurrencyViewSet
from .lab_tests.views import LabTestViewSet
from .lab_test_category.views import LabTestCategoryViewSet
from .containers.views import ContainerViewSet
from .samples.views import SampleViewSet
from .lab_test_profile.views import LabTestProfileViewSet
from .tax.views import TaxViewSet
from .cash_register.views import CashRegisterViewSet
from .bank.views import BankViewSet

router = DefaultRouter()

router.register(r'laboratory', LaboratoryViewSet, basename = 'laboratory')
router.register(r'currency', CurrencyViewSet, basename = 'currency')
router.register(r'lab-test', LabTestViewSet, basename = 'lab-test')
router.register(r'lab-test-profile', LabTestProfileViewSet, basename = 'lab-test-profile')
router.register(r'lab-test-category', LabTestCategoryViewSet, basename = 'lab-test-category')
router.register(r'container', ContainerViewSet, basename = 'container')
router.register(r'sample', SampleViewSet, basename = 'sample')
router.register(r'tax', TaxViewSet, basename = 'tax')
router.register(r'bank', BankViewSet, basename = 'bank')
router.register(r'cash-register', CashRegisterViewSet, basename = 'cash-register')

urlpatterns = router.urls