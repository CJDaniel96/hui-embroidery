'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations();

  // 決定要切換到的語言
  const targetLocale = locale === 'zh-tw' ? 'en' : 'zh-tw';
  const displayText = locale === 'zh-tw' ? t('language.english') : t('language.chinese');

  return (
    <Link href={pathname} locale={targetLocale}>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-700 hover:text-red-900 hover:bg-red-50 transition-smooth"
      >
        <Globe className="w-4 h-4 mr-2" />
        {displayText}
      </Button>
    </Link>
  );
};

export default LanguageToggle;