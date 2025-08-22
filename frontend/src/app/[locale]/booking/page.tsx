import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingPageContent from '@/components/pages/BookingPageContent';

export default function BookingPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 頁面頂部間距，避免被 fixed header 遮住 */}
      <div className="pt-20">
        <BookingPageContent />
      </div>
      
      <Footer />
    </div>
  );
}