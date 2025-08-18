from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q
from .models import Artwork
from .serializers import ArtworkSerializer, ArtworkListSerializer, ArtworkDetailSerializer


class ArtworkViewSet(viewsets.ReadOnlyModelViewSet):
    """作品視圖集 - 只讀"""
    
    queryset = Artwork.objects.filter(is_published=True)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_featured', 'year_created', 'categories']
    search_fields = ['translations__title', 'translations__description', 'medium', 'translations__technique']
    ordering_fields = ['order', 'created_at', 'year_created']
    ordering = ['order', '-created_at']
    
    def get_serializer_class(self):
        """根據動作選擇序列化器"""
        if self.action == 'retrieve':
            return ArtworkDetailSerializer
        elif self.action == 'list':
            return ArtworkListSerializer
        return ArtworkSerializer
    
    def get_queryset(self):
        """根據參數過濾查詢集"""
        queryset = super().get_queryset()
        
        # 根據分類過濾
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(categories__slug=category_slug, categories__is_active=True)
        
        # 根據年份範圍過濾
        year_from = self.request.query_params.get('year_from', None)
        year_to = self.request.query_params.get('year_to', None)
        if year_from:
            queryset = queryset.filter(year_created__gte=year_from)
        if year_to:
            queryset = queryset.filter(year_created__lte=year_to)
        
        return queryset.prefetch_related('categories', 'translations').distinct()
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """獲取精選作品"""
        featured_artworks = self.get_queryset().filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_artworks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """獲取最新作品"""
        latest_artworks = self.get_queryset().order_by('-created_at')[:10]
        serializer = self.get_serializer(latest_artworks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_year(self, request):
        """按年份分組的作品"""
        years = self.get_queryset().values_list('year_created', flat=True).distinct().order_by('-year_created')
        years = [year for year in years if year is not None]
        
        result = []
        for year in years[:10]:  # 限制最近10年
            artworks = self.get_queryset().filter(year_created=year)[:5]
            result.append({
                'year': year,
                'artworks': self.get_serializer(artworks, many=True).data
            })
        
        return Response(result)
    
    @action(detail=True, methods=['get'])
    def related(self, request, pk=None):
        """獲取相關作品"""
        artwork = self.get_object()
        # 獲取相同分類的其他作品
        related_artworks = self.get_queryset().filter(
            categories__in=artwork.categories.all()
        ).exclude(id=artwork.id).distinct()[:6]
        
        serializer = self.get_serializer(related_artworks, many=True)
        return Response(serializer.data)
