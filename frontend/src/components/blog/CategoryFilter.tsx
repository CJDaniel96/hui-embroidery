'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { blogApi, type Category } from '@/lib/api';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  allCategoriesText: string;
  loadingText: string;
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange,
  allCategoriesText,
  loadingText 
}: CategoryFilterProps) {
  const locale = useLocale();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch blog categories:', error);
        setError(error instanceof Error ? error.message : 'Failed to load categories');
        // 設置一些默認分類作為後備
        setCategories([
          {
            id: '1',
            name: locale === 'zh-tw' ? '技法分享' : 'Technique Sharing',
            slug: 'techniques',
            translations: {
              name: locale === 'zh-tw' ? '技法分享' : 'Technique Sharing',
              description: ''
            }
          },
          {
            id: '2', 
            name: locale === 'zh-tw' ? '藝術心得' : 'Artistic Insights',
            slug: 'insights',
            translations: {
              name: locale === 'zh-tw' ? '藝術心得' : 'Artistic Insights',
              description: ''
            }
          },
          {
            id: '3',
            name: locale === 'zh-tw' ? '大師見解' : 'Master Perspectives', 
            slug: 'master',
            translations: {
              name: locale === 'zh-tw' ? '大師見解' : 'Master Perspectives',
              description: ''
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [locale]);

  if (loading) {
    return (
      <div className="py-8 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner size="sm" />
            <span className="ml-2 font-body text-sm text-gray-500">{loadingText}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 border-b border-gray-100">
      <div className="container mx-auto">
        {/* 分類篩選 */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* 全部分類 */}
          <button
            onClick={() => onCategoryChange('')}
            className={`transition-all duration-300 ${
              !selectedCategory 
                ? 'scale-110' 
                : 'hover:scale-105'
            }`}
          >
            <Badge 
              variant={!selectedCategory ? 'seal' : 'outline'} 
              size="md"
              className="px-4 py-2 font-body font-medium"
            >
              {allCategoriesText}
            </Badge>
          </button>

          {/* 分類列表 */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
              className={`transition-all duration-300 ${
                selectedCategory === category.slug 
                  ? 'scale-110' 
                  : 'hover:scale-105'
              }`}
            >
              <Badge 
                variant={selectedCategory === category.slug ? 'seal' : 'outline'} 
                size="md"
                className="px-4 py-2 font-body font-medium"
              >
                {category.translations.name}
              </Badge>
            </button>
          ))}
        </div>

        {/* 當前選中的分類提示 */}
        {selectedCategory && (
          <div className="text-center mt-6">
            <p className="font-body text-sm text-gray-500">
              {locale === 'zh-tw' ? '正在瀏覽:' : 'Browsing:'} 
              <span className="vermillion-accent font-medium ml-1">
                {categories.find(c => c.slug === selectedCategory)?.translations.name}
              </span>
            </p>
          </div>
        )}

        {/* 錯誤提示 */}
        {error && (
          <div className="text-center mt-4">
            <p className="font-body text-xs text-red-500">
              {locale === 'zh-tw' ? '載入分類失敗，顯示默認分類' : 'Failed to load categories, showing defaults'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}