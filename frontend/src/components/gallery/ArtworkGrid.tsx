'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { type Artwork } from '@/lib/api';
import { getImageUrl, formatDate } from '@/lib/utils';
import ArtworkModal from './ArtworkModal';

interface ArtworkGridProps {
  artworks: Artwork[];
  loading: boolean;
  viewDetailsText: string;
  noArtworksText: string;
}

export default function ArtworkGrid({ 
  artworks, 
  loading, 
  viewDetailsText, 
  noArtworksText 
}: ArtworkGridProps) {
  const locale = useLocale();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <Card key={index} variant="paper" className="animate-pulse">
            <div className="w-full h-80 bg-gray-100"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-20">
        {/* 空狀態 - 極簡設計 */}
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 flex items-center justify-center eastern-border">
            <span className="text-3xl text-gray-400">🎨</span>
          </div>
          <h3 className="font-title text-2xl font-medium text-gray-400 mb-3">
            {noArtworksText}
          </h3>
          <p className="font-body text-gray-500">
            {locale === 'zh-tw' 
              ? '請嘗試調整篩選條件' 
              : 'Try adjusting your filters'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 作品網格 - 大量留白設計 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {artworks.map((artwork, index) => (
          <Card 
            key={artwork.id} 
            variant="paper" 
            className="group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-2"
            onClick={() => setSelectedArtwork(artwork)}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* 圖片區域 */}
            <div className="relative overflow-hidden aspect-square">
              {artwork.main_image_url ? (
                <img
                  src={getImageUrl(artwork.main_image_url)}
                  alt={artwork.translations.title || 'Artwork'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-4xl text-gray-300">🎨</span>
                </div>
              )}
              
              {/* 極簡標籤 */}
              {artwork.is_featured && (
                <div className="absolute top-4 left-4">
                  <div className="w-3 h-3 bg-vermillion-500 eastern-border shadow-sm"></div>
                </div>
              )}
              
              {/* 懸浮資訊層 - 極簡設計 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                <div className="p-6 text-white w-full">
                  <p className="font-body text-sm mb-2 opacity-90">
                    {viewDetailsText}
                  </p>
                  {artwork.year_created && (
                    <span className="font-body text-xs opacity-70">
                      {artwork.year_created}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 內容區域 - 大量留白 */}
            <div className="p-8">
              {/* 標題 */}
              <h3 className="font-title text-xl font-medium text-gray-900 mb-4 group-hover:text-vermillion-600 transition-colors duration-300">
                {artwork.translations.title || 
                 (locale === 'zh-tw' ? '無題' : 'Untitled')}
              </h3>
              
              {/* 描述 - 控制行數 */}
              <p className="font-body text-gray-600 line-clamp-2 mb-6 leading-relaxed">
                {artwork.translations.description ||
                 (locale === 'zh-tw' ? '湘繡精品，展現傳統鬅毛針法的精湛技藝。' : 'Xiang embroidery masterpiece showcasing traditional Maomao technique.')}
              </p>

              {/* 底部資訊 - 極簡排版 */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                {artwork.medium && (
                  <span className="font-body">
                    {artwork.medium}
                  </span>
                )}
                <span className="font-body text-xs">
                  {formatDate(artwork.created_at, locale)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 作品詳情模態框 */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </>
  );
}