import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import ExtensionStatus from '@/components/common/ExtensionStatus';
import HeroSection from '@/components/about/HeroSection';
import StorySection from '@/components/about/StorySection';
import MasterSection from '@/components/about/MasterSection';
import AchievementsSection from '@/components/about/AchievementsSection';
import { setApiLanguage } from '@/lib/api';

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // 設定 API 語言
  setApiLanguage(locale);
  
  // 獲取翻譯
  const t = await getTranslations();

  const navigation = {
    home: t('Navigation.home'),
    gallery: t('Navigation.gallery'),
    about: t('Navigation.about'),
    blog: t('Navigation.blog'),
    contact: t('Navigation.contact'),
  };

  const footerText = {
    copyright: t('Footer.copyright') || '版權所有',
    allRightsReserved: t('Footer.allRightsReserved') || '保留所有權利',
    quickLinks: t('Footer.quickLinks') || '快速連結',
    contact: t('Footer.contact') || '聯絡資訊',
    followUs: t('Footer.followUs') || '關注我們',
  };

  // 更新的發展歷程 - 真實的毛慧大師經歷
  const milestones = locale === 'zh-tw' ? [
    {
      year: "1987",
      title: "初露鋒芒",
      description: "《唐人打馬球》《編鐘樂舞》獲全國工藝美術百花獎金獎，正式踏入湘繡藝術殿堂。"
    },
    {
      year: "1989",
      title: "技藝精進", 
      description: "多畫面全異繡《李清照》獲世博會金獎，展現湘繡鬅毛針法的獨特魅力。"
    },
    {
      year: "1990-2003",
      title: "國際認可",
      description: "《和服腰帶》獲輕工部百花獎金獎，作品開始在台灣及國際展覽中屢獲殊榮。"
    },
    {
      year: "2008-2017",
      title: "大師地位確立",
      description: "《虎嘯》獲台灣精品大賽銀獎，《荷塘月色》等作品持續在國際舞台發光發熱。"
    },
    {
      year: "2024",
      title: "慧繡雅集成立",
      description: "成立高級訂製工作室，將三十餘年的湘繡技藝傳承與現代美學完美結合。"
    }
  ] : [
    {
      year: "1987",
      title: "First Recognition",
      description: "Won National Arts & Crafts Hundred Flowers Award Gold for 'Tang Dynasty Polo' and 'Chime Bell Dance', officially entering the hall of Xiang embroidery art."
    },
    {
      year: "1989",
      title: "Skill Advancement",
      description: "Multi-scene different embroidery 'Li Qingzhao' won World Expo Gold Award, showcasing the unique charm of Xiang embroidery Maomao technique."
    },
    {
      year: "1990-2003",
      title: "International Recognition",
      description: "'Kimono Obi' won Ministry of Light Industry Hundred Flowers Award Gold, works began winning honors in Taiwan and international exhibitions."
    },
    {
      year: "2008-2017",
      title: "Master Status Established",
      description: "'Tiger Roar' won Taiwan Boutique Competition Silver Award, 'Lotus Pond Moonlight' and other works continued to shine on international stages."
    },
    {
      year: "2024",
      title: "Hui Embroidery Established",
      description: "Established haute couture studio, perfectly combining over thirty years of Xiang embroidery techniques with modern aesthetics."
    }
  ];

  // 更新的大師資訊 - 毛慧大師
  const master = locale === 'zh-tw' ? {
    name: "毛慧",
    title: "國際刺繡工藝大師",
    description: "毛慧大師來自湘繡世家，師承亞太大師、中國工藝美術大師周金秀，擁有超過30年的精湛技藝。她是湘繡獨特針法「鬅毛針」的第三代傳承人，作品屢獲國際獎項，深受全球收藏家和藝術愛好者的讚譽。",
    specialties: ["湘繡", "鬅毛針法", "雙面全異繡", "高級訂製"],
    achievements: [
      "湘繡鬅毛針法第三代傳承人",
      "作品《布什全家福》贈予美國總統布什夫婦",
      "多次獲得國際工藝美術大獎金獎",
      "專精人物、動物、花鳥、山水等題材",
      "創新技法大幅提升作品藝術性與效率"
    ],
    philosophy: "針線之間見真情，絲絲入扣顯匠心。湘繡不僅是技藝的傳承，更是文化的延續與創新的表達。"
  } : {
    name: "Mao Hui",
    title: "International Master of Embroidery Crafts",
    description: "Master Mao Hui comes from a Xiang embroidery family, trained under Asia-Pacific Master and Chinese Arts & Crafts Master Zhou Jinxiu, with over 30 years of exquisite skills. She is the third-generation inheritor of the unique Xiang embroidery 'Maomao' technique, with works winning international awards and deeply appreciated by collectors and art lovers worldwide.",
    specialties: ["Xiang Embroidery", "Maomao Technique", "Double-sided Different Embroidery", "Haute Couture"],
    achievements: [
      "Third-generation inheritor of Xiang embroidery Maomao technique",
      "Created 'Bush Family Portrait' as gift to President Bush and his wife",
      "Multiple international craft art gold awards",
      "Specializes in figures, animals, flowers, birds, and landscapes",
      "Innovative techniques greatly enhance artistic quality and efficiency"
    ],
    philosophy: "True emotion flows between needle and thread, craftsmanship shows in every detail. Xiang embroidery is not just technique inheritance, but cultural continuation and innovative expression."
  };

  const stats = locale === 'zh-tw' ? [
    { number: "30+", label: "年湘繡經驗", icon: "🧵" },
    { number: "500+", label: "件精品創作", icon: "🎨" },
    { number: "20+", label: "項國際大獎", icon: "🏆" },
    { number: "3", label: "代鬅毛針傳承", icon: "✨" }
  ] : [
    { number: "30+", label: "Years Xiang Embroidery", icon: "🧵" },
    { number: "500+", label: "Masterpiece Creations", icon: "🎨" },
    { number: "20+", label: "International Awards", icon: "🏆" },
    { number: "3rd", label: "Gen Maomao Inheritor", icon: "✨" }
  ];

  const exhibitions = locale === 'zh-tw' ? [
    { year: "2017", name: "台灣工藝競賽獲獎展", location: "台灣工藝發展協會", type: "group" },
    { year: "2016", name: "台灣工藝發展協會聯展", location: "台灣", type: "group" },
    { year: "2015", name: "中國國際文化產業博覽會", location: "深圳", type: "group" },
    { year: "2014", name: "中國國際文化產業博覽會", location: "深圳", type: "group" }
  ] : [
    { year: "2017", name: "Taiwan Craft Competition Award Exhibition", location: "Taiwan Craft Development Association", type: "group" },
    { year: "2016", name: "Taiwan Craft Development Association Joint Exhibition", location: "Taiwan", type: "group" },
    { year: "2015", name: "China International Cultural Industries Fair", location: "Shenzhen", type: "group" },
    { year: "2014", name: "China International Cultural Industries Fair", location: "Shenzhen", type: "group" }
  ];

  const awards = locale === 'zh-tw' ? [
    { year: "2017", name: "台灣工藝競賽獲獎", organization: "台灣工藝發展協會", level: "regional" },
    { year: "2016", name: "聯展特優金獎", organization: "台灣工藝發展協會", level: "regional" },
    { year: "2015", name: "百花獎銀獎", organization: "中國國際文化產業博覽會", level: "national" },
    { year: "2014", name: "百花獎金獎", organization: "中國國際文化產業博覽會", level: "national" },
    { year: "2008", name: "精品大賽銀獎", organization: "台灣", level: "regional" },
    { year: "2003", name: "精工藝術精品展銅獎", organization: "台灣", level: "regional" },
    { year: "1990", name: "百花獎金獎", organization: "輕工部", level: "national" },
    { year: "1989", name: "世博會金獎", organization: "世界博覽會", level: "international" },
    { year: "1987", name: "百花獎金獎", organization: "全國工藝美術", level: "national" }
  ] : [
    { year: "2017", name: "Taiwan Craft Competition Award", organization: "Taiwan Craft Development Association", level: "regional" },
    { year: "2016", name: "Joint Exhibition Excellence Gold Award", organization: "Taiwan Craft Development Association", level: "regional" },
    { year: "2015", name: "Hundred Flowers Award Silver", organization: "China International Cultural Industries Fair", level: "national" },
    { year: "2014", name: "Hundred Flowers Award Gold", organization: "China International Cultural Industries Fair", level: "national" },
    { year: "2008", name: "Boutique Competition Silver Award", organization: "Taiwan", level: "regional" },
    { year: "2003", name: "Fine Arts Exhibition Bronze Award", organization: "Taiwan", level: "regional" },
    { year: "1990", name: "Hundred Flowers Award Gold", organization: "Ministry of Light Industry", level: "national" },
    { year: "1989", name: "World Expo Gold Award", organization: "World Exhibition", level: "international" },
    { year: "1987", name: "Hundred Flowers Award Gold", organization: "National Arts & Crafts", level: "national" }
  ];

  return (
    <div className="min-h-screen paper-texture">
      <ExtensionStatus />
      <Header navigation={navigation} />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          title={locale === 'zh-tw' ? '關於我們' : 'About Us'}
          subtitle={locale === 'zh-tw' ? '湘繡世家的傳承與創新' : 'Heritage and Innovation of Xiang Embroidery'}
          description={locale === 'zh-tw' 
            ? '慧繡雅集由國際刺繡大師毛慧創立，專注於湘繡藝術的傳承與創新。作為鬅毛針法第三代傳承人，我們將三十餘年的精湛技藝與現代美學完美結合，為高端客戶提供獨一無二的高級訂製刺繡服務。'
            : 'Hui Embroidery was founded by international embroidery master Mao Hui, focusing on the inheritance and innovation of Xiang embroidery art. As the third-generation inheritor of the Maomao technique, we perfectly combine over thirty years of exquisite craftsmanship with modern aesthetics, providing unique haute couture embroidery services for high-end clients.'
          }
        />

        {/* Story Section */}
        <StorySection
          title={locale === 'zh-tw' ? '傳承之路' : 'Heritage Journey'}
          subtitle={locale === 'zh-tw' ? '三十餘年的湘繡藝術歷程' : 'Over Thirty Years of Xiang Embroidery Artistry'}
          description={locale === 'zh-tw' 
            ? '從1987年首次獲獎開始，毛慧大師在湘繡藝術道路上不斷精進，將傳統鬅毛針法發揚光大，作品屢獲國際殊榮，見證了湘繡藝術的傳承與創新。'
            : 'Starting from the first award in 1987, Master Mao Hui has continuously advanced on the path of Xiang embroidery art, promoting the traditional Maomao technique and winning international honors, witnessing the inheritance and innovation of Xiang embroidery art.'
          }
          milestones={milestones}
        />

        {/* Master Section */}
        <MasterSection
          title={locale === 'zh-tw' ? '大師風範' : 'Master Excellence'}
          subtitle={locale === 'zh-tw' ? '鬅毛針法的傳承者' : 'Inheritor of Maomao Technique'}
          master={master}
        />

        {/* Achievements Section */}
        <AchievementsSection
          title={locale === 'zh-tw' ? '榮譽殿堂' : 'Hall of Honors'}
          subtitle={locale === 'zh-tw' ? '三十餘年來的卓越成就' : 'Outstanding Achievements Over Thirty Years'}
          stats={stats}
          exhibitions={exhibitions}
          awards={awards}
        />
      </main>

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}