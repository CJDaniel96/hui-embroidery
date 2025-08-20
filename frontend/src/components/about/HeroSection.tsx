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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-pulse text-center">
          <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 中國風背景 */}
      <div className="absolute inset-0">
        {/* 基礎漸變 */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50"></div>
        
        {/* 中國風圖案 */}
        <div className="absolute top-1/4 left-1/4 opacity-5">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-red-600">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="20" fill="currentColor"/>
            <path d="M100 20 L120 60 L100 40 L80 60 Z" fill="currentColor"/>
            <path d="M100 180 L120 140 L100 160 L80 140 Z" fill="currentColor"/>
            <path d="M20 100 L60 80 L40 100 L60 120 Z" fill="currentColor"/>
            <path d="M180 100 L140 80 L160 100 L140 120 Z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 opacity-5">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-yellow-600">
            <rect x="25" y="25" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="40" y="40" width="70" height="70" fill="none" stroke="currentColor" strokeWidth="1"/>
            <rect x="55" y="55" width="40" height="40" fill="currentColor"/>
          </svg>
        </div>

        {/* 裝飾元素 */}
        <div className="absolute top-32 left-16 w-24 h-24 chinese-corner bg-red-100 opacity-40 rounded-lg"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 chinese-corner bg-yellow-100 opacity-40 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-1/6 w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* 裝飾性標誌 */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-700 chinese-corner flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl font-bold">慧</span>
              </div>
            </div>

            {/* 標題 */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-red-600 via-red-700 to-amber-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* 副標題 */}
            <p className="text-xl md:text-3xl text-red-600 mb-8 font-medium">
              {subtitle}
            </p>

            {/* 描述 */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>

            {/* 中國風裝飾線 */}
            <div className="mt-12 flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent w-64"></div>
              <div className="mx-4 w-4 h-4 bg-red-600 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent w-64"></div>
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
          className="w-8 h-12 border-2 border-red-400 rounded-full flex justify-center items-start p-2 hover:border-red-600 transition-colors duration-300 group"
        >
          <div className="w-1 h-3 bg-red-400 rounded-full group-hover:bg-red-600 transition-colors duration-300"></div>
        </button>
      </div>
    </section>
  );
}