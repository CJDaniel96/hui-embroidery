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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-pulse text-center">
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 動態背景 */}
      <div className="absolute inset-0">
        {/* 基礎漸變背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-yellow-50"></div>
        
        {/* 中國風裝飾元素 */}
        <div className="absolute top-20 left-10 w-32 h-32 chinese-corner bg-red-100 opacity-30 rounded-lg transform hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 chinese-corner bg-yellow-100 opacity-30 rounded-lg transform hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-red-400 rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
        
        {/* 動態粒子效果 */}
        <div 
          className="absolute w-1 h-1 bg-red-300 rounded-full opacity-40 transition-all duration-1000"
          style={{
            left: `${(mousePosition.x / window.innerWidth) * 20}%`,
            top: `${(mousePosition.y / window.innerHeight) * 20}%`
          }}
        ></div>
        <div 
          className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-40 transition-all duration-1000"
          style={{
            right: `${(mousePosition.x / window.innerWidth) * 15}%`,
            bottom: `${(mousePosition.y / window.innerHeight) * 15}%`
          }}
        ></div>

        {/* 中國風圖案 */}
        <div className="absolute top-1/4 right-20 opacity-10">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-red-600">
            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="60" cy="60" r="10" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* 主要內容 - 確保完全居中 */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-screen pt-20">
            <div className="max-w-4xl w-full text-center">
              {/* 標題 - 使用更精確的居中 */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mx-auto">
                  <span className="block bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
              </div>

              {/* 副標題 */}
              <div className="mb-8">
                <p className="text-xl md:text-3xl text-red-600 font-medium mx-auto max-w-3xl">
                  {subtitle}
                </p>
              </div>

              {/* 描述文字 - 確保居中對齊 */}
              <div className="mb-12">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mx-auto max-w-3xl text-center">
                  {description}
                </p>
              </div>

              {/* CTA 按鈕 */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  onClick={() => scrollToSection('artworks')}
                  variant="chinese" 
                  size="lg" 
                  className="px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  {ctaButtons.gallery}
                </Button>
                <Button 
                  onClick={() => scrollToSection('about')}
                  variant="outline" 
                  size="lg" 
                  className="px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  {ctaButtons.about}
                </Button>
              </div>

              {/* 特色標籤 */}
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full text-sm text-gray-700 chinese-corner hover:shadow-lg transition-all duration-300">
                  {locale === 'zh-tw' ? '🎨 傳統工藝' : '🎨 Traditional Craft'}
                </span>
                <span className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full text-sm text-gray-700 chinese-corner hover:shadow-lg transition-all duration-300">
                  {locale === 'zh-tw' ? '🧵 精湛技藝' : '🧵 Exquisite Skills'}
                </span>
                <span className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-red-200 rounded-full text-sm text-gray-700 chinese-corner hover:shadow-lg transition-all duration-300">
                  {locale === 'zh-tw' ? '🏛️ 文化傳承' : '🏛️ Cultural Heritage'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 向下滾動指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('artworks')}
          className="w-8 h-12 border-2 border-red-400 rounded-full flex justify-center items-start p-2 hover:border-red-600 transition-colors duration-300 group"
        >
          <div className="w-1 h-3 bg-red-400 rounded-full group-hover:bg-red-600 transition-colors duration-300"></div>
        </button>
      </div>
    </section>
  );
}