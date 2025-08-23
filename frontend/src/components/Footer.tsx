'use client';

import { useTranslations } from 'next-intl';
import { useContactInfo } from '@/hooks/useContactInfo';

const Footer = () => {
  const t = useTranslations();
  const { data: contactInfo } = useContactInfo();
  
  // 平滑滾動到錨點（與 Header 一致）
  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80;
      const elementPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <footer className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">慧</span>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold">{t('brand.name')}</h3>
                  <p className="text-sm text-gray-400 font-sans">{t('brand.tagline')}</p>
                </div>
              </div>
              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-semibold">{t('footer.quickLinks')}</h4>
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection('#home')}
                  className="block text-gray-300 hover:text-red-300 transition-smooth font-sans text-sm text-left"
                >
                  {t('nav.home')}
                </button>
                <button 
                  onClick={() => scrollToSection('#gallery')}
                  className="block text-gray-300 hover:text-red-300 transition-smooth font-sans text-sm text-left"
                >
                  {t('nav.gallery')}
                </button>
                <button 
                  onClick={() => scrollToSection('#master')}
                  className="block text-gray-300 hover:text-red-300 transition-smooth font-sans text-sm text-left"
                >
                  {t('nav.master')}
                </button>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="block text-gray-300 hover:text-red-300 transition-smooth font-sans text-sm text-left"
                >
                  {t('nav.contact')}
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-semibold">{t('footer.contactInfo')}</h4>
              <div className="space-y-2 text-sm font-sans">
                <p className="text-gray-300">
                  {contactInfo?.address || t('contact.defaults.address')}
                </p>
                <p className="text-gray-300">
                  {t('contact.phone')}: {contactInfo?.phone || t('contact.defaults.phone')}
                </p>
                <p className="text-gray-300">
                  {t('contact.email')}: {contactInfo?.email || t('contact.defaults.email')}
                </p>
                <p className="text-gray-300">
                  {contactInfo?.business_hours || t('contact.defaults.hours')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm font-sans">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;