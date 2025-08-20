'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button, Badge, Input } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { commonApi, type Category, type QueryParams } from '@/lib/api';

interface FilterSidebarProps {
  filters: QueryParams;
  onFiltersChange: (filters: QueryParams) => void;
  onClose?: () => void;
  isOpen?: boolean;
  className?: string;
  texts: {
    filters: string;
    search: string;
    categories: string;
    allCategories: string;
    yearRange: string;
    yearFrom: string;
    yearTo: string;
    featured: string;
    showFeatured: string;
    clearFilters: string;
    applyFilters: string;
    loading: string;
  };
}

export default function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  onClose,
  isOpen = true,
  className = '',
  texts 
}: FilterSidebarProps) {
  const locale = useLocale();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [localFilters, setLocalFilters] = useState<QueryParams>(filters);

  // 載入分類
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await commonApi.getArtworkCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // 更新本地篩選器
  const updateLocalFilter = (key: keyof QueryParams, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 應用篩選器
  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose?.();
  };

  // 清除篩選器
  const clearFilters = () => {
    const clearedFilters: QueryParams = {
      page: 1,
      search: '',
      category: '',
      year_from: undefined,
      year_to: undefined,
      ordering: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* 標題和關閉按鈕 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{texts.filters}</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 搜尋框 */}
      <div>
        <Input
          label={texts.search}
          value={localFilters.search || ''}
          onChange={(e) => updateLocalFilter('search', e.target.value)}
          placeholder={locale === 'zh-tw' ? '輸入作品名稱或關鍵字...' : 'Enter artwork name or keywords...'}
        />
      </div>

      {/* 分類篩選 */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">{texts.categories}</h4>
        {loadingCategories ? (
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner size="sm" />
            <span className="ml-2 text-sm text-gray-500">{texts.loading}</span>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => updateLocalFilter('category', '')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !localFilters.category 
                  ? 'bg-red-100 text-red-700 font-medium' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {texts.allCategories}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => updateLocalFilter('category', category.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  localFilters.category === category.slug
                    ? 'bg-red-100 text-red-700 font-medium' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {category.translations.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 年份範圍 */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">{texts.yearRange}</h4>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label={texts.yearFrom}
            type="number"
            value={localFilters.year_from || ''}
            onChange={(e) => updateLocalFilter('year_from', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="1900"
            min="1900"
            max={new Date().getFullYear()}
          />
          <Input
            label={texts.yearTo}
            type="number"
            value={localFilters.year_to || ''}
            onChange={(e) => updateLocalFilter('year_to', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder={new Date().getFullYear().toString()}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      {/* 排序選項 */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">
          {locale === 'zh-tw' ? '排序方式' : 'Sort By'}
        </h4>
        <div className="space-y-2">
          {[
            { value: '', label: locale === 'zh-tw' ? '預設排序' : 'Default' },
            { value: 'created_at', label: locale === 'zh-tw' ? '最新作品' : 'Newest First' },
            { value: '-created_at', label: locale === 'zh-tw' ? '最舊作品' : 'Oldest First' },
            { value: 'year_created', label: locale === 'zh-tw' ? '創作年份 (舊→新)' : 'Year (Old→New)' },
            { value: '-year_created', label: locale === 'zh-tw' ? '創作年份 (新→舊)' : 'Year (New→Old)' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateLocalFilter('ordering', option.value)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                localFilters.ordering === option.value
                  ? 'bg-red-100 text-red-700 font-medium' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <Button
          onClick={applyFilters}
          variant="chinese"
          className="w-full"
        >
          {texts.applyFilters}
        </Button>
        <Button
          onClick={clearFilters}
          variant="outline"
          className="w-full"
        >
          {texts.clearFilters}
        </Button>
      </div>

      {/* 當前篩選器顯示 */}
      {(localFilters.search || localFilters.category || localFilters.year_from || localFilters.year_to) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">
            {locale === 'zh-tw' ? '當前篩選' : 'Active Filters'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {localFilters.search && (
              <Badge variant="primary" size="sm">
                🔍 {localFilters.search}
              </Badge>
            )}
            {localFilters.category && (
              <Badge variant="secondary" size="sm">
                📂 {categories.find(c => c.slug === localFilters.category)?.translations.name}
              </Badge>
            )}
            {(localFilters.year_from || localFilters.year_to) && (
              <Badge variant="secondary" size="sm">
                📅 {localFilters.year_from || '?'} - {localFilters.year_to || '?'}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {sidebarContent}
    </div>
  );
}