'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Card, Badge } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import PostCard from './PostCard';
import { blogApi, commonApi, type Post, type Category } from '@/lib/api';

interface BlogSidebarProps {
  currentPostId?: string;
}

export default function BlogSidebar({ currentPostId }: BlogSidebarProps) {
  const locale = useLocale();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 使用 Promise.allSettled 來處理部分失敗的情況
        const [recentResult, popularResult, categoriesResult] = await Promise.allSettled([
          blogApi.getRecentPosts(5),
          blogApi.getPopularPosts(5),
          blogApi.getCategories()
        ]);

        // 處理最新文章
        if (recentResult.status === 'fulfilled') {
          const filteredRecent = currentPostId 
            ? recentResult.value.filter(post => post.id !== currentPostId)
            : recentResult.value;
          setRecentPosts(filteredRecent.slice(0, 4));
        } else {
          console.error('Failed to fetch recent posts:', recentResult.reason);
        }

        // 處理熱門文章
        if (popularResult.status === 'fulfilled') {
          const filteredPopular = currentPostId 
            ? popularResult.value.filter(post => post.id !== currentPostId)
            : popularResult.value;
          setPopularPosts(filteredPopular.slice(0, 4));
        } else {
          console.error('Failed to fetch popular posts:', popularResult.reason);
        }

        // 處理分類
        if (categoriesResult.status === 'fulfilled') {
          setCategories(categoriesResult.value);
        } else {
          console.error('Failed to fetch categories:', categoriesResult.reason);
          // 如果失敗，嘗試使用通用 API
          try {
            const fallbackCategories = await commonApi.getBlogCategories();
            setCategories(fallbackCategories);
          } catch (fallbackError) {
            console.error('Failed to fetch categories via commonApi:', fallbackError);
          }
        }

      } catch (error) {
        console.error('Failed to fetch sidebar data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load sidebar data');
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, [currentPostId]);

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(3)].map((_, index) => (
          <Card key={index} variant="paper" className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Card variant="paper" className="p-6">
          <p className="text-red-600 text-sm text-center">
            {locale === 'zh-tw' ? '載入側邊欄內容失敗' : 'Failed to load sidebar content'}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 最新文章 */}
      {recentPosts.length > 0 && (
        <Card variant="paper" className="p-6">
          <h3 className="font-title text-lg font-medium text-gray-900 mb-6 flex items-center">
            <span className="w-6 h-6 bg-vermillion-500 eastern-border flex items-center justify-center mr-3">
              <span className="text-white text-xs">新</span>
            </span>
            {locale === 'zh-tw' ? '最新文章' : 'Recent Posts'}
          </h3>
          
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                variant="compact"
              />
            ))}
          </div>
        </Card>
      )}

      {/* 熱門文章 */}
      {popularPosts.length > 0 && (
        <Card variant="paper" className="p-6">
          <h3 className="font-title text-lg font-medium text-gray-900 mb-6 flex items-center">
            <span className="w-6 h-6 bg-yellow-500 eastern-border flex items-center justify-center mr-3">
              <span className="text-white text-xs">熱</span>
            </span>
            {locale === 'zh-tw' ? '熱門文章' : 'Popular Posts'}
          </h3>
          
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                variant="compact"
              />
            ))}
          </div>
        </Card>
      )}

      {/* 文章分類 */}
      {categories.length > 0 && (
        <Card variant="paper" className="p-6">
          <h3 className="font-title text-lg font-medium text-gray-900 mb-6 flex items-center">
            <span className="w-6 h-6 bg-blue-500 eastern-border flex items-center justify-center mr-3">
              <span className="text-white text-xs">類</span>
            </span>
            {locale === 'zh-tw' ? '文章分類' : 'Categories'}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category.id}
                variant="outline" 
                size="sm"
                className="hover:bg-vermillion-50 hover:border-vermillion-300 transition-colors duration-200 cursor-pointer"
              >
                {category.translations.name}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* 大師語錄 */}
      <Card variant="silk" className="p-6">
        <h3 className="font-title text-lg font-medium text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-gray-700 eastern-border flex items-center justify-center mr-3">
            <span className="text-white text-xs">語</span>
          </span>
          {locale === 'zh-tw' ? '大師語錄' : 'Master Quote'}
        </h3>
        
        <blockquote className="font-body text-gray-700 italic leading-relaxed border-l-2 border-vermillion-400 pl-4">
          {locale === 'zh-tw' 
            ? '"針線之間見真情，絲絲入扣顯匠心。湘繡不僅是技藝的傳承，更是文化的延續與創新的表達。"'
            : '"True emotion flows between needle and thread, craftsmanship shows in every detail. Xiang embroidery is not just technique inheritance, but cultural continuation and innovative expression."'
          }
          <footer className="mt-3 text-sm text-gray-500 not-italic">
            — {locale === 'zh-tw' ? '毛慧大師' : 'Master Mao Hui'}
          </footer>
        </blockquote>
      </Card>

      {/* 聯絡資訊 */}
      <Card variant="paper" className="p-6">
        <h3 className="font-title text-lg font-medium text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-green-500 eastern-border flex items-center justify-center mr-3">
            <span className="text-white text-xs">聯</span>
          </span>
          {locale === 'zh-tw' ? '聯絡我們' : 'Contact Us'}
        </h3>
        
        <p className="font-body text-gray-600 text-sm mb-4">
          {locale === 'zh-tw' 
            ? '對湘繡工藝有興趣或想了解高級訂製服務？歡迎與我們聯繫。'
            : 'Interested in Xiang embroidery or our haute couture services? Feel free to contact us.'
          }
        </p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="w-4 h-4 text-vermillion-500 mr-2">📧</span>
            <span>info@hui-embroidery.com</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 text-vermillion-500 mr-2">📞</span>
            <span>+886-2-1234-5678</span>
          </div>
        </div>
      </Card>
    </div>
  );
}