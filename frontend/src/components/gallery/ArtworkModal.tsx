'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button, Badge } from '@/components/ui';
import { type Artwork } from '@/lib/api';
import { getImageUrl, formatDate } from '@/lib/utils';

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const locale = useLocale();

  // 處理 ESC 鍵關閉
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 模態框內容 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* 圖片區域 */}
          <div className="relative bg-gray-100">
            {artwork.main_image_url ? (
              <img
                src={getImageUrl(artwork.main_image_url)}
                alt={artwork.translations.title || 'Artwork'}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100">
                <span className="text-8xl text-red-300">🎨</span>
              </div>
            )}

            {/* 圖片上的標籤 */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {artwork.is_featured && (
                <Badge variant="chinese" className="shadow-lg">
                  {locale === 'zh-tw' ? '精選作品' : 'Featured'}
                </Badge>
              )}
            </div>
          </div>

          {/* 詳情區域 */}
          <div className="p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* 標題和分類 */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {artwork.translations.title || 
                   (locale === 'zh-tw' ? '未命名作品' : 'Untitled Artwork')}
                </h2>
                
                {artwork.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {artwork.categories.map((category) => (
                      <Badge key={category.id} variant="outline">
                        {category.translations.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* 描述 */}
              {artwork.translations.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {locale === 'zh-tw' ? '作品描述' : 'Description'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {artwork.translations.description}
                  </p>
                </div>
              )}

              {/* 作品資訊 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artwork.medium && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">
                      {locale === 'zh-tw' ? '媒材' : 'Medium'}
                    </h4>
                    <p className="text-gray-600">{artwork.medium}</p>
                  </div>
                )}

                {artwork.dimensions && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">
                      {locale === 'zh-tw' ? '尺寸' : 'Dimensions'}
                    </h4>
                    <p className="text-gray-600">{artwork.dimensions}</p>
                  </div>
                )}

                {artwork.year_created && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">
                      {locale === 'zh-tw' ? '創作年份' : 'Year Created'}
                    </h4>
                    <p className="text-gray-600">{artwork.year_created}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">
                    {locale === 'zh-tw' ? '創建日期' : 'Created Date'}
                  </h4>
                  <p className="text-gray-600">{formatDate(artwork.created_at, locale)}</p>
                </div>
              </div>

              {/* 技法資訊（如果有翻譯中的技法資訊） */}
              {artwork.translations.technique && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {locale === 'zh-tw' ? '技法介紹' : 'Technique'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {artwork.translations.technique}
                  </p>
                </div>
              )}

              {/* 相關作品（如果有） */}
              {artwork.related_artworks && artwork.related_artworks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === 'zh-tw' ? '相關作品' : 'Related Artworks'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {artwork.related_artworks.slice(0, 4).map((related) => (
                      <div key={related.id} className="group cursor-pointer">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {related.thumbnail_url ? (
                            <img
                              src={getImageUrl(related.thumbnail_url)}
                              alt={related.translations.title || 'Related artwork'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl text-gray-400">🎨</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {related.translations.title || 
                           (locale === 'zh-tw' ? '未命名作品' : 'Untitled')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 操作按鈕 */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  {locale === 'zh-tw' ? '關閉' : 'Close'}
                </Button>
                <Button variant="chinese" className="flex-1">
                  {locale === 'zh-tw' ? '分享作品' : 'Share Artwork'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}