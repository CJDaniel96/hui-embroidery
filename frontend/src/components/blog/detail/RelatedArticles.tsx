'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import PostCard from '../PostCard';
import { blogApi, type Post } from '@/lib/api';

interface RelatedArticlesProps {
  currentPost: Post;
}

export default function RelatedArticles({ currentPost }: RelatedArticlesProps) {
  const locale = useLocale();
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getRelatedPosts(currentPost.id, 3);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
        // 使用其他文章作為後備
        try {
          const recentPosts = await blogApi.getRecentPosts(4);
          // 排除當前文章
          const filtered = recentPosts.filter(post => post.id !== currentPost.id);
          setRelatedPosts(filtered.slice(0, 3));
        } catch (fallbackError) {
          console.error('Failed to fetch fallback posts:', fallbackError);
          setRelatedPosts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost.id]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-title text-3xl font-medium text-gray-900 text-center mb-12">
              {locale === 'zh-tw' ? '相關文章' : 'Related Articles'}
            </h2>
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-medium text-gray-900 mb-4 flex items-center justify-center">
              <span className="w-8 h-8 bg-vermillion-500 eastern-border flex items-center justify-center mr-4">
                <span className="text-white text-sm">關</span>
              </span>
              {locale === 'zh-tw' ? '相關文章' : 'Related Articles'}
            </h2>
            <p className="font-body text-gray-600">
              {locale === 'zh-tw' 
                ? '探索更多湘繡藝術的精彩內容' 
                : 'Explore more fascinating content about Xiang embroidery art'}
            </p>
          </div>

          {/* 相關文章網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <div 
                key={post.id}
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {/* 查看更多按鈕 */}
          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = `/${locale}/blog`}
              className="px-8 py-3 bg-vermillion-500 hover:bg-vermillion-600 text-white eastern-border transition-colors duration-200 font-body font-medium"
            >
              {locale === 'zh-tw' ? '查看更多文章' : 'View More Articles'} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}