'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Card, Button, Badge } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { blogApi, type Post } from '@/lib/api';
import { getImageUrl, formatDate } from '@/lib/utils';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogApi.getLatestPosts();
      setPosts(data.slice(0, 3)); // 只顯示最新 3 篇文章
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
      console.error('Failed to fetch latest posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="posts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
            <span className="ml-4 text-gray-600">{loadingText}</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="posts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 mb-4">{errorText}: {error}</p>
            <Button onClick={fetchPosts} variant="primary">
              {retryText}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="posts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* 文章網格 */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <Card 
                  key={post.id} 
                  variant="outlined" 
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    {post.featured_image_url ? (
                      <img
                        src={getImageUrl(post.featured_image_url)}
                        alt={post.translations.title || 'Blog post'}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">📝</span>
                      </div>
                    )}
                    
                    {/* 特色標籤 */}
                    {post.is_featured && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="primary" size="sm">
                          {locale === 'zh-tw' ? '特色' : 'Featured'}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* 分類和日期 */}
                    <div className="flex items-center justify-between mb-3">
                      {post.categories.length > 0 && (
                        <Badge variant="secondary" size="sm">
                          {post.categories[0].translations.name}
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500">
                        {formatDate(post.published_at, locale)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {post.translations.title || 
                       (locale === 'zh-tw' ? '未命名文章' : 'Untitled Post')}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.translations.excerpt ||
                       (locale === 'zh-tw' ? '探索中華刺繡藝術的精彩世界...' : 'Explore the fascinating world of Chinese embroidery art...')}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {locale === 'zh-tw' ? '作者:' : 'By:'} {post.author_name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.reading_time} {locale === 'zh-tw' ? '分鐘閱讀' : 'min read'}
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="w-full">
                          {readMoreText} →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 查看全部按鈕 */}
            <div className="text-center">
              <Link href="/blog">
                <Button variant="outline" size="lg" className="px-12 py-4">
                  {viewAllText}
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {locale === 'zh-tw' ? '目前沒有最新文章' : 'No recent posts available'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}