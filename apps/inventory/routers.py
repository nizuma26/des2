from rest_framework.routers import DefaultRouter
from .item_category.views import CategoryViewSet
from .measure_unit.views import MeasureUnitViewSet
from .brand.views import BrandViewSet
from .item_model.views import ModelViewSet
from .item.views import ItemViewSet
from .beginning_inventory.views import BeginningInventoryViewSet

router = DefaultRouter()

router.register(r'category', CategoryViewSet, basename='category')
router.register(r'measure_unit', MeasureUnitViewSet, basename='measure_unit')
router.register(r'brand', BrandViewSet, basename='brand')
router.register(r'model', ModelViewSet, basename='model')
router.register(r'item', ItemViewSet, basename='item')
router.register(r'beginning-inventory', BeginningInventoryViewSet, basename='beginning-inventory')

urlpatterns = router.urls