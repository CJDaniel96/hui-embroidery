'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { useContactInfo, useSocialMedia } from '@/hooks/useContactInfo';
import { toast } from 'sonner';
import { useEffect } from 'react';

const ContactSection = () => {
  const t = useTranslations();
  const {
    formData,
    updateField,
    handleSubmit,
    isSubmitting,
    isSuccess,
    error,
    isValid,
  } = useContactForm();

  const { data: contactInfo } = useContactInfo();
  const { data: socialMedia } = useSocialMedia();

  // 處理表單提交結果
  useEffect(() => {
    if (isSuccess) {
      toast.success('訊息發送成功！我們會盡快回覆您。');
    }
    if (error) {
      toast.error('發送失敗，請稍後再試或直接聯繫我們。');
    }
  }, [isSuccess, error]);

  // 備用聯絡資訊（如果 API 不可用）
  const fallbackContactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: contactInfo?.email || "contact@hui-embroidery.com",
      link: `mailto:${contactInfo?.email || "contact@hui-embroidery.com"}`
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: contactInfo?.phone || "+86 138 0000 0000",
      link: `tel:${contactInfo?.phone?.replace(/\s/g, '') || "+8613800000000"}`
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      value: contactInfo?.address || "蘇州市姑蘇區 刺繡藝術街88號",
      link: "#"
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      value: contactInfo?.business_hours || "週一至週六 9:00-17:00",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              {t('contact.subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 左側：聯絡資訊 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                聯絡資訊
              </h3>
              
              {/* Contact Cards */}
              <div className="grid gap-4">
                {fallbackContactInfo.map((info, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-soft transition-elegant bg-card border-border/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-elegant">
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif font-semibold text-foreground text-sm">
                            {info.title}
                          </h4>
                          {info.link === "#" ? (
                            <p className="text-muted-foreground font-sans text-sm">
                              {info.value}
                            </p>
                          ) : (
                            <a 
                              href={info.link}
                              className="text-red-600 hover:text-red-700 transition-smooth font-sans text-sm"
                            >
                              {info.value}
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 社群媒體 */}
              {socialMedia && socialMedia.length > 0 && (
                <div className="pt-6">
                  <h4 className="font-serif font-semibold text-foreground mb-4">
                    追蹤我們
                  </h4>
                  <div className="flex space-x-3">
                    {socialMedia.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                        title={social.platform_display}
                      >
                        <span className="text-sm font-medium">
                          {social.platform.charAt(0).toUpperCase()}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右側：聯絡表單 */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                發送訊息
              </h3>
              
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">姓名 *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="請輸入您的姓名"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">電子郵件 *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="請輸入您的電子郵件"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">電話號碼</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="請輸入您的電話號碼"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">主旨 *</Label>
                        <Input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => updateField('subject', e.target.value)}
                          placeholder="請輸入主旨"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">訊息內容 *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="請輸入您的訊息內容..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                          發送中...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          已發送成功
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          發送訊息
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA - 預約參觀 */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-br from-red-600 to-red-700 border-0 shadow-elegant animate-fade-in">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  {t('contact.appointment')}
                </h3>
                <p className="text-white/90 mb-6 font-sans max-w-2xl mx-auto">
                  {t('contact.appointmentDesc')}
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-red-600 hover:bg-gray-100 transition-colors px-8 py-3"
                >
                  {t('contact.bookNow')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;