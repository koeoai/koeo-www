/**
 * Structured Data Generators
 * Utility functions for generating Schema.org JSON-LD structured data
 */

import { seoConfig } from "./config";
import type {
  OrganizationSchema,
  WebSiteSchema,
  FAQPageSchema,
  SoftwareApplicationSchema,
  BreadcrumbListSchema,
} from "@/components/seo/json-ld";

/**
 * Options for generating Organization schema
 */
export interface OrganizationSchemaOptions {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactEmail?: string;
}

/**
 * Generates Organization schema for the website
 * @param options - Optional overrides for default values
 * @returns Organization schema object
 */
export function generateOrganizationSchema(
  options: OrganizationSchemaOptions = {}
): OrganizationSchema {
  const schema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: options.name ?? seoConfig.siteName,
    url: options.url ?? seoConfig.siteUrl,
    logo: options.logo ?? `${seoConfig.siteUrl}/brand/logo-gradient.png`,
    description: options.description ?? seoConfig.defaultDescription,
    sameAs: options.sameAs ?? seoConfig.socialProfiles,
  };

  if (options.contactEmail) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: options.contactEmail,
    };
  }

  return schema;
}


/**
 * Options for generating WebSite schema
 */
export interface WebSiteSchemaOptions {
  name?: string;
  url?: string;
  includeSearchAction?: boolean;
  searchActionTarget?: string;
}

/**
 * Generates WebSite schema for the website
 * @param options - Optional overrides for default values
 * @returns WebSite schema object
 */
export function generateWebSiteSchema(
  options: WebSiteSchemaOptions = {}
): WebSiteSchema {
  const schema: WebSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: options.name ?? seoConfig.siteName,
    url: options.url ?? seoConfig.siteUrl,
  };

  if (options.includeSearchAction) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target:
        options.searchActionTarget ?? `${seoConfig.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

/**
 * FAQ item for generating FAQPage schema
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generates FAQPage schema from a list of FAQ items
 * @param items - Array of question/answer pairs
 * @returns FAQPage schema object
 */
export function generateFAQPageSchema(items: FAQItem[]): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}


/**
 * Options for generating SoftwareApplication schema
 */
export interface SoftwareApplicationSchemaOptions {
  name?: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  price?: string;
  priceCurrency?: string;
}

/**
 * Generates SoftwareApplication schema for the product
 * @param options - Optional overrides for default values
 * @returns SoftwareApplication schema object
 */
export function generateSoftwareApplicationSchema(
  options: SoftwareApplicationSchemaOptions = {}
): SoftwareApplicationSchema {
  const schema: SoftwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: options.name ?? "Koeo Inference Runtime",
    applicationCategory: options.applicationCategory ?? "DeveloperApplication",
    operatingSystem: options.operatingSystem ?? "Cloud",
    description:
      options.description ??
      "A managed inference runtime that turns your models into reliable APIs. OpenAI-compatible, zero migration friction.",
  };

  if (options.price !== undefined) {
    schema.offers = {
      "@type": "Offer",
      price: options.price,
      priceCurrency: options.priceCurrency ?? "USD",
    };
  }

  return schema;
}

/**
 * Breadcrumb item for generating BreadcrumbList schema
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates BreadcrumbList schema from a list of breadcrumb items
 * @param items - Array of breadcrumb items in order (first item is root)
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${seoConfig.siteUrl}${item.url}`,
    })),
  };
}
