from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer
from .models import Post, PostCategory, BlogSettings
from common.serializers import CategorySimpleSerializer


class PostSerializer(TranslatableModelSerializer):
    """文章序列化器"""
    
    translations = serializers.SerializerMethodField()
    categories = CategorySimpleSerializer(many=True, read_only=True)
    featured_image_url = serializers.SerializerMethodField()
    reading_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id',
            'slug',
            'featured_image_url',
            'author_name',
            'is_featured',
            'is_published',
            'published_at',
            'view_count',
            'reading_time',
            'created_at',
            'updated_at',
            'categories',
            'translations'
        ]
        read_only_fields = ['id', 'view_count', 'created_at', 'updated_at']
    
    def get_translations(self, obj):
        """獲取當前語言的翻譯"""
        request = self.context.get('request')
        current_language = getattr(request, 'LANGUAGE_CODE', 'zh-tw') if request else 'zh-tw'
        
        return {
            'title': obj.safe_translation_getter('title', language_code=current_language) or \
                    obj.safe_translation_getter('title', any_language=True),
            'content': obj.safe_translation_getter('content', language_code=current_language) or \
                      obj.safe_translation_getter('content', any_language=True),
            'excerpt': obj.safe_translation_getter('excerpt', language_code=current_language) or \
                      obj.safe_translation_getter('excerpt', any_language=True),
            'meta_description': obj.safe_translation_getter('meta_description', language_code=current_language) or \
                               obj.safe_translation_getter('meta_description', any_language=True),
        }
    
    def get_featured_image_url(self, obj):
        """獲取特色圖片的完整 URL"""
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return None
    
    def get_reading_time(self, obj):
        """估算閱讀時間（分鐘）"""
        content = obj.safe_translation_getter('content', any_language=True) or ''
        # 移除 HTML 標籤
        import re
        clean_content = re.sub('<.*?>', '', content)
        # 估算閱讀時間（以每分鐘200字計算）
        word_count = len(clean_content)
        reading_time = max(1, word_count // 200)
        return reading_time


class PostListSerializer(PostSerializer):
    """文章列表序列化器 - 精簡版本"""
    
    class Meta(PostSerializer.Meta):
        fields = [
            'id',
            'slug',
            'featured_image_url',
            'author_name',
            'is_featured',
            'published_at',
            'view_count',
            'reading_time',
            'translations'
        ]


class PostDetailSerializer(PostSerializer):
    """文章詳情序列化器 - 完整版本"""
    
    related_posts = serializers.SerializerMethodField()
    
    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + ['related_posts']
    
    def get_related_posts(self, obj):
        """獲取相關文章（同分類的其他文章）"""
        # 獲取相同分類的其他文章，最多5個
        related = Post.objects.filter(
            categories__in=obj.categories.all(),
            is_published=True
        ).exclude(id=obj.id).distinct()[:5]
        
        return PostListSerializer(
            related, 
            many=True, 
            context=self.context
        ).data


class BlogSettingsSerializer(serializers.ModelSerializer):
    """部落格設定序列化器"""
    
    class Meta:
        model = BlogSettings
        fields = ['site_name', 'posts_per_page', 'allow_comments']