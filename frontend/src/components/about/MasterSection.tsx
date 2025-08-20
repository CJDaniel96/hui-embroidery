'use client';

import { useLocale } from 'next-intl';
import { Card, Badge } from '@/components/ui';

interface MasterSectionProps {
  title: string;
  subtitle: string;
  master: {
    name: string;
    title: string;
    description: string;
    specialties: string[];
    achievements: string[];
    philosophy: string;
  };
}

export default function MasterSection({ title, subtitle, master }: MasterSectionProps) {
  const locale = useLocale();

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-yellow-50 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4">
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-red-600">
            <circle cx="150" cy="150" r="120" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="150" cy="150" r="90" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="150" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="150" cy="150" r="30" fill="currentColor"/>
          </svg>
        </div>
      </div>

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

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左側：大師照片區域 */}
            <div className="relative">
              <Card variant="chinese" className="p-8 text-center">
                {/* 大師照片佔位符 */}
                <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center chinese-corner shadow-2xl">
                  <span className="text-6xl text-red-400">👨‍🎨</span>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {master.name}
                </h3>
                <p className="text-xl text-red-600 font-medium mb-4">
                  {master.title}
                </p>
                
                {/* 專長標籤 */}
                <div className="flex flex-wrap justify-center gap-2">
                  {master.specialties.map((specialty, index) => (
                    <Badge key={index} variant="chinese" size="sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* 裝飾元素 */}
              <div className="absolute -top-4 -left-4 w-32 h-32 chinese-corner bg-yellow-200 opacity-30 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 chinese-corner bg-red-200 opacity-30 rounded-lg -z-10"></div>
            </div>

            {/* 右側：詳細介紹 */}
            <div className="space-y-8">
              {/* 簡介 */}
              <Card variant="outlined" className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-red-600 rounded-full mr-3"></span>
                  {locale === 'zh-tw' ? '大師簡介' : 'Master Introduction'}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {master.description}
                </p>
              </Card>

              {/* 主要成就 */}
              <Card variant="outlined" className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-yellow-600 rounded-full mr-3"></span>
                  {locale === 'zh-tw' ? '主要成就' : 'Major Achievements'}
                </h4>
                <ul className="space-y-3">
                  {master.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* 工藝理念 */}
              <Card variant="chinese" className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-gradient-to-r from-red-600 to-yellow-600 rounded-full mr-3"></span>
                  {locale === 'zh-tw' ? '工藝理念' : 'Craftsmanship Philosophy'}
                </h4>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed border-l-4 border-red-600 pl-4">
                  "{master.philosophy}"
                </blockquote>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}