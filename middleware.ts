/**
 * Middleware for i18n locale handling
 *
 * Handles locale detection from URL paths and ensures proper routing.
 * - URLs with /fr prefix serve French content
 * - URLs without locale prefix serve English (default) content
 * - English URLs remain clean without /en prefix (internally rewritten to /en)
 *
 * Requirements: 1.1, 1.2, 1.3
 */

import { NextRequest, NextResponse } from "next/server";
import { i18nConfig, isValidLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname starts with a supported locale
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname has a valid non-default locale, allow it through
  if (pathnameHasLocale) {
    // Extract the locale from the path
    const localeSegment = pathname.split("/")[1];

    // If it's the default locale (en), redirect to clean URL
    if (localeSegment === i18nConfig.defaultLocale) {
      const pathWithoutLocale =
        pathname.slice(`/${localeSegment}`.length) || "/";
      return NextResponse.redirect(new URL(pathWithoutLocale, request.url));
    }

    // For non-default locales (fr), validate and allow
    if (isValidLocale(localeSegment)) {
      return NextResponse.next();
    }
  }

  // For default locale (en), rewrite internally to /en/... path
  // This keeps English URLs clean without /en prefix in the browser
  // but internally routes to the [locale] dynamic segment
  const url = request.nextUrl.clone();
  url.pathname = `/${i18nConfig.defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Match all paths except:
  // - API routes (/api/...)
  // - Next.js internals (/_next/...)
  // - Static files (favicon.ico, images, etc.)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
