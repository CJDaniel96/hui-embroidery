'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useHeroContent } from '@/hooks/useSiteContent';

const HeroSection = () => {
  const t = useTranslations();
  const { data: heroContent, isLoading, error } = useHeroContent();
  
  // 使用 API 數據或 fallback 到翻譯文件
  const title = heroContent?.translations?.hero_title || t('hero.title');
  const subtitle = heroContent?.translations?.hero_subtitle || t('hero.subtitle');
  const description = heroContent?.translations?.hero_description || t('hero.description');
  const ctaText = heroContent?.translations?.hero_cta_text || t('hero.cta');
  const heroImage = heroContent?.hero_image_url || '/images/hero-embroidery.jpg';
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Traditional Chinese Embroidery"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 text-white leading-tight break-words hyphens-auto">
            {title}<br />
            <span className="bg-gradient-text bg-clip-text text-transparent">{subtitle}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-sans">
            {description}
          </p>
          <Button size="lg" className="bg-red-900 hover:bg-red-800 text-white text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-elegant">
            {ctaText}
          </Button>
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;