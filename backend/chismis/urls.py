from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from webchat.consumer import WebChatConsumer
from server.views import ServerListViewSet, CategoryListViewSet

from django.conf import settings
from django.conf.urls.static import static

routers = DefaultRouter()
routers.register('api/server/select', ServerListViewSet)
routers.register('api/server/category', CategoryListViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/docs/schema', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/schema/ui', SpectacularSwaggerView.as_view())
] + routers.urls

websocket_urlpatterns = [
    path('ws/test', WebChatConsumer.as_asgi()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)