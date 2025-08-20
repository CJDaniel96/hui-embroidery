'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';

interface LocationMapProps {
  title: string;
  subtitle: string;
  directionsText: string;
}

export default function LocationMap({ title, subtitle, directionsText }: LocationMapProps) {
  const locale = useLocale();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // 模擬地圖載入
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const studioAddress = locale === 'zh-tw' 
    ? '台北市中正區重慶南路一段122號3樓'
    : '3F, No.122, Chongqing S. Rd., Zhongzheng Dist., Taipei City';

  const directions = locale === 'zh-tw' ? [
    {
      method: '捷運',
      description: '台北車站 M6 出口，步行約 5 分鐘',
      icon: '🚇'
    },
    {
      method: '公車',
      description: '重慶南路口站，多路公車可達',
      icon: '🚌'
    },
    {
      method: '開車',
      description: '附近有多個收費停車場',
      icon: '🚗'
    }
  ] : [
    {
      method: 'MRT',
      description: 'Taipei Main Station Exit M6, 5-minute walk',
      icon: '🚇'
    },
    {
      method: 'Bus',
      description: 'Chongqing S. Rd. stop, multiple bus routes',
      icon: '🚌'
    },
    {
      method: 'Car',
      description: 'Several paid parking lots nearby',
      icon: '🚗'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-16">
            <h2 className="font-title text-3xl md:text-4xl font-medium text-gray-900 mb-4 flex items-center justify-center">
              <span className="w-8 h-8 bg-red-500 eastern-border flex items-center justify-center mr-4">
                <span className="text-white text-sm">址</span>
              </span>
              {title}
            </h2>
            <p className="font-body text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 地圖區域 */}
            <div className="lg:col-span-2">
              <Card variant="paper" className="overflow-hidden">
                <div className="relative h-96 bg-gray-100">
                  {!mapLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 animate-spin eastern-border bg-gray-200"></div>
                        <p className="font-body text-gray-500">
                          {locale === 'zh-tw' ? '載入地圖中...' : 'Loading map...'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                      {/* 模擬地圖介面 */}
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-500 eastern-border flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl">📍</span>
                        </div>
                        <h3 className="font-title text-lg font-medium text-gray-900 mb-2">
                          {locale === 'zh-tw' ? '慧繡雅集' : 'Hui Embroidery'}
                        </h3>
                        <p className="font-body text-sm text-gray-600 max-w-xs">
                          {studioAddress}
                        </p>
                        <button 
                          onClick={() => {
                            const encoded = encodeURIComponent(studioAddress);
                            window.open(`https://maps.google.com/maps?q=${encoded}`, '_blank');
                          }}
                          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm eastern-border transition-colors duration-200"
                        >
                          {directionsText}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* 交通指南 */}
            <div className="space-y-6">
              <Card variant="paper" className="p-6">
                <h3 className="font-title text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-500 eastern-border flex items-center justify-center mr-3">
                    <span className="text-white text-xs">交</span>
                  </span>
                  {locale === 'zh-tw' ? '交通指南' : 'Transportation'}
                </h3>
                
                <div className="space-y-4">
                  {directions.map((direction, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-lg flex-shrink-0">{direction.icon}</span>
                      <div>
                        <h4 className="font-body font-medium text-gray-900">
                          {direction.method}
                        </h4>
                        <p className="font-body text-sm text-gray-600 leading-relaxed">
                          {direction.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 附近地標 */}
              <Card variant="paper" className="p-6">
                <h3 className="font-title text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-500 eastern-border flex items-center justify-center mr-3">
                    <span className="text-white text-xs">標</span>
                  </span>
                  {locale === 'zh-tw' ? '附近地標' : 'Nearby Landmarks'}
                </h3>
                
                <div className="space-y-3">
                  {locale === 'zh-tw' ? [
                    '台北車站 (步行 5 分鐘)',
                    '台北郵局 (步行 3 分鐘)',
                    '台灣博物館 (步行 8 分鐘)',
                    '二二八和平公園 (步行 10 分鐘)'
                  ] : [
                    'Taipei Main Station (5-min walk)',
                    'Taipei Post Office (3-min walk)',
                    'National Taiwan Museum (8-min walk)',
                    '228 Peace Memorial Park (10-min walk)'
                  ].map((landmark, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-body text-sm text-gray-600">{landmark}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 預約參觀 */}
              <Card variant="silk" className="p-6 text-center">
                <h3 className="font-title text-lg font-medium text-gray-900 mb-3">
                  {locale === 'zh-tw' ? '預約參觀' : 'Schedule Visit'}
                </h3>
                <p className="font-body text-gray-600 text-sm mb-4 leading-relaxed">
                  {locale === 'zh-tw' 
                    ? '歡迎預約參觀我們的工作室，親身體驗湘繡藝術的魅力'
                    : 'Welcome to schedule a studio visit and experience the charm of Xiang embroidery art'}
                </p>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact-form');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2 bg-vermillion-500 hover:bg-vermillion-600 text-white text-sm eastern-border transition-colors duration-200"
                >
                  {locale === 'zh-tw' ? '立即預約' : 'Book Now'}
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}