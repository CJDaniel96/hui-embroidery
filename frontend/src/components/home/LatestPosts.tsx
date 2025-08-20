'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Card, Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { blogApi, type Post } from '@/lib/api';
import { formatDate, getImageUrl } from '@/lib/utils';

interface LatestPostsProps {
  title: string;
  subtitle: string;
  viewAllText: string;
  readMoreText: string;
  loadingText: string;
  errorText: string;
  retryText: string;
}

export default function LatestPosts({
  title,
  subtitle, 
  viewAllText,
  readMoreText,
  loadingText,
  errorText,
  retryText
}: LatestPostsProps) {
  const locale = useLocale();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getLatestPosts(3);
      
      // 正確處理 API 響應 - response 是 ApiResponse<Post> 類型
      const postsData = response.results || [];
      setPosts(postsData.slice(0, 3)); // 只顯示最新 3 篇文章
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
      console.error('Failed to fetch latest posts:', err);
      
      // 設置後備數據
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const handleViewAll = () => {
    router.push('/blog');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h2 className="font-title text-4xl md:text-5xl font-medium text-gray-900 mb-4">
            <span className="ink-gradient brush-stroke">{title}</span>
          </h2>
          <p className="font-body text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* 裝飾線條 */}
          <div className="mt-8 flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-32"></div>
          </div>
        </div>

        {/* 載入狀態 */}
        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" />
            <p className="font-body text-gray-600 mt-4">{loadingText}</p>
          </div>
        )}

        {/* 錯誤狀態 */}
        {error && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-50 eastern-border flex items-center justify-center">
              <span className="text-2xl text-red-400">⚠️</span>
            </div>
            <h3 className="font-title text-xl font-medium text-gray-400 mb-3">
              {errorText}
            </h3>
            <p className="font-body text-gray-500 mb-6">{error}</p>
            <Button onClick={fetchPosts} variant="outline">
              {retryText}
            </Button>
          </div>
        )}

        {/* 文章網格 */}
        {!loading && !error && (
          <>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post, index) => (
                  <Card 
                    key={post.id}
                    variant="paper"
                    className="group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                    onClick={() => handlePostClick(post.slug)}
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    {/* 圖片區域 */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      {post.featured_image_url ? (
                        <img
                          src={getImageUrl(post.featured_image_url)}
                          alt={post.translations.title || 'Blog post'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                          <span className="text-4xl text-gray-300">📖</span>
                        </div>
                      )}
                      
                      {/* 日期標籤 */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 eastern-border">
                          <span className="font-body text-xs text-gray-600">
                            {formatDate(post.published_at, locale)}
                          </span>
                        </div>
                      </div>

                      {/* 精選標籤 */}
                      {post.is_featured && (
                        <div className="absolute top-4 right-4">
                          <div className="w-3 h-3 bg-vermillion-500 eastern-border"></div>
                        </div>
                      )}
                    </div>

                    {/* 內容區域 */}
                    <div className="p-6">
                      <h3 className="font-title text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3 line-clamp-2">
                        {post.translations.title || 
                         (locale === 'zh-tw' ? '未命名文章' : 'Untitled Post')}
                      </h3>
                      
                      <p className="font-body text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                        {post.translations.excerpt ||
                         (locale === 'zh-tw' ? '探索湘繡藝術的精彩世界...' : 'Explore the fascinating world of Xiang embroidery art...')}
                      </p>

                      {/* 底部資訊 */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          <span className="font-body">{post.author_name || '毛慧'}</span>
                          {post.reading_time && (
                            <span className="font-body">
                              {post.reading_time} {locale === 'zh-tw' ? '分鐘' : 'min'}
                            </span>
                          )}
                        </div>
                        <span className="font-body text-xs text-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                          {readMoreText} →
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 eastern-border flex items-center justify-center">
                  <span className="text-3xl text-gray-400">📚</span>
                </div>
                <h3 className="font-title text-2xl font-medium text-gray-400 mb-3">
                  {locale === 'zh-tw' ? '暫無文章' : 'No Articles Yet'}
                </h3>
                <p className="font-body text-gray-500">
                  {locale === 'zh-tw' 
                    ? '精彩內容即將上線，敬請期待' 
                    : 'Exciting content coming soon, stay tuned'}
                </p>
              </div>
            )}

            {/* 查看全部按鈕 */}
            {posts.length > 0 && (
              <div className="text-center">
                <Button 
                  onClick={handleViewAll}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3"
                >
                  {viewAllText}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}