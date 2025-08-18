from django.db import models
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    """時間戳記抽象基礎模型"""
    created_at = models.DateTimeField(_('建立時間'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新時間'), auto_now=True)
    
    class Meta:
        abstract = True


class PublishableModel(TimeStampedModel):
    """可發布內容的抽象模型"""
    is_published = models.BooleanField(_('是否發布'), default=True)
    is_featured = models.BooleanField(_('是否為精選'), default=False)
    order = models.PositiveIntegerField(_('排序'), default=0, help_text=_('數字越小排序越前'))
    
    class Meta:
        abstract = True
        ordering = ['order', '-created_at']


class SEOModel(models.Model):
    """SEO 相關的抽象模型"""
    slug = models.SlugField(_('網址別名'), max_length=200, unique=True, blank=True)
    
    class Meta:
        abstract = True
