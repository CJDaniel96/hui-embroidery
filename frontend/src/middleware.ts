import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路徑，除了靜態資源和 API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};