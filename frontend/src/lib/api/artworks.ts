import type { Artwork, ApiResponse, QueryParams } from './types';

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
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

export const artworksApi = {
  // 獲取作品列表
  getArtworks: async (params?: QueryParams): Promise<ApiResponse<Artwork>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.year_from) searchParams.set('year_from', params.year_from.toString());
    if (params?.year_to) searchParams.set('year_to', params.year_to.toString());
    if (params?.ordering) searchParams.set('ordering', params.ordering);
    
    const url = `/artworks/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    try {
      return await apiRequest<ApiResponse<Artwork>>(url);
    } catch (error) {
      console.error('Failed to fetch artworks:', error);
      // 返回模擬數據作為後備
      return {
        count: 0,
        next: null,
        previous: null,
        results: []
      };
    }
  },

  // 獲取單件作品
  getArtwork: async (id: string): Promise<Artwork> => {
    return apiRequest<Artwork>(`/artworks/${id}/`);
  },

  // 獲取精選作品
  getFeaturedArtworks: async (limit = 6): Promise<Artwork[]> => {
    try {
      const response = await apiRequest<ApiResponse<Artwork>>(`/artworks/?is_featured=true&page_size=${limit}`);
      return response.results || [];
    } catch (error) {
      console.error('Failed to fetch featured artworks:', error);
      // 返回模擬數據
      return [
        {
          id: '1',
          title: '荷塘月色',
          slug: 'lotus-pond-moonlight',
          description: '',
          main_image_url: '',
          thumbnail_url: '',
          medium: '湘繡',
          dimensions: '60x40cm',
          year_created: 2023,
          price: null,
          is_featured: true,
          is_available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          categories: [],
          tags: [],
          related_artworks: [],
          translations: {
            title: '荷塘月色',
            description: '運用湘繡獨特的鬅毛針法，細緻描繪荷花在月光下的優美姿態。',
            technique: '鬅毛針法'
          }
        }
      ];
    }
  }
};