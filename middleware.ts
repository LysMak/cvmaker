import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any root-level static/metadata file (icon.svg,
  // favicon.ico, robots.txt, manifest, ...) — those have no locale prefix.
  matcher: ['/((?!_next|[^/]+\\.[^/]+$).*)'],
};
