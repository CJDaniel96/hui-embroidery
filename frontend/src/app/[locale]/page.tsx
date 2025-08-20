import { getTranslations } from 'next-intl/server';
import OnePagerHeader from '@/components/layout/OnePagerHeader';
import { Footer } from '@/components/layout';
import { 
  HeroSection, 
  FeaturedArtworks, 
  LatestPosts, 
  AboutPreview, 
  ContactInfo 
} from '@/components/home';
import ExtensionStatus from '@/components/common/ExtensionStatus';
import { setApiLanguage } from '@/lib/api';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  
  // 設定 API 語言
  setApiLanguage(locale);
  
  // 獲取翻譯
  const nav = await getTranslations('Navigation');
  const home = await getTranslations('Home');
  const footer = await getTranslations('Footer');

  const navigation = {
    home: nav('home'),
    gallery: nav('gallery'),
    about: nav('about'),
    blog: nav('blog'),
    contact: nav('contact'),
  };

  const footerText = {
    copyright: footer('copyright') || '版權所有',
    allRightsReserved: footer('allRightsReserved') || '保留所有權利',
    quickLinks: footer('quickLinks') || '快速連結',
    contact: footer('contact') || '聯絡資訊',
    followUs: footer('followUs') || '關注我們',
  };

  return (
    <div className="min-h-screen bg-white">
      <ExtensionStatus />
      <OnePagerHeader navigation={navigation} />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          title={home('hero.title')}
          subtitle={home('hero.subtitle')}
          description={home('hero.description')}
          ctaButtons={{
            gallery: home('hero.galleryButton'),
            about: home('hero.aboutButton')
          }}
        />

        {/* Featured Artworks */}
        <FeaturedArtworks
          title={home('featuredArtworks.title')}
          subtitle={home('featuredArtworks.subtitle')}
          viewAllText={home('featuredArtworks.viewAll')}
          loadingText={home('featuredArtworks.loading')}
          errorText={home('featuredArtworks.error')}
          retryText={home('featuredArtworks.retry')}
        />

        {/* About Preview */}
        <AboutPreview
          title={home('about.title')}
          subtitle={home('about.subtitle')}
          description={home('about.description')}
          learnMoreText={home('about.learnMore')}
          achievements={{
            experience: home('about.achievements.experience'),
            works: home('about.achievements.works'),
            exhibitions: home('about.achievements.exhibitions'),
            awards: home('about.achievements.awards')
          }}
        />

        {/* Latest Posts */}
        <LatestPosts
          title={home('latestPosts.title')}
          subtitle={home('latestPosts.subtitle')}
          viewAllText={home('latestPosts.viewAll')}
          readMoreText={home('latestPosts.readMore')}
          loadingText={home('latestPosts.loading')}
          errorText={home('latestPosts.error')}
          retryText={home('latestPosts.retry')}
        />

        {/* Contact Info */}
        <ContactInfo
          title={home('contact.title')}
          subtitle={home('contact.subtitle')}
          getInTouchText={home('contact.getInTouch')}
          loadingText={home('contact.loading')}
          errorText={home('contact.error')}
          retryText={home('contact.retry')}
        />
      </main>

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}