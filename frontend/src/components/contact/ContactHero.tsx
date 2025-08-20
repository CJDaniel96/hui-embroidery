'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

interface ContactHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ContactHero({ title, subtitle, description }: ContactHeroProps) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center paper-texture">
        <div className="animate-pulse text-center">
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-[60vh] paper-texture overflow-hidden">
      {/* 極簡背景裝飾 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-moon-white via-white to-gray-50"></div>
        
        {/* 抽象幾何 - 通訊靈感 */}
        <div className="absolute top-1/4 right-1/3 w-20 h-20 opacity-5">
          <div className="w-full h-full border border-blue-300 rounded-full"></div>
          <div className="absolute inset-2 bg-blue-100 rounded-full"></div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 w-16 h-16 opacity-5">
          <div className="w-full h-full border border-green-300 eastern-border"></div>
          <div className="absolute inset-3 bg-green-100"></div>
        </div>

        {/* 連接線條 */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center space-y-12 py-20">
            {/* 聯絡印章 */}
            <div className="mb-12">
              <div className="w-24 h-24 mx-auto bg-blue-500 eastern-border flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-title font-bold">聯</span>
              </div>
            </div>

            {/* 主標題 */}
            <div className="space-y-6">
              <h1 className="font-title text-5xl md:text-7xl lg:text-8xl font-medium leading-none tracking-wide">
                <span className="block ink-gradient">
                  {title}
                </span>
              </h1>
              
              {/* 副標題 */}
              <div className="relative">
                <p className="font-title text-lg md:text-xl text-blue-600 font-medium tracking-wide">
                  {subtitle}
                </p>
                {/* 書法線條裝飾 */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-blue-400 opacity-60"></div>
              </div>
            </div>

            {/* 大量留白 */}
            <div className="py-8"></div>

            {/* 描述文字 */}
            <div className="max-w-2xl mx-auto">
              <p className="font-body text-lg md:text-xl text-gray-600 leading-loose tracking-wide">
                {description}
              </p>
            </div>

            {/* 聯絡方式概覽 */}
            <div className="pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 eastern-border bg-white flex items-center justify-center shadow-sm">
                    <span className="text-lg">📧</span>
                  </div>
                  <p className="font-body text-sm text-gray-600">
                    {locale === 'zh-tw' ? '電子郵件' : 'Email'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 eastern-border bg-white flex items-center justify-center shadow-sm">
                    <span className="text-lg">📞</span>
                  </div>
                  <p className="font-body text-sm text-gray-600">
                    {locale === 'zh-tw' ? '電話諮詢' : 'Phone'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 eastern-border bg-white flex items-center justify-center shadow-sm">
                    <span className="text-lg">📍</span>
                  </div>
                  <p className="font-body text-sm text-gray-600">
                    {locale === 'zh-tw' ? '工作室地址' : 'Studio Address'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 向下滾動指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => {
            const element = document.getElementById('contact-form');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-8 h-12 border border-gray-300 eastern-border flex justify-center items-start p-2 hover:border-blue-400 transition-colors duration-300 group bg-white/80 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
        </button>
      </div>
    </section>
  );
}