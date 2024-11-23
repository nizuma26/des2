from rest_framework.routers import DefaultRouter

from .views import ApprovalsViewSet

router = DefaultRouter()

router.register(r'approve-requisition', ApprovalsViewSet, basename='approve-requisition')

urlpatterns = router.urls