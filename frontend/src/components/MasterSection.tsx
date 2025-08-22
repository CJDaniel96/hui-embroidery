'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const MasterSection = () => {
  const t = useTranslations();
  
  // 處理獎項陣列
  const awards = t.raw('awards') as string[];
  
  return (
    <section id="master" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <Image
                  src="/images/master-hands.jpg"
                  alt="Master's hands working on embroidery"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                  priority
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-master.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-20"></div>
            </div>

            {/* Content */}
            <div className="space-y-8 animate-slide-up">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                  {t('master.title')}
                </h2>
                <p className="text-xl text-muted-foreground font-sans">
                  {t('master.subtitle')}
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mt-6"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6 font-sans">
                  {t('master.description')}
                </p>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {t('master.description2')}
                </p>
              </div>

              {/* Achievements */}
              <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                    {t('master.achievements')}
                  </h3>
                  <div className="grid gap-3">
                    {awards.map((achievement, index) => (
                      <div 
                        key={index}
                        className="flex items-start space-x-3 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground font-sans text-sm leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Technique */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                    {t('master.technique')}
                  </h3>
                  <p className="text-foreground font-sans leading-relaxed">
                    {t('master.techniqueDesc')}
                  </p>
                </CardContent>
              </Card>

              {/* 了解更多按鈕 */}
              <div className="pt-4">
                <Link href="/master">
                  <Button 
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    了解更多大師故事
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterSection;