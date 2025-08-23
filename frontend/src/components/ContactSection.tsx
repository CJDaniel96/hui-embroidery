'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/navigation';
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
      toast.success(t('contact.form.success'));
    }
    if (error) {
      toast.error(t('contact.form.error'));
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
      value: contactInfo?.address || t('contact.defaults.address'),
      link: "#"
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      value: contactInfo?.business_hours || t('contact.defaults.hours'),
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
            <div className="w-20 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 左側：聯絡資訊 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                {t('contact.info')}
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
                        <div className="w-10 h-10 bg-gradient-to-br from-red-900 to-red-800 rounded-lg flex items-center justify-center group-hover:scale-105 transition-elegant">
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
                              className="text-red-900 hover:text-red-800 transition-smooth font-sans text-sm"
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
                    {t('contact.followUs')}
                  </h4>
                  <div className="flex space-x-3">
                    {socialMedia.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-200 hover:bg-red-900 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
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
                {t('contact.sendMessage')}
              </h3>
              
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('contact.form.nameRequired')}</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('contact.form.emailRequired')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder={t('contact.form.emailPlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder={t('contact.form.phonePlaceholder')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">{t('contact.form.subjectRequired')}</Label>
                        <Input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => updateField('subject', e.target.value)}
                          placeholder={t('contact.form.subjectPlaceholder')}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">{t('contact.form.messageRequired')}</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder={t('contact.form.messagePlaceholder')}
                        rows={5}
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="w-full bg-red-900 hover:bg-red-800 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <AlertCircle className="w-4 h-4 mr-2 animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('contact.form.sent')}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t('contact.form.send')}
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
            <Card className="bg-gradient-to-br from-red-900 to-red-800 border-0 shadow-elegant animate-fade-in">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  {t('contact.appointment')}
                </h3>
                <p className="text-white/90 mb-6 font-sans max-w-2xl mx-auto">
                  {t('contact.appointmentDesc')}
                </p>
                <Link href="/booking">
                  <Button 
                    size="lg"
                    className="bg-white text-red-900 hover:bg-gray-100 transition-colors px-8 py-3"
                  >
                    {t('contact.bookNow')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;