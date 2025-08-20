'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Card, Input, Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { contactApi, type ContactForm as ContactFormData } from '@/lib/api';

interface ContactFormProps {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitText: string;
  submittingText: string;
  successText: string;
  errorText: string;
  requiredText: string;
}

export default function ContactForm({
  title,
  subtitle,
  nameLabel,
  emailLabel,
  phoneLabel,
  subjectLabel,
  messageLabel,
  submitText,
  submittingText,
  successText,
  errorText,
  requiredText
}: ContactFormProps) {
  const locale = useLocale();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // 表單驗證
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = requiredText;
    }

    if (!formData.email.trim()) {
      newErrors.email = requiredText;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = locale === 'zh-tw' ? '請輸入有效的電子郵件地址' : 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = requiredText;
    }

    if (!formData.message.trim()) {
      newErrors.message = requiredText;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 處理輸入變更
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await contactApi.submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage(response.message || successText);
        
        // 清空表單
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.message || errorText);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(errorText);
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-medium text-gray-900 mb-4 flex items-center justify-center">
              <span className="w-8 h-8 bg-blue-500 eastern-border flex items-center justify-center mr-4">
                <span className="text-white text-sm">表</span>
              </span>
              {title}
            </h2>
            <p className="font-body text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <Card variant="paper" className="p-8 md:p-12">
            {/* 成功/錯誤訊息 */}
            {submitStatus !== 'idle' && (
              <div className={`mb-8 p-4 eastern-border ${
                submitStatus === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <div className="flex items-center">
                  <span className="mr-2">
                    {submitStatus === 'success' ? '✅' : '❌'}
                  </span>
                  <span className="font-body">{submitMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 姓名和電子郵件 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    {nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={locale === 'zh-tw' ? '請輸入您的姓名' : 'Enter your name'}
                    error={errors.name}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    {emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={locale === 'zh-tw' ? '請輸入您的電子郵件' : 'Enter your email'}
                    error={errors.email}
                    className="w-full"
                  />
                </div>
              </div>

              {/* 電話和主題 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    {phoneLabel}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder={locale === 'zh-tw' ? '請輸入您的電話號碼' : 'Enter your phone number'}
                    error={errors.phone}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block font-body font-medium text-gray-700 mb-2">
                    {subjectLabel} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder={locale === 'zh-tw' ? '請輸入諮詢主題' : 'Enter inquiry subject'}
                    error={errors.subject}
                    className="w-full"
                  />
                </div>
              </div>

              {/* 訊息內容 */}
              <div>
                <label className="block font-body font-medium text-gray-700 mb-2">
                  {messageLabel} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={locale === 'zh-tw' 
                    ? '請詳細描述您的需求或問題，我們將盡快回覆您...' 
                    : 'Please describe your needs or questions in detail, we will reply as soon as possible...'}
                  rows={6}
                  className={`w-full px-4 py-3 border eastern-border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 font-body resize-none ${
                    errors.message ? 'border-red-300' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm font-body">{errors.message}</p>
                )}
              </div>

              {/* 提交按鈕 */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="px-12 py-4 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>{submittingText}</span>
                    </div>
                  ) : (
                    submitText
                  )}
                </Button>
              </div>

              {/* 隱私聲明 */}
              <div className="text-center pt-4">
                <p className="font-body text-xs text-gray-500 leading-relaxed">
                  {locale === 'zh-tw' 
                    ? '提交此表單即表示您同意我們根據隱私政策處理您的個人資料。我們承諾保護您的隱私，不會將您的資料提供給第三方。'
                    : 'By submitting this form, you agree to our processing of your personal data according to our privacy policy. We are committed to protecting your privacy and will not share your data with third parties.'}
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}