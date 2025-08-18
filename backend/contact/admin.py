from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin
from unfold.contrib.filters.admin import RangeDateFilter
from unfold.decorators import display
from .models import ContactInfo, SocialMedia, ContactForm, FAQ


@admin.register(ContactInfo)
class ContactInfoAdmin(TranslatableAdmin, ModelAdmin):
    """聯絡資訊管理"""
    
    list_display = ['company_name', 'phone', 'email']
    
    fieldsets = (
        (_('基本資訊'), {
            'fields': ('company_name', 'description')
        }),
        (_('聯絡方式'), {
            'fields': ('phone', 'email', 'address', 'business_hours')
        }),
        (_('地圖座標'), {
            'fields': ('latitude', 'longitude'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # 限制只能有一個聯絡資訊實例
        return not ContactInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # 防止刪除聯絡資訊
        return False


@admin.register(SocialMedia)
class SocialMediaAdmin(ModelAdmin):
    """社群媒體管理"""
    
    list_display = ['platform', 'username', 'display_url', 'is_active', 'order']
    list_filter = ['platform', 'is_active']
    list_editable = ['is_active', 'order']
    ordering = ['order', 'platform']
    
    fieldsets = (
        (_('基本資訊'), {
            'fields': ('platform', 'url', 'username')
        }),
        (_('設定'), {
            'fields': ('is_active', 'order')
        }),
    )
    
    @display(description=_('連結'))
    def display_url(self, obj):
        """顯示連結"""
        return format_html(
            '<a href="{}" target="_blank">{}</a>',
            obj.url,
            obj.url[:50] + '...' if len(obj.url) > 50 else obj.url
        )


@admin.register(ContactForm)
class ContactFormAdmin(ModelAdmin):
    """聯絡表單管理"""
    
    list_display = [
        'name', 
        'email', 
        'subject', 
        'status', 
        'created_at',
        'display_message_preview'
    ]
    list_filter = [
        'status',
        ('created_at', RangeDateFilter),
    ]
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at', 'ip_address', 'user_agent']
    ordering = ['-created_at']
    
    fieldsets = (
        (_('聯絡人資訊'), {
            'fields': ('name', 'email', 'phone')
        }),
        (_('訊息內容'), {
            'fields': ('subject', 'message')
        }),
        (_('處理狀態'), {
            'fields': ('status', 'admin_notes')
        }),
        (_('技術資訊'), {
            'fields': ('created_at', 'ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
    
    @display(description=_('訊息預覽'))
    def display_message_preview(self, obj):
        """顯示訊息預覽"""
        preview = obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
        return format_html('<span title="{}">{}</span>', obj.message, preview)
    
    def mark_as_read_action(self, request, queryset):
        """標記為已讀"""
        updated = queryset.filter(status='new').update(status='read')
        self.message_user(request, _('已標記 {} 則訊息為已讀').format(updated))
    mark_as_read_action.short_description = _('標記為已讀')
    
    def mark_as_replied_action(self, request, queryset):
        """標記為已回覆"""
        updated = queryset.filter(status__in=['new', 'read']).update(status='replied')
        self.message_user(request, _('已標記 {} 則訊息為已回覆').format(updated))
    mark_as_replied_action.short_description = _('標記為已回覆')
    
    actions = [mark_as_read_action, mark_as_replied_action]
    
    def has_add_permission(self, request):
        # 聯絡表單通常由前端提交，不需要在後台新增
        return False


@admin.register(FAQ)
class FAQAdmin(TranslatableAdmin, ModelAdmin):
    """常見問題管理"""
    
    list_display = ['question', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    list_editable = ['is_active', 'order']
    search_fields = ['translations__question', 'translations__answer']
    ordering = ['order', 'created_at']
    
    fieldsets = (
        (_('問題內容'), {
            'fields': ('question', 'answer')
        }),
        (_('設定'), {
            'fields': ('is_active', 'order')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('translations')