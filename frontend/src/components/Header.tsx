'use client';

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();
  
  // 判斷是否在主頁（移除語言前綴後檢查）
  const cleanPathname = pathname.replace(/^\/(zh-tw|en)/, '') || '/';
  const isHomePage = cleanPathname === '/';

  // 錨點導航項目
  const navItems = [
    { name: t('nav.home'), href: "#home", route: "/" },
    { name: t('nav.gallery'), href: "#gallery", route: "/" },
    { name: t('nav.master'), href: "#master", route: "/" },
    { name: t('nav.contact'), href: "#contact", route: "/" },
  ];

  // 導航處理函數
  const handleNavigation = (item: { href: string, route: string }) => {
    if (isHomePage) {
      // 在主頁，使用錨點滾動
      scrollToSection(item.href);
    } else {
      // 在其他頁面，先跳轉到主頁再滾動到對應區塊
      window.location.href = `${item.route}${item.href}`;
    }
    setIsMenuOpen(false);
  };

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
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - 點擊回到主頁 */}
          <Link 
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">慧</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-gray-900">{t('brand.name')}</h1>
              <p className="text-xs text-gray-600 font-sans">{t('brand.tagline')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className="text-gray-700 hover:text-red-900 transition-smooth font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <LanguageToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:text-red-900"
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
                  onClick={() => handleNavigation(item)}
                  className="text-gray-700 hover:text-red-900 transition-smooth font-medium py-2 text-left"
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