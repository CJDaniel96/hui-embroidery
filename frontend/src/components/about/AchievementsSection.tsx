'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';

interface AchievementsSectionProps {
  title: string;
  subtitle: string;
  stats: Array<{
    number: string;
    label: string;
    icon: string;
  }>;
  exhibitions: Array<{
    year: string;
    name: string;
    location: string;
    type: string;
  }>;
  awards: Array<{
    year: string;
    name: string;
    organization: string;
    level: string;
  }>;
}

export default function AchievementsSection({ 
  title, 
  subtitle, 
  stats, 
  exhibitions, 
  awards 
}: AchievementsSectionProps) {
  const locale = useLocale();
  const [counters, setCounters] = useState<Record<string, number>>({});

  // 數字動畫效果
  useEffect(() => {
    const animateCounters = () => {
      stats.forEach((stat, index) => {
        const targetNumber = parseInt(stat.number.replace(/\D/g, ''));
        if (isNaN(targetNumber)) return;

        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [index]: Math.floor(currentNumber)
          }));
        }, 50);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('achievements-stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [stats]);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-20 right-20 w-64 h-64 chinese-corner bg-red-100 opacity-20 rounded-lg"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 chinese-corner bg-yellow-100 opacity-20 rounded-lg"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 gradient-text">
            {title}
          </h2>
          <p className="text-xl text-red-600 font-medium">
            {subtitle}
          </p>
        </div>

        {/* 統計數據 */}
        <div id="achievements-stats" className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} variant="elevated" className="text-center p-8 group hover:shadow-2xl transition-all duration-500">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                {counters[index] !== undefined ? counters[index] : 0}
                {stat.number.replace(/\d/g, '')}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 展覽經歷 */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-red-600 chinese-corner flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏛️</span>
              </span>
              {locale === 'zh-tw' ? '展覽經歷' : 'Exhibition History'}
            </h3>
            
            <div className="space-y-4">
              {exhibitions.map((exhibition, index) => (
                <Card key={index} variant="outlined" className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{exhibition.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{exhibition.location}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        exhibition.type === 'solo' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {exhibition.type === 'solo' 
                          ? (locale === 'zh-tw' ? '個展' : 'Solo') 
                          : (locale === 'zh-tw' ? '聯展' : 'Group')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-600">{exhibition.year}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 獲獎記錄 */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-yellow-600 chinese-corner flex items-center justify-center mr-3">
                <span className="text-white text-sm">🏆</span>
              </span>
              {locale === 'zh-tw' ? '獲獎記錄' : 'Awards & Recognition'}
            </h3>
            
            <div className="space-y-4">
              {awards.map((award, index) => (
                <Card key={index} variant="outlined" className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{award.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{award.organization}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        award.level === 'international' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : award.level === 'national'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {award.level === 'international' 
                          ? (locale === 'zh-tw' ? '國際級' : 'International')
                          : award.level === 'national'
                          ? (locale === 'zh-tw' ? '國家級' : 'National')
                          : (locale === 'zh-tw' ? '地區級' : 'Regional')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-yellow-600">{award.year}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}