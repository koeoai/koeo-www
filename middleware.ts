/**
 * Middleware for i18n locale handling
 *
 * Handles locale detection from URL paths and ensures proper routing.
 * - URLs with /fr prefix serve French content
 * - URLs without locale prefix serve English (default) content
 * - English URLs remain clean without /en prefix (internally rewritten to /en)
 * - Detects browser language from Accept-Language header for language suggestion
 *
 * Requirements: 1.1, 1.2, 1.3, 5.1
 */

import { NextRequest, NextResponse } from "next/server";
import { i18nConfig, isValidLocale } from "@/lib/i18n/config";
import { parseAcceptLanguage } from "@/lib/i18n/utils";

/** Cookie name for storing detected browser locale */
export const DETECTED_LOCALE_COOKIE = "koeo-detected-locale";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Detect browser language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  const detectedLocale = parseAcceptLanguage(acceptLanguage);

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
      const response = NextResponse.redirect(new URL(pathWithoutLocale, request.url));
      // Set detected locale cookie for language suggestion banner
      if (detectedLocale) {
        response.cookies.set(DETECTED_LOCALE_COOKIE, detectedLocale, {
          httpOnly: false,
          sameSite: "lax",
          maxAge: 60 * 60, // 1 hour
        });
      }
      return response;
    }

    // For non-default locales (fr), validate and allow
    if (isValidLocale(localeSegment)) {
      const response = NextResponse.next();
      // Set detected locale cookie for language suggestion banner
      if (detectedLocale) {
        response.cookies.set(DETECTED_LOCALE_COOKIE, detectedLocale, {
          httpOnly: false,
          sameSite: "lax",
          maxAge: 60 * 60, // 1 hour
        });
      }
      return response;
    }
  }

  // For default locale (en), rewrite internally to /en/... path
  // This keeps English URLs clean without /en prefix in the browser
  // but internally routes to the [locale] dynamic segment
  const url = request.nextUrl.clone();
  url.pathname = `/${i18nConfig.defaultLocale}${pathname}`;
  const response = NextResponse.rewrite(url);
  
  // Set detected locale cookie for language suggestion banner
  if (detectedLocale) {
    response.cookies.set(DETECTED_LOCALE_COOKIE, detectedLocale, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });
  }
  
  return response;
}

export const config = {
  // Match all paths except:
  // - API routes (/api/...)
  // - Next.js internals (/_next/...)
  // - Static files (favicon.ico, images, etc.)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
