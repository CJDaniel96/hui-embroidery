import { apiClient } from './client';
import { Category, QueryParams } from '@/lib/types';

export const commonApi = {
  // 獲取所有分類
  getCategories: (params?: QueryParams): Promise<Category[]> => {
    return apiClient.get('/common/categories/', params);
  },

  // 獲取作品分類
  getArtworkCategories: (): Promise<Category[]> => {
    return apiClient.get('/common/categories/artwork_categories/');
  },

  // 獲取部落格分類
  getBlogCategories: (): Promise<Category[]> => {
    return apiClient.get('/common/categories/blog_categories/');
  },
};