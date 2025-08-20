'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Card, Button } from '@/components/ui';
import { LoadingSpinner } from '@/components/common';
import { artworksApi, type Artwork } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';

interface FeaturedArtworksProps {
  title: string;
  subtitle: string;
  viewAllText: string;
  viewDetailsText: string;
  loadingText: string;
  errorText: string;
  retryText: string;
}

export default function FeaturedArtworks({
  title,
  subtitle,
  viewAllText,
  viewDetailsText,
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
      
      // 正確處理 API 響應 - getFeaturedArtworks 返回 Artwork[] 數組
      const data = await artworksApi.getFeaturedArtworks(6);
      setArtworks(data.slice(0, 6)); // 只顯示前 6 件作品
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load artworks');
      console.error('Failed to fetch featured artworks:', err);
      
      // 設置後備數據
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleArtworkClick = (id: string) => {
    router.push(`/gallery/${id}`);
  };

  const handleViewAll = () => {
    router.push('/gallery');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-yellow-50">
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
            <div className="h-px bg-gradient-to-r from-transparent via-red-300 to-transparent w-32"></div>
            <div className="mx-4 w-2 h-2 bg-vermillion-500 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-red-300 to-transparent w-32"></div>
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
            <Button onClick={fetchArtworks} variant="outline">
              {retryText}
            </Button>
          </div>
        )}

        {/* 作品網格 */}
        {!loading && !error && (
          <>
            {artworks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {artworks.map((artwork, index) => (
                  <Card 
                    key={artwork.id}
                    variant="paper"
                    className="group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                    onClick={() => handleArtworkClick(artwork.id)}
                    style={{
                      animationDelay: `${index * 150}ms`
                    }}
                  >
                    {/* 圖片區域 */}
                    <div className="relative overflow-hidden aspect-square">
                      {artwork.main_image_url ? (
                        <img
                          src={getImageUrl(artwork.main_image_url)}
                          alt={artwork.translations.title || 'Artwork'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
                          <span className="text-4xl text-gray-300">🎨</span>
                        </div>
                      )}
                      
                      {/* 精選標籤 */}
                      {artwork.is_featured && (
                        <div className="absolute top-4 left-4">
                          <div className="w-3 h-3 bg-vermillion-500 eastern-border"></div>
                        </div>
                      )}
                      
                      {/* 懸浮資訊層 */}
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

                    {/* 內容區域 */}
                    <div className="p-6">
                      <h3 className="font-title text-xl font-medium text-gray-900 group-hover:text-vermillion-600 transition-colors duration-300 mb-3 line-clamp-2">
                        {artwork.translations.title || 
                         (locale === 'zh-tw' ? '無題' : 'Untitled')}
                      </h3>
                      
                      <p className="font-body text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                        {artwork.translations.description ||
                         (locale === 'zh-tw' ? '湘繡精品，展現傳統鬅毛針法的精湛技藝。' : 'Xiang embroidery masterpiece showcasing traditional Maomao technique.')}
                      </p>

                      {/* 底部資訊 */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <span className="font-body">
                          {artwork.medium || '湘繡'}
                        </span>
                        {artwork.dimensions && (
                          <span className="font-body text-xs">
                            {artwork.dimensions}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 eastern-border flex items-center justify-center">
                  <span className="text-3xl text-gray-400">🎨</span>
                </div>
                <h3 className="font-title text-2xl font-medium text-gray-400 mb-3">
                  {locale === 'zh-tw' ? '暫無作品' : 'No Artworks Yet'}
                </h3>
                <p className="font-body text-gray-500">
                  {locale === 'zh-tw' 
                    ? '精美作品即將上線，敬請期待' 
                    : 'Beautiful artworks coming soon, stay tuned'}
                </p>
              </div>
            )}

            {/* 查看全部按鈕 */}
            {artworks.length > 0 && (
              <div className="text-center">
                <Button 
                  onClick={handleViewAll}
                  variant="seal"
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