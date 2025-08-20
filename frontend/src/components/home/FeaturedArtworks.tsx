/* Section ID: artworks */
'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Card, Button, Badge } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { artworksApi, type Artwork } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';

interface FeaturedArtworksProps {
  title: string;
  subtitle: string;
  viewAllText: string;
  loadingText: string;
  errorText: string;
  retryText: string;
}

export default function FeaturedArtworks({ 
  title, 
  subtitle, 
  viewAllText, 
  loadingText, 
  errorText, 
  retryText 
}: FeaturedArtworksProps) {
  const locale = useLocale();
  const router = useRouter();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await artworksApi.getFeaturedArtworks();
      setArtworks(data.slice(0, 6));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load artworks');
      console.error('Failed to fetch featured artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  // 導航到作品集頁面
  const navigateToGallery = () => {
    router.push('/gallery');
  };

  if (loading) {
    return (
      <section id="artworks" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          <div className="flex justify-center items-center">
            <LoadingSpinner size="lg" />
            <span className="ml-4 text-gray-600">{loadingText}</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="artworks" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 mb-4">{errorText}: {error}</p>
            <Button onClick={fetchArtworks} variant="primary">
              {retryText}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="artworks" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-10 right-10 w-64 h-64 chinese-corner bg-red-100 opacity-20 rounded-lg"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 chinese-corner bg-yellow-100 opacity-20 rounded-lg"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* 作品網格 */}
        {artworks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {artworks.map((artwork, index) => (
                <Card 
                  key={artwork.id} 
                  variant="elevated" 
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
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
                    
                    {/* 精選標籤 */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="chinese" size="sm" className="shadow-lg">
                        {locale === 'zh-tw' ? '精選' : 'Featured'}
                      </Badge>
                    </div>
                    
                    {/* 懸浮覆蓋層 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm">
                          {locale === 'zh-tw' ? '點擊查看詳情' : 'Click for details'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {artwork.translations.title || 
                       (locale === 'zh-tw' ? '未命名作品' : 'Untitled Artwork')}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {artwork.translations.description ||
                       (locale === 'zh-tw' ? '精美的刺繡作品，展現傳統工藝之美。' : 'Exquisite embroidery work showcasing traditional craftsmanship.')}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      {artwork.medium && (
                        <span>
                          {locale === 'zh-tw' ? '媒材:' : 'Medium:'} {artwork.medium}
                        </span>
                      )}
                      {artwork.year_created && (
                        <span className="font-medium">
                          {artwork.year_created}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 查看全部按鈕 */}
            <div className="text-center">
              <Button 
                onClick={navigateToGallery}
                variant="chinese" 
                size="lg" 
                className="px-12 py-4 transform hover:scale-105 transition-all duration-300"
              >
                {viewAllText}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">🎨</div>
            <p className="text-gray-500 text-lg">
              {locale === 'zh-tw' ? '目前沒有精選作品' : 'No featured artworks available'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}