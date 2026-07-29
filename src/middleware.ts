import createMiddleware from 'next-intl/middleware';
import {locales} from './i18n/request';
import {pathnames} from './navigation';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  pathnames,
  localePrefix: 'as-needed',
  localeDetection: false
});

export const config = {
  matcher: [
    '/', 
    '/(es|en|pt|fr|zh)/:path*', 
    '/((?!api|_next|_static|_vercel|.*\\..*).*)'
  ]
};
