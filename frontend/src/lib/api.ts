import { API_BASE_URL } from './utils';

// 型別定義
export interface Artwork {
  id: number;
  main_image_url: string | null;
  thumbnail_url: string | null;
  medium: string;
  dimensions: string;
  year_created: number | null;
  is_featured: boolean;
  is_published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  categories: Category[];
  translations: {
    title: string;
    description: string;
    technique: string;
  };
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  category_type: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// API 函數
export const artworksApi = {
  // 取得所有作品
  getAll: async (params?: {
    page?: number;
    category?: string;
    search?: string;
  }): Promise<ApiResponse<Artwork>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);

    const response = await fetch(
      `${API_BASE_URL}/api/artworks/artworks/?${searchParams}`,
      {
        headers: {
          'Accept-Language': 'zh-tw', // 可以動態設定
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch artworks');
    }

    return response.json();
  },

  // 取得精選作品
  getFeatured: async (): Promise<Artwork[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/artworks/artworks/featured/`,
      {
        headers: {
          'Accept-Language': 'zh-tw',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch featured artworks');
    }

    return response.json();
  },

  // 取得最新作品
  getLatest: async (): Promise<Artwork[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/artworks/artworks/latest/`,
      {
        headers: {
          'Accept-Language': 'zh-tw',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch latest artworks');
    }

    return response.json();
  },

  // 取得單個作品
  getById: async (id: number): Promise<Artwork> => {
    const response = await fetch(
      `${API_BASE_URL}/api/artworks/artworks/${id}/`,
      {
        headers: {
          'Accept-Language': 'zh-tw',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch artwork');
    }

    return response.json();
  },
};

// 分類 API
export const categoriesApi = {
  getArtworkCategories: async (): Promise<Category[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/common/categories/artwork_categories/`,
      {
        headers: {
          'Accept-Language': 'zh-tw',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  },
};