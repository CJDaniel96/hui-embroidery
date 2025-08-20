'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card, Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { contactApi, type ContactInfo as ContactInfoType } from '@/lib/api';

interface ContactInfoProps {
  title: string;
  subtitle: string;
  getInTouchText: string;
  loadingText: string;
  errorText: string;
  retryText: string;
}

export default function ContactInfo({ 
  title, 
  subtitle, 
  getInTouchText,
  loadingText, 
  errorText, 
  retryText 
}: ContactInfoProps) {
  const locale = useLocale();
  const [contactInfo, setContactInfo] = useState<ContactInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactApi.getContactInfo();
      setContactInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contact info');
      console.error('Failed to fetch contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const defaultContactInfo = {
    phone: "+886-2-1234-5678",
    email: "info@hui-embroidery.com",
    address: locale === 'zh-tw' ? "台北市中正區..." : "Taipei, Taiwan",
    business_hours: locale === 'zh-tw' ? "週一至週五 9:00-18:00" : "Mon-Fri 9:00-18:00",
    translations: {
      company_name: locale === 'zh-tw' ? "慧繡雅集" : "Hui Embroidery"
    }
  };

  const displayInfo = contactInfo || defaultContactInfo;

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 電話 */}
          <Card className="bg-gray-800 border-gray-700 text-center p-6">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              {locale === 'zh-tw' ? '聯絡電話' : 'Phone'}
            </h3>
            <p className="text-gray-300">
              {loading ? loadingText : displayInfo.phone}
            </p>
          </Card>

          {/* 電子郵件 */}
          <Card className="bg-gray-800 border-gray-700 text-center p-6">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              {locale === 'zh-tw' ? '電子郵件' : 'Email'}
            </h3>
            <p className="text-gray-300 break-all">
              {loading ? loadingText : displayInfo.email}
            </p>
          </Card>

          {/* 地址 */}
          <Card className="bg-gray-800 border-gray-700 text-center p-6">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              {locale === 'zh-tw' ? '工作室地址' : 'Studio Address'}
            </h3>
            <p className="text-gray-300">
              {loading ? loadingText : displayInfo.address}
            </p>
          </Card>

          {/* 營業時間 */}
          <Card className="bg-gray-800 border-gray-700 text-center p-6">
            <div className="text-3xl mb-4">🕒</div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              {locale === 'zh-tw' ? '營業時間' : 'Business Hours'}
            </h3>
            <p className="text-gray-300">
              {loading ? loadingText : displayInfo.business_hours}
            </p>
          </Card>
        </div>

        {/* 錯誤處理 */}
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-400 mb-4">{errorText}: {error}</p>
            <Button onClick={fetchContactInfo} variant="primary">
              {retryText}
            </Button>
          </div>
        )}

        {/* CTA 按鈕 */}
        <div className="text-center">
          <Link href="/contact">
            <Button variant="chinese" size="lg" className="px-12 py-4">
              {getInTouchText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}