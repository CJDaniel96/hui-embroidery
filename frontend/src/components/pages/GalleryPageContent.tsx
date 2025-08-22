'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useArtworks, useArtworkCategories } from '@/hooks/useArtworks';
import { getImageUrl } from '@/lib/utils';
import { AlertCircle, Filter, Grid, List } from 'lucide-react';

const GalleryPageContent = () => {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 取得作品和分類
  const { data: artworksData, isLoading, error } = useArtworks({
    page: currentPage,
    category: selectedCategory,
  });

  const { data: categories } = useArtworkCategories();

  // 備用作品資料
  const fallbackArtworks = [
    {
      id: 1,
      title: "鳳凰呈祥",
      description: "精美的鳳凰主題刺繡作品，展現了傳統中國文化中鳳凰的優雅與威嚴。",
      image: "/images/artworks/embroidery-phoenix.jpg",
      technique: "蘇繡 · 雙面繡",
      size: "80cm × 60cm",
      year: "2023",
      category: "傳統題材"
    },
    {
      id: 2,
      title: "牡丹富貴",
      description: "以牡丹為主題的刺繡作品，寓意富貴吉祥，色彩豐富層次分明。",
      image: "/images/artworks/embroidery-peony.jpg",
      technique: "湘繡 · 平針繡",
      size: "60cm × 60cm",
      year: "2023",
      category: "花卉系列"
    },
    {
      id: 3,
      title: "山水清音",
      description: "描繪江南山水的意境之作，筆觸細膩，展現了水墨畫般的詩意。",
      image: "/images/artworks/embroidery-landscape.jpg",
      technique: "蜀繡 · 暈針繡",
      size: "120cm × 40cm",
      year: "2022",
      category: "山水系列"
    },
    {
      id: 4,
      title: "蝴蝶蘭韻",
      description: "精緻的蝴蝶蘭刺繡，每一片花瓣都栩栩如生，展現花卉之美。",
      image: "/images/artworks/embroidery-orchid.jpg",
      technique: "粵繡 · 釘金繡",
      size: "70cm × 50cm",
      year: "2023",
      category: "花卉系列"
    },
    {
      id: 5,
      title: "龍騰盛世",
      description: "威武的龍圖騰刺繡，金線勾勒，氣勢磅礴，象徵著興旺發達。",
      image: "/images/artworks/embroidery-dragon.jpg",
      technique: "蘇繡 · 盤金繡",
      size: "100cm × 60cm",
      year: "2022",
      category: "傳統題材"
    },
    {
      id: 6,
      title: "荷塘月色",
      description: "清雅的荷花主題作品，月光下的荷塘美景，意境深遠。",
      image: "/images/artworks/embroidery-lotus.jpg",
      technique: "湘繡 · 亂針繡",
      size: "90cm × 70cm",
      year: "2023",
      category: "花卉系列"
    }
  ];

  const artworks = artworksData?.results?.length > 0 
    ? artworksData.results.map(artwork => ({
        id: artwork.id,
        title: artwork.translations.title || `作品 ${artwork.id}`,
        description: artwork.translations.description || '',
        image: getImageUrl(artwork.thumbnail_url || artwork.main_image_url),
        technique: artwork.translations.technique || artwork.medium,
        size: artwork.dimensions || '未知尺寸',
        year: artwork.year_created?.toString() || '未知年份',
        category: artwork.categories[0]?.name || '其他'
      }))
    : fallbackArtworks;

  const fallbackCategories = [
    { id: 1, name: '全部作品', slug: '' },
    { id: 2, name: '傳統題材', slug: 'traditional' },
    { id: 3, name: '花卉系列', slug: 'flowers' },
    { id: 4, name: '山水系列', slug: 'landscape' },
    { id: 5, name: '人物肖像', slug: 'portrait' },
  ];

  const displayCategories = categories?.length > 0 
    ? [{ id: 0, name: '全部作品', slug: '' }, ...categories]
    : fallbackCategories;

  if (isLoading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              精品典藏
            </h1>
            <p className="text-xl text-muted-foreground">
              載入中...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-64" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 頁面標題 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            精品典藏
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            探索我們的刺繡藝術作品集，每一件都是匠心獨運的藝術珍品
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
        </div>

        {/* 篩選和檢視選項 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          {/* 分類篩選 */}
          <div className="flex flex-wrap gap-2">
            {displayCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.slug);
                  setCurrentPage(1);
                }}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category.slug 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "hover:bg-red-50 hover:text-red-600"
                }
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* 檢視模式 */}
          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 錯誤提示 */}
        {error && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-2 text-yellow-800">
              <AlertCircle size={16} />
              <span className="text-sm">使用離線作品展示</span>
            </div>
          </div>
        )}

        {/* 作品展示 */}
        <div className={
          viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
        }>
          {artworks.map((artwork, index) => (
            <Card 
              key={artwork.id} 
              className={`group cursor-pointer transition-elegant hover:shadow-lg overflow-hidden ${
                viewMode === 'list' ? 'md:flex' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'md:w-1/3 h-48 md:h-auto' : 'h-64'
              }`}>
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
              
              <CardContent className={`p-6 ${viewMode === 'list' ? 'md:flex-1' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-semibold text-foreground leading-tight">
                    {artwork.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {artwork.year}
                  </Badge>
                </div>
                
                <p className="text-gray-400 font-sans mb-4 text-sm leading-relaxed">
                  {artwork.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-400">
                  <p className="font-medium">{artwork.technique}</p>
                  <p className="text-xs">{artwork.size}</p>
                  <Badge variant="outline" className="text-xs">
                    {artwork.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 分頁 */}
        {artworksData?.count && artworksData.count > 9 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                variant="outline"
              >
                上一頁
              </Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">
                第 {currentPage} 頁
              </span>
              <Button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!artworksData.next}
                variant="outline"
              >
                下一頁
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPageContent;