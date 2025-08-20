import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import SmartExtensionProtection from '@/components/common/SmartExtensionProtection';
import './globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>慧繡雅集 - Hui Embroidery</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 強力防護樣式 - 但不完全隱藏，而是重置 */
            .tc-new-price,
            .tc-price-comparison,
            [class*="tc-"],
            [class*="honey-"],
            [class*="capital-one-"],
            [class*="rakuten-"],
            [class*="paypal-"] {
              position: static !important;
              display: initial !important;
              visibility: visible !important;
              opacity: 1 !important;
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
            }
            
            /* 防止擴充功能修改基本樣式 */
            html, body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
              background-color: white !important;
              color: #333 !important;
            }

            /* 確保內容可見 */
            #__next, [data-reactroot] {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
            }
          `
        }} />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SmartExtensionProtection>
            {children}
          </SmartExtensionProtection>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}