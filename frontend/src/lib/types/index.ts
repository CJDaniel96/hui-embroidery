// 基礎 API 回應類型
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// 翻譯類型
export interface Translation {
  title?: string;
  name?: string;
  description?: string;
  content?: string;
  excerpt?: string;
  meta_description?: string;
  technique?: string;
  question?: string;
  answer?: string;
  company_name?: string;
}

// 分類類型
export interface Category {
  id: number;
  slug: string;
  category_type: 'artwork' | 'blog';
  order: number;
  is_active: boolean;
  created_at: string;
  translations: Translation;
}

// 作品類型
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
  translations: Translation;
}

// 作品詳情類型（包含相關作品）
export interface ArtworkDetail extends Artwork {
  related_artworks: Artwork[];
}

// 文章類型
export interface Post {
  id: number;
  slug: string;
  featured_image_url: string | null;
  author_name: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  view_count: number;
  reading_time: number;
  created_at: string;
  updated_at: string;
  categories: Category[];
  translations: Translation;
}

// 文章詳情類型（包含相關文章）
export interface PostDetail extends Post {
  related_posts: Post[];
}

// 聯絡資訊類型
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  business_hours: string;
  latitude: number | null;
  longitude: number | null;
  translations: Translation;
}

// 社群媒體類型
export interface SocialMedia {
  id: number;
  platform: string;
  platform_display: string;
  url: string;
  username: string;
  is_active: boolean;
  order: number;
}

// 聯絡表單類型
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// 聯絡表單回應類型
export interface ContactFormResponse {
  message: string;
  id: number;
}

// 常見問題類型
export interface FAQ {
  id: number;
  is_active: boolean;
  order: number;
  created_at: string;
  translations: Translation;
}

// 部落格設定類型
export interface BlogSettings {
  site_name: string;
  posts_per_page: number;
  allow_comments: boolean;
}

// API 錯誤類型
export interface ApiError {
  detail?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

// 查詢參數類型
export interface QueryParams {
  page?: number;
  search?: string;
  category?: string;
  year_from?: number;
  year_to?: number;
  year?: number;
  month?: number;
  ordering?: string;
}