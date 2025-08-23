from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SiteContentViewSet, AchievementViewSet

app_name = 'common'

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'site-content', SiteContentViewSet, basename='site-content')
router.register(r'achievements', AchievementViewSet, basename='achievement')

urlpatterns = [
    path('', include(router.urls)),
]