/**
 * i18n Configuration
 *
 * Defines supported locales and locale-related constants for the Koeo website.
 */

export const i18nConfig = {
  defaultLocale: "en" as const,
  locales: ["en", "fr"] as const,
  localeNames: {
    en: "English",
    fr: "Français",
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale);
}
