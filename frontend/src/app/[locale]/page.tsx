import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import MasterSection from '@/components/MasterSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <GallerySection />
      <MasterSection />
      <ContactSection />
      <Footer />
    </div>
  );
}