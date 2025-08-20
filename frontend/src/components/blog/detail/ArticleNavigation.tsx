'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Card } from '@/components/ui';
import { blogApi, type Post } from '@/lib/api';

interface ArticleNavigationProps {
  currentPost: Post;
}

export default function ArticleNavigation({ currentPost }: ArticleNavigationProps) {
  const locale = useLocale();
  const router = useRouter();
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdjacentPosts = async () => {
      try {
        setLoading(true);
        // 獲取最近的文章來模擬上一篇/下一篇
        const recentPosts = await blogApi.getRecentPosts(10);
        const currentIndex = recentPosts.findIndex(post => post.id === currentPost.id);
        
        if (currentIndex !== -1) {
          setPrevPost(currentIndex > 0 ? recentPosts[currentIndex - 1] : null);
          setNextPost(currentIndex < recentPosts.length - 1 ? recentPosts[currentIndex + 1] : null);
        }
      } catch (error) {
        console.error('Failed to fetch adjacent posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdjacentPosts();
  }, [currentPost.id]);

  const navigateToPost = (post: Post) => {
    router.push(`/blog/${post.slug}`);
  };

  if (loading) {
    return (
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, index) => (
                <Card key={index} variant="paper" className="p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 上一篇文章 */}
            <div className="md:text-left">
              {prevPost ? (
                <Card 
                  variant="paper" 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => navigateToPost(prevPost)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-vermillion-500 group-hover:text-vermillion-600 transition-colors duration-200">
                      ←
                    </span>
                    <span className="font-body text-sm text-gray-500 uppercase tracking-wider">
                      {locale === 'zh-tw' ? '上一篇' : 'Previous'}
                    </span>
                  </div>
                  <h3 className="font-title text-lg font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300 line-clamp-2">
                    {prevPost.translations.title}
                  </h3>
                  {prevPost.translations.excerpt && (
                    <p className="font-body text-gray-600 text-sm mt-2 line-clamp-2">
                      {prevPost.translations.excerpt}
                    </p>
                  )}
                </Card>
              ) : (
                <div className="p-6 opacity-50">
                  <span className="font-body text-gray-400">
                    {locale === 'zh-tw' ? '已是第一篇文章' : 'This is the first article'}
                  </span>
                </div>
              )}
            </div>

            {/* 下一篇文章 */}
            <div className="md:text-right">
              {nextPost ? (
                <Card 
                  variant="paper" 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => navigateToPost(nextPost)}
                >
                  <div className="flex items-center justify-end space-x-3 mb-3">
                    <span className="font-body text-sm text-gray-500 uppercase tracking-wider">
                      {locale === 'zh-tw' ? '下一篇' : 'Next'}
                    </span>
                    <span className="text-vermillion-500 group-hover:text-vermillion-600 transition-colors duration-200">
                      →
                    </span>
                  </div>
                  <h3 className="font-title text-lg font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300 line-clamp-2">
                    {nextPost.translations.title}
                  </h3>
                  {nextPost.translations.excerpt && (
                    <p className="font-body text-gray-600 text-sm mt-2 line-clamp-2">
                      {nextPost.translations.excerpt}
                    </p>
                  )}
                </Card>
              ) : (
                <div className="p-6 opacity-50 text-right">
                  <span className="font-body text-gray-400">
                    {locale === 'zh-tw' ? '已是最後一篇文章' : 'This is the last article'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 回到文章列表 */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <button 
              onClick={() => router.push('/blog')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 eastern-border transition-colors duration-200"
            >
              <span>📚</span>
              <span className="font-body font-medium">
                {locale === 'zh-tw' ? '返回文章列表' : 'Back to Articles'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}