'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Card, Input, Badge } from '@/components/ui';
import { Header, Footer } from '@/components/layout';
import { LoadingSpinner } from '@/components/common';

export default function ComponentsDemo() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    setMounted(true);
    
    // 手動設定翻譯（避免 SSR/CSR 不一致）
    const navigationTranslations = {
      'zh-tw': {
        home: '首頁',
        gallery: '作品集',
        about: '關於我們',
        blog: '部落格',
        contact: '聯絡我們'
      },
      'en': {
        home: 'Home',
        gallery: 'Gallery',
        about: 'About',
        blog: 'Blog',
        contact: 'Contact'
      }
    };

    const footerTranslations = {
      'zh-tw': {
        copyright: '版權所有',
        allRightsReserved: '保留所有權利',
        quickLinks: '快速連結',
        contact: '聯絡資訊',
        followUs: '關注我們'
      },
      'en': {
        copyright: 'Copyright',
        allRightsReserved: 'All Rights Reserved',
        quickLinks: 'Quick Links',
        contact: 'Contact Info',
        followUs: 'Follow Us'
      }
    };

    setTranslations({
      navigation: navigationTranslations[locale as keyof typeof navigationTranslations],
      footer: footerTranslations[locale as keyof typeof footerTranslations]
    });
  }, [locale]);

  // 載入狀態
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const { navigation, footer } = translations;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigation={navigation} />
      
      <main className="container mx-auto py-12 space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === 'zh-tw' ? 'UI 元件展示' : 'UI Components Demo'}
          </h1>
          <p className="text-lg text-gray-600">
            {locale === 'zh-tw' ? '慧繡雅集設計系統元件庫' : 'Hui Embroidery Design System Components'}
          </p>
        </div>

        {/* Button Examples */}
        <Card className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'zh-tw' ? '按鈕元件' : 'Button Components'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button variant="primary">
              {locale === 'zh-tw' ? '主要按鈕' : 'Primary'}
            </Button>
            <Button variant="secondary">
              {locale === 'zh-tw' ? '次要按鈕' : 'Secondary'}
            </Button>
            <Button variant="outline">
              {locale === 'zh-tw' ? '外框按鈕' : 'Outline'}
            </Button>
            <Button variant="ghost">
              {locale === 'zh-tw' ? '幽靈按鈕' : 'Ghost'}
            </Button>
            <Button variant="chinese">
              {locale === 'zh-tw' ? '中國風按鈕' : 'Chinese Style'}
            </Button>
          </div>
          <div className="flex gap-4">
            <Button size="sm">{locale === 'zh-tw' ? '小按鈕' : 'Small'}</Button>
            <Button size="md">{locale === 'zh-tw' ? '中等按鈕' : 'Medium'}</Button>
            <Button size="lg">{locale === 'zh-tw' ? '大按鈕' : 'Large'}</Button>
            <Button loading>{locale === 'zh-tw' ? '載入中...' : 'Loading...'}</Button>
          </div>
        </Card>

        {/* Card Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="default">
            <h3 className="font-bold mb-2">
              {locale === 'zh-tw' ? '預設卡片' : 'Default Card'}
            </h3>
            <p className="text-gray-600">
              {locale === 'zh-tw' ? '這是一個預設樣式的卡片元件。' : 'This is a default style card component.'}
            </p>
          </Card>
          <Card variant="outlined">
            <h3 className="font-bold mb-2">
              {locale === 'zh-tw' ? '外框卡片' : 'Outlined Card'}
            </h3>
            <p className="text-gray-600">
              {locale === 'zh-tw' ? '這是一個有外框的卡片元件。' : 'This is an outlined card component.'}
            </p>
          </Card>
          <Card variant="elevated">
            <h3 className="font-bold mb-2">
              {locale === 'zh-tw' ? '陰影卡片' : 'Elevated Card'}
            </h3>
            <p className="text-gray-600">
              {locale === 'zh-tw' ? '這是一個有陰影的卡片元件。' : 'This is an elevated card component.'}
            </p>
          </Card>
          <Card variant="chinese">
            <h3 className="font-bold mb-2">
              {locale === 'zh-tw' ? '中國風卡片' : 'Chinese Style Card'}
            </h3>
            <p className="text-gray-600">
              {locale === 'zh-tw' ? '這是一個中國風樣式的卡片元件。' : 'This is a Chinese style card component.'}
            </p>
          </Card>
        </div>

        {/* Input Examples */}
        <Card className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'zh-tw' ? '輸入框元件 (抗擴充功能干擾)' : 'Input Components (Extension-Resistant)'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label={locale === 'zh-tw' ? '姓名' : 'Name'} 
              placeholder={locale === 'zh-tw' ? '請輸入您的姓名' : 'Enter your name'} 
            />
            <Input 
              label={locale === 'zh-tw' ? '電子郵件' : 'Email'} 
              type="email" 
              placeholder="example@email.com" 
            />
            <Input 
              label={locale === 'zh-tw' ? '密碼' : 'Password'} 
              type="password" 
              hint={locale === 'zh-tw' ? '密碼至少需要 8 個字符' : 'Password must be at least 8 characters'} 
            />
            <Input 
              label={locale === 'zh-tw' ? '錯誤示例' : 'Error Example'} 
              error={locale === 'zh-tw' ? '此欄位為必填' : 'This field is required'} 
            />
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>{locale === 'zh-tw' ? '💡 提示：' : '💡 Tip: '}</strong>
              {locale === 'zh-tw' 
                ? '這些輸入框已加強防護，可以抵禦密碼管理器和表單填入擴充功能的干擾。'
                : 'These input fields are hardened against password manager and form-filling extension interference.'
              }
            </p>
          </div>
        </Card>

        {/* Badge Examples */}
        <Card className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'zh-tw' ? '標籤元件' : 'Badge Components'}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{locale === 'zh-tw' ? '預設' : 'Default'}</Badge>
            <Badge variant="primary">{locale === 'zh-tw' ? '主要' : 'Primary'}</Badge>
            <Badge variant="secondary">{locale === 'zh-tw' ? '次要' : 'Secondary'}</Badge>
            <Badge variant="success">{locale === 'zh-tw' ? '成功' : 'Success'}</Badge>
            <Badge variant="warning">{locale === 'zh-tw' ? '警告' : 'Warning'}</Badge>
            <Badge variant="danger">{locale === 'zh-tw' ? '危險' : 'Danger'}</Badge>
            <Badge variant="chinese">{locale === 'zh-tw' ? '中國風' : 'Chinese Style'}</Badge>
          </div>
          <div className="flex gap-2">
            <Badge size="sm">{locale === 'zh-tw' ? '小標籤' : 'Small'}</Badge>
            <Badge size="md">{locale === 'zh-tw' ? '中等標籤' : 'Medium'}</Badge>
            <Badge size="lg">{locale === 'zh-tw' ? '大標籤' : 'Large'}</Badge>
          </div>
        </Card>

        {/* Loading Spinner Examples */}
        <Card className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'zh-tw' ? '載入指示器' : 'Loading Indicators'}
          </h2>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <p className="mt-2 text-sm text-gray-600">
                {locale === 'zh-tw' ? '小' : 'Small'}
              </p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <p className="mt-2 text-sm text-gray-600">
                {locale === 'zh-tw' ? '中' : 'Medium'}
              </p>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 text-sm text-gray-600">
                {locale === 'zh-tw' ? '大' : 'Large'}
              </p>
            </div>
          </div>
        </Card>

        {/* Status Information */}
        <Card className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'zh-tw' ? '系統狀態' : 'System Status'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">
                ✅ {locale === 'zh-tw' ? '純客戶端渲染' : 'Client-Side Rendered'}
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-800">
                ✅ {locale === 'zh-tw' ? '抗擴充功能干擾' : 'Extension-Resistant'}
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded">
              <p className="text-purple-800">
                ✅ {locale === 'zh-tw' ? '響應式設計' : 'Responsive Design'}
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Footer text={footer} navigation={navigation} />
    </div>
  );
}