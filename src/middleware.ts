import createMiddleware from 'next-intl/middleware';
import {locales} from './i18n/request';
import {pathnames} from './navigation';
import {NextRequest, NextResponse} from 'next/server';

// Subdomain → path redirects (legacy WordPress language subdomains)
const subdomainRedirects: Record<string, string> = {
  'es.kronos-logistics.com': '/es',
  'de.kronos-logistics.com': '/de',
  'cn.kronos-logistics.com': '/zh',
  'ko.kronos-logistics.com': '/ko',
  'hazmat.kronos-logistics.com': '/services/hazmat-logistics'
};

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  pathnames,
  localePrefix: 'as-needed',
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Check for legacy subdomain redirects
  const redirectPath = subdomainRedirects[host];
  if (redirectPath) {
    return NextResponse.redirect(
      new URL(redirectPath, 'https://kronos-logistics.com'),
      301
    );
  }

  // Otherwise, run the next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/', 
    '/(es|en|pt|fr|zh)/:path*', 
    '/((?!api|_next|_static|_vercel|.*\\..*).*)'
  ]
};
