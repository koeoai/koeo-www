/**
 * Centralized content layer for marketing copy.
 * Import content from here to keep components focused on rendering.
 * 
 * Supports locale-based content retrieval with automatic fallback to English.
 */

import { i18nConfig, type Locale } from "@/lib/i18n/config";

// Import all locale content
import * as enContent from "./en";
import * as frContent from "./fr";

// Type exports
export type {
  HeroContent,
  SectionContent,
  FeatureItem,
  ProblemCard,
  DeveloperFeature,
  StepItem,
  ProblemSectionContent,
  WhatIsSectionContent,
  HowWorksSectionContent,
  HomepageContent,
} from "./types";

// Beta page type exports
export type {
  BetaHeroContent,
  BetaCriterion,
  BetaBenefit,
  BetaExpectation,
  BetaPageContent,
} from "./en/beta";

// About page type exports
export type {
  AboutHeroContent,
  AboutVisionContent,
  AboutPrinciple,
  AboutCtaContent,
  AboutPageContent,
} from "./en/about";

// Careers page type exports
export type {
  CareersHeroContent,
  CareersNoticeContent,
  CareersFormContent,
  CareersPageContent,
} from "./en/careers";

// Product page type exports
export type {
  ProductHeroContent,
  ProductWhatIsContent,
  ProductWhoForItem,
  ProductWhoForContent,
  ProductWhyFeature,
  ProductWhyContent,
  ProductHowStep,
  ProductHowContent,
  ProductCtaContent,
  ProductPageContent,
} from "./en/product";

// Brandkit page type exports
export type {
  BrandkitHeroContent,
  BrandkitSectionHeader,
  BrandkitTypographyContent,
  BrandkitGradientContent,
  BrandkitPageContent,
} from "./en/brandkit";

// Providers page type exports
export type {
  ProvidersHeroContent,
  ProvidersBenefit,
  ProvidersType,
  ProvidersFaqItem,
  ProvidersSectionContent,
  ProvidersPageContent,
} from "./en/providers";


/**
 * Content by locale mapping
 */
const contentByLocale: Record<Locale, Record<string, unknown>> = {
  en: enContent as unknown as Record<string, unknown>,
  fr: frContent as unknown as Record<string, unknown>,
};

/**
 * Retrieves content for a given key and locale with fallback to default locale.
 * 
 * @param key - The content key to retrieve (e.g., "HOMEPAGE_CONTENT", "HERO_CONTENT")
 * @param locale - The target locale
 * @returns The content for the specified key and locale, or English fallback if not found
 * 
 * @example
 * ```ts
 * const heroContent = getContent<HeroContent>("HERO_CONTENT", "fr");
 * ```
 */
export function getContent<T>(key: string, locale: Locale): T {
  const localeContent = contentByLocale[locale];
  const defaultContent = contentByLocale[i18nConfig.defaultLocale];
  
  // Return locale-specific content or fall back to default
  return (localeContent[key] ?? defaultContent[key]) as T;
}

// Re-export default (English) content for backward compatibility
// Homepage content exports
export {
  HERO_CONTENT,
  PROBLEM_CONTENT,
  WHAT_IS_CONTENT,
  HOW_WORKS_CONTENT,
  HOMEPAGE_CONTENT,
} from "./en/homepage";

// Beta page content exports
export {
  BETA_HERO_CONTENT,
  BETA_CRITERIA,
  BETA_BENEFITS,
  BETA_EXPECTATIONS,
  BETA_PAGE_CONTENT,
} from "./en/beta";

// About page content exports
export {
  ABOUT_HERO_CONTENT,
  ABOUT_VISION_CONTENT,
  ABOUT_PRINCIPLES,
  ABOUT_CTA_CONTENT,
  ABOUT_PAGE_CONTENT,
} from "./en/about";

// Careers page content exports
export {
  CAREERS_HERO_CONTENT,
  CAREERS_NOTICE_CONTENT,
  CAREERS_FORM_CONTENT,
  CAREERS_PAGE_CONTENT,
} from "./en/careers";

// Product page content exports
export {
  PRODUCT_HERO_CONTENT,
  PRODUCT_WHAT_IS_CONTENT,
  PRODUCT_WHO_FOR_CONTENT,
  PRODUCT_WHY_CONTENT,
  PRODUCT_HOW_CONTENT,
  PRODUCT_CTA_CONTENT,
  PRODUCT_PAGE_CONTENT,
} from "./en/product";

// Brandkit page content exports
export {
  BRANDKIT_HERO_CONTENT,
  BRANDKIT_SECTIONS,
  BRANDKIT_TYPOGRAPHY_CONTENT,
  BRANDKIT_GRADIENT_CONTENT,
  BRANDKIT_PAGE_CONTENT,
} from "./en/brandkit";

// Providers page content exports
export {
  PROVIDERS_HERO_CONTENT,
  PROVIDERS_SECTIONS,
  PROVIDERS_BENEFITS,
  PROVIDERS_TYPES,
  PROVIDERS_FAQ,
  PROVIDERS_PAGE_CONTENT,
} from "./en/providers";

// Navigation content exports
export { NAVIGATION_CONTENT } from "./en/navigation";

// Navigation type exports
export type {
  NavItem,
  NavDropdown,
  FooterLinkGroup,
  NavigationContent,
} from "./en/navigation";
