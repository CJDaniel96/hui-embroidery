from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin, TabularInline
from unfold.contrib.filters.admin import RangeDateFilter
from unfold.decorators import display
from .models import Artwork, ArtworkCategory


class ArtworkCategoryInline(TabularInline):
    """作品分類內嵌編輯"""
    model = ArtworkCategory
    extra = 1
    autocomplete_fields = ['category']


@admin.register(Artwork)
class ArtworkAdmin(TranslatableAdmin, ModelAdmin):
    """作品管理"""
    
    list_display = [
        'title', 
        'display_thumbnail', 
        'is_published', 
        'is_featured', 
        'order',  # 加入 order 到 list_display
        'year_created',
        'get_categories',
        'created_at'
    ]
    list_filter = [
        'is_published', 
        'is_featured', 
        'year_created',
        ('created_at', RangeDateFilter),
    ]
    search_fields = ['translations__title', 'translations__description', 'medium']
    list_editable = ['is_published', 'is_featured', 'order']
    ordering = ['order', '-created_at']
    # 移除 filter_horizontal，因為使用了 through 模型
    
    fieldsets = (
        (_('基本資訊'), {
            'fields': ('title', 'description', 'technique')
        }),
        (_('圖片'), {
            'fields': ('main_image', 'thumbnail', 'display_main_image'),
            'classes': ('collapse',)
        }),
        (_('作品詳情'), {
            'fields': ('medium', 'dimensions', 'year_created')
        }),
        # 移除分類欄位，改用 inline 管理
        (_('發布設定'), {
            'fields': ('is_published', 'is_featured', 'order')
        }),
    )
    
    readonly_fields = ['display_main_image']
    inlines = [ArtworkCategoryInline]
    
    @display(description=_('縮圖'))
    def display_thumbnail(self, obj):
        """顯示縮圖"""
        if obj.thumbnail:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">',
                obj.thumbnail.url
            )
        elif obj.main_image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">',
                obj.main_image.url
            )
        return _('無圖片')
    
    @display(description=_('主要圖片預覽'))
    def display_main_image(self, obj):
        """顯示主要圖片預覽"""
        if obj.main_image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 200px; object-fit: contain; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">',
                obj.main_image.url
            )
        return _('尚未上傳圖片')
    
    @display(description=_('分類'))
    def get_categories(self, obj):
        """顯示作品分類"""
        categories = obj.categories.filter(is_active=True)
        if categories.exists():
            return ', '.join([cat.safe_translation_getter('name', any_language=True) for cat in categories])
        return _('未分類')
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('categories', 'translations')


@admin.register(ArtworkCategory)
class ArtworkCategoryAdmin(ModelAdmin):
    """作品分類關聯管理"""
    list_display = ['artwork', 'category']
    list_filter = ['category']
    autocomplete_fields = ['artwork', 'category']
