// API 基礎類型
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface QueryParams {
  page?: number;
  search?: string;
  category?: string;
  year_from?: number;
  year_to?: number;
  ordering?: string;
}

// 翻譯類型
export interface Translations {
  title?: string;
  name?: string;
  description?: string;
  content?: string;
  excerpt?: string;
  technique?: string;
  company_name?: string;
}

// 分類類型
export interface Category {
  id: string;
  name: string;
  slug: string;
  translations: Translations;
}

// 作品類型
export interface Artwork {
  id: string;
  title: string;
  slug: string;
  description: string;
  main_image_url: string;
  thumbnail_url: string;
  medium: string;
  dimensions: string;
  year_created: number;
  price: number | null;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  categories: Category[];
  tags: string[];
  related_artworks: string[];
  translations: Translations;
}

// 文章類型
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  published_at: string;
  updated_at: string;
  created_at: string;
  is_featured: boolean;
  author_name: string;
  reading_time: number;
  view_count: number;
  categories: Category[];
  tags: string[];
  translations: Translations;
}

// 聯絡資訊類型
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  business_hours: string;
  translations: {
    company_name: string;
  };
}

// 聯絡表單類型
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// API 語言設定
let currentLanguage = 'zh-tw';

export const setApiLanguage = (language: string) => {
  currentLanguage = language;
};

export const getApiLanguage = () => currentLanguage;