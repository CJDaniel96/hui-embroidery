from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, BlogSettingsViewSet

app_name = 'blog'

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'settings', BlogSettingsViewSet, basename='blogsettings')

urlpatterns = [
    path('', include(router.urls)),
]