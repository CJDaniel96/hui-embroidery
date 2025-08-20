'use client';

import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';
import { type Post } from '@/lib/api';

interface AuthorInfoProps {
  post: Post;
}

export default function AuthorInfo({ post }: AuthorInfoProps) {
  const locale = useLocale();

  // 大師資訊（實際項目中可能來自 API）
  const authorInfo = {
    name: post.author_name || '毛慧',
    title: locale === 'zh-tw' ? '國際刺繡工藝大師' : 'International Master of Embroidery Crafts',
    bio: locale === 'zh-tw' 
      ? '毛慧大師來自湘繡世家，師承亞太大師、中國工藝美術大師周金秀，擁有超過30年的精湛技藝。她是湘繡獨特針法「鬅毛針」的第三代傳承人，作品屢獲國際獎項。'
      : 'Master Mao Hui comes from a Xiang embroidery family, trained under Asia-Pacific Master Zhou Jinxiu, with over 30 years of exquisite skills. She is the third-generation inheritor of the unique "Maomao" technique.',
    achievements: locale === 'zh-tw' 
      ? ['鬅毛針法第三代傳承人', '30餘年湘繡經驗', '國際工藝美術大獎得主', '高級訂製專家']
      : ['3rd Gen Maomao Technique Inheritor', '30+ Years Xiang Embroidery', 'International Craft Awards Winner', 'Haute Couture Expert'],
    avatar: '', // 頭像 URL
    socialLinks: {
      email: 'master@hui-embroidery.com',
      phone: '+886-2-1234-5678'
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card variant="silk" className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* 作者頭像 */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-vermillion-500 to-vermillion-600 eastern-border flex items-center justify-center shadow-lg">
                  {authorInfo.avatar ? (
                    <img 
                      src={authorInfo.avatar} 
                      alt={authorInfo.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-3xl font-title font-bold">慧</span>
                  )}
                </div>
                <h3 className="font-title text-2xl font-medium text-gray-900">
                  {authorInfo.name}
                </h3>
                <p className="font-body text-vermillion-600 font-medium mt-1">
                  {authorInfo.title}
                </p>
              </div>

              {/* 作者介紹 */}
              <div className="md:col-span-2">
                <h4 className="font-title text-xl font-medium text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-vermillion-500 eastern-border flex items-center justify-center mr-3">
                    <span className="text-white text-xs">師</span>
                  </span>
                  {locale === 'zh-tw' ? '大師簡介' : 'About the Master'}
                </h4>
                
                <p className="font-body text-gray-600 leading-relaxed mb-6">
                  {authorInfo.bio}
                </p>

                {/* 主要成就 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {authorInfo.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-vermillion-500 rounded-full"></span>
                      <span className="font-body text-sm text-gray-600">{achievement}</span>
                    </div>
                  ))}
                </div>

                {/* 聯絡方式 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="font-title text-lg font-medium text-gray-900 mb-3">
                    {locale === 'zh-tw' ? '聯絡大師' : 'Contact Master'}
                  </h5>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={`mailto:${authorInfo.socialLinks.email}`}
                      className="flex items-center space-x-2 px-3 py-2 bg-white hover:bg-gray-50 eastern-border text-gray-600 hover:text-vermillion-600 transition-colors duration-200"
                    >
                      <span>📧</span>
                      <span className="font-body text-sm">{authorInfo.socialLinks.email}</span>
                    </a>
                    <a 
                      href={`tel:${authorInfo.socialLinks.phone}`}
                      className="flex items-center space-x-2 px-3 py-2 bg-white hover:bg-gray-50 eastern-border text-gray-600 hover:text-vermillion-600 transition-colors duration-200"
                    >
                      <span>📞</span>
                      <span className="font-body text-sm">{authorInfo.socialLinks.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}