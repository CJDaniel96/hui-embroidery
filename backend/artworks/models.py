from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from parler.models import TranslatableModel, TranslatedFields
from core.models import PublishableModel
from common.models import Category


class Artwork(TranslatableModel, PublishableModel):
    """作品模型 - 支援多語言"""
    
    # 圖片欄位
    main_image = models.ImageField(
        _('主要圖片'), 
        upload_to='artworks/', 
        help_text=_('建議尺寸：800x600px')
    )
    thumbnail = models.ImageField(
        _('縮圖'), 
        upload_to='artworks/thumbnails/', 
        blank=True, 
        null=True
    )
    
    # 作品資訊
    medium = models.CharField(
        _('媒材'), 
        max_length=100, 
        blank=True, 
        help_text=_('例如：絲綢、棉布、金線等')
    )
    dimensions = models.CharField(
        _('尺寸'), 
        max_length=100, 
        blank=True, 
        help_text=_('例如：30cm x 40cm')
    )
    year_created = models.PositiveIntegerField(_('創作年份'), blank=True, null=True)
    
    # 分類關聯
    categories = models.ManyToManyField(
        Category,
        through='ArtworkCategory',
        related_name='artworks',
        blank=True,
        limit_choices_to={'category_type': 'artwork', 'is_active': True}
    )
    
    # 可翻譯欄位
    translations = TranslatedFields(
        title=models.CharField(_('標題'), max_length=200),
        description=models.TextField(_('描述'), blank=True),
        technique=models.CharField(
            _('技法'), 
            max_length=200, 
            blank=True, 
            help_text=_('例如：蘇繡、湘繡、粵繡等')
        ),
    )
    
    class Meta:
        verbose_name = _('作品')
        verbose_name_plural = _('作品')
    
    def __str__(self):
        return self.safe_translation_getter('title', any_language=True) or f'作品 #{self.pk}'
    
    def get_absolute_url(self):
        return reverse('artworks:detail', kwargs={'pk': self.pk})


class ArtworkCategory(models.Model):
    """作品分類關聯"""
    artwork = models.ForeignKey(
        Artwork, 
        on_delete=models.CASCADE, 
        related_name='artwork_categories'
    )
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='category_artworks',
        limit_choices_to={'category_type': 'artwork'}
    )
    
    class Meta:
        unique_together = ('artwork', 'category')
        verbose_name = _('作品分類關聯')
        verbose_name_plural = _('作品分類關聯')
    
    def __str__(self):
        return f'{self.artwork} - {self.category}'