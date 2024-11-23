from rest_framework.routers import DefaultRouter
from .user.views import UserViewSet
from .role.views import RoleViewSet

router = DefaultRouter()

router.register(r'user', UserViewSet, basename='user')
router.register(r'role', RoleViewSet, basename='role')

urlpatterns = router.urls