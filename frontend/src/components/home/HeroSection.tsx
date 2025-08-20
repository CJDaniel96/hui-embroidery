'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: {
    gallery: string;
    about: string;
  };
}

export default function HeroSection({ title, subtitle, description, ctaButtons }: HeroSectionProps) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

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
    <section id="hero" className="relative min-h-screen paper-texture overflow-hidden">
      {/* 背景裝飾 - 抽象東方元素 */}
      <div className="absolute inset-0">
        {/* 大面積留白背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-moon-white via-white to-gray-50"></div>
        
        {/* 抽象幾何裝飾 - 靈感來自印章 */}
        <div className="absolute top-1/4 right-1/6 w-32 h-32 opacity-5">
          <div className="w-full h-full border-2 border-vermillion-600 rounded-lg transform rotate-12"></div>
          <div className="absolute inset-4 border border-vermillion-500 rounded"></div>
          <div className="absolute inset-8 bg-vermillion-400 rounded-sm"></div>
        </div>
        
        <div className="absolute bottom-1/3 left-1/6 w-24 h-24 opacity-5">
          <div className="w-full h-full border border-gray-400 rounded-full"></div>
          <div className="absolute inset-2 border border-gray-500 rounded-full"></div>
          <div className="absolute inset-6 bg-gray-600 rounded-full"></div>
        </div>

        {/* 書法線條裝飾 */}
        <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute bottom-1/4 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-vermillion-300 to-transparent"></div>
      </div>

      {/* 主要內容 - 不對稱佈局 */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full">
          <div className="asymmetrical-hero">
            {/* 左側：主要內容 */}
            <div className="space-y-8 animate-slideInLeft">
              {/* 品牌印章 */}
              <div className="mb-12">
                <div className="w-20 h-20 vermillion-bg eastern-border flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-title font-bold">慧</span>
                </div>
              </div>

              {/* 主標題 - 宋體風骨 */}
              <div className="space-y-4">
                <h1 className="font-title text-6xl md:text-8xl font-medium leading-tight">
                  <span className="block ink-gradient brush-stroke">
                    {title}
                  </span>
                </h1>
                
                {/* 副標題 */}
                <p className="font-title text-xl md:text-2xl vermillion-accent font-medium">
                  {subtitle}
                </p>
              </div>

              {/* 描述文字 - 黑體清晰 */}
              <div className="max-w-2xl">
                <p className="font-body text-lg md:text-xl text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* 行動按鈕 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button 
                  onClick={() => scrollToSection('artworks')}
                  variant="seal" 
                  size="lg"
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  {ctaButtons.gallery}
                </Button>
                <Button 
                  onClick={() => scrollToSection('about')}
                  variant="outline" 
                  size="lg"
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  {ctaButtons.about}
                </Button>
              </div>

              {/* 特色標籤 - 印章風格 */}
              <div className="flex flex-wrap gap-4 pt-8">
                <div className="px-4 py-2 bg-white border border-gray-200 eastern-border text-sm text-gray-600 hover:border-vermillion-300 transition-all duration-300">
                  {locale === 'zh-tw' ? '🧵 湘繡傳承' : '🧵 Xiang Embroidery'}
                </div>
                <div className="px-4 py-2 bg-white border border-gray-200 eastern-border text-sm text-gray-600 hover:border-vermillion-300 transition-all duration-300">
                  {locale === 'zh-tw' ? '✨ 鬅毛針法' : '✨ Maomao Technique'}
                </div>
                <div className="px-4 py-2 bg-white border border-gray-200 eastern-border text-sm text-gray-600 hover:border-vermillion-300 transition-all duration-300">
                  {locale === 'zh-tw' ? '🏆 國際大獎' : '🏆 International Awards'}
                </div>
              </div>
            </div>

            {/* 右側：視覺區域 */}
            <div className="relative animate-slideInRight">
              {/* 主視覺區域 - 大師作品展示 */}
              <div className="relative">
                {/* 主要展示框 */}
                <div className="w-full aspect-square max-w-lg mx-auto paper-card">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    {/* 作品佔位符 */}
                    <div className="text-center">
                      <div className="text-6xl text-gray-400 mb-4">🎨</div>
                      <p className="text-gray-500 font-body">
                        {locale === 'zh-tw' ? '大師代表作品' : 'Master Artwork'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 裝飾性小卡片 */}
                <div className="absolute -top-4 -right-4 w-24 h-24 vermillion-bg eastern-border flex items-center justify-center text-white font-title text-sm opacity-90">
                  30+<br/>年
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white eastern-border flex items-center justify-center text-gray-600 font-body text-xs text-center shadow-md">
                  湘繡<br/>世家
                </div>
              </div>

              {/* 背景裝飾圓形 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gray-200 rounded-full opacity-20 -z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-vermillion-200 rounded-full opacity-30 -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 向下滾動指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('artworks')}
          className="w-8 h-12 border border-gray-400 rounded-full flex justify-center items-start p-2 hover:border-vermillion-500 transition-colors duration-300 group bg-white/80 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full group-hover:bg-vermillion-500 transition-colors duration-300"></div>
        </button>
      </div>
    </section>
  );
}