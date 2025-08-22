'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useFeaturedArtworks } from '@/hooks/useArtworks';
import { getImageUrl } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

// 備用作品資料（當 API 不可用時使用）
const fallbackArtworks = [
  {
    id: 1,
    title: "鳳凰呈祥",
    description: "Phoenix Blessing",
    image: "/images/artworks/embroidery-phoenix.jpg",
    technique: "蘇繡 · 雙面繡",
    size: "80cm × 60cm"
  },
  {
    id: 2,
    title: "牡丹富貴", 
    description: "Peony Prosperity",
    image: "/images/artworks/embroidery-peony.jpg",
    technique: "湘繡 · 平針繡",
    size: "60cm × 60cm"
  },
  {
    id: 3,
    title: "山水清音",
    description: "Landscape Melody", 
    image: "/images/artworks/embroidery-landscape.jpg",
    technique: "蜀繡 · 暈針繡",
    size: "120cm × 40cm"
  }
];

const GallerySection = () => {
  const t = useTranslations();
  
  const { 
    data: apiArtworks, 
    isLoading, 
    error 
  } = useFeaturedArtworks({
    retry: 1,
    retryDelay: 1000,
  });

  const artworks = apiArtworks && apiArtworks.length > 0 
    ? apiArtworks.map(artwork => ({
        id: artwork.id,
        title: artwork.translations.title || `作品 ${artwork.id}`,
        description: artwork.translations.description || '',
        image: getImageUrl(artwork.thumbnail_url || artwork.main_image_url),
        technique: artwork.translations.technique || artwork.medium,
        size: artwork.dimensions || '未知尺寸'
      }))
    : fallbackArtworks;

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-xl text-muted-foreground font-sans">
              {t('gallery.subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-card border-border/50">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-muted-foreground font-sans">
            {t('gallery.subtitle')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto mt-6"></div>
        </div>

        {error && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-2 text-yellow-800">
              <AlertCircle size={16} />
              <span className="text-sm">使用離線作品展示</span>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {artworks.map((artwork, index) => (
            <Card 
              key={artwork.id} 
              className="group cursor-pointer transition-elegant hover:shadow-elegant bg-card border-border/50 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden h-64 w-full">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-elegant group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder-artwork.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-elegant"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2 leading-tight">
                    {artwork.title}
                  </h3>
                  
                  <p className="text-gray-400 font-sans mb-4 text-sm leading-relaxed">
                    {artwork.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-400">
                    <p className="font-medium">{artwork.technique}</p>
                    <p className="text-xs">{artwork.size}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button 
              variant="ghost" 
              className="text-red-900 hover:text-red-800 hover:bg-red-50 font-medium text-lg transition-smooth relative group"
            >
              {t('gallery.viewMore')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;