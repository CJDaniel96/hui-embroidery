from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactInfoViewSet, SocialMediaViewSet, ContactFormViewSet, FAQViewSet

app_name = 'contact'

router = DefaultRouter()
router.register(r'info', ContactInfoViewSet, basename='contactinfo')
router.register(r'social', SocialMediaViewSet, basename='socialmedia')
router.register(r'form', ContactFormViewSet, basename='contactform')
router.register(r'faq', FAQViewSet, basename='faq')

urlpatterns = [
    path('', include(router.urls)),
]