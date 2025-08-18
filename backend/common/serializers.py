from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer
from .models import Category


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
        
        # 獲取當前語言
        current_language = getattr(request, 'LANGUAGE_CODE', 'zh-tw')
        
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
        current_language = getattr(request, 'LANGUAGE_CODE', 'zh-tw') if request else 'zh-tw'
        return obj.safe_translation_getter('name', language_code=current_language) or \
               obj.safe_translation_getter('name', any_language=True)