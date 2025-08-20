// 導出所有 API 模組
export { apiClient, setApiLanguage } from './client';
export { artworksApi } from './artworks';
export { blogApi } from './blog';
export { contactApi } from './contact';
export { commonApi } from './common';

// 導出所有類型
export * from '@/lib/types';

// 統一的 API 物件
export const api = {
  artworks: () => import('./artworks').then(m => m.artworksApi),
  blog: () => import('./blog').then(m => m.blogApi),
  contact: () => import('./contact').then(m => m.contactApi),
  common: () => import('./common').then(m => m.commonApi),
};