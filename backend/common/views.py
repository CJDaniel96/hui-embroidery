from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Category
from .serializers import CategorySerializer


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