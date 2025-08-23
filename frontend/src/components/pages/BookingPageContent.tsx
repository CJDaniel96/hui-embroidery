'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const BookingPageContent = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    visitors: '1',
    message: '',
    service: 'tour'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡可以添加表單提交邏輯
    console.log('預約資料:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                預約已成功送出！
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                感謝您的預約，我們將在24小時內與您聯繫確認預約詳情。
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-red-900 hover:bg-red-800 text-white px-8 py-3"
              >
                重新預約
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {t('booking.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('booking.subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-red-900 to-red-800 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* 預約表單 */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant animate-slide-up">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                    預約資訊
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 服務類型選擇 */}
                    <div>
                      <Label htmlFor="service" className="text-foreground font-medium mb-2 block">
                        服務類型 *
                      </Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900/50 focus:border-red-900 transition-colors bg-white"
                        required
                      >
                        <option value="tour">工作室參觀導覽（免費）</option>
                        <option value="workshop">刺繡體驗工作坊（NT$2,000/人）</option>
                        <option value="private">私人訂製諮詢（NT$500/小時）</option>
                        <option value="group">團體包場參觀（請洽詢）</option>
                      </select>
                    </div>

                    {/* 基本資訊 */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-foreground font-medium mb-2 block">
                          <User className="w-4 h-4 inline mr-1" />
                          姓名 *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="請輸入您的姓名"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground font-medium mb-2 block">
                          <Phone className="w-4 h-4 inline mr-1" />
                          電話 *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="請輸入聯絡電話"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium mb-2 block">
                        <Mail className="w-4 h-4 inline mr-1" />
                        電子郵件 *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="請輸入電子郵件"
                        required
                      />
                    </div>

                    {/* 預約時間 */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-foreground font-medium mb-2 block">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          預約日期 *
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-foreground font-medium mb-2 block">
                          <Clock className="w-4 h-4 inline mr-1" />
                          預約時間 *
                        </Label>
                        <select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900/50 focus:border-red-900 transition-colors bg-white"
                          required
                        >
                          <option value="">選擇時間</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="visitors" className="text-foreground font-medium mb-2 block">
                          參觀人數
                        </Label>
                        <select
                          id="visitors"
                          name="visitors"
                          value={formData.visitors}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900/50 focus:border-red-900 transition-colors bg-white"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}人</option>
                          ))}
                          <option value="10+">10人以上</option>
                        </select>
                      </div>
                    </div>

                    {/* 特殊需求 */}
                    <div>
                      <Label htmlFor="message" className="text-foreground font-medium mb-2 block">
                        特殊需求或備註
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="請告訴我們您的特殊需求、興趣重點，或任何想了解的內容..."
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-red-900 hover:bg-red-800 text-white py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      確認預約
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* 側邊資訊 */}
            <div className="space-y-6">
              {/* 開放時間 */}
              <Card className="shadow-elegant animate-slide-up" style={{animationDelay: '0.1s'}}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-red-900" />
                    開放時間
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">週二至週六</span>
                      <span className="text-foreground font-medium">09:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">週日</span>
                      <span className="text-foreground font-medium">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">週一</span>
                      <span className="text-red-600 font-medium">公休</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 地點資訊 */}
              <Card className="shadow-elegant animate-slide-up" style={{animationDelay: '0.2s'}}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-900" />
                    工作室地點
                  </h3>
                  <p className="text-foreground text-sm leading-relaxed mb-3">
                    台北市大安區復興南路一段123號3樓
                  </p>
                  <p className="text-muted-foreground text-xs">
                    捷運忠孝復興站2號出口步行3分鐘
                  </p>
                </CardContent>
              </Card>

              {/* 注意事項 */}
              <Card className="bg-red-50 border-red-200 animate-slide-up" style={{animationDelay: '0.3s'}}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                    預約須知
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      請提前24小時預約
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      如需取消請提前4小時通知
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      工作坊需現場付費
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-900 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      歡迎攝影，請遵守工作室規範
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPageContent;