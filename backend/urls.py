from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.authentication.urls')),
    path('api/config/', include('apps.configuration.routers')),
    path('api/users/', include('apps.users.routers')),
    path('api/inventory/', include('apps.inventory.routers')),
    path('api/procurement/', include('apps.procurement.routers')),
    path('api/approval/', include('apps.approvals.routers')),
    path('api/orders/', include('apps.orders.routers')),
    path('api/reports/', include('apps.reports.routers')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
