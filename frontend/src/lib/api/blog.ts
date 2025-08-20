import { apiClient } from './client';
import { ApiResponse, Post, PostDetail, BlogSettings, QueryParams } from '@/lib/types';

export const blogApi = {
  // 獲取文章列表
  getPosts: (params?: QueryParams): Promise<ApiResponse<Post>> => {
    return apiClient.get('/blog/posts/', params);
  },

  // 獲取單篇文章
  getPost: (slug: string): Promise<PostDetail> => {
    return apiClient.get(`/blog/posts/${slug}/`);
  },

  // 獲取精選文章
  getFeaturedPosts: (): Promise<Post[]> => {
    return apiClient.get('/blog/posts/featured/');
  },

  // 獲取最新文章
  getLatestPosts: (): Promise<Post[]> => {
    return apiClient.get('/blog/posts/latest/');
  },

  // 獲取熱門文章
  getPopularPosts: (): Promise<Post[]> => {
    return apiClient.get('/blog/posts/popular/');
  },

  // 獲取文章歸檔
  getPostsArchive: (): Promise<Array<{
    year: number;
    month: number;
    month_name: string;
    count: number;
    url_params: string;
  }>> => {
    return apiClient.get('/blog/posts/archive/');
  },

  // 獲取相關文章
  getRelatedPosts: (id: number): Promise<Post[]> => {
    return apiClient.get(`/blog/posts/${id}/related/`);
  },

  // 獲取部落格設定
  getBlogSettings: (): Promise<BlogSettings> => {
    return apiClient.get('/blog/settings/current/');
  },
};