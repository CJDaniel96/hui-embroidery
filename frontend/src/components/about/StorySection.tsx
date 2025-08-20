'use client';

import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';

interface StorySectionProps {
  title: string;
  subtitle: string;
  description: string;
  milestones: Array<{
    year: string;
    title: string;
    description: string;
  }>;
}

export default function StorySection({ title, subtitle, description, milestones }: StorySectionProps) {
  const locale = useLocale();

  return (
    <section id="story" className="py-20 bg-white relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 chinese-corner bg-red-200 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 chinese-corner bg-yellow-200 rounded-lg"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 標題區域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 gradient-text">
            {title}
          </h2>
          <p className="text-xl text-red-600 mb-6 font-medium">
            {subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* 時間軸 */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* 中央線 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-400 via-red-500 to-red-600"></div>

            {/* 里程碑 */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <Card 
                    variant="elevated" 
                    className={`w-full md:w-5/12 group hover:shadow-2xl transition-all duration-500 ${
                      index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div className="p-8">
                      {/* 年份標誌 */}
                      <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-start' : 'justify-end md:justify-start'}`}>
                        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 chinese-corner flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">{milestone.year}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </Card>

                  {/* 時間軸節點 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}