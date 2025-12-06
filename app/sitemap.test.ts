import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import sitemap, { SITEMAP_PAGES } from "./sitemap";
import { seoConfig } from "@/lib/seo/config";

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

  it("should include all configured pages in the sitemap", () => {
    const sitemapEntries = sitemap();
    expect(sitemapEntries.length).toBe(SITEMAP_PAGES.length);
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
