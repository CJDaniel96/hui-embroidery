from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.shortcuts import get_object_or_404
from django.utils import translation
from .models import Category, SiteContent, Achievement
from .serializers import CategorySerializer, SiteContentSerializer, AchievementSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """分類視圖集 - 只讀"""
    
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category_type', 'is_active']
    search_fields = ['translations__name', 'slug']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', 'created_at']
    
    def get_queryset(self):
        """根據語言過濾查詢集"""
        queryset = super().get_queryset()
        
        # 根據分類類型過濾
        category_type = self.request.query_params.get('type', None)
        if category_type:
            queryset = queryset.filter(category_type=category_type)
        
        return queryset.prefetch_related('translations')
    
    @action(detail=False, methods=['get'])
    def artwork_categories(self, request):
        """獲取作品分類"""
        categories = self.get_queryset().filter(category_type='artwork')
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def blog_categories(self, request):
        """獲取部落格分類"""
        categories = self.get_queryset().filter(category_type='blog')
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)


class SiteContentViewSet(viewsets.ReadOnlyModelViewSet):
    """網站內容視圖集 - 只讀"""
    
    queryset = SiteContent.objects.filter(is_active=True)
    serializer_class = SiteContentSerializer
    lookup_field = 'section'
    
    def get_queryset(self):
        """預取翻譯關聯"""
        return super().get_queryset().prefetch_related('translations')
    
    def dispatch(self, request, *args, **kwargs):
        """處理請求前設定語言"""
        # 從 Accept-Language 標頭設定語言
        accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'zh-tw')
        language_code = 'en' if accept_language.startswith('en') else 'zh-tw'
        translation.activate(language_code)
        return super().dispatch(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def hero(self, request):
        """獲取 Hero Section 內容"""
        try:
            content = self.get_queryset().get(section='hero')
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        except SiteContent.DoesNotExist:
            return Response({'message': 'Hero content not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def master(self, request):
        """獲取 Master Section 內容"""
        try:
            content = self.get_queryset().get(section='master')
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        except SiteContent.DoesNotExist:
            return Response({'message': 'Master content not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def footer(self, request):
        """獲取 Footer 內容"""
        try:
            content = self.get_queryset().get(section='footer')
            serializer = self.get_serializer(content)
            return Response(serializer.data)
        except SiteContent.DoesNotExist:
            return Response({'message': 'Footer content not found'}, status=status.HTTP_404_NOT_FOUND)


class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    """成就獎項視圖集 - 只讀"""
    
    queryset = Achievement.objects.filter(is_active=True)
    serializer_class = AchievementSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['year', 'is_active']
    ordering_fields = ['year', 'order', 'created_at']
    ordering = ['year', 'order']
    
    def get_queryset(self):
        """預取翻譯關聯"""
        return super().get_queryset().prefetch_related('translations')
    
    def dispatch(self, request, *args, **kwargs):
        """處理請求前設定語言"""
        # 從 Accept-Language 標頭設定語言
        accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'zh-tw')
        language_code = 'en' if accept_language.startswith('en') else 'zh-tw'
        translation.activate(language_code)
        return super().dispatch(request, *args, **kwargs)