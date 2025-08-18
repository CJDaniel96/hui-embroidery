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
