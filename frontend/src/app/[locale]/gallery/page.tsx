'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import ExtensionStatus from '@/components/common/ExtensionStatus';
import ArtworkGrid from '@/components/gallery/ArtworkGrid';
import FilterSidebar from '@/components/gallery/FilterSidebar';
import { artworksApi, type Artwork, type ApiResponse, type QueryParams, setApiLanguage } from '@/lib/api';

export default function GalleryPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 從 URL 參數解析篩選器
  const [filters, setFilters] = useState<QueryParams>(() => {
    return {
      page: parseInt(searchParams.get('page') || '1'),
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      year_from: searchParams.get('year_from') ? parseInt(searchParams.get('year_from')!) : undefined,
      year_to: searchParams.get('year_to') ? parseInt(searchParams.get('year_to')!) : undefined,
      ordering: searchParams.get('ordering') || ''
    };
  });

  // 設定 API 語言
  useEffect(() => {
    setApiLanguage(locale);
  }, [locale]);

  // 載入作品
  const fetchArtworks = async (params: QueryParams) => {
    try {
      setLoading(true);
      setError(null);
      const response: ApiResponse<Artwork> = await artworksApi.getArtworks(params);
      setArtworks(response.results);
      setTotalCount(response.count);
      setHasNextPage(!!response.next);
      setCurrentPage(params.page || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load artworks');
      console.error('Failed to fetch artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始載入
  useEffect(() => {
    fetchArtworks(filters);
  }, []);

  // 更新 URL 參數
  const updateURLParams = (newFilters: QueryParams) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });

    const newURL = `/${locale}/gallery${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newURL, { scroll: false });
  };

  // 處理篩選器變更
  const handleFiltersChange = (newFilters: QueryParams) => {
    const updatedFilters = { ...newFilters, page: 1 }; // 重置到第一頁
    setFilters(updatedFilters);
    updateURLParams(updatedFilters);
    fetchArtworks(updatedFilters);
  };

  // 處理分頁
  const handlePageChange = (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    updateURLParams(updatedFilters);
    fetchArtworks(updatedFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 翻譯文字
  const texts = {
    title: locale === 'zh-tw' ? '作品集' : 'Gallery',
    subtitle: locale === 'zh-tw' ? '精美的刺繡藝術作品展示' : 'Showcase of Exquisite Embroidery Artworks',
    viewDetails: locale === 'zh-tw' ? '查看詳情' : 'View Details',
    noArtworks: locale === 'zh-tw' ? '沒有找到作品' : 'No Artworks Found',
    loadingMore: locale === 'zh-tw' ? '載入更多' : 'Load More',
    showFilters: locale === 'zh-tw' ? '顯示篩選' : 'Show Filters',
    hideFilters: locale === 'zh-tw' ? '隱藏篩選' : 'Hide Filters',
    totalResults: locale === 'zh-tw' ? '共找到 {count} 件作品' : 'Found {count} artworks',
    filters: {
      filters: locale === 'zh-tw' ? '篩選器' : 'Filters',
      search: locale === 'zh-tw' ? '搜尋' : 'Search',
      categories: locale === 'zh-tw' ? '分類' : 'Categories',
      allCategories: locale === 'zh-tw' ? '所有分類' : 'All Categories',
      yearRange: locale === 'zh-tw' ? '年份範圍' : 'Year Range',
      yearFrom: locale === 'zh-tw' ? '起始年份' : 'From Year',
      yearTo: locale === 'zh-tw' ? '結束年份' : 'To Year',
      featured: locale === 'zh-tw' ? '精選作品' : 'Featured',
      showFeatured: locale === 'zh-tw' ? '只顯示精選作品' : 'Show Featured Only',
      clearFilters: locale === 'zh-tw' ? '清除篩選' : 'Clear Filters',
      applyFilters: locale === 'zh-tw' ? '套用篩選' : 'Apply Filters',
      loading: locale === 'zh-tw' ? '載入中...' : 'Loading...'
    }
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
    <div className="min-h-screen bg-gray-50">
      <ExtensionStatus />
      <Header navigation={navigation} />
      
      <main className="pt-20">
        {/* 標題區域 */}
        <div className="bg-gradient-to-br from-red-50 via-white to-yellow-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 gradient-text">
              {texts.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {texts.subtitle}
            </p>
            {/* 結果計數 */}
            {!loading && (
              <p className="text-sm text-gray-500 mt-4">
                {texts.totalResults.replace('{count}', totalCount.toString())}
              </p>
            )}
          </div>
        </div>

        {/* 主要內容區域 */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 篩選側邊欄 - 桌面版 */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  texts={texts.filters}
                />
              </div>
            </div>

            {/* 主要內容 */}
            <div className="flex-1">
              {/* 移動版篩選按鈕 */}
              <div className="lg:hidden mb-6">
                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  variant="outline"
                  className="w-full"
                >
                  {isFilterOpen ? texts.hideFilters : texts.showFilters}
                </Button>
              </div>

              {/* 移動版篩選器 */}
              {isFilterOpen && (
                <div className="lg:hidden mb-6">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClose={() => setIsFilterOpen(false)}
                    isOpen={isFilterOpen}
                    texts={texts.filters}
                  />
                </div>
              )}

              {/* 錯誤狀態 */}
              {error && (
                <div className="text-center py-8">
                  <div className="text-red-600 mb-4">
                    {locale === 'zh-tw' ? '載入作品時發生錯誤' : 'Error loading artworks'}: {error}
                  </div>
                  <Button onClick={() => fetchArtworks(filters)} variant="primary">
                    {locale === 'zh-tw' ? '重新載入' : 'Retry'}
                  </Button>
                </div>
              )}

              {/* 作品網格 */}
              {!error && (
                <ArtworkGrid
                  artworks={artworks}
                  loading={loading}
                  viewDetailsText={texts.viewDetails}
                  noArtworksText={texts.noArtworks}
                />
              )}

              {/* 分頁 */}
              {!loading && !error && totalCount > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      variant="outline"
                    >
                      {locale === 'zh-tw' ? '上一頁' : 'Previous'}
                    </Button>
                    
                    <span className="text-gray-600">
                      {locale === 'zh-tw' ? `第 ${currentPage} 頁` : `Page ${currentPage}`}
                    </span>
                    
                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!hasNextPage}
                      variant="outline"
                    >
                      {locale === 'zh-tw' ? '下一頁' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}