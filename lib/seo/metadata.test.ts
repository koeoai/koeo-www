import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  isValidTitleLength,
  isValidDescriptionLength,
  hasValidKeywords,
  validateMetadata,
  generateMetadata,
  generateHreflangLinks,
  localeToOgLocale,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "./metadata";
import { i18nConfig } from "@/lib/i18n/config";

/**
 * **Feature: seo-optimization, Property 2: Metadata title length bounds**
 * **Validates: Requirements 2.1**
 *
 * For any page metadata configuration, the title length SHALL be between
 * 50 and 60 characters inclusive.
 */
describe("Property 2: Metadata title length bounds", () => {
  it("should accept titles with length between 50-60 characters", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: TITLE_MIN_LENGTH, max: TITLE_MAX_LENGTH }).chain((length) =>
          fc.string({ minLength: length, maxLength: length })
        ),
        (validTitle) => {
          expect(isValidTitleLength(validTitle)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject titles shorter than 50 characters", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: TITLE_MIN_LENGTH - 1 }).chain((length) =>
          fc.string({ minLength: length, maxLength: length })
        ),
        (shortTitle) => {
          expect(isValidTitleLength(shortTitle)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject titles longer than 60 characters", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: TITLE_MAX_LENGTH + 1, max: 200 }).chain((length) =>
          fc.string({ minLength: length, maxLength: length })
        ),
        (longTitle) => {
          expect(isValidTitleLength(longTitle)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * **Feature: seo-optimization, Property 3: Metadata description length bounds**
 * **Validates: Requirements 2.2**
 *
 * For any page metadata configuration, the description length SHALL be between
 * 150 and 160 characters inclusive.
 */
describe("Property 3: Metadata description length bounds", () => {
  it("should accept descriptions with length between 150-160 characters", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH }).chain(
          (length) => fc.string({ minLength: length, maxLength: length })
        ),
        (validDescription) => {
          expect(isValidDescriptionLength(validDescription)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject descriptions shorter than 150 characters", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: DESCRIPTION_MIN_LENGTH - 1 }).chain((length) =>
          fc.string({ minLength: length, maxLength: length })
        ),
        (shortDescription) => {
          expect(isValidDescriptionLength(shortDescription)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject descriptions longer than 160 characters", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: DESCRIPTION_MAX_LENGTH + 1, max: 300 }).chain((length) =>
          fc.string({ minLength: length, maxLength: length })
        ),
        (longDescription) => {
          expect(isValidDescriptionLength(longDescription)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * **Feature: seo-optimization, Property 4: Metadata keywords non-empty**
 * **Validates: Requirements 2.3**
 *
 * For any page metadata configuration, the keywords array SHALL contain
 * at least one keyword.
 */
describe("Property 4: Metadata keywords non-empty", () => {
  it("should accept non-empty keyword arrays", () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 20 }),
        (keywords) => {
          expect(hasValidKeywords(keywords)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should reject empty keyword arrays", () => {
    expect(hasValidKeywords([])).toBe(false);
  });

  it("should validate metadata with valid keywords returns no keyword errors", () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
        (keywords) => {
          // Use valid title and description lengths to isolate keyword validation
          const validTitle = "A".repeat(55); // 55 chars - valid
          const validDescription = "B".repeat(155); // 155 chars - valid

          const result = validateMetadata({
            title: validTitle,
            description: validDescription,
            keywords,
            path: "/test",
          });

          // Should not have keyword-related errors
          const keywordErrors = result.errors.filter((e) => e.field === "keywords");
          expect(keywordErrors.length).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should validate metadata with empty keywords returns keyword error", () => {
    const validTitle = "A".repeat(55);
    const validDescription = "B".repeat(155);

    const result = validateMetadata({
      title: validTitle,
      description: validDescription,
      keywords: [],
      path: "/test",
    });

    const keywordErrors = result.errors.filter((e) => e.field === "keywords");
    expect(keywordErrors.length).toBe(1);
  });
});


/**
 * **Feature: seo-optimization, Property 5: Canonical URL presence**
 * **Validates: Requirements 2.4**
 *
 * For any page metadata configuration, the canonical URL SHALL be present
 * and match the expected URL pattern for that page.
 */
describe("Property 5: Canonical URL presence", () => {
  it("should generate metadata with canonical URL for any valid path", () => {
    // Generator for valid URL paths (lowercase letters, numbers, hyphens)
    const validPathArb = fc.stringMatching(/^\/[a-z][a-z0-9-]{0,20}$/);

    // Generator for valid title (50-60 chars)
    const validTitleArb = fc.integer({ min: TITLE_MIN_LENGTH, max: TITLE_MAX_LENGTH })
      .map((len) => "T".repeat(len));

    // Generator for valid description (150-160 chars)
    const validDescriptionArb = fc.integer({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH })
      .map((len) => "D".repeat(len));

    fc.assert(
      fc.property(
        validPathArb,
        validTitleArb,
        validDescriptionArb,
        (path, title, description) => {
          const metadata = generateMetadata({
            title,
            description,
            path,
          });

          // Canonical URL should be present
          expect(metadata.alternates).toBeDefined();
          expect(metadata.alternates?.canonical).toBeDefined();

          // Canonical URL should contain the path
          const canonical = metadata.alternates?.canonical as string;
          expect(canonical).toContain(path);

          // Canonical URL should start with the site URL
          expect(canonical).toMatch(/^https:\/\/koeo\.ai/);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should generate canonical URL that matches the page path exactly", () => {
    const testPaths = ["/about", "/product", "/providers", "/careers", "/beta"];

    testPaths.forEach((path) => {
      const metadata = generateMetadata({
        title: "A".repeat(55),
        description: "B".repeat(155),
        path,
      });

      expect(metadata.alternates?.canonical).toBe(`https://koeo.ai${path}`);
    });
  });
});

/**
 * **Feature: seo-optimization, Property 6: Open Graph completeness**
 * **Validates: Requirements 3.1**
 *
 * For any page metadata configuration, the Open Graph object SHALL contain
 * all required fields: title, description, url, type, and images.
 */
describe("Property 6: Open Graph completeness", () => {
  it("should generate metadata with all required Open Graph fields", () => {
    // Generator for valid URL paths (lowercase letters, numbers, hyphens)
    const validPathArb = fc.stringMatching(/^\/[a-z][a-z0-9-]{0,20}$/);

    // Generator for valid title (50-60 chars)
    const validTitleArb = fc.integer({ min: TITLE_MIN_LENGTH, max: TITLE_MAX_LENGTH })
      .map((len) => "T".repeat(len));

    // Generator for valid description (150-160 chars)
    const validDescriptionArb = fc.integer({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH })
      .map((len) => "D".repeat(len));

    fc.assert(
      fc.property(
        validPathArb,
        validTitleArb,
        validDescriptionArb,
        (path, title, description) => {
          const metadata = generateMetadata({
            title,
            description,
            path,
          });

          // Open Graph object should be present
          expect(metadata.openGraph).toBeDefined();

          const og = metadata.openGraph;

          // All required fields should be present
          expect(og?.title).toBeDefined();
          expect(og?.description).toBeDefined();
          expect(og?.url).toBeDefined();
          expect((og as Record<string, unknown>)?.type).toBeDefined();
          expect(og?.images).toBeDefined();

          // Title and description should match input
          expect(og?.title).toBe(title);
          expect(og?.description).toBe(description);

          // URL should contain the path
          expect(og?.url).toContain(path);

          // Type should be "website"
          expect((og as Record<string, unknown>)?.type).toBe("website");

          // Images should be an array with at least one image
          expect(Array.isArray(og?.images)).toBe(true);
          expect((og?.images as unknown[]).length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should include OG image with correct dimensions", () => {
    const metadata = generateMetadata({
      title: "A".repeat(55),
      description: "B".repeat(155),
      path: "/test",
    });

    const images = metadata.openGraph?.images as Array<{
      url: string;
      width: number;
      height: number;
    }>;

    expect(images[0].width).toBe(1200);
    expect(images[0].height).toBe(630);
  });
});

/**
 * **Feature: seo-optimization, Property 7: Twitter Card completeness**
 * **Validates: Requirements 3.2**
 *
 * For any page metadata configuration, the Twitter card object SHALL contain
 * all required fields: card, title, description, and images.
 */
describe("Property 7: Twitter Card completeness", () => {
  it("should generate metadata with all required Twitter Card fields", () => {
    // Generator for valid URL paths (lowercase letters, numbers, hyphens)
    const validPathArb = fc.stringMatching(/^\/[a-z][a-z0-9-]{0,20}$/);

    // Generator for valid title (50-60 chars)
    const validTitleArb = fc.integer({ min: TITLE_MIN_LENGTH, max: TITLE_MAX_LENGTH })
      .map((len) => "T".repeat(len));

    // Generator for valid description (150-160 chars)
    const validDescriptionArb = fc.integer({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH })
      .map((len) => "D".repeat(len));

    fc.assert(
      fc.property(
        validPathArb,
        validTitleArb,
        validDescriptionArb,
        (path, title, description) => {
          const metadata = generateMetadata({
            title,
            description,
            path,
          });

          // Twitter object should be present
          expect(metadata.twitter).toBeDefined();

          const twitter = metadata.twitter;

          // All required fields should be present
          expect((twitter as Record<string, unknown>)?.card).toBeDefined();
          expect(twitter?.title).toBeDefined();
          expect(twitter?.description).toBeDefined();
          expect(twitter?.images).toBeDefined();

          // Card type should be "summary_large_image"
          expect((twitter as Record<string, unknown>)?.card).toBe("summary_large_image");

          // Title and description should match input
          expect(twitter?.title).toBe(title);
          expect(twitter?.description).toBe(description);

          // Images should be defined
          expect(twitter?.images).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should include Twitter creator handle", () => {
    const metadata = generateMetadata({
      title: "A".repeat(55),
      description: "B".repeat(155),
      path: "/test",
    });

    expect(metadata.twitter?.creator).toBe("@koeo_ai");
  });
});


/**
 * **Feature: i18n-support, Property 6: Hreflang tags present for all locales**
 * **Validates: Requirements 4.1**
 *
 * For any rendered page, the hreflang link tags SHALL include entries for all
 * supported locales with correct href values.
 */
describe("Property 6: Hreflang tags present for all locales", () => {
  // Generator for valid URL paths (lowercase letters, numbers, hyphens)
  const validPathArb = fc.stringMatching(/^\/[a-z][a-z0-9-]{0,20}$/);

  it("should generate hreflang links for all supported locales", () => {
    fc.assert(
      fc.property(validPathArb, (path) => {
        const hreflangLinks = generateHreflangLinks(path);

        // Should have entries for all supported locales
        for (const locale of i18nConfig.locales) {
          expect(hreflangLinks[locale]).toBeDefined();
          expect(hreflangLinks[locale]).toContain("https://koeo.ai");
        }

        // Should have x-default entry
        expect(hreflangLinks["x-default"]).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });

  it("should generate correct URLs for each locale", () => {
    fc.assert(
      fc.property(validPathArb, (path) => {
        const hreflangLinks = generateHreflangLinks(path);

        // English (default) should not have locale prefix
        expect(hreflangLinks["en"]).toBe(`https://koeo.ai${path}`);

        // French should have /fr prefix
        expect(hreflangLinks["fr"]).toBe(`https://koeo.ai/fr${path}`);

        // x-default should point to default locale (English)
        expect(hreflangLinks["x-default"]).toBe(hreflangLinks["en"]);
      }),
      { numRuns: 100 }
    );
  });

  it("should include hreflang links in generated metadata", () => {
    fc.assert(
      fc.property(
        validPathArb,
        fc.constantFrom(...i18nConfig.locales),
        (path, locale) => {
          const metadata = generateMetadata({
            title: "A".repeat(55),
            description: "B".repeat(155),
            path,
            locale,
          });

          // Alternates should include languages
          expect(metadata.alternates).toBeDefined();
          expect(metadata.alternates?.languages).toBeDefined();

          const languages = metadata.alternates?.languages as Record<string, string>;

          // Should have entries for all supported locales
          for (const loc of i18nConfig.locales) {
            expect(languages[loc]).toBeDefined();
          }

          // Should have x-default
          expect(languages["x-default"]).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should handle root path correctly", () => {
    const hreflangLinks = generateHreflangLinks("/");

    expect(hreflangLinks["en"]).toBe("https://koeo.ai/");
    expect(hreflangLinks["fr"]).toBe("https://koeo.ai/fr/");
    expect(hreflangLinks["x-default"]).toBe("https://koeo.ai/");
  });
});


/**
 * **Feature: i18n-support, Property 7: Locale-aware metadata generation**
 * **Validates: Requirements 4.2**
 *
 * For any page and locale combination, the generated Open Graph locale tag
 * SHALL match the current locale format (e.g., "en_US", "fr_FR").
 */
describe("Property 7: Locale-aware metadata generation", () => {
  // Generator for valid URL paths (lowercase letters, numbers, hyphens)
  const validPathArb = fc.stringMatching(/^\/[a-z][a-z0-9-]{0,20}$/);

  // Generator for valid title (50-60 chars)
  const validTitleArb = fc
    .integer({ min: TITLE_MIN_LENGTH, max: TITLE_MAX_LENGTH })
    .map((len) => "T".repeat(len));

  // Generator for valid description (150-160 chars)
  const validDescriptionArb = fc
    .integer({ min: DESCRIPTION_MIN_LENGTH, max: DESCRIPTION_MAX_LENGTH })
    .map((len) => "D".repeat(len));

  it("should generate OG locale matching the input locale format", () => {
    fc.assert(
      fc.property(
        validPathArb,
        validTitleArb,
        validDescriptionArb,
        fc.constantFrom(...i18nConfig.locales),
        (path, title, description, locale) => {
          const metadata = generateMetadata({
            title,
            description,
            path,
            locale,
          });

          // OG locale should be defined
          expect(metadata.openGraph).toBeDefined();
          const ogLocale = (metadata.openGraph as Record<string, unknown>)?.locale;
          expect(ogLocale).toBeDefined();

          // OG locale should match the expected format for the input locale
          expect(ogLocale).toBe(localeToOgLocale[locale]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should use correct OG locale format for English", () => {
    const metadata = generateMetadata({
      title: "A".repeat(55),
      description: "B".repeat(155),
      path: "/test",
      locale: "en",
    });

    expect((metadata.openGraph as Record<string, unknown>)?.locale).toBe("en_US");
  });

  it("should use correct OG locale format for French", () => {
    const metadata = generateMetadata({
      title: "A".repeat(55),
      description: "B".repeat(155),
      path: "/test",
      locale: "fr",
    });

    expect((metadata.openGraph as Record<string, unknown>)?.locale).toBe("fr_FR");
  });

  it("should default to English locale when no locale is specified", () => {
    const metadata = generateMetadata({
      title: "A".repeat(55),
      description: "B".repeat(155),
      path: "/test",
    });

    expect((metadata.openGraph as Record<string, unknown>)?.locale).toBe("en_US");
  });

  it("should have localeToOgLocale mapping for all supported locales", () => {
    fc.assert(
      fc.property(fc.constantFrom(...i18nConfig.locales), (locale) => {
        // Every supported locale should have an OG locale mapping
        expect(localeToOgLocale[locale]).toBeDefined();

        // OG locale should follow the format: language_TERRITORY
        expect(localeToOgLocale[locale]).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
      }),
      { numRuns: 100 }
    );
  });
});
