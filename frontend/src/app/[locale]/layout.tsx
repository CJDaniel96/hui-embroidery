import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Toaster } from 'sonner';
import { Inter, Noto_Serif_TC } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSerifTC = Noto_Serif_TC({ 
  subsets: ['chinese-traditional'],
  variable: '--font-noto-serif-tc',
});

// 直接設定 metadata，不使用翻譯
export const metadata: Metadata = {
  title: '慧心刺繡工作室',
  description: '傳承千年刺繡工藝，展現東方文化之美',
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${notoSerifTC.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            {children}
            <Toaster 
              position="top-right"
              richColors
              expand={false}
            />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}