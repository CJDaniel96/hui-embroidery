'use client';

import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui';
import { type Post } from '@/lib/api';
import { formatDate, getImageUrl } from '@/lib/utils';

interface ArticleHeaderProps {
  post: Post;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  const locale = useLocale();

  return (
    <header className="relative overflow-hidden">
      {/* 特色圖片背景 */}
      {post.featured_image_url && (
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl(post.featured_image_url)}
            alt={post.translations.title || 'Article'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
      )}

      {/* 內容區域 */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* 分類標籤 */}
          {post.categories.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-2">
                {post.categories.map((category) => (
                  <Badge 
                    key={category.id} 
                    variant={post.featured_image_url ? 'outline' : 'seal'} 
                    className={post.featured_image_url ? 'bg-white/90 backdrop-blur-sm' : ''}
                  >
                    {category.translations.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 文章標題 */}
          <h1 className={`font-title text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-8 ${
            post.featured_image_url ? 'text-white' : 'ink-gradient'
          }`}>
            {post.translations.title || 
             (locale === 'zh-tw' ? '未命名文章' : 'Untitled Article')}
          </h1>

          {/* 文章摘要 */}
          {post.translations.excerpt && (
            <p className={`font-body text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto ${
              post.featured_image_url ? 'text-white/90' : 'text-gray-600'
            }`}>
              {post.translations.excerpt}
            </p>
          )}

          {/* 文章元信息 */}
          <div className={`flex flex-wrap items-center justify-center gap-6 text-sm ${
            post.featured_image_url ? 'text-white/80' : 'text-gray-500'
          }`}>
            {/* 作者 */}
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-vermillion-500 eastern-border flex items-center justify-center">
                <span className="text-white text-xs">作</span>
              </span>
              <span className="font-body font-medium">
                {post.author_name || '毛慧'}
              </span>
            </div>

            {/* 發布日期 */}
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 bg-blue-500 eastern-border flex items-center justify-center">
                <span className="text-white text-xs">日</span>
              </span>
              <span className="font-body">
                {formatDate(post.published_at, locale)}
              </span>
            </div>

            {/* 閱讀時間 */}
            {post.reading_time && (
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-green-500 eastern-border flex items-center justify-center">
                  <span className="text-white text-xs">讀</span>
                </span>
                <span className="font-body">
                  {post.reading_time} {locale === 'zh-tw' ? '分鐘' : 'min'}
                </span>
              </div>
            )}

            {/* 瀏覽次數 */}
            {post.view_count !== undefined && (
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-yellow-500 eastern-border flex items-center justify-center">
                  <span className="text-white text-xs">覽</span>
                </span>
                <span className="font-body">
                  {post.view_count} {locale === 'zh-tw' ? '次瀏覽' : 'views'}
                </span>
              </div>
            )}
          </div>

          {/* 精選標籤 */}
          {post.is_featured && (
            <div className="mt-8">
              <Badge variant="chinese" size="lg" className="px-6 py-2">
                ⭐ {locale === 'zh-tw' ? '精選文章' : 'Featured Article'}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* 向下滾動指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => {
            const element = document.getElementById('article-content');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`w-8 h-12 border-2 rounded-full flex justify-center items-start p-2 transition-colors duration-300 group ${
            post.featured_image_url 
              ? 'border-white/60 hover:border-white bg-black/20 backdrop-blur-sm' 
              : 'border-gray-400 hover:border-vermillion-500 bg-white/80 backdrop-blur-sm'
          }`}
        >
          <div className={`w-1 h-3 rounded-full transition-colors duration-300 ${
            post.featured_image_url 
              ? 'bg-white/60 group-hover:bg-white' 
              : 'bg-gray-400 group-hover:bg-vermillion-500'
          }`}></div>
        </button>
      </div>
    </header>
  );
}