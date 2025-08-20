'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center paper-texture">
        <div className="animate-pulse text-center">
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen paper-texture overflow-hidden">
      {/* 極簡背景 - 大量留白 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-moon-white via-white to-gray-50"></div>
        
        {/* 抽象幾何 - 印章靈感 */}
        <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-3">
          <div className="w-full h-full border border-vermillion-300 eastern-border"></div>
          <div className="absolute inset-3 bg-vermillion-100"></div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/5 w-16 h-16 opacity-3">
          <div className="w-full h-full border border-gray-300 rounded-full"></div>
          <div className="absolute inset-2 bg-gray-100 rounded-full"></div>
        </div>

        {/* 書法線條 */}
        <div className="absolute top-2/3 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>

      {/* 主要內容 - 居中不對稱 */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* 品牌印章 - 加大尺寸 */}
            <div className="mb-16">
              <div className="w-32 h-32 mx-auto vermillion-bg eastern-border flex items-center justify-center shadow-lg">
                <span className="text-white text-4xl font-title font-bold">慧</span>
              </div>
            </div>

            {/* 主標題 - 宋體風骨，超大留白 */}
            <div className="space-y-8">
              <h1 className="font-title text-6xl md:text-8xl lg:text-9xl font-medium leading-none tracking-wide">
                <span className="block ink-gradient">
                  {title}
                </span>
              </h1>
              
              {/* 副標題 */}
              <div className="relative">
                <p className="font-title text-xl md:text-2xl vermillion-accent font-medium tracking-wide">
                  {subtitle}
                </p>
                {/* 書法線條裝飾 */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-vermillion-400 opacity-60"></div>
              </div>
            </div>

            {/* 大量留白 */}
            <div className="py-12"></div>

            {/* 描述文字 - 控制寬度與行高 */}
            <div className="max-w-3xl mx-auto">
              <p className="font-body text-lg md:text-xl text-gray-600 leading-loose tracking-wide">
                {description}
              </p>
            </div>

            {/* 品牌核心價值 - 極簡展示 */}
            <div className="pt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 eastern-border bg-white flex items-center justify-center">
                    <span className="text-xl">🧵</span>
                  </div>
                  <p className="font-body text-sm text-gray-600">
                    {locale === 'zh-tw' ? '湘繡傳承' : 'Xiang Embroidery Heritage'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 eastern-border bg-white flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                  <p className="font-body text-sm text-gray-600">
                    {locale === 'zh-tw' ? '鬅毛針法' : 'Maomao Technique'}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 eastern-border bg-white flex items-center justify-center">
                    <span className="text-xl">🏆</span>
                  </div>
                  <p className="font-body text-sm text-gray-600">
                    {locale === 'zh-tw' ? '高級訂製' : 'Haute Couture'}
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
            const element = document.getElementById('story');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-8 h-12 border border-gray-300 eastern-border flex justify-center items-start p-2 hover:border-vermillion-400 transition-colors duration-300 group bg-white/80 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full group-hover:bg-vermillion-500 transition-colors duration-300"></div>
        </button>
      </div>
    </section>
  );
}