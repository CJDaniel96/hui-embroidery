import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/layout';
import ExtensionStatus from '@/components/common/ExtensionStatus';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import LocationMap from '@/components/contact/LocationMap';
import { setApiLanguage } from '@/lib/api';

export default async function ContactPage({
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

  // 聯絡頁面文字
  const contactTexts = {
    hero: {
      title: locale === 'zh-tw' ? '聯絡我們' : 'Contact Us',
      subtitle: locale === 'zh-tw' ? '專業諮詢與高級訂製服務' : 'Professional Consultation & Haute Couture Services',
      description: locale === 'zh-tw' 
        ? '我們期待與您交流湘繡藝術的美妙世界。無論是藝術諮詢、作品收藏，還是高級訂製需求，毛慧大師和我們的專業團隊都竭誠為您服務。'
        : 'We look forward to sharing the wonderful world of Xiang embroidery art with you. Whether for artistic consultation, artwork collection, or haute couture needs, Master Mao Hui and our professional team are dedicated to serving you.'
    },
    form: {
      title: locale === 'zh-tw' ? '聯絡表單' : 'Contact Form',
      subtitle: locale === 'zh-tw' 
        ? '請填寫以下表單，我們將在 24 小時內回覆您的諮詢'
        : 'Please fill out the form below, and we will respond to your inquiry within 24 hours',
      nameLabel: locale === 'zh-tw' ? '姓名' : 'Name',
      emailLabel: locale === 'zh-tw' ? '電子郵件' : 'Email',
      phoneLabel: locale === 'zh-tw' ? '電話' : 'Phone',
      subjectLabel: locale === 'zh-tw' ? '諮詢主題' : 'Subject',
      messageLabel: locale === 'zh-tw' ? '詳細需求' : 'Message',
      submitText: locale === 'zh-tw' ? '發送訊息' : 'Send Message',
      submittingText: locale === 'zh-tw' ? '發送中...' : 'Sending...',
      successText: locale === 'zh-tw' ? '訊息已成功發送！我們將盡快回覆您。' : 'Message sent successfully! We will reply to you soon.',
      errorText: locale === 'zh-tw' ? '發送失敗，請稍後再試或直接聯絡我們。' : 'Failed to send. Please try again or contact us directly.',
      requiredText: locale === 'zh-tw' ? '此欄位為必填' : 'This field is required'
    },
    info: {
      title: locale === 'zh-tw' ? '聯絡資訊' : 'Contact Information',
      subtitle: locale === 'zh-tw' 
        ? '多種聯絡方式，選擇最適合您的溝通管道'
        : 'Multiple contact methods, choose the communication channel that suits you best',
      addressLabel: locale === 'zh-tw' ? '工作室地址' : 'Studio Address',
      phoneLabel: locale === 'zh-tw' ? '聯絡電話' : 'Phone',
      emailLabel: locale === 'zh-tw' ? '電子郵件' : 'Email',
      hoursLabel: locale === 'zh-tw' ? '營業時間' : 'Business Hours',
      loadingText: locale === 'zh-tw' ? '載入聯絡資訊中...' : 'Loading contact information...'
    },
    map: {
      title: locale === 'zh-tw' ? '工作室位置' : 'Studio Location',
      subtitle: locale === 'zh-tw' 
        ? '歡迎蒞臨我們位於台北市中心的工作室'
        : 'Welcome to visit our studio located in the heart of Taipei',
      directionsText: locale === 'zh-tw' ? '查看路線' : 'Get Directions'
    }
  };

  return (
    <div className="min-h-screen paper-texture">
      <ExtensionStatus />
      <Header navigation={navigation} />
      
      <main>
        {/* Hero Section */}
        <ContactHero
          title={contactTexts.hero.title}
          subtitle={contactTexts.hero.subtitle}
          description={contactTexts.hero.description}
        />

        {/* Contact Form */}
        <ContactForm
          title={contactTexts.form.title}
          subtitle={contactTexts.form.subtitle}
          nameLabel={contactTexts.form.nameLabel}
          emailLabel={contactTexts.form.emailLabel}
          phoneLabel={contactTexts.form.phoneLabel}
          subjectLabel={contactTexts.form.subjectLabel}
          messageLabel={contactTexts.form.messageLabel}
          submitText={contactTexts.form.submitText}
          submittingText={contactTexts.form.submittingText}
          successText={contactTexts.form.successText}
          errorText={contactTexts.form.errorText}
          requiredText={contactTexts.form.requiredText}
        />

        {/* Contact Information */}
        <ContactInfo
          title={contactTexts.info.title}
          subtitle={contactTexts.info.subtitle}
          addressLabel={contactTexts.info.addressLabel}
          phoneLabel={contactTexts.info.phoneLabel}
          emailLabel={contactTexts.info.emailLabel}
          hoursLabel={contactTexts.info.hoursLabel}
          loadingText={contactTexts.info.loadingText}
        />

        {/* Location Map */}
        <LocationMap
          title={contactTexts.map.title}
          subtitle={contactTexts.map.subtitle}
          directionsText={contactTexts.map.directionsText}
        />
      </main>

      <Footer text={footerText} navigation={navigation} />
    </div>
  );
}