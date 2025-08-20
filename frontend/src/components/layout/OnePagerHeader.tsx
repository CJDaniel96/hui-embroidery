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
      const sections = ['hero', 'artworks', 'posts', 'about', 'contact'];
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
      const offset = 80; // header高度的偏移
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
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-red-100' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 chinese-corner flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl font-bold">慧</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-red-400 to-red-600 chinese-corner opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                慧繡雅集
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                HUI EMBROIDERY
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-red-300 transition-all duration-300 bg-white/90 backdrop-blur-sm"
              >
                <span className="text-lg">{currentLanguage?.flag}</span>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {currentLanguage?.name}
                </span>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    isLanguageOpen ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 ${
                          locale === lang.code ? 'bg-red-50 text-red-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {locale === lang.code && (
                          <svg className="w-4 h-4 text-red-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-2">
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
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
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