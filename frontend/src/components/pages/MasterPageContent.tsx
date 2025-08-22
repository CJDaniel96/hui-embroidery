'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Calendar, Award, BookOpen, Users, Heart, Star } from 'lucide-react';

const MasterPageContent = () => {
  const t = useTranslations();

  // 大師生涯重要時刻
  const milestones = [
    {
      year: "1965",
      title: "出生於蘇州",
      description: "生於刺繡世家，自幼接觸傳統刺繡工藝"
    },
    {
      year: "1980",
      title: "師承名家",
      description: "拜入著名蘇繡大師門下，開始正式學習刺繡技藝"
    },
    {
      year: "1990",
      title: "獨立創作",
      description: "開始獨立創作，形成獨特的「鬅毛針」技法風格"
    },
    {
      year: "2000",
      title: "獲得認可",
      description: "作品首次在國際展覽中獲獎，技藝得到專業認可"
    },
    {
      year: "2010",
      title: "傳承教學",
      description: "開始收徒傳藝，致力於傳統刺繡工藝的傳承"
    },
    {
      year: "2020",
      title: "建立工作室",
      description: "成立慧心刺繡工作室，推廣刺繡文化"
    }
  ];

  // 專業技能
  const skills = [
    { name: "蘇繡", level: 98, description: "擅長雙面繡和精微繡" },
    { name: "湘繡", level: 85, description: "掌握湘繡傳統針法" },
    { name: "粵繡", level: 80, description: "熟悉釘金繡技法" },
    { name: "蜀繡", level: 90, description: "精通暈針繡表現手法" },
  ];

  // 獎項成就
  const achievements = [
    {
      year: "2023",
      title: "國家級非物質文化遺產傳承人",
      description: "獲得國家文化部認定"
    },
    {
      year: "2022",
      title: "中國工藝美術大師",
      description: "中國工藝美術協會授予"
    },
    {
      year: "2021",
      title: "蘇州市刺繡藝術特別貢獻獎",
      description: "蘇州市文化局頒發"
    },
    {
      year: "2020",
      title: "亞洲手工藝術金獎",
      description: "亞洲手工藝術聯盟評選"
    },
    {
      year: "2019",
      title: "傳統工藝振興優秀傳承人",
      description: "文化和旅遊部認定"
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 大師照片 */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/master-portrait.jpg"
                    alt="刺繡大師李慧心"
                    width={600}
                    height={700}
                    className="w-full h-[600px] object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/master-hands.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-20"></div>
              </div>

              {/* 基本資訊 */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
                    李慧心
                  </h1>
                  <p className="text-2xl text-red-600 font-serif mb-6">
                    國家級非物質文化遺產傳承人
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="default" className="bg-red-600">蘇繡大師</Badge>
                    <Badge variant="outline">中國工藝美術大師</Badge>
                    <Badge variant="outline">鬅毛針創始人</Badge>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    從事刺繡藝術四十餘年，師承蘇繡名家，獨創「鬅毛針」技法，
                    作品融合傳統工藝與現代美學，多次獲得國際大獎。
                    致力於傳統刺繡文化的傳承與創新。
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-semibold">從藝年限</p>
                      <p className="text-muted-foreground">40+ 年</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-semibold">培養學徒</p>
                      <p className="text-muted-foreground">50+ 人</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-semibold">獲獎作品</p>
                      <p className="text-muted-foreground">200+ 件</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="font-semibold">代表作品</p>
                      <p className="text-muted-foreground">鳳凰呈祥</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 生涯歷程 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                藝術生涯
              </h2>
              <p className="text-xl text-muted-foreground">
                從初學者到大師的成長軌跡
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
            </div>

            <div className="relative">
              {/* 時間軸線 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-200"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative flex items-start space-x-6">
                    {/* 時間點 */}
                    <div className="flex-shrink-0 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    
                    {/* 內容 */}
                    <Card className="flex-1 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-serif font-semibold text-foreground">
                            {milestone.title}
                          </h3>
                          <Badge variant="outline">{milestone.year}</Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 專業技能 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                專業技能
              </h2>
              <p className="text-xl text-muted-foreground">
                精通多種刺繡技法，融會貫通
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={skill.name} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-serif font-semibold">{skill.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(skill.level / 20) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">{skill.level}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 獎項成就 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                榮譽成就
              </h2>
              <p className="text-xl text-muted-foreground">
                多年來獲得的專業認可與獎項
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-serif font-semibold text-foreground">
                            {achievement.title}
                          </h3>
                          <Badge variant="outline">{achievement.year}</Badge>
                        </div>
                        <p className="text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 教學理念 */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
              教學理念
            </h2>
            
            <Card className="p-8 bg-white shadow-lg">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-red-600" />
              </div>
              <blockquote className="text-xl italic text-muted-foreground leading-relaxed mb-6">
                "刺繡不僅是技藝，更是文化的傳承。我希望通過我的教學，
                讓更多年輕人了解和喜愛這門古老的藝術，讓傳統工藝在新時代綻放光彩。"
              </blockquote>
              <cite className="text-red-600 font-serif font-semibold">— 李慧心</cite>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">用心傳承</h3>
                <p className="text-sm text-muted-foreground">以誠待人，用心教學，讓每位學生都能感受到刺繡藝術的魅力</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">因材施教</h3>
                <p className="text-sm text-muted-foreground">根據每位學生的特點和基礎，制定個性化的學習方案</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">創新發展</h3>
                <p className="text-sm text-muted-foreground">在傳承傳統的基礎上，鼓勵學生創新，形成自己的風格</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasterPageContent;