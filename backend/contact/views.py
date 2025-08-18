from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import ContactInfo, SocialMedia, ContactForm, FAQ
from .serializers import (
    ContactInfoSerializer, SocialMediaSerializer, 
    ContactFormSerializer, FAQSerializer
)


class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """聯絡資訊視圖集 - 只讀"""
    
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """獲取當前聯絡資訊"""
        contact_info = ContactInfo.objects.first()
        if contact_info:
            serializer = self.get_serializer(contact_info)
            return Response(serializer.data)
        return Response({
            'translations': {
                'company_name': '慧繡雅集',
                'description': ''
            },
            'phone': '',
            'email': '',
            'address': '',
            'business_hours': '',
            'latitude': None,
            'longitude': None
        })


class SocialMediaViewSet(viewsets.ReadOnlyModelViewSet):
    """社群媒體視圖集 - 只讀"""
    
    queryset = SocialMedia.objects.filter(is_active=True)
    serializer_class = SocialMediaSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['platform', 'is_active']
    ordering_fields = ['order', 'platform']
    ordering = ['order', 'platform']


class ContactFormViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """聯絡表單視圖集 - 僅允許建立"""
    
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer
    permission_classes = [AllowAny]  # 允許匿名用戶提交
    
    def create(self, request, *args, **kwargs):
        """建立聯絡表單提交"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 儲存表單
        contact_form = serializer.save()
        
        return Response({
            'message': '您的訊息已成功送出，我們會盡快回覆您。',
            'id': contact_form.id
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def success(self, request):
        """表單提交成功頁面資訊"""
        return Response({
            'title': '訊息發送成功',
            'message': '感謝您的來信，我們已收到您的訊息，會在 24 小時內回覆您。',
            'redirect_delay': 3  # 3秒後重導向
        })


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """常見問題視圖集 - 只讀"""
    
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['order', 'created_at']
    ordering = ['order', 'created_at']
    
    def get_queryset(self):
        return super().get_queryset().prefetch_related('translations')
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        """獲取熱門問題（前5個）"""
        popular_faqs = self.get_queryset()[:5]
        serializer = self.get_serializer(popular_faqs, many=True)
        return Response(serializer.data)