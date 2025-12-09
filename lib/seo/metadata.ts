/**
 * Metadata Generation Utilities
 * Functions for generating and validating page metadata
 */

import { Metadata } from "next";
import { seoConfig } from "./config";
import { i18nConfig, Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/utils";

export interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  locale?: Locale;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  value: unknown;
}

export interface ValidationWarning {
  field: string;
  message: string;
  value: unknown;
}

// Validation constants
export const TITLE_MIN_LENGTH = 50;
export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MIN_LENGTH = 150;
export const DESCRIPTION_MAX_LENGTH = 160;

/**
 * Validates title length according to SEO best practices
 * @param title - The title to validate
 * @returns true if title length is between 50-60 characters
 */
export function isValidTitleLength(title: string): boolean {
  const length = title.length;
  return length >= TITLE_MIN_LENGTH && length <= TITLE_MAX_LENGTH;
}

/**
 * Validates description length according to SEO best practices
 * @param description - The description to validate
 * @returns true if description length is between 150-160 characters
 */
export function isValidDescriptionLength(description: string): boolean {
  const length = description.length;
  return length >= DESCRIPTION_MIN_LENGTH && length <= DESCRIPTION_MAX_LENGTH;
}


/**
 * Validates that keywords array is non-empty
 * @param keywords - The keywords array to validate
 * @returns true if keywords array has at least one item
 */
export function hasValidKeywords(keywords: string[]): boolean {
  return Array.isArray(keywords) && keywords.length > 0;
}

/**
 * Locale to Open Graph locale mapping
 * Maps i18n locale codes to OG locale format (language_TERRITORY)
 */
export const localeToOgLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
};

/**
 * Generates hreflang alternate links for all supported locales
 * @param path - The page path without locale prefix
 * @returns Object with language keys mapping to full URLs
 */
export function generateHreflangLinks(path: string): Record<string, string> {
  const links: Record<string, string> = {};

  for (const locale of i18nConfig.locales) {
    const localizedPath = getLocalizedPath(path, locale);
    links[locale] = `${seoConfig.siteUrl}${localizedPath}`;
  }

  // Add x-default pointing to the default locale version
  links["x-default"] = `${seoConfig.siteUrl}${getLocalizedPath(path, i18nConfig.defaultLocale)}`;

  return links;
}

/**
 * Validates metadata object against SEO requirements
 * @param metadata - The metadata object to validate
 * @returns ValidationResult with errors and warnings
 */
export function validateMetadata(options: PageMetadataOptions): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Validate title length
  if (!isValidTitleLength(options.title)) {
    const length = options.title.length;
    if (length < TITLE_MIN_LENGTH) {
      errors.push({
        field: "title",
        message: `Title is too short (${length} chars). Should be ${TITLE_MIN_LENGTH}-${TITLE_MAX_LENGTH} characters.`,
        value: options.title,
      });
    } else {
      errors.push({
        field: "title",
        message: `Title is too long (${length} chars). Should be ${TITLE_MIN_LENGTH}-${TITLE_MAX_LENGTH} characters.`,
        value: options.title,
      });
    }
  }

  // Validate description length
  if (!isValidDescriptionLength(options.description)) {
    const length = options.description.length;
    if (length < DESCRIPTION_MIN_LENGTH) {
      errors.push({
        field: "description",
        message: `Description is too short (${length} chars). Should be ${DESCRIPTION_MIN_LENGTH}-${DESCRIPTION_MAX_LENGTH} characters.`,
        value: options.description,
      });
    } else {
      errors.push({
        field: "description",
        message: `Description is too long (${length} chars). Should be ${DESCRIPTION_MIN_LENGTH}-${DESCRIPTION_MAX_LENGTH} characters.`,
        value: options.description,
      });
    }
  }

  // Validate keywords
  const keywords = options.keywords ?? seoConfig.defaultKeywords;
  if (!hasValidKeywords(keywords)) {
    errors.push({
      field: "keywords",
      message: "Keywords array must contain at least one keyword.",
      value: keywords,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Generates Next.js Metadata object from page options
 * @param options - Page metadata options
 * @returns Next.js Metadata object
 */
export function generateMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = seoConfig.defaultKeywords,
    path,
    ogImage = seoConfig.defaultOgImage,
    noIndex = false,
    locale = i18nConfig.defaultLocale,
  } = options;

  // Get the path without locale prefix for generating alternates
  const basePath = path.startsWith(`/${locale}`) && locale !== i18nConfig.defaultLocale
    ? path.slice(locale.length + 1) || "/"
    : path;

  const canonicalUrl = `${seoConfig.siteUrl}${path}`;
  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${seoConfig.siteUrl}${ogImage}`;

  // Generate hreflang links for all supported locales
  const hreflangLinks = generateHreflangLinks(basePath);

  // Get OG locale format (e.g., "en_US", "fr_FR")
  const ogLocale = localeToOgLocale[locale];

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangLinks,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: seoConfig.siteName,
      type: "website",
      locale: ogLocale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: seoConfig.twitterHandle,
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
