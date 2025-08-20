'use client';

import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface FooterProps {
  text: {
    copyright: string;
    allRightsReserved: string;
    quickLinks: string;
    contact: string;
    followUs: string;
  };
  navigation: {
    home: string;
    gallery: string;
    about: string;
    blog: string;
    contact: string;
  };
}

export default function Footer({ text, navigation }: FooterProps) {
  const locale = useLocale();
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: navigation.home, href: '/' },
    { name: navigation.gallery, href: '/gallery' },
    { name: navigation.about, href: '/about' },
    { name: navigation.blog, href: '/blog' },
    { name: navigation.contact, href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Line', icon: '📱', href: '#' },
    { name: 'WeChat', icon: '💬', href: '#' }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 border border-white eastern-border"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white eastern-border"></div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 品牌資訊 */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {/* 品牌標誌 */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-vermillion-500 eastern-border flex items-center justify-center">
                  <span className="text-white text-xl font-title font-bold">慧</span>
                </div>
                <div>
                  <div className="font-title text-xl font-medium text-white">
                    慧繡雅集
                  </div>
                  <div className="font-body text-xs text-gray-300 tracking-wider">
                    HUI EMBROIDERY
                  </div>
                </div>
              </div>
              
              <p className="font-body text-gray-300 text-sm leading-relaxed">
                {locale === 'zh-tw' 
                  ? '專注於湘繡藝術的傳承與創新，由國際刺繡大師毛慧創立，為您呈現獨一無二的高級訂製刺繡藝術。'
                  : 'Focusing on the inheritance and innovation of Xiang embroidery art, founded by international embroidery master Mao Hui, presenting unique haute couture embroidery art.'
                }
              </p>
            </div>
          </div>

          {/* 快速連結 */}
          <div className="lg:col-span-1">
            <h3 className="font-title text-lg font-medium text-white mb-6 flex items-center">
              <span className="w-6 h-6 bg-vermillion-500 eastern-border flex items-center justify-center mr-3">
                <span className="text-white text-xs">連</span>
              </span>
              {text.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="font-body text-gray-300 hover:text-white transition-colors duration-300 text-sm block w-full text-left hover:translate-x-1 transform transition-transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div className="lg:col-span-1">
            <h3 className="font-title text-lg font-medium text-white mb-6 flex items-center">
              <span className="w-6 h-6 bg-blue-500 eastern-border flex items-center justify-center mr-3">
                <span className="text-white text-xs">聯</span>
              </span>
              {text.contact}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-vermillion-400 mt-1">📍</span>
                <div>
                  <p className="font-body text-gray-300 text-sm">
                    {locale === 'zh-tw' ? '台北市中正區...' : 'Taipei, Taiwan'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-vermillion-400 mt-1">📞</span>
                <div>
                  <a 
                    href="tel:+886-2-1234-5678" 
                    className="font-body text-gray-300 hover:text-white text-sm transition-colors duration-300"
                  >
                    +886-2-1234-5678
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-vermillion-400 mt-1">📧</span>
                <div>
                  <a 
                    href="mailto:info@hui-embroidery.com" 
                    className="font-body text-gray-300 hover:text-white text-sm transition-colors duration-300"
                  >
                    info@hui-embroidery.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-vermillion-400 mt-1">🕒</span>
                <div>
                  <p className="font-body text-gray-300 text-sm">
                    {locale === 'zh-tw' ? '週一至週五 9:00-18:00' : 'Mon-Fri 9:00-18:00'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 關注我們 */}
          <div className="lg:col-span-1">
            <h3 className="font-title text-lg font-medium text-white mb-6 flex items-center">
              <span className="w-6 h-6 bg-green-500 eastern-border flex items-center justify-center mr-3">
                <span className="text-white text-xs">關</span>
              </span>
              {text.followUs}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center space-x-2 p-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white eastern-border transition-all duration-300 hover:scale-105 group"
                >
                  <span className="text-lg">{social.icon}</span>
                  <span className="font-body text-xs group-hover:text-vermillion-400 transition-colors duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* 大師語錄 */}
            <div className="mt-6 p-4 bg-gray-800/50 eastern-border">
              <blockquote className="font-body text-gray-300 text-xs italic leading-relaxed">
                {locale === 'zh-tw' 
                  ? '"針線之間見真情，絲絲入扣顯匠心。"'
                  : '"True emotion flows between needle and thread."'
                }
                <footer className="mt-2 text-gray-400 not-italic text-xs">
                  — {locale === 'zh-tw' ? '毛慧大師' : 'Master Mao Hui'}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* 版權資訊 */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="font-body text-gray-400 text-sm text-center md:text-left">
                © {currentYear} {locale === 'zh-tw' ? '慧繡雅集' : 'Hui Embroidery'}. {text.allRightsReserved}.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                  {locale === 'zh-tw' ? '隱私政策' : 'Privacy Policy'}
                </a>
                <span>|</span>
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                  {locale === 'zh-tw' ? '服務條款' : 'Terms of Service'}
                </a>
                <span>|</span>
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                  {locale === 'zh-tw' ? '網站地圖' : 'Sitemap'}
                </a>
              </div>
            </div>

            {/* 技術支援 */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>💻</span>
              <span className="font-body">
                {locale === 'zh-tw' ? '技術支援' : 'Powered by'} Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 書法線條裝飾 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-vermillion-500 to-transparent opacity-60"></div>
    </footer>
  );
}