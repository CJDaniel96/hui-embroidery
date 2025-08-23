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

export interface SiteContent {
  id: number;
  section: string;
  is_active: boolean;
  hero_image_url: string | null;
  master_image_url: string | null;
  updated_at: string;
  translations: {
    hero_title: string;
    hero_subtitle: string;
    hero_description: string;
    hero_cta_text: string;
    master_title: string;
    master_subtitle: string;
    master_description: string;
    master_description2: string;
    master_achievements_title: string;
    master_technique_title: string;
    master_technique_desc: string;
    footer_description: string;
    copyright_text: string;
  };
}

export interface Achievement {
  id: number;
  year: number | null;
  order: number;
  is_active: boolean;
  created_at: string;
  translations: {
    title: string;
    description: string;
  };
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

// 動態獲取當前語言
const getCurrentLanguage = () => {
  if (typeof window !== 'undefined') {
    // 從 URL 路徑獲取語言 (/en 或 /zh-tw)
    const pathSegments = window.location.pathname.split('/');
    const locale = pathSegments[1];
    return locale === 'en' ? 'en' : 'zh-tw';
  }
  return 'zh-tw'; // 預設語言
};

// 網站內容 API
export const siteContentApi = {
  // 取得 Hero Section 內容
  getHeroContent: async (): Promise<SiteContent> => {
    const response = await fetch(
      `${API_BASE_URL}/api/common/site-content/hero/`,
      {
        headers: {
          'Accept-Language': getCurrentLanguage(),
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch hero content');
    }

    return response.json();
  },

  // 取得 Master Section 內容
  getMasterContent: async (): Promise<SiteContent> => {
    const response = await fetch(
      `${API_BASE_URL}/api/common/site-content/master/`,
      {
        headers: {
          'Accept-Language': getCurrentLanguage(),
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch master content');
    }

    return response.json();
  },

  // 取得 Footer 內容
  getFooterContent: async (): Promise<SiteContent> => {
    const response = await fetch(
      `${API_BASE_URL}/api/common/site-content/footer/`,
      {
        headers: {
          'Accept-Language': getCurrentLanguage(),
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch footer content');
    }

    return response.json();
  },
};

// 成就獎項 API
export const achievementsApi = {
  // 取得所有成就獎項
  getAll: async (): Promise<Achievement[]> => {
    const response = await fetch(
      `${API_BASE_URL}/api/common/achievements/`,
      {
        headers: {
          'Accept-Language': getCurrentLanguage(),
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch achievements');
    }

    const data = await response.json();
    return data.results || data; // 處理分頁和非分頁響應
  },
};