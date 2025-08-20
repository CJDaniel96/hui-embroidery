'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { contactApi, type ContactInfo as ContactInfoData } from '@/lib/api';

interface ContactInfoProps {
  title: string;
  subtitle: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  hoursLabel: string;
  loadingText: string;
}

export default function ContactInfo({
  title,
  subtitle,
  addressLabel,
  phoneLabel,
  emailLabel,
  hoursLabel,
  loadingText
}: ContactInfoProps) {
  const locale = useLocale();
  const [contactInfo, setContactInfo] = useState<ContactInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const data = await contactApi.getContactInfo();
        setContactInfo(data);
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
        // 使用後備數據
        setContactInfo({
          phone: '+886-2-1234-5678',
          email: 'info@hui-embroidery.com',
          address: locale === 'zh-tw' 
            ? '台北市中正區重慶南路一段122號3樓'
            : '3F, No.122, Chongqing S. Rd., Zhongzheng Dist., Taipei City',
          business_hours: locale === 'zh-tw'
            ? '週一至週五 10:00-18:00\n週六 10:00-16:00\n週日及國定假日休息'
            : 'Monday - Friday: 10:00-18:00\nSaturday: 10:00-16:00\nSunday & Holidays: Closed',
          translations: {
            company_name: locale === 'zh-tw' ? '慧繡雅集' : 'Hui Embroidery'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, [locale]);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LoadingSpinner size="lg" />
            <p className="font-body text-gray-600 mt-4">{loadingText}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!contactInfo) {
    return null;
  }

  // 安全地構建聯絡項目，確保所有值都存在
  const contactItems = [
    {
      id: 'address',
      icon: '📍',
      label: addressLabel,
      value: contactInfo.address || (locale === 'zh-tw' 
        ? '台北市中正區重慶南路一段122號3樓'
        : '3F, No.122, Chongqing S. Rd., Zhongzheng Dist., Taipei City'),
      color: 'red',
      action: () => {
        const address = contactInfo.address || '台北市中正區重慶南路一段122號3樓';
        const encoded = encodeURIComponent(address);
        window.open(`https://maps.google.com/maps?q=${encoded}`, '_blank');
      }
    },
    {
      id: 'phone',
      icon: '📞',
      label: phoneLabel,
      value: contactInfo.phone || '+886-2-1234-5678',
      color: 'blue',
      action: () => {
        const phone = contactInfo.phone || '+886-2-1234-5678';
        window.location.href = `tel:${phone}`;
      }
    },
    {
      id: 'email',
      icon: '📧',
      label: emailLabel,
      value: contactInfo.email || 'info@hui-embroidery.com',
      color: 'green',
      action: () => {
        const email = contactInfo.email || 'info@hui-embroidery.com';
        window.location.href = `mailto:${email}`;
      }
    },
    {
      id: 'hours',
      icon: '🕐',
      label: hoursLabel,
      value: contactInfo.business_hours || (locale === 'zh-tw'
        ? '週一至週五 10:00-18:00\n週六 10:00-16:00\n週日及國定假日休息'
        : 'Monday - Friday: 10:00-18:00\nSaturday: 10:00-16:00\nSunday & Holidays: Closed'),
      color: 'yellow',
      action: null
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-16">
            <h2 className="font-title text-3xl md:text-4xl font-medium text-gray-900 mb-4 flex items-center justify-center">
              <span className="w-8 h-8 bg-green-500 eastern-border flex items-center justify-center mr-4">
                <span className="text-white text-sm">訊</span>
              </span>
              {title}
            </h2>
            <p className="font-body text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* 聯絡資訊網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactItems.map((item, index) => (
              <Card 
                key={item.id}
                variant="paper"
                className={`p-6 text-center transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${
                  item.action ? 'cursor-pointer group' : ''
                }`}
                onClick={item.action || undefined}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* 圖標 */}
                <div className={`w-16 h-16 mx-auto mb-4 eastern-border flex items-center justify-center ${
                  item.color === 'red' ? 'bg-red-500' :
                  item.color === 'blue' ? 'bg-blue-500' :
                  item.color === 'green' ? 'bg-green-500' :
                  'bg-yellow-500'
                } ${item.action ? 'group-hover:scale-110' : ''} transition-transform duration-300`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>

                {/* 標籤 */}
                <h3 className="font-title text-lg font-medium text-gray-900 mb-3">
                  {item.label}
                </h3>

                {/* 內容 - 添加安全檢查 */}
                <div className={`font-body text-gray-600 leading-relaxed ${
                  item.action ? 'group-hover:text-gray-900' : ''
                } transition-colors duration-300`}>
                  {item.value && typeof item.value === 'string' 
                    ? item.value.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className="mb-1">
                          {line}
                        </div>
                      ))
                    : (
                        <div className="mb-1">
                          {item.value || (locale === 'zh-tw' ? '資訊暫不可用' : 'Information unavailable')}
                        </div>
                      )
                  }
                </div>

                {/* 行動提示 */}
                {item.action && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className={`font-body text-xs ${
                      item.color === 'red' ? 'text-red-600' :
                      item.color === 'blue' ? 'text-blue-600' :
                      'text-green-600'
                    } group-hover:underline transition-all duration-300`}>
                      {item.id === 'address' && (locale === 'zh-tw' ? '查看地圖 →' : 'View Map →')}
                      {item.id === 'phone' && (locale === 'zh-tw' ? '立即撥打 →' : 'Call Now →')}
                      {item.id === 'email' && (locale === 'zh-tw' ? '發送郵件 →' : 'Send Email →')}
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* 社群媒體連結 */}
          <div className="mt-16 text-center">
            <h3 className="font-title text-xl font-medium text-gray-900 mb-8">
              {locale === 'zh-tw' ? '關注我們' : 'Follow Us'}
            </h3>
            
            <div className="flex justify-center space-x-6">
              {[
                { name: 'Facebook', icon: '📘', url: '#', color: 'blue' },
                { name: 'Instagram', icon: '📷', url: '#', color: 'pink' },
                { name: 'LINE', icon: '📱', url: '#', color: 'green' },
                { name: 'WeChat', icon: '💬', url: '#', color: 'green' }
              ].map((social) => (
                <button
                  key={social.name}
                  onClick={() => window.open(social.url, '_blank')}
                  className={`w-12 h-12 eastern-border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    social.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                    social.color === 'pink' ? 'bg-pink-500 hover:bg-pink-600' :
                    'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 工作室介紹 */}
          <div className="mt-16">
            <Card variant="silk" className="p-8 text-center">
              <h3 className="font-title text-2xl font-medium text-gray-900 mb-4">
                {contactInfo.translations?.company_name || (locale === 'zh-tw' ? '慧繡雅集' : 'Hui Embroidery')}
              </h3>
              <p className="font-body text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {locale === 'zh-tw' 
                  ? '慧繡雅集位於台北市中心，擁有優雅舒適的工作環境。我們歡迎您預約參觀，親自感受湘繡藝術的魅力，與毛慧大師面對面交流，了解高級訂製的精湛工藝。無論您是藝術愛好者、收藏家，還是希望訂製獨特作品的客戶，我們都竭誠為您服務。'
                  : 'Hui Embroidery is located in the heart of Taipei, featuring an elegant and comfortable studio environment. We welcome you to schedule a visit to experience the charm of Xiang embroidery art firsthand, meet Master Mao Hui face-to-face, and learn about our exquisite haute couture craftsmanship. Whether you are an art enthusiast, collector, or client seeking custom pieces, we are dedicated to serving you.'
                }
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}