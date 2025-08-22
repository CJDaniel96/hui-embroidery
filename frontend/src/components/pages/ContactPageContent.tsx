'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Calendar,
  Users,
  Star,
  ChevronRight
} from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { useContactInfo, useSocialMedia } from '@/hooks/useContactInfo';
import { toast } from 'sonner';

const ContactPageContent = () => {
  const t = useTranslations();
  const [selectedSubject, setSelectedSubject] = useState('');
  
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
      toast.success('訊息發送成功！我們會在 24 小時內回覆您。');
    }
    if (error) {
      toast.error('發送失敗，請稍後再試或直接撥打電話聯繫我們。');
    }
  }, [isSuccess, error]);

  // 聯絡主題選項
  const contactSubjects = [
    { value: 'consultation', label: '作品諮詢', icon: MessageSquare },
    { value: 'custom', label: '客製化需求', icon: Star },
    { value: 'learning', label: '學習課程', icon: Users },
    { value: 'visit', label: '預約參觀', icon: Calendar },
    { value: 'collaboration', label: '合作提案', icon: ChevronRight },
    { value: 'other', label: '其他問題', icon: MessageSquare },
  ];

  // 備用聯絡資訊
  const contactDetails = [
    {
      icon: Mail,
      title: '電子郵件',
      value: contactInfo?.email || "contact@hui-embroidery.com",
      link: `mailto:${contactInfo?.email || "contact@hui-embroidery.com"}`,
      description: '我們會在 24 小時內回覆您的郵件'
    },
    {
      icon: Phone,
      title: '聯絡電話',
      value: contactInfo?.phone || "+86 138 0000 0000",
      link: `tel:${contactInfo?.phone?.replace(/\s/g, '') || "+8613800000000"}`,
      description: '營業時間內可直接撥打諮詢'
    },
    {
      icon: MapPin,
      title: '工作室地址',
      value: contactInfo?.address || "蘇州市姑蘇區 刺繡藝術街88號",
      link: "#",
      description: '歡迎預約參觀我們的工作室'
    },
    {
      icon: Clock,
      title: '營業時間',
      value: contactInfo?.business_hours || "週一至週六 9:00-17:00",
      link: "#",
      description: '週日及國定假日休息'
    }
  ];

  // 常見問題
  const faqs = [
    {
      question: "如何預約參觀工作室？",
      answer: "請提前 2-3 天透過電話或郵件預約，我們會安排專人為您介紹。"
    },
    {
      question: "是否提供刺繡教學課程？",
      answer: "有的，我們提供不同程度的刺繡課程，從基礎入門到高級技法都有。"
    },
    {
      question: "客製化作品需要多長時間？",
      answer: "根據作品複雜度，一般需要 2-6 個月不等，具體時間會在諮詢時告知。"
    },
    {
      question: "作品可以寄送到海外嗎？",
      answer: "可以的，我們有安全的國際寄送服務，會妥善包裝確保作品完整。"
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              聯絡我們
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              無論您想了解我們的作品、預約參觀，或是有任何問題，
              我們都很樂意為您服務
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* 主要聯絡區域 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 左側：聯絡表單 */}
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                  發送訊息
                </h2>
                
                <Card className="shadow-lg">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* 聯絡主題選擇 */}
                      <div>
                        <Label className="text-base font-semibold mb-4 block">聯絡主題 *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {contactSubjects.map((subject) => (
                            <button
                              key={subject.value}
                              type="button"
                              onClick={() => {
                                setSelectedSubject(subject.value);
                                updateField('subject', subject.label);
                              }}
                              className={`p-3 rounded-lg border text-left transition-colors ${
                                selectedSubject === subject.value
                                  ? 'border-red-500 bg-red-50 text-red-700'
                                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <subject.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{subject.label}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* 基本資訊 */}
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
                            className="mt-1"
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
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">電話號碼</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="請輸入您的電話號碼"
                          className="mt-1"
                        />
                      </div>

                      {/* 詳細訊息 */}
                      <div>
                        <Label htmlFor="message">詳細說明 *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          placeholder="請詳細說明您的需求或問題..."
                          rows={6}
                          required
                          className="mt-1"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          請盡量詳細描述，這有助於我們更好地為您服務
                        </p>
                      </div>

                      <Button 
                        type="submit"
                        disabled={!isValid || isSubmitting || !selectedSubject}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <AlertCircle className="w-5 h-5 mr-2 animate-spin" />
                            發送中...
                          </>
                        ) : isSuccess ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2" />
                            已發送成功
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            發送訊息
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* 右側：聯絡資訊 */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                    聯絡資訊
                  </h2>
                  
                  <div className="space-y-4">
                    {contactDetails.map((detail, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <detail.icon className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-serif font-semibold text-foreground mb-1">
                                {detail.title}
                              </h3>
                              {detail.link === "#" ? (
                                <p className="text-foreground font-medium mb-1">
                                  {detail.value}
                                </p>
                              ) : (
                                <a 
                                  href={detail.link}
                                  className="text-red-600 hover:text-red-700 transition-colors font-medium mb-1 block"
                                >
                                  {detail.value}
                                </a>
                              )}
                              <p className="text-sm text-muted-foreground">
                                {detail.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* 社群媒體 */}
                {socialMedia && socialMedia.length > 0 && (
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                      追蹤我們
                    </h3>
                    <div className="flex space-x-3">
                      {socialMedia.map((social) => (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-gray-200 hover:bg-red-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                          title={social.platform_display}
                        >
                          <span className="font-medium">
                            {social.platform.charAt(0).toUpperCase()}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 回覆時間說明 */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">回覆時間</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• 電子郵件：24 小時內回覆</li>
                          <li>• 電話諮詢：營業時間內即時回覆</li>
                          <li>• 緊急事項：請直接撥打電話</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 常見問題 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                常見問題
              </h2>
              <p className="text-xl text-muted-foreground">
                為您整理了一些常見的問題和解答
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-serif font-semibold text-foreground mb-3 text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                沒有找到您想要的答案？
              </p>
              <Button
                onClick={() => {
                  const contactForm = document.getElementById('message');
                  contactForm?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                直接詢問我們
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 預約參觀 CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-serif font-bold mb-6">
              歡迎參觀工作室
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              親自感受傳統刺繡藝術的魅力，觀看大師現場創作，
              了解每一針每一線背後的故事與技藝
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">預約制參觀</h3>
                <p className="text-sm opacity-80">提前預約，專人導覽</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <div className="font-semibold mb-2">小班教學</div>
                <p className="text-sm opacity-80">可現場觀摩學習</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">精品展示</h3>
                <p className="text-sm opacity-80">近距離欣賞作品</p>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => {
                setSelectedSubject('visit');
                updateField('subject', '預約參觀');
                const form = document.querySelector('form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              立即預約參觀
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPageContent;