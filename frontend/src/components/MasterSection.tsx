'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useMasterContent, useAchievements } from '@/hooks/useSiteContent';

const MasterSection = () => {
  const t = useTranslations();
  const { data: masterContent } = useMasterContent();
  const { data: achievements } = useAchievements();
  
  // 使用 API 數據或 fallback 到翻譯文件
  const title = masterContent?.translations?.master_title || t('master.title');
  const subtitle = masterContent?.translations?.master_subtitle || t('master.subtitle');
  const description = masterContent?.translations?.master_description || t('master.description');
  const description2 = masterContent?.translations?.master_description2 || t('master.description2');
  const achievementsTitle = masterContent?.translations?.master_achievements_title || t('master.achievements');
  const techniqueTitle = masterContent?.translations?.master_technique_title || t('master.technique');
  const techniqueDesc = masterContent?.translations?.master_technique_desc || t('master.techniqueDesc');
  const masterImage = masterContent?.master_image_url || '/images/master-hands.jpg';
  
  // 處理獎項數據，優先使用 API 數據
  const awards = achievements && achievements.length > 0 
    ? achievements.map(achievement => {
        const yearStr = achievement.year ? `${achievement.year}年：` : '';
        return `${yearStr}${achievement.translations.title}`;
      })
    : (t.raw('awards') as string[]);
  
  return (
    <section id="master" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant">
                <Image
                  src={masterImage}
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
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-900 to-red-800 rounded-full opacity-20"></div>
            </div>

            {/* Content */}
            <div className="space-y-8 animate-slide-up">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                  {title}
                </h2>
                <p className="text-xl text-muted-foreground font-sans">
                  {subtitle}
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-red-900 to-red-800 mt-6"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6 font-sans">
                  {description}
                </p>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {description2}
                </p>
              </div>

              {/* Achievements */}
              <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                    {achievementsTitle}
                  </h3>
                  <div className="grid gap-3">
                    {awards.map((achievement, index) => (
                      <div 
                        key={index}
                        className="flex items-start space-x-3 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0"></div>
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
                    {techniqueTitle}
                  </h3>
                  <p className="text-foreground font-sans leading-relaxed">
                    {techniqueDesc}
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* 了解更多按鈕 - 置中於整個頁面 */}
          <div className="text-center mt-12">
            <Link href="/master">
              <Button 
                variant="ghost" 
                className="text-red-900 hover:text-red-800 hover:bg-red-50 font-medium text-lg transition-smooth relative group"
              >
                {t('master.learnMore')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterSection;