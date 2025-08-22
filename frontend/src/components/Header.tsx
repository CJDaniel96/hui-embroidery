'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  // 錨點導航項目
  const navItems = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.gallery'), href: "#gallery" },
    { name: t('nav.master'), href: "#master" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  // 平滑滾動到錨點
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // 計算 Header 高度偏移
      const headerHeight = 80; // Header 的大約高度
      const elementPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    
    // 關閉手機選單
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - 點擊回到頂部 */}
          <button 
            onClick={() => scrollToSection('#home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">慧</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-gray-900">{t('brand.name')}</h1>
              <p className="text-xs text-gray-600 font-sans">{t('brand.tagline')}</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-red-600 transition-smooth font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <LanguageToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:text-red-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white rounded-b-lg">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-red-600 transition-smooth font-medium py-2 text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <LanguageToggle />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;