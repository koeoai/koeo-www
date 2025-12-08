import { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo/config";
import { i18nConfig } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/utils";

/**
 * Page configuration for sitemap generation
 * Each page has priority and change frequency based on content type
 */
export const SITEMAP_PAGES = [
  {
    path: "/",
    changeFrequency: "weekly" as const,
    priority: 1.0,
  },
  {
    path: "/product",
    changeFrequency: "weekly" as const,
    priority: 0.9,
  },
  {
    path: "/beta",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/providers",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/about",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/careers",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  // Note: /brandkit is excluded as it's an internal resource (noIndex)
];

/**
 * Generates alternate language links for a given path
 * @param path - The base path without locale prefix
 * @returns Array of alternate language links with hreflang
 */
export function generateAlternateLinks(
  path: string
): Array<{ hreflang: string; href: string }> {
  const alternates: Array<{ hreflang: string; href: string }> = [];

  for (const locale of i18nConfig.locales) {
    const localizedPath = getLocalizedPath(path, locale);
    alternates.push({
      hreflang: locale,
      href: `${seoConfig.siteUrl}${localizedPath}`,
    });
  }

  // Add x-default pointing to the default locale version
  const defaultPath = getLocalizedPath(path, i18nConfig.defaultLocale);
  alternates.push({
    hreflang: "x-default",
    href: `${seoConfig.siteUrl}${defaultPath}`,
  });

  return alternates;
}

/**
 * Generates sitemap entries for all locales of a given page
 * @param page - The page configuration
 * @param lastModified - The last modified date
 * @returns Array of sitemap entries for all locales
 */
export function generateLocaleEntries(
  page: (typeof SITEMAP_PAGES)[number],
  lastModified: Date
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const alternates = generateAlternateLinks(page.path);

  for (const locale of i18nConfig.locales) {
    const localizedPath = getLocalizedPath(page.path, locale);
    entries.push({
      url: `${seoConfig.siteUrl}${localizedPath}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          alternates.map((alt) => [alt.hreflang, alt.href])
        ),
      },
    });
  }

  return entries;
}

/**
 * Generates the sitemap for the Koeo website
 * Uses Next.js MetadataRoute.Sitemap for automatic XML generation
 * Includes URLs for all supported locales with hreflang annotations
 *
 * Requirements: 1.1, 1.3, 1.5, 4.3
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_PAGES.flatMap((page) =>
    generateLocaleEntries(page, lastModified)
  );
}
