from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer
from .models import ContactInfo, SocialMedia, ContactForm, FAQ


class ContactInfoSerializer(TranslatableModelSerializer):
    """聯絡資訊序列化器"""
    
    translations = serializers.SerializerMethodField()
    
    class Meta:
        model = ContactInfo
        fields = [
            'phone',
            'email', 
            'address',
            'business_hours',
            'latitude',
            'longitude',
            'translations'
        ]
    
    def get_translations(self, obj):
        """獲取當前語言的翻譯"""
        request = self.context.get('request')
        current_language = getattr(request, 'LANGUAGE_CODE', 'zh-tw') if request else 'zh-tw'
        
        return {
            'company_name': obj.safe_translation_getter('company_name', language_code=current_language) or \
                           obj.safe_translation_getter('company_name', any_language=True),
            'description': obj.safe_translation_getter('description', language_code=current_language) or \
                          obj.safe_translation_getter('description', any_language=True),
        }


class SocialMediaSerializer(serializers.ModelSerializer):
    """社群媒體序列化器"""
    
    platform_display = serializers.CharField(source='get_platform_display', read_only=True)
    
    class Meta:
        model = SocialMedia
        fields = [
            'id',
            'platform',
            'platform_display',
            'url',
            'username',
            'is_active',
            'order'
        ]


class ContactFormSerializer(serializers.ModelSerializer):
    """聯絡表單序列化器"""
    
    class Meta:
        model = ContactForm
        fields = [
            'name',
            'email',
            'phone', 
            'subject',
            'message'
        ]
    
    def create(self, validated_data):
        """建立聯絡表單並記錄技術資訊"""
        request = self.context.get('request')
        if request:
            # 記錄 IP 位址和 User Agent
            validated_data['ip_address'] = self.get_client_ip(request)
            validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
        
        return super().create(validated_data)
    
    def get_client_ip(self, request):
        """獲取客戶端 IP 位址"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class ContactFormReadSerializer(serializers.ModelSerializer):
    """聯絡表單讀取序列化器（用於管理後台）"""
    
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ContactForm
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'subject', 
            'message',
            'status',
            'status_display',
            'admin_notes',
            'created_at',
            'ip_address'
        ]
        read_only_fields = [
            'id', 'name', 'email', 'phone', 'subject', 
            'message', 'created_at', 'ip_address'
        ]


class FAQSerializer(TranslatableModelSerializer):
    """常見問題序列化器"""
    
    translations = serializers.SerializerMethodField()
    
    class Meta:
        model = FAQ
        fields = [
            'id',
            'is_active',
            'order',
            'created_at',
            'translations'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_translations(self, obj):
        """獲取當前語言的翻譯"""
        request = self.context.get('request')
        current_language = getattr(request, 'LANGUAGE_CODE', 'zh-tw') if request else 'zh-tw'
        
        return {
            'question': obj.safe_translation_getter('question', language_code=current_language) or \
                       obj.safe_translation_getter('question', any_language=True),
            'answer': obj.safe_translation_getter('answer', language_code=current_language) or \
                     obj.safe_translation_getter('answer', any_language=True),
        }