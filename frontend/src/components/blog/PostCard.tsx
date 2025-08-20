'use client';

import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Card, Badge } from '@/components/ui';
import { type Post } from '@/lib/api';
import { getImageUrl, formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export default function PostCard({ 
  post, 
  variant = 'default',
  className = '' 
}: PostCardProps) {
  const locale = useLocale();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  if (variant === 'compact') {
    return (
      <article 
        onClick={handleClick}
        className={`group cursor-pointer transition-all duration-300 hover:translate-x-2 ${className}`}
      >
        <div className="flex items-start space-x-4">
          {/* 縮圖 */}
          <div className="w-20 h-20 flex-shrink-0 overflow-hidden eastern-border">
            {post.featured_image_url ? (
              <img
                src={getImageUrl(post.featured_image_url)}
                alt={post.translations.title || 'Blog post'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-lg text-gray-400">📝</span>
              </div>
            )}
          </div>

          {/* 內容 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-title text-base font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300 line-clamp-2 mb-2">
              {post.translations.title || 
               (locale === 'zh-tw' ? '未命名文章' : 'Untitled Post')}
            </h3>
            
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <span>{formatDate(post.published_at, locale)}</span>
              {post.reading_time && (
                <span>{post.reading_time} {locale === 'zh-tw' ? '分鐘' : 'min'}</span>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <Card 
        onClick={handleClick}
        variant="paper" 
        className={`group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${className}`}
      >
        {/* 大圖片區域 */}
        <div className="relative overflow-hidden aspect-[16/9]">
          {post.featured_image_url ? (
            <img
              src={getImageUrl(post.featured_image_url)}
              alt={post.translations.title || 'Featured post'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <span className="text-4xl text-gray-300">📖</span>
            </div>
          )}
          
          {/* 特色標籤 */}
          <div className="absolute top-4 left-4">
            <Badge variant="seal" size="sm">
              {locale === 'zh-tw' ? '精選' : 'Featured'}
            </Badge>
          </div>

          {/* 分類標籤 */}
          {post.categories.length > 0 && (
            <div className="absolute top-4 right-4">
              <Badge variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                {post.categories[0].translations.name}
              </Badge>
            </div>
          )}
        </div>

        {/* 內容區域 */}
        <div className="p-8">
          <h2 className="font-title text-2xl font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300 mb-4 line-clamp-2">
            {post.translations.title || 
             (locale === 'zh-tw' ? '未命名文章' : 'Untitled Post')}
          </h2>
          
          <p className="font-body text-gray-600 line-clamp-3 mb-6 leading-relaxed">
            {post.translations.excerpt ||
             (locale === 'zh-tw' ? '探索湘繡藝術的精彩世界，了解傳統技藝的現代傳承...' : 'Explore the fascinating world of Xiang embroidery art and understand the modern inheritance of traditional craftsmanship...')}
          </p>

          {/* 底部資訊 */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="font-body">{formatDate(post.published_at, locale)}</span>
              {post.reading_time && (
                <span className="font-body">
                  {post.reading_time} {locale === 'zh-tw' ? '分鐘閱讀' : 'min read'}
                </span>
              )}
            </div>
            <span className="font-body text-xs vermillion-accent">
              {locale === 'zh-tw' ? '閱讀更多 →' : 'Read More →'}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card 
      onClick={handleClick}
      variant="paper" 
      className={`group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* 圖片區域 */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {post.featured_image_url ? (
          <img
            src={getImageUrl(post.featured_image_url)}
            alt={post.translations.title || 'Blog post'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <span className="text-3xl text-gray-300">📝</span>
          </div>
        )}
        
        {/* 分類標籤 */}
        {post.categories.length > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              {post.categories[0].translations.name}
            </Badge>
          </div>
        )}
        
        {/* 特色標籤 */}
        {post.is_featured && (
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-vermillion-500 eastern-border"></div>
          </div>
        )}
      </div>

      {/* 內容區域 */}
      <div className="p-6">
        <h3 className="font-title text-xl font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300 mb-3 line-clamp-2">
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
            <span className="font-body">{formatDate(post.published_at, locale)}</span>
            {post.reading_time && (
              <span className="font-body">
                {post.reading_time} {locale === 'zh-tw' ? '分鐘' : 'min'}
              </span>
            )}
          </div>
          {post.author_name && (
            <span className="font-body text-xs">
              {locale === 'zh-tw' ? '作者:' : 'By:'} {post.author_name}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}