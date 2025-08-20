'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Input, Button } from '@/components/ui';

interface BlogHeroProps {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  onSearch: (query: string) => void;
}

export default function BlogHero({ 
  title, 
  subtitle, 
  searchPlaceholder,
  onSearch 
}: BlogHeroProps) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  if (!mounted) {
    return (
      <div className="py-16 paper-texture">
        <div className="container mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 paper-texture border-b border-gray-100">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-32 h-32 opacity-3">
          <div className="w-full h-full border border-vermillion-300 eastern-border"></div>
          <div className="absolute inset-4 bg-vermillion-100"></div>
        </div>
        <div className="absolute bottom-20 left-1/6 w-20 h-20 opacity-3">
          <div className="w-full h-full border border-gray-300 rounded-full"></div>
          <div className="absolute inset-2 bg-gray-100 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* 主標題區域 */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* 裝飾性印章 */}
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto vermillion-bg eastern-border flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-title font-bold">文</span>
            </div>
          </div>

          <h1 className="font-title text-5xl md:text-7xl font-medium text-gray-900 mb-6 leading-tight">
            <span className="ink-gradient brush-stroke">
              {title}
            </span>
          </h1>
          
          <p className="font-body text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* 搜尋區域 */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full h-12 text-lg bg-white/80 backdrop-blur-sm border-gray-200 eastern-border"
                />
              </div>
              <Button 
                type="submit"
                variant="seal" 
                size="lg"
                className="h-12 px-8"
              >
                {locale === 'zh-tw' ? '搜尋' : 'Search'}
              </Button>
            </div>
          </form>

          {/* 搜尋提示 */}
          <p className="font-body text-sm text-gray-500 mt-4">
            {locale === 'zh-tw' 
              ? '探索湘繡技法、藝術心得、大師見解' 
              : 'Explore Xiang embroidery techniques, artistic insights, and master perspectives'}
          </p>
        </div>

        {/* 書法線條裝飾 */}
        <div className="mt-16 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-vermillion-300 to-transparent w-32"></div>
          <div className="mx-4 w-2 h-2 bg-vermillion-400 rounded-full"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-vermillion-300 to-transparent w-32"></div>
        </div>
      </div>
    </section>
  );
}