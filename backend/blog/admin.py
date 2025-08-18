from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin, TabularInline
from unfold.contrib.filters.admin import RangeDateFilter
from unfold.decorators import display
from .models import Post, PostCategory, BlogSettings


class PostCategoryInline(TabularInline):
    """文章分類內嵌編輯"""
    model = PostCategory
    extra = 1
    autocomplete_fields = ['category']


@admin.register(Post)
class PostAdmin(TranslatableAdmin, ModelAdmin):
    """文章管理"""
    
    list_display = [
        'title',
        'display_featured_image',
        'is_published',
        'is_featured',
        'published_at',
        'view_count',
        'get_categories',
        'created_at'
    ]
    list_filter = [
        'is_published',
        'is_featured',
        ('published_at', RangeDateFilter),
        ('created_at', RangeDateFilter),
    ]
    search_fields = ['translations__title', 'translations__content', 'slug', 'author_name']
    list_editable = ['is_published', 'is_featured']
    date_hierarchy = 'published_at'
    ordering = ['-is_featured', '-published_at', '-created_at']
    # 移除 filter_horizontal，因為使用了 through 模型
    
    fieldsets = (
        (_('基本資訊'), {
            'fields': ('title', 'slug', 'author_name', 'excerpt')
        }),
        (_('內容'), {
            'fields': ('content',),
            'classes': ('wide',)
        }),
        (_('特色圖片'), {
            'fields': ('featured_image', 'display_featured_image'),
            'classes': ('collapse',)
        }),
        # 移除分類欄位，改用 inline 管理
        (_('發布設定'), {
            'fields': ('is_published', 'is_featured', 'published_at', 'order')
        }),
        (_('統計'), {
            'fields': ('view_count',),
            'classes': ('collapse',)
        }),
        (_('SEO 設定'), {
            'fields': ('meta_description',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['display_featured_image', 'view_count']
    inlines = [PostCategoryInline]
    
    @display(description=_('特色圖片'))
    def display_featured_image(self, obj):
        """顯示特色圖片縮圖"""
        if obj.featured_image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;">',
                obj.featured_image.url
            )
        return _('無圖片')
    
    @display(description=_('分類'))
    def get_categories(self, obj):
        """顯示文章分類"""
        categories = obj.categories.filter(is_active=True)
        if categories.exists():
            return ', '.join([cat.safe_translation_getter('name', any_language=True) for cat in categories])
        return _('未分類')
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('categories', 'translations')


@admin.register(PostCategory)
class PostCategoryAdmin(ModelAdmin):
    """文章分類關聯管理"""
    list_display = ['post', 'category']
    list_filter = ['category']
    autocomplete_fields = ['post', 'category']


@admin.register(BlogSettings)
class BlogSettingsAdmin(ModelAdmin):
    """部落格設定管理"""
    list_display = ['site_name', 'posts_per_page', 'allow_comments']
    
    fieldsets = (
        (_('基本設定'), {
            'fields': ('site_name', 'posts_per_page')
        }),
        (_('功能設定'), {
            'fields': ('allow_comments',)
        }),
    )
    
    def has_add_permission(self, request):
        # 限制只能有一個設定實例
        return not BlogSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # 防止刪除設定
        return False