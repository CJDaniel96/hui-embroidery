from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin
from .models import Category


@admin.register(Category)
class CategoryAdmin(TranslatableAdmin, ModelAdmin):
    """分類管理"""
    
    list_display = ['name', 'category_type', 'slug', 'is_active', 'order', 'created_at']
    list_filter = ['category_type', 'is_active', 'created_at']
    search_fields = ['translations__name', 'slug']
    list_editable = ['is_active', 'order']
    ordering = ['category_type', 'order', 'created_at']
    
    fieldsets = (
        (_('基本資訊'), {
            'fields': ('name', 'slug', 'category_type', 'description')
        }),
        (_('設定'), {
            'fields': ('order', 'is_active')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('translations')