/**
 * i18n URL Utilities
 *
 * Functions for handling locale-aware URL paths and browser language detection.
 */

import { i18nConfig, Locale, isValidLocale } from "./config";

/**
 * Generates a localized path from a pathname and target locale.
 *
 * For the default locale (en), returns the path without a prefix.
 * For other locales, adds the locale prefix.
 *
 * @param pathname - The current URL pathname
 * @param locale - The target locale
 * @returns The localized path
 */
export function getLocalizedPath(pathname: string, locale: Locale): string {
  // Remove any existing locale prefix
  const pathWithoutLocale = removeLocalePrefix(pathname);

  // For default locale, return path without prefix
  if (locale === i18nConfig.defaultLocale) {
    return pathWithoutLocale || "/";
  }

  // For other locales, add prefix
  return `/${locale}${pathWithoutLocale}`;
}

/**
 * Removes locale prefix from pathname.
 *
 * @param pathname - The URL pathname potentially containing a locale prefix
 * @returns The pathname without the locale prefix
 */
export function removeLocalePrefix(pathname: string): string {
  for (const locale of i18nConfig.locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
    if (pathname === `/${locale}`) {
      return "/";
    }
  }
  return pathname;
}

/**
 * Extracts locale from pathname.
 *
 * @param pathname - The URL pathname
 * @returns The locale extracted from the path, or the default locale if none found
 */
export function getLocaleFromPath(pathname: string): Locale {
  for (const locale of i18nConfig.locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return i18nConfig.defaultLocale;
}


/**
 * Parses Accept-Language header to find best matching locale.
 *
 * The Accept-Language header contains a comma-separated list of language tags
 * with optional quality values (q=0.0 to q=1.0). This function parses the header
 * and returns the highest-priority locale that matches a supported locale.
 *
 * @param header - The Accept-Language header value
 * @returns The best matching locale, or null if none match
 *
 * @example
 * parseAcceptLanguage("fr-FR,fr;q=0.9,en;q=0.8") // returns "fr"
 * parseAcceptLanguage("de-DE,de;q=0.9") // returns null (German not supported)
 * parseAcceptLanguage(null) // returns null
 */
export function parseAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const languages = header
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";q=");
      const quality = qValue ? parseFloat(qValue) : 1;
      return {
        code: code.split("-")[0].toLowerCase(),
        quality: isNaN(quality) ? 1 : quality,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    if (isValidLocale(code)) {
      return code;
    }
  }

  return null;
}
