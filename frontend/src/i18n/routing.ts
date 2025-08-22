import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // 支援的語言列表
  locales: ['zh-tw', 'en'],
  
  // 預設語言（當沒有匹配的語言時使用）
  defaultLocale: 'zh-tw',
  
  // 路由配置
  pathnames: {
    '/': '/',
    '/gallery': {
      'zh-tw': '/gallery',
      'en': '/gallery'
    },
    '/about': {
      'zh-tw': '/about', 
      'en': '/about'
    },
    '/blog': {
      'zh-tw': '/blog',
      'en': '/blog'
    },
    '/contact': {
      'zh-tw': '/contact',
      'en': '/contact'
    },
    '/booking': {
      'zh-tw': '/booking',
      'en': '/booking'
    }
  }
});

// 導出類型定義供其他檔案使用
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];