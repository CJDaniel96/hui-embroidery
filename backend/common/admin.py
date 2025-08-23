from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin
from .models import Category, SiteContent, Achievement


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


@admin.register(SiteContent)
class SiteContentAdmin(TranslatableAdmin, ModelAdmin):
    """網站內容管理"""
    
    list_display = ['section', 'is_active', 'updated_at']
    list_filter = ['section', 'is_active']
    list_editable = ['is_active']
    
    fieldsets = (
        (_('基本設定'), {
            'fields': ('section', 'is_active')
        }),
        (_('圖片'), {
            'fields': ('hero_image', 'master_image'),
            'classes': ('collapse',)
        }),
        (_('Hero Section'), {
            'fields': ('hero_title', 'hero_subtitle', 'hero_description', 'hero_cta_text'),
            'classes': ('collapse',)
        }),
        (_('Master Section'), {
            'fields': ('master_title', 'master_subtitle', 'master_description', 'master_description2', 
                      'master_achievements_title', 'master_technique_title', 'master_technique_desc'),
            'classes': ('collapse',)
        }),
        (_('Footer Section'), {
            'fields': ('footer_description', 'copyright_text'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('translations')


@admin.register(Achievement)
class AchievementAdmin(TranslatableAdmin, ModelAdmin):
    """成就獎項管理"""
    
    list_display = ['title', 'year', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'year']
    search_fields = ['translations__title']
    list_editable = ['is_active', 'order']
    ordering = ['year', 'order']
    
    fieldsets = (
        (_('基本資訊'), {
            'fields': ('title', 'year', 'description')
        }),
        (_('設定'), {
            'fields': ('order', 'is_active')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('translations')