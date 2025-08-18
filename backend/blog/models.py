from django.db import models
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from django.utils import timezone
from parler.models import TranslatableModel, TranslatedFields
from core.models import PublishableModel, SEOModel
from common.models import Category


class Post(TranslatableModel, PublishableModel, SEOModel):
    """文章/消息模型 - 支援多語言"""
    
    # 發布相關
    published_at = models.DateTimeField(_('發布時間'), blank=True, null=True)
    
    # 圖片欄位
    featured_image = models.ImageField(
        _('特色圖片'), 
        upload_to='blog/posts/', 
        blank=True, 
        null=True, 
        help_text=_('建議尺寸：1200x630px')
    )
    
    # 作者資訊（可以後續擴展為外鍵關聯到 User 模型）
    author_name = models.CharField(_('作者名稱'), max_length=100, default='慧繡雅集')
    
    # 統計資訊
    view_count = models.PositiveIntegerField(_('瀏覽次數'), default=0)
    
    # 分類關聯
    categories = models.ManyToManyField(
        Category,
        through='PostCategory',
        related_name='posts',
        blank=True,
        limit_choices_to={'category_type': 'blog', 'is_active': True}
    )
    
    # 可翻譯欄位
    translations = TranslatedFields(
        title=models.CharField(_('標題'), max_length=200),
        content=models.TextField(_('內容')),
        excerpt=models.TextField(
            _('摘要'), 
            blank=True, 
            help_text=_('用於文章列表顯示，留空會自動從內容擷取')
        ),
        meta_description=models.CharField(
            _('SEO 描述'), 
            max_length=160, 
            blank=True, 
            help_text=_('搜索引擎顯示的描述')
        ),
    )
    
    class Meta:
        verbose_name = _('文章')
        verbose_name_plural = _('文章')
        ordering = ['-is_featured', '-published_at', '-created_at']
    
    def __str__(self):
        return self.safe_translation_getter('title', any_language=True) or f'文章 #{self.pk}'
    
    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'slug': self.slug})
    
    def save(self, *args, **kwargs):
        # 如果沒有設定發布時間且狀態為已發布，自動設定發布時間
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        
        # 如果沒有摘要，自動從內容擷取
        if not self.safe_translation_getter('excerpt'):
            content = self.safe_translation_getter('content', '')
            if content:
                # 移除 HTML 標籤並擷取前 150 字
                import re
                clean_content = re.sub('<.*?>', '', content)
                excerpt = clean_content[:150] + '...' if len(clean_content) > 150 else clean_content
                # 這裡需要針對當前語言設定摘要
                # 在實際使用時可能需要更複雜的邏輯
        
        super().save(*args, **kwargs)
    
    def increase_view_count(self):
        """增加瀏覽次數"""
        self.view_count += 1
        self.save(update_fields=['view_count'])


class PostCategory(models.Model):
    """文章分類關聯"""
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE, 
        related_name='post_categories'
    )
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='category_posts',
        limit_choices_to={'category_type': 'blog'}
    )
    
    class Meta:
        unique_together = ('post', 'category')
        verbose_name = _('文章分類關聯')
        verbose_name_plural = _('文章分類關聯')
    
    def __str__(self):
        return f'{self.post} - {self.category}'


class BlogSettings(models.Model):
    """部落格全域設定"""
    site_name = models.CharField(_('網站名稱'), max_length=100, default='慧繡雅集')
    posts_per_page = models.PositiveIntegerField(_('每頁文章數'), default=10)
    allow_comments = models.BooleanField(_('允許留言'), default=False)
    
    class Meta:
        verbose_name = _('部落格設定')
        verbose_name_plural = _('部落格設定')
    
    def __str__(self):
        return self.site_name
    
    def save(self, *args, **kwargs):
        # 確保只有一個設定實例
        if not self.pk and BlogSettings.objects.exists():
            raise ValueError('只能有一個部落格設定實例')
        super().save(*args, **kwargs)