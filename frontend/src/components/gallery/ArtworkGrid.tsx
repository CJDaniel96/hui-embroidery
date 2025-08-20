'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Card, Badge } from '@/components/ui';
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
          <Card key={index} className="animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded-t-lg"></div>
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
      <div className="text-center py-16">
        <div className="text-8xl text-gray-300 mb-6">🎨</div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">{noArtworksText}</h3>
        <p className="text-gray-500">
          {locale === 'zh-tw' 
            ? '請嘗試調整篩選條件或搜尋關鍵字' 
            : 'Try adjusting your filters or search terms'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork, index) => (
          <Card 
            key={artwork.id} 
            variant="elevated" 
            className="group cursor-pointer card-hover overflow-hidden"
            onClick={() => setSelectedArtwork(artwork)}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="relative overflow-hidden">
              {artwork.main_image_url ? (
                <img
                  src={getImageUrl(artwork.main_image_url)}
                  alt={artwork.translations.title || 'Artwork'}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center">
                  <span className="text-6xl text-red-300">🎨</span>
                </div>
              )}
              
              {/* 標籤區域 */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {artwork.is_featured && (
                  <Badge variant="chinese" size="sm" className="shadow-lg">
                    {locale === 'zh-tw' ? '精選' : 'Featured'}
                  </Badge>
                )}
                {artwork.categories.map((category) => (
                  <Badge key={category.id} variant="secondary" size="sm" className="shadow-lg">
                    {category.translations.name}
                  </Badge>
                ))}
              </div>
              
              {/* 懸浮覆蓋層 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                <div className="p-6 text-white w-full">
                  <p className="text-sm font-medium mb-2">
                    {viewDetailsText}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    {artwork.medium && (
                      <span className="bg-white/20 px-2 py-1 rounded">
                        {artwork.medium}
                      </span>
                    )}
                    {artwork.year_created && (
                      <span className="bg-white/20 px-2 py-1 rounded">
                        {artwork.year_created}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                {artwork.translations.title || 
                 (locale === 'zh-tw' ? '未命名作品' : 'Untitled Artwork')}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {artwork.translations.description ||
                 (locale === 'zh-tw' ? '精美的刺繡作品，展現傳統工藝之美。' : 'Exquisite embroidery work showcasing traditional craftsmanship.')}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  {artwork.dimensions && (
                    <span>
                      📏 {artwork.dimensions}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">
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