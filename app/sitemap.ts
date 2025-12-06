import { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo/config";

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
 * Generates the sitemap for the Koeo website
 * Uses Next.js MetadataRoute.Sitemap for automatic XML generation
 *
 * Requirements: 1.1, 1.3, 1.5
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_PAGES.map((page) => ({
    url: `${seoConfig.siteUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
