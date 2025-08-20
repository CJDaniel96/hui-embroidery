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

  // 模擬數據 - 在實際應用中這些數據會從 API 獲取
  const milestones = locale === 'zh-tw' ? [
    {
      year: "1985",
      title: "藝術之路啟程",
      description: "師從國家級工藝美術大師，開始系統學習蘇繡技藝，奠定了深厚的傳統工藝基礎。"
    },
    {
      year: "1995",
      title: "技藝精進",
      description: "掌握多種刺繡針法，作品開始在地方工藝展覽中嶄露頭角，獲得業內專家認可。"
    },
    {
      year: "2005",
      title: "創新突破",
      description: "將傳統刺繡與現代設計理念結合，創造出獨特的藝術風格，作品開始走向國際舞台。"
    },
    {
      year: "2015",
      title: "慧繡雅集成立",
      description: "正式成立工作室，致力於傳承和發揚中華刺繡藝術，培養新一代工藝傳承人。"
    },
    {
      year: "2024",
      title: "數位化傳承",
      description: "結合現代科技，建立線上平台，讓更多人能夠了解和學習這門古老而美麗的藝術。"
    }
  ] : [
    {
      year: "1985",
      title: "Artistic Journey Begins",
      description: "Studied under national craft master, began systematic learning of Suzhou embroidery techniques, establishing a solid foundation in traditional craftsmanship."
    },
    {
      year: "1995",
      title: "Skill Enhancement",
      description: "Mastered various embroidery stitching techniques, works began to stand out in local craft exhibitions, gaining recognition from industry experts."
    },
    {
      year: "2005",
      title: "Innovation Breakthrough",
      description: "Combined traditional embroidery with modern design concepts, creating a unique artistic style, works began to reach international stages."
    },
    {
      year: "2015",
      title: "Hui Embroidery Established",
      description: "Officially established the studio, dedicated to preserving and promoting Chinese embroidery art, cultivating new generation artisans."
    },
    {
      year: "2024",
      title: "Digital Heritage",
      description: "Combined with modern technology, established online platform, allowing more people to understand and learn this ancient and beautiful art."
    }
  ];

  const master = locale === 'zh-tw' ? {
    name: "陳慧雅",
    title: "國家級工藝美術大師",
    description: "陳慧雅大師從事刺繡藝術三十餘年，師承蘇繡世家，精通多種傳統針法。她的作品融合了古典美學與現代創意，多次在國內外展覽中獲獎，被譽為當代刺繡藝術的傑出代表。",
    specialties: ["蘇繡", "湘繡", "現代創意刺繡", "文物修復"],
    achievements: [
      "獲得國家級工藝美術大師稱號",
      "作品被國家博物館永久收藏",
      "多次獲得國際工藝美術大獎",
      "出版刺繡技法專著三部",
      "培養工藝傳承人超過百名"
    ],
    philosophy: "針針線線皆有情，一絲一縷總關心。刺繡不僅是技藝，更是文化的傳承，是心靈的表達。"
  } : {
    name: "Chen Huiya",
    title: "National Master of Arts & Crafts",
    description: "Master Chen Huiya has been engaged in embroidery art for over thirty years, inheriting from a Suzhou embroidery family and mastering various traditional stitching techniques. Her works blend classical aesthetics with modern creativity, winning awards in domestic and international exhibitions, and is acclaimed as an outstanding representative of contemporary embroidery art.",
    specialties: ["Suzhou Embroidery", "Xiang Embroidery", "Modern Creative Embroidery", "Cultural Relic Restoration"],
    achievements: [
      "Awarded National Master of Arts & Crafts title",
      "Works permanently collected by National Museum",
      "Multiple international craft art awards",
      "Published three embroidery technique monographs",
      "Trained over 100 craft inheritors"
    ],
    philosophy: "Every stitch and thread carries emotion, every silk and strand matters. Embroidery is not just technique, but cultural heritage and spiritual expression."
  };

  const stats = locale === 'zh-tw' ? [
    { number: "30+", label: "年藝術經驗", icon: "🎨" },
    { number: "500+", label: "件精品作品", icon: "🧵" },
    { number: "50+", label: "次展覽經歷", icon: "🏛️" },
    { number: "20+", label: "項國際大獎", icon: "🏆" }
  ] : [
    { number: "30+", label: "Years Experience", icon: "🎨" },
    { number: "500+", label: "Masterpieces", icon: "🧵" },
    { number: "50+", label: "Exhibitions", icon: "🏛️" },
    { number: "20+", label: "International Awards", icon: "🏆" }
  ];

  const exhibitions = locale === 'zh-tw' ? [
    { year: "2024", name: "絲路新韻刺繡藝術展", location: "中國美術館", type: "solo" },
    { year: "2023", name: "東方美學國際工藝展", location: "巴黎羅浮宮", type: "group" },
    { year: "2022", name: "傳承與創新個人作品展", location: "上海博物館", type: "solo" },
    { year: "2021", name: "亞洲傳統工藝聯展", location: "東京國立博物館", type: "group" }
  ] : [
    { year: "2024", name: "Silk Road New Rhythm Embroidery Exhibition", location: "National Art Museum of China", type: "solo" },
    { year: "2023", name: "Oriental Aesthetics International Craft Exhibition", location: "Louvre Museum, Paris", type: "group" },
    { year: "2022", name: "Heritage and Innovation Solo Exhibition", location: "Shanghai Museum", type: "solo" },
    { year: "2021", name: "Asian Traditional Crafts Joint Exhibition", location: "Tokyo National Museum", type: "group" }
  ];

  const awards = locale === 'zh-tw' ? [
    { year: "2024", name: "聯合國教科文組織工藝獎", organization: "UNESCO", level: "international" },
    { year: "2023", name: "中華工藝美術獎金獎", organization: "中國工藝美術協會", level: "national" },
    { year: "2022", name: "亞洲工藝美術大師獎", organization: "亞洲工藝聯盟", level: "international" },
    { year: "2021", name: "傳統工藝創新獎", organization: "文化部", level: "national" }
  ] : [
    { year: "2024", name: "UNESCO Craft Award", organization: "UNESCO", level: "international" },
    { year: "2023", name: "Chinese Arts & Crafts Gold Award", organization: "China Arts & Crafts Association", level: "national" },
    { year: "2022", name: "Asian Master Craftsperson Award", organization: "Asian Craft Alliance", level: "international" },
    { year: "2021", name: "Traditional Craft Innovation Award", organization: "Ministry of Culture", level: "national" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ExtensionStatus />
      <Header navigation={navigation} />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          title={locale === 'zh-tw' ? '關於我們' : 'About Us'}
          subtitle={locale === 'zh-tw' ? '傳統工藝的現代傳承' : 'Modern Heritage of Traditional Craftsmanship'}
          description={locale === 'zh-tw' 
            ? '慧繡雅集致力於傳承和發揚中華傳統刺繡工藝，結合現代美學理念，創造出具有時代特色的精美作品。我們相信，每一針每一線都承載著深厚的文化內涵，每一件作品都是藝術與心靈的完美結合。'
            : 'Hui Embroidery is dedicated to preserving and promoting traditional Chinese embroidery craftsmanship, combining modern aesthetic concepts to create exquisite works with contemporary characteristics. We believe that every stitch carries profound cultural connotations, and every piece is a perfect combination of art and soul.'
          }
        />

        {/* Story Section */}
        <StorySection
          title={locale === 'zh-tw' ? '我們的故事' : 'Our Story'}
          subtitle={locale === 'zh-tw' ? '三十年的藝術之路' : 'Thirty Years of Artistic Journey'}
          description={locale === 'zh-tw' 
            ? '從一針一線的學習開始，到成為國家級工藝美術大師，這是一段充滿挑戰與收穫的藝術之路。每一個重要時刻，都見證著我們對傳統工藝的堅持與創新。'
            : 'From learning stitch by stitch to becoming a national master of arts and crafts, this is an artistic journey filled with challenges and rewards. Every important moment witnesses our persistence and innovation in traditional craftsmanship.'
          }
          milestones={milestones}
        />

        {/* Master Section */}
        <MasterSection
          title={locale === 'zh-tw' ? '工藝大師' : 'Master Craftsperson'}
          subtitle={locale === 'zh-tw' ? '傳承者與創新者' : 'Inheritor and Innovator'}
          master={master}
        />

        {/* Achievements Section */}
        <AchievementsSection
          title={locale === 'zh-tw' ? '榮譽成就' : 'Honors & Achievements'}
          subtitle={locale === 'zh-tw' ? '三十年來的輝煌歷程' : 'Thirty Years of Brilliant Journey'}
          stats={stats}
          exhibitions={exhibitions}
          awards={awards}
        />
      </main>

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}