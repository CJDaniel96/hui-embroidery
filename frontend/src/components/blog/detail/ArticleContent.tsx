'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Card } from '@/components/ui';
import { type Post } from '@/lib/api';

interface ArticleContentProps {
  post: Post;
}

export default function ArticleContent({ post }: ArticleContentProps) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    setMounted(true);

    // 監聽滾動以高亮當前標題
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let current = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          current = heading.id;
        }
      });

      setActiveHeading(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 模擬文章內容（實際項目中會從 post.translations.content 獲取）
  const mockContent = post.translations.content || `
    <h2>湘繡藝術的深厚底蘊</h2>
    <p>湘繡作為中國四大名繡之一，承載著深厚的文化底蘊和精湛的工藝技法。在數千年的發展歷程中，湘繡以其獨特的藝術風格和卓越的技藝水準，在中國刺繡藝術中佔據了重要地位。</p>

    <h3>鬅毛針法的獨特魅力</h3>
    <p>鬅毛針是湘繡最具代表性的針法之一，這種技法能夠細膩地表現動物的毛髮、人物的髮絲等細節，使作品更具生動性和立體感。毛慧大師作為鬅毛針法的第三代傳承人，在傳統技法的基礎上不斷創新，發展出更加精細和高效的針法變化。</p>

    <blockquote>
      <p>"針線之間見真情，絲絲入扣顯匠心。湘繡不僅是技藝的傳承，更是文化的延續與創新的表達。"</p>
      <footer>— 毛慧大師</footer>
    </blockquote>

    <h3>技藝與創新的完美結合</h3>
    <p>在現代社會中，湘繡藝術面臨著如何在保持傳統特色的同時融入現代美學的挑戰。毛慧大師通過多年的實踐探索，成功地將傳統湘繡技法與現代設計理念相結合，創作出既具傳統韻味又符合現代審美的高級訂製作品。</p>

    <h4>工藝特色</h4>
    <ul>
      <li>精湛的鬅毛針法技藝</li>
      <li>豐富的色彩層次表現</li>
      <li>細膩的質感描繪</li>
      <li>創新的構圖設計</li>
      <li>高品質的材料選擇</li>
    </ul>

    <h3>文化傳承的使命</h3>
    <p>作為非物質文化遺產的重要組成部分，湘繡的傳承不僅僅是技藝的延續，更是文化基因的傳播。慧繡雅集致力於通過高級訂製服務，讓更多人了解和欣賞湘繡藝術的獨特魅力，為這項古老工藝注入新的生命力。</p>

    <p>每一件湘繡作品都是時間的藝術，凝聚著繡工的心血和智慧。在快節奏的現代生活中，湘繡教會我們慢下來，用心感受生活的美好，體驗手工藝術的溫度和情感。</p>
  `;

  return (
    <section id="article-content" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 主要內容 */}
          <Card variant="paper" className="p-8 md:p-12">
            <article className="prose prose-lg max-w-none">
              <div 
                className="font-body text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mockContent }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
              />
            </article>

            {/* 文章標籤 */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="font-title text-lg font-medium text-gray-900 mb-4">
                  {locale === 'zh-tw' ? '相關標籤' : 'Tags'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 hover:bg-vermillion-50 text-gray-600 hover:text-vermillion-600 text-sm eastern-border transition-colors duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 分享區域 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="font-title text-lg font-medium text-gray-900 mb-4">
                {locale === 'zh-tw' ? '分享文章' : 'Share Article'}
              </h4>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white eastern-border transition-colors duration-200">
                  <span>📘</span>
                  <span className="font-body text-sm">Facebook</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white eastern-border transition-colors duration-200">
                  <span>📱</span>
                  <span className="font-body text-sm">LINE</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white eastern-border transition-colors duration-200">
                  <span>📧</span>
                  <span className="font-body text-sm">Email</span>
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.translations.title,
                        text: post.translations.excerpt,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(locale === 'zh-tw' ? '連結已複製！' : 'Link copied!');
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-vermillion-500 hover:bg-vermillion-600 text-white eastern-border transition-colors duration-200"
                >
                  <span>🔗</span>
                  <span className="font-body text-sm">
                    {locale === 'zh-tw' ? '複製連結' : 'Copy Link'}
                  </span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}