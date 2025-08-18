from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone
from .models import Post, BlogSettings
from .serializers import PostSerializer, PostListSerializer, PostDetailSerializer, BlogSettingsSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """文章視圖集 - 只讀"""
    
    queryset = Post.objects.filter(is_published=True, published_at__lte=timezone.now())
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_featured', 'categories', 'author_name']
    search_fields = ['translations__title', 'translations__content', 'translations__excerpt']
    ordering_fields = ['published_at', 'created_at', 'view_count']
    ordering = ['-is_featured', '-published_at']
    
    def get_serializer_class(self):
        """根據動作選擇序列化器"""
        if self.action == 'retrieve':
            return PostDetailSerializer
        elif self.action == 'list':
            return PostListSerializer
        return PostSerializer
    
    def get_queryset(self):
        """根據參數過濾查詢集"""
        queryset = super().get_queryset()
        
        # 根據分類過濾
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(categories__slug=category_slug, categories__is_active=True)
        
        # 根據年月過濾
        year = self.request.query_params.get('year', None)
        month = self.request.query_params.get('month', None)
        if year:
            queryset = queryset.filter(published_at__year=year)
        if month:
            queryset = queryset.filter(published_at__month=month)
        
        return queryset.prefetch_related('categories', 'translations').distinct()
    
    def retrieve(self, request, *args, **kwargs):
        """獲取文章詳情並增加瀏覽次數"""
        instance = self.get_object()
        # 增加瀏覽次數
        instance.increase_view_count()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """獲取精選文章"""
        featured_posts = self.get_queryset().filter(is_featured=True)[:5]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """獲取最新文章"""
        latest_posts = self.get_queryset().order_by('-published_at')[:10]
        serializer = self.get_serializer(latest_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        """獲取熱門文章（按瀏覽次數）"""
        popular_posts = self.get_queryset().order_by('-view_count')[:10]
        serializer = self.get_serializer(popular_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def archive(self, request):
        """文章歸檔（按年月分組）"""
        from django.db.models import Count
        from datetime import datetime
        
        # 獲取所有發布年月
        archive_data = self.get_queryset().extra(
            select={'year': "EXTRACT(year FROM published_at)", 'month': "EXTRACT(month FROM published_at)"}
        ).values('year', 'month').annotate(
            count=Count('id')
        ).order_by('-year', '-month')
        
        # 格式化歸檔數據
        result = []
        for item in archive_data:
            if item['year'] and item['month']:
                date_obj = datetime(int(item['year']), int(item['month']), 1)
                result.append({
                    'year': int(item['year']),
                    'month': int(item['month']),
                    'month_name': date_obj.strftime('%B'),
                    'count': item['count'],
                    'url_params': f"?year={int(item['year'])}&month={int(item['month'])}"
                })
        
        return Response(result)
    
    @action(detail=True, methods=['get'])
    def related(self, request, pk=None):
        """獲取相關文章"""
        post = self.get_object()
        # 獲取相同分類的其他文章
        related_posts = self.get_queryset().filter(
            categories__in=post.categories.all()
        ).exclude(id=post.id).distinct()[:5]
        
        serializer = self.get_serializer(related_posts, many=True)
        return Response(serializer.data)


class BlogSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    """部落格設定視圖集"""
    
    queryset = BlogSettings.objects.all()
    serializer_class = BlogSettingsSerializer
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """獲取當前設定"""
        settings = BlogSettings.objects.first()
        if settings:
            serializer = self.get_serializer(settings)
            return Response(serializer.data)
        return Response({
            'site_name': '慧繡雅集',
            'posts_per_page': 10,
            'allow_comments': False
        })
