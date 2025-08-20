'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface HeaderProps {
  navigation: {
    home: string;
    gallery: string;
    about: string;
    blog: string;
    contact: string;
  };
}

export default function Header({ navigation }: HeaderProps) {
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: navigation.home },
    { href: '/gallery', label: navigation.gallery },
    { href: '/about', label: navigation.about },
    { href: '/blog', label: navigation.blog },
    { href: '/contact', label: navigation.contact },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 chinese-corner"></div>
            <span className="text-xl font-bold text-gray-900">慧繡雅集</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              locale="zh-tw"
              className={`px-3 py-1 rounded-lg transition-colors duration-200 ${
                locale === 'zh-tw'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              中文
            </Link>
            <Link
              href="/"
              locale="en"
              className={`px-3 py-1 rounded-lg transition-colors duration-200 ${
                locale === 'en'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              EN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-5 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-gray-600 transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-gray-600 transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-gray-600 transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">語言:</span>
                <Link
                  href="/"
                  locale="zh-tw"
                  className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm ${
                    locale === 'zh-tw'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  中文
                </Link>
                <Link
                  href="/"
                  locale="en"
                  className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm ${
                    locale === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  EN
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}