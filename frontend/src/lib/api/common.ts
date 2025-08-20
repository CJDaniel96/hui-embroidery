import type { Category } from './types';

// 基礎 API 請求函數
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      // 不要立即拋出錯誤，而是記錄並返回錯誤信息
      console.warn(`API request failed: ${response.status} ${response.statusText} for ${endpoint}`);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    // 區分網絡錯誤和 API 錯誤
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn(`Network error for ${endpoint}:`, error);
      throw new Error('Network connection failed');
    }
    console.warn(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

export const commonApi = {
  // 獲取作品分類
  getArtworkCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiRequest<any>('/artworks/categories/');
      return response.results || response || [];
    } catch (error) {
      console.info('Using fallback artwork categories due to API error:', error);
      // 返回預設分類，不要在控制台顯示錯誤
      return [
        {
          id: '1',
          name: '人物',
          slug: 'portraits',
          translations: {
            name: '人物',
            description: '人物肖像刺繡'
          }
        },
        {
          id: '2',
          name: '動物',
          slug: 'animals',
          translations: {
            name: '動物',
            description: '動物題材刺繡'
          }
        },
        {
          id: '3',
          name: '花鳥',
          slug: 'flowers-birds',
          translations: {
            name: '花鳥',
            description: '花鳥題材刺繡'
          }
        },
        {
          id: '4',
          name: '山水',
          slug: 'landscapes',
          translations: {
            name: '山水',
            description: '山水風景刺繡'
          }
        }
      ];
    }
  },

  // 獲取部落格分類
  getBlogCategories: async (): Promise<Category[]> => {
    try {
      const response = await apiRequest<any>('/blog/categories/');
      return response.results || response || [];
    } catch (error) {
      console.info('Using fallback blog categories due to API error:', error);
      return [
        {
          id: '1',
          name: '技法分享',
          slug: 'techniques',
          translations: {
            name: '技法分享',
            description: '分享湘繡技法與心得'
          }
        },
        {
          id: '2',
          name: '藝術心得',
          slug: 'insights',
          translations: {
            name: '藝術心得',
            description: '藝術創作的心得分享'
          }
        },
        {
          id: '3',
          name: '大師見解',
          slug: 'master',
          translations: {
            name: '大師見解',
            description: '大師的專業見解'
          }
        },
        {
          id: '4',
          name: '工藝傳承',
          slug: 'heritage',
          translations: {
            name: '工藝傳承',
            description: '湘繡工藝的傳承與發展'
          }
        }
      ];
    }
  }
};