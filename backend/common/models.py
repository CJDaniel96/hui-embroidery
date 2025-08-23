from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFields
from core.models import TimeStampedModel


class Category(TranslatableModel, TimeStampedModel):
    """共用分類模型 - 可用於作品或文章分類"""
    
    # 非翻譯欄位
    slug = models.SlugField(_('網址別名'), max_length=100, unique=True)
    order = models.PositiveIntegerField(_('排序'), default=0)
    is_active = models.BooleanField(_('是否啟用'), default=True)
    category_type = models.CharField(
        _('分類類型'), 
        max_length=20, 
        choices=[
            ('artwork', _('作品分類')),
            ('blog', _('文章分類')),
        ],
        default='artwork'
    )
    
    # 可翻譯欄位
    translations = TranslatedFields(
        name=models.CharField(_('分類名稱'), max_length=100),
        description=models.TextField(_('分類描述'), blank=True),
    )
    
    class Meta:
        verbose_name = _('分類')
        verbose_name_plural = _('分類')
        ordering = ['category_type', 'order', 'created_at']
        unique_together = ('slug', 'category_type')
    
    def __str__(self):
        category_name = self.safe_translation_getter('name', any_language=True) or f'分類 #{self.pk}'
        return f'[{self.get_category_type_display()}] {category_name}'


class SiteContent(TranslatableModel, TimeStampedModel):
    """網站內容管理模型 - 管理各個 section 的內容"""
    
    SECTION_CHOICES = [
        ('hero', _('首頁主視覺')),
        ('master', _('大師介紹')),
        ('footer', _('頁尾資訊')),
    ]
    
    # 非翻譯欄位
    section = models.CharField(_('區塊類型'), max_length=20, choices=SECTION_CHOICES, unique=True)
    is_active = models.BooleanField(_('是否啟用'), default=True)
    
    # 圖片欄位
    hero_image = models.ImageField(_('主視覺圖片'), upload_to='site_content/hero/', blank=True, null=True)
    master_image = models.ImageField(_('大師照片'), upload_to='site_content/master/', blank=True, null=True)
    
    # 可翻譯欄位
    translations = TranslatedFields(
        # Hero Section 欄位
        hero_title = models.CharField(_('主標題'), max_length=100, blank=True),
        hero_subtitle = models.CharField(_('副標題'), max_length=100, blank=True),
        hero_description = models.TextField(_('描述'), blank=True),
        hero_cta_text = models.CharField(_('行動按鈕文字'), max_length=50, blank=True),
        
        # Master Section 欄位
        master_title = models.CharField(_('大師區塊標題'), max_length=100, blank=True),
        master_subtitle = models.CharField(_('大師區塊副標題'), max_length=200, blank=True),
        master_description = models.TextField(_('大師介紹'), blank=True),
        master_description2 = models.TextField(_('大師介紹2'), blank=True),
        master_achievements_title = models.CharField(_('成就標題'), max_length=100, blank=True),
        master_technique_title = models.CharField(_('技法標題'), max_length=100, blank=True),
        master_technique_desc = models.TextField(_('技法描述'), blank=True),
        
        # Footer 欄位
        footer_description = models.TextField(_('頁尾描述'), blank=True),
        copyright_text = models.CharField(_('版權聲明'), max_length=200, blank=True),
    )
    
    class Meta:
        verbose_name = _('網站內容')
        verbose_name_plural = _('網站內容')
        ordering = ['section']
    
    def __str__(self):
        return f'{self.get_section_display()}'


class Achievement(TranslatableModel, TimeStampedModel):
    """成就獎項模型"""
    
    # 非翻譯欄位
    year = models.PositiveIntegerField(_('年份'), null=True, blank=True)
    order = models.PositiveIntegerField(_('排序'), default=0)
    is_active = models.BooleanField(_('是否顯示'), default=True)
    
    # 可翻譯欄位
    translations = TranslatedFields(
        title = models.CharField(_('獎項名稱'), max_length=200),
        description = models.TextField(_('獎項描述'), blank=True),
    )
    
    class Meta:
        verbose_name = _('成就獎項')
        verbose_name_plural = _('成就獎項')
        ordering = ['year', 'order']
    
    def __str__(self):
        title = self.safe_translation_getter('title', any_language=True) or f'獎項 #{self.pk}'
        year_str = f"{self.year}年：" if self.year else ""
        return f'{year_str}{title}'
