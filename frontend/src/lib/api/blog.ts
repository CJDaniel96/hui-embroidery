import type { Post, ApiResponse, QueryParams } from './types';

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
      console.warn(`API request failed: ${response.status} ${response.statusText} for ${endpoint}`);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn(`Network error for ${endpoint}:`, error);
      throw new Error('Network connection failed');
    }
    console.warn(`API request error for ${endpoint}:`, error);
    throw error;
  }
};

// 模擬文章數據生成器
const generateMockPosts = (count: number = 3): Post[] => {
  const mockPosts: Post[] = [];
  const titles = [
    { zh: '湘繡技法入門', en: 'Introduction to Xiang Embroidery Techniques' },
    { zh: '鬅毛針法的奧秘', en: 'The Mystery of Maomao Technique' },
    { zh: '傳統與現代的融合', en: 'Fusion of Tradition and Modernity' },
    { zh: '刺繡藝術的文化意涵', en: 'Cultural Significance of Embroidery Art' },
    { zh: '大師作品賞析', en: 'Master Artwork Appreciation' },
    { zh: '針法創新與傳承', en: 'Innovation and Heritage in Stitching' }
  ];

  for (let i = 0; i < Math.min(count, titles.length); i++) {
    mockPosts.push({
      id: (i + 1).toString(),
      title: titles[i].zh,
      slug: `post-${i + 1}`,
      content: '',
      excerpt: '',
      featured_image_url: '',
      published_at: new Date(Date.now() - i * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      is_featured: i === 0,
      author_name: '毛慧',
      reading_time: 5 + Math.floor(Math.random() * 10),
      view_count: Math.floor(Math.random() * 1000),
      categories: [],
      tags: [],
      translations: {
        title: titles[i].zh,
        content: `這是關於${titles[i].zh}的詳細內容...`,
        excerpt: `了解${titles[i].zh}的基本概念和重要性`
      }
    });
  }

  return mockPosts;
};

export const blogApi = {
  // 獲取文章列表
  getPosts: async (params?: QueryParams): Promise<ApiResponse<Post>> => {
    try {
      const searchParams = new URLSearchParams();
      
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.category) searchParams.set('category', params.category);
      if (params?.ordering) searchParams.set('ordering', params.ordering);
      
      const url = `/blog/posts/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      return await apiRequest<ApiResponse<Post>>(url);
    } catch (error) {
      console.info('Using fallback posts data due to API error');
      const mockPosts = generateMockPosts(6);
      return {
        count: mockPosts.length,
        next: null,
        previous: null,
        results: mockPosts
      };
    }
  },

  // 獲取單篇文章
  getPost: async (slug: string): Promise<Post> => {
    try {
      return await apiRequest<Post>(`/blog/posts/${slug}/`);
    } catch (error) {
      console.info('Using fallback post data due to API error');
      return generateMockPosts(1)[0];
    }
  },

  // 獲取精選文章
  getFeaturedPosts: async (limit = 3): Promise<ApiResponse<Post>> => {
    try {
      return await apiRequest<ApiResponse<Post>>(`/blog/posts/?is_featured=true&page_size=${limit}`);
    } catch (error) {
      console.info('Using fallback featured posts due to API error');
      const mockPosts = generateMockPosts(limit).map(post => ({ ...post, is_featured: true }));
      return {
        count: mockPosts.length,
        next: null,
        previous: null,
        results: mockPosts
      };
    }
  },

  // 獲取最新文章
  getRecentPosts: async (limit = 5): Promise<Post[]> => {
    try {
      const response = await apiRequest<ApiResponse<Post>>(`/blog/posts/?ordering=-published_at&page_size=${limit}`);
      return response.results || [];
    } catch (error) {
      console.info('Using fallback recent posts due to API error');
      return generateMockPosts(limit);
    }
  },

  // 獲取熱門文章
  getPopularPosts: async (limit = 5): Promise<Post[]> => {
    try {
      const response = await apiRequest<ApiResponse<Post>>(`/blog/posts/?ordering=-view_count&page_size=${limit}`);
      return response.results || [];
    } catch (error) {
      console.info('Using fallback popular posts due to API error');
      return generateMockPosts(limit).sort((a, b) => b.view_count - a.view_count);
    }
  },

  // 獲取最新文章（用於首頁）
  getLatestPosts: async (limit = 3): Promise<ApiResponse<Post>> => {
    try {
      return await apiRequest<ApiResponse<Post>>(`/blog/posts/?ordering=-published_at&page_size=${limit}`);
    } catch (error) {
      console.info('Using fallback latest posts due to API error');
      const mockPosts = generateMockPosts(limit);
      return {
        count: mockPosts.length,
        next: null,
        previous: null,
        results: mockPosts
      };
    }
  },

  // 獲取文章分類
  getCategories: async () => {
    try {
      const response = await apiRequest<any>('/blog/categories/');
      return response.results || response || [];
    } catch (error) {
      console.info('Using fallback blog categories due to API error');
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
        }
      ];
    }
  },

  // 其他方法保持不變...
  getRelatedPosts: async (postId: string, limit = 4): Promise<Post[]> => {
    try {
      const response = await apiRequest<ApiResponse<Post>>(`/blog/posts/${postId}/related/?page_size=${limit}`);
      return response.results || [];
    } catch (error) {
      console.info('Using fallback related posts due to API error');
      return generateMockPosts(limit);
    }
  },

  searchPosts: async (query: string, limit = 10): Promise<ApiResponse<Post>> => {
    try {
      const searchParams = new URLSearchParams({
        search: query,
        page_size: limit.toString()
      });
      return await apiRequest<ApiResponse<Post>>(`/blog/posts/?${searchParams.toString()}`);
    } catch (error) {
      console.info('Using fallback search results due to API error');
      const mockPosts = generateMockPosts(3); // 返回一些模擬搜尋結果
      return {
        count: mockPosts.length,
        next: null,
        previous: null,
        results: mockPosts
      };
    }
  }
};