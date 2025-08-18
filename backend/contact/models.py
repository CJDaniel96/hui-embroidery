from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import EmailValidator
from parler.models import TranslatableModel, TranslatedFields
from core.models import TimeStampedModel


class ContactInfo(TranslatableModel):
    """聯絡資訊模型"""
    
    # 基本聯絡資訊
    phone = models.CharField(_('電話號碼'), max_length=20, blank=True)
    email = models.EmailField(_('電子郵件'), blank=True)
    address = models.TextField(_('地址'), blank=True)
    
    # 營業時間
    business_hours = models.TextField(_('營業時間'), blank=True)
    
    # 地圖座標
    latitude = models.DecimalField(
        _('緯度'), 
        max_digits=10, 
        decimal_places=7, 
        blank=True, 
        null=True
    )
    longitude = models.DecimalField(
        _('經度'), 
        max_digits=10, 
        decimal_places=7, 
        blank=True, 
        null=True
    )
    
    # 可翻譯欄位
    translations = TranslatedFields(
        company_name=models.CharField(_('公司名稱'), max_length=100, default='慧繡雅集'),
        description=models.TextField(_('簡介'), blank=True),
    )
    
    class Meta:
        verbose_name = _('聯絡資訊')
        verbose_name_plural = _('聯絡資訊')
    
    def __str__(self):
        return self.safe_translation_getter('company_name', any_language=True) or '聯絡資訊'
    
    def save(self, *args, **kwargs):
        # 確保只有一個聯絡資訊實例
        if not self.pk and ContactInfo.objects.exists():
            raise ValueError('只能有一個聯絡資訊實例')
        super().save(*args, **kwargs)


class SocialMedia(models.Model):
    """社群媒體連結"""
    PLATFORM_CHOICES = [
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('twitter', 'Twitter'),
        ('linkedin', 'LinkedIn'),
        ('wechat', '微信'),
        ('line', 'LINE'),
        ('other', _('其他')),
    ]
    
    platform = models.CharField(_('平台'), max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField(_('連結網址'))
    username = models.CharField(_('用戶名稱'), max_length=100, blank=True)
    is_active = models.BooleanField(_('是否顯示'), default=True)
    order = models.PositiveIntegerField(_('排序'), default=0)
    
    class Meta:
        verbose_name = _('社群媒體')
        verbose_name_plural = _('社群媒體')
        ordering = ['order', 'platform']
    
    def __str__(self):
        return f'{self.get_platform_display()}: {self.username or self.url}'


class ContactForm(TimeStampedModel):
    """聯絡表單提交記錄"""
    
    STATUS_CHOICES = [
        ('new', _('新訊息')),
        ('read', _('已讀')),
        ('replied', _('已回覆')),
        ('closed', _('已關閉')),
    ]
    
    # 基本資訊
    name = models.CharField(_('姓名'), max_length=100)
    email = models.EmailField(_('電子郵件'), validators=[EmailValidator()])
    phone = models.CharField(_('電話號碼'), max_length=20, blank=True)
    
    # 訊息內容
    subject = models.CharField(_('主旨'), max_length=200)
    message = models.TextField(_('訊息內容'))
    
    # 處理狀態
    status = models.CharField(_('狀態'), max_length=10, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(_('管理員備註'), blank=True)
    
    # 技術資訊
    ip_address = models.GenericIPAddressField(_('IP 位址'), blank=True, null=True)
    user_agent = models.TextField(_('瀏覽器資訊'), blank=True)
    
    class Meta:
        verbose_name = _('聯絡表單')
        verbose_name_plural = _('聯絡表單')
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.name}: {self.subject}'
    
    def mark_as_read(self):
        """標記為已讀"""
        if self.status == 'new':
            self.status = 'read'
            self.save(update_fields=['status'])
    
    def mark_as_replied(self):
        """標記為已回覆"""
        self.status = 'replied'
        self.save(update_fields=['status'])


class FAQ(TranslatableModel, TimeStampedModel):
    """常見問題"""
    
    is_active = models.BooleanField(_('是否顯示'), default=True)
    order = models.PositiveIntegerField(_('排序'), default=0)
    
    # 可翻譯欄位
    translations = TranslatedFields(
        question=models.CharField(_('問題'), max_length=300),
        answer=models.TextField(_('答案')),
    )
    
    class Meta:
        verbose_name = _('常見問題')
        verbose_name_plural = _('常見問題')
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return self.safe_translation_getter('question', any_language=True) or f'FAQ #{self.pk}'