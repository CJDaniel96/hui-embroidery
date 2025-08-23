from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer
from .models import Category, SiteContent, Achievement


class CategorySerializer(TranslatableModelSerializer):
    """分類序列化器"""
    
    translations = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 
            'slug', 
            'category_type', 
            'order', 
            'is_active', 
            'created_at',
            'translations'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_translations(self, obj):
        """獲取所有語言的翻譯"""
        request = self.context.get('request')
        if not request:
            return {}
        
        # 獲取當前語言 - 從 Accept-Language 標頭或 Django 語言設定
        from django.utils import translation
        current_language = translation.get_language()
        if not current_language:
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'zh-tw')
            current_language = 'en' if accept_language.startswith('en') else 'zh-tw'
        
        # 嘗試獲取當前語言的翻譯
        translation = obj.safe_translation_getter('name', language_code=current_language)
        description = obj.safe_translation_getter('description', language_code=current_language)
        
        return {
            'name': translation or obj.safe_translation_getter('name', any_language=True),
            'description': description or obj.safe_translation_getter('description', any_language=True),
        }


class CategorySimpleSerializer(serializers.ModelSerializer):
    """簡化的分類序列化器 - 用於關聯顯示"""
    
    name = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'slug', 'name', 'category_type']
    
    def get_name(self, obj):
        """獲取當前語言的分類名稱"""
        request = self.context.get('request')
        from django.utils import translation
        current_language = translation.get_language()
        if not current_language and request:
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'zh-tw')
            current_language = 'en' if accept_language.startswith('en') else 'zh-tw'
        elif not current_language:
            current_language = 'zh-tw'
        return obj.safe_translation_getter('name', language_code=current_language) or \
               obj.safe_translation_getter('name', any_language=True)


class SiteContentSerializer(TranslatableModelSerializer):
    """網站內容序列化器"""
    
    translations = serializers.SerializerMethodField()
    hero_image_url = serializers.SerializerMethodField()
    master_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = SiteContent
        fields = [
            'id',
            'section',
            'is_active',
            'hero_image_url',
            'master_image_url',
            'updated_at',
            'translations'
        ]
        read_only_fields = ['id', 'updated_at']
    
    def get_hero_image_url(self, obj):
        """獲取 hero 圖片 URL"""
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        return None
    
    def get_master_image_url(self, obj):
        """獲取 master 圖片 URL"""
        if obj.master_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.master_image.url)
            return obj.master_image.url
        return None
    
    def get_translations(self, obj):
        """獲取所有翻譯欄位"""
        request = self.context.get('request')
        from django.utils import translation
        current_language = translation.get_language()
        if not current_language and request:
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'zh-tw')
            current_language = 'en' if accept_language.startswith('en') else 'zh-tw'
        elif not current_language:
            current_language = 'zh-tw'
        
        # 定義所有翻譯欄位
        translation_fields = [
            'hero_title', 'hero_subtitle', 'hero_description', 'hero_cta_text',
            'master_title', 'master_subtitle', 'master_description', 'master_description2',
            'master_achievements_title', 'master_technique_title', 'master_technique_desc',
            'footer_description', 'copyright_text'
        ]
        
        translations = {}
        for field in translation_fields:
            value = obj.safe_translation_getter(field, language_code=current_language) or \
                    obj.safe_translation_getter(field, any_language=True)
            translations[field] = value or ''
        
        return translations


class AchievementSerializer(TranslatableModelSerializer):
    """成就獎項序列化器"""
    
    translations = serializers.SerializerMethodField()
    
    class Meta:
        model = Achievement
        fields = [
            'id',
            'year',
            'order',
            'is_active',
            'created_at',
            'translations'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_translations(self, obj):
        """獲取翻譯"""
        request = self.context.get('request')
        from django.utils import translation
        current_language = translation.get_language()
        if not current_language and request:
            accept_language = request.META.get('HTTP_ACCEPT_LANGUAGE', 'zh-tw')
            current_language = 'en' if accept_language.startswith('en') else 'zh-tw'
        elif not current_language:
            current_language = 'zh-tw'
        
        title = obj.safe_translation_getter('title', language_code=current_language) or \
                obj.safe_translation_getter('title', any_language=True)
        description = obj.safe_translation_getter('description', language_code=current_language) or \
                     obj.safe_translation_getter('description', any_language=True)
        
        return {
            'title': title or '',
            'description': description or '',
        }