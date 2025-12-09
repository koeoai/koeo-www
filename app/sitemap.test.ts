import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import sitemap, { SITEMAP_PAGES, generateAlternateLinks, generateLocaleEntries } from "./sitemap";
import { seoConfig } from "@/lib/seo/config";
import { i18nConfig } from "@/lib/i18n/config";

/**
 * **Feature: seo-optimization, Property 1: Sitemap URL format consistency**
 * **Validates: Requirements 1.3, 8.1**
 *
 * For any URL entry in the generated sitemap, the URL SHALL start with
 * the production domain "https://koeo.ai" and use lowercase, hyphenated paths.
 */
describe("Property 1: Sitemap URL format consistency", () => {
  it("should generate URLs that start with the production domain", () => {
    const sitemapEntries = sitemap();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sitemapEntries.length - 1 }),
        (index) => {
          const entry = sitemapEntries[index];
          expect(entry.url).toMatch(new RegExp(`^${seoConfig.siteUrl}`));
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should generate URLs with lowercase paths", () => {
    const sitemapEntries = sitemap();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sitemapEntries.length - 1 }),
        (index) => {
          const entry = sitemapEntries[index];
          const url = new URL(entry.url);
          expect(url.pathname).toBe(url.pathname.toLowerCase());
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should generate URLs with hyphenated paths (no camelCase or underscores)", () => {
    const sitemapEntries = sitemap();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sitemapEntries.length - 1 }),
        (index) => {
          const entry = sitemapEntries[index];
          const url = new URL(entry.url);
          // Path should not contain uppercase letters or underscores
          expect(url.pathname).not.toMatch(/[A-Z_]/);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should include all configured pages for all locales in the sitemap", () => {
    const sitemapEntries = sitemap();
    // Each page should have entries for all supported locales (en, fr)
    const expectedEntries = SITEMAP_PAGES.length * 2; // 2 locales
    expect(sitemapEntries.length).toBe(expectedEntries);
  });

  it("should have valid priority values between 0 and 1", () => {
    const sitemapEntries = sitemap();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sitemapEntries.length - 1 }),
        (index) => {
          const entry = sitemapEntries[index];
          expect(entry.priority).toBeGreaterThanOrEqual(0);
          expect(entry.priority).toBeLessThanOrEqual(1);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should have valid changeFrequency values", () => {
    const validFrequencies = [
      "always",
      "hourly",
      "daily",
      "weekly",
      "monthly",
      "yearly",
      "never",
    ];
    const sitemapEntries = sitemap();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sitemapEntries.length - 1 }),
        (index) => {
          const entry = sitemapEntries[index];
          expect(validFrequencies).toContain(entry.changeFrequency);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Unit tests for sitemap generation
 * Requirements: 1.1, 1.3, 1.5
 */
describe("Sitemap generation", () => {
  it("should include the homepage with highest priority", () => {
    const sitemapEntries = sitemap();
    const homepage = sitemapEntries.find((entry) =>
      entry.url === `${seoConfig.siteUrl}/`
    );

    expect(homepage).toBeDefined();
    expect(homepage?.priority).toBe(1.0);
  });

  it("should include all public pages", () => {
    const sitemapEntries = sitemap();
    const expectedPaths = ["/", "/product", "/beta", "/providers", "/about", "/careers"];

    expectedPaths.forEach((path) => {
      const entry = sitemapEntries.find(
        (e) => e.url === `${seoConfig.siteUrl}${path}`
      );
      expect(entry).toBeDefined();
    });
  });

  it("should exclude brandkit page (internal resource)", () => {
    const sitemapEntries = sitemap();
    const brandkitEntry = sitemapEntries.find((entry) =>
      entry.url.includes("/brandkit")
    );

    expect(brandkitEntry).toBeUndefined();
  });

  it("should have lastModified date on all entries", () => {
    const sitemapEntries = sitemap();

    sitemapEntries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});


/**
 * Unit tests for robots.txt generation
 * Requirements: 1.2, 1.4
 */
describe("Robots.txt generation", () => {
  // Import robots dynamically to avoid circular dependencies
  const getRobots = async () => {
    const { default: robots } = await import("./robots");
    return robots();
  };

  it("should allow crawling of public pages", async () => {
    const robotsConfig = await getRobots();

    expect(robotsConfig.rules).toBeDefined();
    const rules = Array.isArray(robotsConfig.rules)
      ? robotsConfig.rules
      : [robotsConfig.rules];

    const mainRule = rules.find((r) => r.userAgent === "*");
    expect(mainRule).toBeDefined();
    expect(mainRule?.allow).toBe("/");
  });

  it("should disallow crawling of /api/ routes", async () => {
    const robotsConfig = await getRobots();

    const rules = Array.isArray(robotsConfig.rules)
      ? robotsConfig.rules
      : [robotsConfig.rules];

    const mainRule = rules.find((r) => r.userAgent === "*");
    expect(mainRule).toBeDefined();

    const disallowedPaths = Array.isArray(mainRule?.disallow)
      ? mainRule.disallow
      : [mainRule?.disallow];

    expect(disallowedPaths).toContain("/api/");
  });

  it("should include sitemap reference", async () => {
    const robotsConfig = await getRobots();

    expect(robotsConfig.sitemap).toBeDefined();
    expect(robotsConfig.sitemap).toBe(`${seoConfig.siteUrl}/sitemap.xml`);
  });

  it("should have sitemap URL starting with production domain", async () => {
    const robotsConfig = await getRobots();

    expect(robotsConfig.sitemap).toMatch(new RegExp(`^${seoConfig.siteUrl}`));
  });
});


/**
 * **Feature: i18n-support, Property 8: Sitemap includes all locale variants**
 * **Validates: Requirements 4.3**
 *
 * For any page in the sitemap, there SHALL be URL entries for all supported
 * locales with appropriate xhtml:link hreflang annotations.
 */
describe("Property 8: Sitemap includes all locale variants", () => {
  it("should generate alternate links for all supported locales", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: SITEMAP_PAGES.length - 1 }),
        (pageIndex) => {
          const page = SITEMAP_PAGES[pageIndex];
          const alternates = generateAlternateLinks(page.path);

          // Should have entries for all supported locales
          for (const locale of i18nConfig.locales) {
            const localeEntry = alternates.find((alt) => alt.hreflang === locale);
            expect(localeEntry).toBeDefined();
            expect(localeEntry?.href).toContain(seoConfig.siteUrl);
          }

          // Should have x-default entry
          const xDefault = alternates.find((alt) => alt.hreflang === "x-default");
          expect(xDefault).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should generate sitemap entries for all locales of each page", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: SITEMAP_PAGES.length - 1 }),
        (pageIndex) => {
          const page = SITEMAP_PAGES[pageIndex];
          const lastModified = new Date();
          const entries = generateLocaleEntries(page, lastModified);

          // Should have one entry per locale
          expect(entries.length).toBe(i18nConfig.locales.length);

          // Each entry should have alternates for all locales
          for (const entry of entries) {
            expect(entry.alternates).toBeDefined();
            expect(entry.alternates?.languages).toBeDefined();

            const languages = entry.alternates?.languages as Record<string, string>;

            // Should have entries for all locales plus x-default
            for (const locale of i18nConfig.locales) {
              expect(languages[locale]).toBeDefined();
            }
            expect(languages["x-default"]).toBeDefined();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should have correct URL format for each locale in sitemap", () => {
    const sitemapEntries = sitemap();

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sitemapEntries.length - 1 }),
        (entryIndex) => {
          const entry = sitemapEntries[entryIndex];

          // URL should start with site URL
          expect(entry.url).toMatch(new RegExp(`^${seoConfig.siteUrl}`));

          // URL should be lowercase
          const url = new URL(entry.url);
          expect(url.pathname).toBe(url.pathname.toLowerCase());

          // Entry should have alternates
          expect(entry.alternates).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should include French locale URLs with /fr prefix", () => {
    const sitemapEntries = sitemap();
    const frenchEntries = sitemapEntries.filter((entry) =>
      entry.url.includes("/fr/") || entry.url.endsWith("/fr")
    );

    // Should have French entries for all pages
    expect(frenchEntries.length).toBe(SITEMAP_PAGES.length);

    // Each French entry should have correct alternates
    for (const entry of frenchEntries) {
      const languages = entry.alternates?.languages as Record<string, string>;
      expect(languages["fr"]).toBe(entry.url);
      expect(languages["en"]).not.toContain("/fr");
    }
  });

  it("should include English locale URLs without prefix", () => {
    const sitemapEntries = sitemap();
    const englishEntries = sitemapEntries.filter(
      (entry) => !entry.url.includes("/fr/") && !entry.url.endsWith("/fr")
    );

    // Should have English entries for all pages
    expect(englishEntries.length).toBe(SITEMAP_PAGES.length);

    // Each English entry should have correct alternates
    for (const entry of englishEntries) {
      const languages = entry.alternates?.languages as Record<string, string>;
      expect(languages["en"]).toBe(entry.url);
      expect(languages["x-default"]).toBe(entry.url);
    }
  });
});
