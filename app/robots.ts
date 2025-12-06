import { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo/config";

/**
 * Generates the robots.txt for the Koeo website
 * Uses Next.js MetadataRoute.Robots for automatic generation
 *
 * Requirements: 1.2, 1.4
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
  };
}
