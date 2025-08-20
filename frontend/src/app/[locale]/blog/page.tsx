'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import ExtensionStatus from '@/components/common/ExtensionStatus';
import BlogHero from '@/components/blog/BlogHero';
import CategoryFilter from '@/components/blog/CategoryFilter';
import PostCard from '@/components/blog/PostCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { blogApi, type Post, type ApiResponse, type QueryParams, setApiLanguage } from '@/lib/api';

export default function BlogPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  // 從 URL 參數解析篩選器
  const [filters, setFilters] = useState<QueryParams>(() => {
    return {
      page: parseInt(searchParams.get('page') || '1'),
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      ordering: searchParams.get('ordering') || '-published_at'
    };
  });

  // 設定 API 語言
  useEffect(() => {
    setApiLanguage(locale);
  }, [locale]);

  // 載入文章
  const fetchPosts = async (params: QueryParams) => {
    try {
      setLoading(true);
      setError(null);
      
      // 並行獲取一般文章和精選文章
      const [postsResponse, featuredResponse] = await Promise.all([
        blogApi.getPosts(params),
        params.page === 1 && !params.search && !params.category 
          ? blogApi.getFeaturedPosts(1)
          : Promise.resolve({ results: [] })
      ]);

      setPosts(postsResponse.results);
      setTotalCount(postsResponse.count);
      setHasNextPage(!!postsResponse.next);
      setCurrentPage(params.page || 1);
      
      // 設定精選文章（只在第一頁且無搜尋/分類時顯示）
      if (featuredResponse.results.length > 0 && params.page === 1 && !params.search && !params.category) {
        setFeaturedPost(featuredResponse.results[0]);
      } else {
        setFeaturedPost(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始載入
  useEffect(() => {
    fetchPosts(filters);
  }, []);

  // 更新 URL 參數
  const updateURLParams = (newFilters: QueryParams) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });

    const newURL = `/${locale}/blog${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newURL, { scroll: false });
  };

  // 處理搜尋
  const handleSearch = (query: string) => {
    const newFilters = { ...filters, search: query, page: 1 };
    setFilters(newFilters);
    updateURLParams(newFilters);
    fetchPosts(newFilters);
  };

  // 處理分類篩選
  const handleCategoryChange = (categorySlug: string) => {
    const newFilters = { ...filters, category: categorySlug, page: 1 };
    setFilters(newFilters);
    updateURLParams(newFilters);
    fetchPosts(newFilters);
  };

  // 處理分頁
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateURLParams(newFilters);
    fetchPosts(newFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 翻譯文字
  const texts = {
    title: locale === 'zh-tw' ? '湘繡雅韻' : 'Embroidery Insights',
    subtitle: locale === 'zh-tw' 
      ? '探索湘繡藝術的深邃世界，分享傳統技法與現代創新的智慧結晶'
      : 'Explore the profound world of Xiang embroidery art, sharing the wisdom of traditional techniques and modern innovation',
    searchPlaceholder: locale === 'zh-tw' ? '搜尋文章、技法、心得...' : 'Search articles, techniques, insights...',
    allCategories: locale === 'zh-tw' ? '全部分類' : 'All Categories',
    loading: locale === 'zh-tw' ? '載入中...' : 'Loading...',
    noResults: locale === 'zh-tw' ? '沒有找到文章' : 'No Articles Found',
    loadMore: locale === 'zh-tw' ? '載入更多' : 'Load More',
    previousPage: locale === 'zh-tw' ? '上一頁' : 'Previous',
    nextPage: locale === 'zh-tw' ? '下一頁' : 'Next',
    totalResults: locale === 'zh-tw' ? '共找到 {count} 篇文章' : 'Found {count} articles'
  };

  const navigation = {
    home: locale === 'zh-tw' ? '首頁' : 'Home',
    gallery: locale === 'zh-tw' ? '作品集' : 'Gallery',
    about: locale === 'zh-tw' ? '關於我們' : 'About',
    blog: locale === 'zh-tw' ? '部落格' : 'Blog',
    contact: locale === 'zh-tw' ? '聯絡我們' : 'Contact',
  };

  const footerText = {
    copyright: locale === 'zh-tw' ? '版權所有' : 'Copyright',
    allRightsReserved: locale === 'zh-tw' ? '保留所有權利' : 'All Rights Reserved',
    quickLinks: locale === 'zh-tw' ? '快速連結' : 'Quick Links',
    contact: locale === 'zh-tw' ? '聯絡資訊' : 'Contact Info',
    followUs: locale === 'zh-tw' ? '關注我們' : 'Follow Us',
  };

  return (
    <div className="min-h-screen paper-texture">
      <ExtensionStatus />
      <Header navigation={navigation} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <BlogHero
          title={texts.title}
          subtitle={texts.subtitle}
          searchPlaceholder={texts.searchPlaceholder}
          onSearch={handleSearch}
        />

        {/* 分類篩選 */}
        <CategoryFilter
          selectedCategory={filters.category || ''}
          onCategoryChange={handleCategoryChange}
          allCategoriesText={texts.allCategories}
          loadingText={texts.loading}
        />

        {/* 主要內容區域 */}
        <div className="container mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* 主要內容 */}
            <div className="lg:col-span-3">
              {/* 精選文章 */}
              {featuredPost && (
                <div className="mb-16">
                  <h2 className="font-title text-2xl font-medium text-gray-900 mb-8 flex items-center">
                    <span className="w-8 h-8 bg-vermillion-500 eastern-border flex items-center justify-center mr-3">
                      <span className="text-white text-sm">精</span>
                    </span>
                    {locale === 'zh-tw' ? '精選文章' : 'Featured Article'}
                  </h2>
                  <PostCard post={featuredPost} variant="featured" />
                </div>
              )}

              {/* 文章列表 */}
              <div>
                {/* 列表標題和結果計數 */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-title text-xl font-medium text-gray-900">
                    {featuredPost 
                      ? (locale === 'zh-tw' ? '更多文章' : 'More Articles')
                      : (locale === 'zh-tw' ? '最新文章' : 'Latest Articles')
                    }
                  </h2>
                  {!loading && totalCount > 0 && (
                    <p className="font-body text-sm text-gray-500">
                      {texts.totalResults.replace('{count}', totalCount.toString())}
                    </p>
                  )}
                </div>

                {/* 載入狀態 */}
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="paper-card p-6 animate-pulse">
                        <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 錯誤狀態 */}
                {error && (
                  <div className="text-center py-12">
                    <div className="text-red-600 mb-4">
                      {locale === 'zh-tw' ? '載入文章時發生錯誤' : 'Error loading articles'}: {error}
                    </div>
                    <Button onClick={() => fetchPosts(filters)} variant="primary">
                      {locale === 'zh-tw' ? '重新載入' : 'Retry'}
                    </Button>
                  </div>
                )}

                {/* 文章網格 */}
                {!loading && !error && (
                  <>
                    {posts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {posts.map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 eastern-border flex items-center justify-center">
                          <span className="text-3xl text-gray-400">📖</span>
                        </div>
                        <h3 className="font-title text-2xl font-medium text-gray-400 mb-3">
                          {texts.noResults}
                        </h3>
                        <p className="font-body text-gray-500">
                          {locale === 'zh-tw' 
                            ? '請嘗試調整搜尋條件或瀏覽其他分類' 
                            : 'Try adjusting your search terms or browse other categories'}
                        </p>
                      </div>
                    )}

                    {/* 分頁 */}
                    {posts.length > 0 && (
                      <div className="flex justify-center">
                        <div className="flex items-center space-x-4">
                          <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                            variant="outline"
                          >
                            {texts.previousPage}
                          </Button>
                          
                          <span className="font-body text-gray-600">
                            {locale === 'zh-tw' ? `第 ${currentPage} 頁` : `Page ${currentPage}`}
                          </span>
                          
                          <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!hasNextPage}
                            variant="outline"
                          >
                            {texts.nextPage}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 側邊欄 */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}