'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface OnePagerHeaderProps {
  navigation: {
    home: string;
    gallery: string;
    about: string;
    blog: string;
    contact: string;
  };
}

export default function OnePagerHeader({ navigation }: OnePagerHeaderProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 監控滾動狀態
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 檢測當前在哪個section
      const sections = ['hero', 'artworks', 'about', 'posts', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滾動到指定section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  // 語言切換
  const changeLanguage = (newLocale: string) => {
    router.push('/', { locale: newLocale });
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: 'zh-tw', name: '繁體中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo - 印章風格 */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-4 group"
          >
            {/* 印章標誌 */}
            <div className="relative">
              <div className="w-12 h-12 vermillion-bg eastern-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <span className="text-white text-xl font-title font-bold">慧</span>
              </div>
            </div>
            
            {/* 品牌名稱 */}
            <div className="hidden sm:block">
              <div className="font-title text-xl font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300">
                慧繡雅集
              </div>
              <div className="font-body text-xs text-gray-500 -mt-1 tracking-wider">
                HUI EMBROIDERY
              </div>
            </div>
          </button>

          {/* Desktop Navigation - 極簡風格 */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { id: 'hero', label: navigation.home },
              { id: 'artworks', label: navigation.gallery },
              { id: 'about', label: navigation.about },
              { id: 'posts', label: navigation.blog },
              { id: 'contact', label: navigation.contact }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-body font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-vermillion-600'
                    : 'text-gray-600 hover:text-vermillion-600'
                }`}
              >
                {item.label}
                {/* 活躍狀態指示器 - 書法線條 */}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-vermillion-600 rounded-full animate-brushStroke"></div>
                )}
              </button>
            ))}
          </nav>

          {/* 右側控制區 */}
          <div className="flex items-center space-x-4">
            {/* 語言選擇器 - 東方風格下拉選單 */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 eastern-border hover:border-vermillion-300 transition-all duration-300 shadow-sm"
              >
                <span className="text-base">{currentLanguage?.flag}</span>
                <span className="hidden sm:block font-body text-sm text-gray-700">
                  {locale === 'zh-tw' ? '中' : 'EN'}
                </span>
                <svg 
                  className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* 下拉選單 - 宣紙風格 */}
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 paper-card shadow-lg border border-gray-200 z-10">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                          locale === lang.code 
                            ? 'bg-vermillion-50 text-vermillion-700 border-r-2 border-vermillion-500' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="font-body font-medium">{lang.name}</span>
                        {locale === lang.code && (
                          <div className="ml-auto w-2 h-2 bg-vermillion-500 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 transition-colors duration-200 eastern-border"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - 宣紙風格 */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 paper-texture">
            <nav className="space-y-1">
              {[
                { id: 'hero', label: navigation.home },
                { id: 'artworks', label: navigation.gallery },
                { id: 'about', label: navigation.about },
                { id: 'posts', label: navigation.blog },
                { id: 'contact', label: navigation.contact }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 font-body font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-vermillion-600 bg-vermillion-50 border-r-2 border-vermillion-500'
                      : 'text-gray-700 hover:text-vermillion-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}