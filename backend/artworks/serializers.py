from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer
from .models import Artwork, ArtworkCategory
from common.serializers import CategorySimpleSerializer


class ArtworkSerializer(TranslatableModelSerializer):
    """作品序列化器"""
    
    translations = serializers.SerializerMethodField()
    categories = CategorySimpleSerializer(many=True, read_only=True)
    main_image_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Artwork
        fields = [
            'id',
            'main_image_url',
            'thumbnail_url', 
            'medium',
            'dimensions',
            'year_created',
            'is_featured',
            'is_published',
            'order',
            'created_at',
            'updated_at',
            'categories',
            'translations'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_translations(self, obj):
        """獲取當前語言的翻譯"""
        request = self.context.get('request')
        current_language = getattr(request, 'LANGUAGE_CODE', 'zh-tw') if request else 'zh-tw'
        
        return {
            'title': obj.safe_translation_getter('title', language_code=current_language) or \
                    obj.safe_translation_getter('title', any_language=True),
            'description': obj.safe_translation_getter('description', language_code=current_language) or \
                          obj.safe_translation_getter('description', any_language=True),
            'technique': obj.safe_translation_getter('technique', language_code=current_language) or \
                        obj.safe_translation_getter('technique', any_language=True),
        }
    
    def get_main_image_url(self, obj):
        """獲取主要圖片的完整 URL"""
        if obj.main_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.main_image.url)
            return obj.main_image.url
        return None
    
    def get_thumbnail_url(self, obj):
        """獲取縮圖的完整 URL"""
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        # 如果沒有縮圖，返回主要圖片
        return self.get_main_image_url(obj)


class ArtworkListSerializer(ArtworkSerializer):
    """作品列表序列化器 - 精簡版本"""
    
    class Meta(ArtworkSerializer.Meta):
        fields = [
            'id',
            'thumbnail_url',
            'year_created', 
            'is_featured',
            'translations'
        ]


class ArtworkDetailSerializer(ArtworkSerializer):
    """作品詳情序列化器 - 完整版本"""
    
    related_artworks = serializers.SerializerMethodField()
    
    class Meta(ArtworkSerializer.Meta):
        fields = ArtworkSerializer.Meta.fields + ['related_artworks']
    
    def get_related_artworks(self, obj):
        """獲取相關作品（同分類的其他作品）"""
        # 獲取相同分類的其他作品，最多5個
        related = Artwork.objects.filter(
            categories__in=obj.categories.all(),
            is_published=True
        ).exclude(id=obj.id).distinct()[:5]
        
        return ArtworkListSerializer(
            related, 
            many=True, 
            context=self.context
        ).data