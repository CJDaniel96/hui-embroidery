import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const HeroSection = () => {
  const t = useTranslations();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-embroidery.jpg"
          alt="Traditional Chinese Embroidery"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-white leading-tight">
            {t('hero.title')}<br />
            <span className="bg-gradient-text bg-clip-text text-transparent">{t('hero.subtitle')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-sans">
            {t('hero.description')}
          </p>
          <Button size="lg" className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-elegant">
            {t('hero.cta')}
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