'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button, Card } from '@/components/ui';

interface AboutPreviewProps {
  title: string;
  subtitle: string;
  description: string;
  learnMoreText: string;
  achievements: {
    experience: string;
    works: string;
    exhibitions: string;
    awards: string;
  };
}

export default function AboutPreview({ 
  title, 
  subtitle, 
  description, 
  learnMoreText,
  achievements 
}: AboutPreviewProps) {
  const locale = useLocale();

  const stats = [
    {
      number: "30+",
      label: achievements.experience,
      icon: "🎨"
    },
    {
      number: "500+",
      label: achievements.works,
      icon: "🧵"
    },
    {
      number: "50+",
      label: achievements.exhibitions,
      icon: "🏛️"
    },
    {
      number: "20+",
      label: achievements.awards,
      icon: "🏆"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-red-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左側：文字內容 */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-xl text-red-600 mb-6 font-medium">
              {subtitle}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>

            {/* 統計數據 */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about">
              <Button variant="chinese" size="lg" className="px-8 py-4">
                {learnMoreText}
              </Button>
            </Link>
          </div>

          {/* 右側：視覺元素 */}
          <div className="relative">
            {/* 主要卡片 */}
            <Card variant="chinese" className="relative z-10 p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center chinese-corner">
                  <span className="text-white text-3xl">慧</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {locale === 'zh-tw' ? '傳統與創新並重' : 'Tradition Meets Innovation'}
                </h3>
                <p className="text-gray-600">
                  {locale === 'zh-tw' 
                    ? '在傳承千年工藝的同時，融入現代美學理念，創造出獨具特色的刺繡藝術作品。'
                    : 'While inheriting millennium-old craftsmanship, we integrate modern aesthetic concepts to create unique embroidery artworks.'
                  }
                </p>
              </div>
            </Card>

            {/* 背景裝飾元素 */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-yellow-200 opacity-30 rounded-lg chinese-corner"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-200 opacity-30 rounded-lg chinese-corner"></div>
          </div>
        </div>
      </div>
    </section>
  );
}