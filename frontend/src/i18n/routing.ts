import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // 支援的語言列表
  locales: ['zh-tw', 'en'],
  
  // 預設語言
  defaultLocale: 'zh-tw'
});

// 導出類型定義供其他檔案使用
export type Locale = (typeof routing.locales)[number];