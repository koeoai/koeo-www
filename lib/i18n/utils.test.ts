import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  getLocalizedPath,
  removeLocalePrefix,
  getLocaleFromPath,
  parseAcceptLanguage,
} from "./utils";
// i18nConfig imported for reference but tests use direct function calls

/**
 * **Feature: i18n-support, Property 1: French locale routing**
 * **Validates: Requirements 1.1**
 *
 * For any valid page path with `/fr` prefix, the extracted locale SHALL be "fr"
 * and the path segment SHALL be preserved correctly.
 */
describe("Property 1: French locale routing", () => {
  it("should extract 'fr' locale from paths with /fr prefix", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]*$/).filter((s) => s !== "/fr" && s !== "/en"),
        (pathSegment) => {
          const frenchPath = `/fr${pathSegment}`;
          const locale = getLocaleFromPath(frenchPath);
          expect(locale).toBe("fr");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should extract 'fr' locale from root /fr path", () => {
    const locale = getLocaleFromPath("/fr");
    expect(locale).toBe("fr");
  });

  it("should preserve path segment when extracting from French URLs", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]+$/).filter((s) => s !== "/fr" && s !== "/en"),
        (pathSegment) => {
          const frenchPath = `/fr${pathSegment}`;
          const pathWithoutLocale = removeLocalePrefix(frenchPath);
          expect(pathWithoutLocale).toBe(pathSegment);
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * **Feature: i18n-support, Property 2: Default locale routing**
 * **Validates: Requirements 1.2**
 *
 * For any valid page path without a locale prefix, the extracted locale SHALL be "en" (default)
 * and the path SHALL remain unchanged.
 */
describe("Property 2: Default locale routing", () => {
  it("should return default locale 'en' for paths without locale prefix", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]*$/).filter(
          (s) => !s.startsWith("/fr") && !s.startsWith("/en")
        ),
        (path) => {
          const locale = getLocaleFromPath(path);
          expect(locale).toBe("en");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should return default locale 'en' for root path", () => {
    const locale = getLocaleFromPath("/");
    expect(locale).toBe("en");
  });

  it("should leave path unchanged when no locale prefix exists", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]+$/).filter(
          (s) => !s.startsWith("/fr") && !s.startsWith("/en")
        ),
        (path) => {
          const result = removeLocalePrefix(path);
          expect(result).toBe(path);
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * **Feature: i18n-support, Property 3: URL generation preserves path across locales**
 * **Validates: Requirements 2.1, 2.2**
 *
 * For any pathname and target locale, `getLocalizedPath` SHALL preserve the path segment
 * while correctly adding or removing the locale prefix.
 */
describe("Property 3: URL generation preserves path across locales", () => {
  it("should preserve path segment when switching to French locale", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]+$/).filter(
          (s) => !s.startsWith("/fr") && !s.startsWith("/en")
        ),
        (path) => {
          const localizedPath = getLocalizedPath(path, "fr");
          expect(localizedPath).toBe(`/fr${path}`);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should preserve path segment when switching to English locale", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]+$/).filter(
          (s) => !s.startsWith("/fr") && !s.startsWith("/en")
        ),
        (path) => {
          const frenchPath = `/fr${path}`;
          const localizedPath = getLocalizedPath(frenchPath, "en");
          expect(localizedPath).toBe(path);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should return root path for default locale from root", () => {
    const result = getLocalizedPath("/", "en");
    expect(result).toBe("/");
  });

  it("should return /fr for French locale from root", () => {
    const result = getLocalizedPath("/", "fr");
    expect(result).toBe("/fr/");
  });

  it("round-trip: switching locale twice should preserve original path structure", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-]+$/).filter(
          (s) => !s.startsWith("/fr") && !s.startsWith("/en")
        ),
        (originalPath) => {
          // Start with English path, switch to French, then back to English
          const frenchPath = getLocalizedPath(originalPath, "fr");
          const backToEnglish = getLocalizedPath(frenchPath, "en");
          expect(backToEnglish).toBe(originalPath);
        }
      ),
      { numRuns: 100 }
    );
  });
});


/**
 * **Feature: i18n-support, Property 9: Accept-Language header parsing**
 * **Validates: Requirements 5.1**
 *
 * For any valid Accept-Language header string, `parseAcceptLanguage` SHALL return
 * the highest-priority locale that matches a supported locale, or null if none match.
 */
describe("Property 9: Accept-Language header parsing", () => {
  it("should return null for null header", () => {
    const result = parseAcceptLanguage(null);
    expect(result).toBeNull();
  });

  it("should return null for empty header", () => {
    const result = parseAcceptLanguage("");
    expect(result).toBeNull();
  });

  it("should return 'fr' when French is highest priority supported locale", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 9 }),
        (qualityTenths) => {
          const lowerQuality = qualityTenths / 10;
          const header = `fr;q=1,en;q=${lowerQuality.toFixed(1)}`;
          const result = parseAcceptLanguage(header);
          expect(result).toBe("fr");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should return 'en' when English is highest priority supported locale", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 9 }),
        (qualityTenths) => {
          const lowerQuality = qualityTenths / 10;
          const header = `en;q=1,fr;q=${lowerQuality.toFixed(1)}`;
          const result = parseAcceptLanguage(header);
          expect(result).toBe("en");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should return null when no supported locales are in header", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom("de", "es", "it", "pt", "ja", "zh", "ko", "ru"),
          { minLength: 1, maxLength: 5 }
        ),
        (unsupportedLocales) => {
          const header = unsupportedLocales.join(",");
          const result = parseAcceptLanguage(header);
          expect(result).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should handle language tags with region codes (e.g., fr-FR)", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("FR", "CA", "BE", "CH"),
        (region) => {
          const header = `fr-${region}`;
          const result = parseAcceptLanguage(header);
          expect(result).toBe("fr");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should handle language tags with region codes for English", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("US", "GB", "AU", "CA"),
        (region) => {
          const header = `en-${region}`;
          const result = parseAcceptLanguage(header);
          expect(result).toBe("en");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should respect quality values and return highest priority match", () => {
    // When unsupported locale has highest priority, should return first supported match
    const header = "de;q=1,fr;q=0.8,en;q=0.5";
    const result = parseAcceptLanguage(header);
    expect(result).toBe("fr");
  });

  it("should default quality to 1 when not specified", () => {
    // fr without q value should have q=1, higher than en with q=0.5
    const header = "fr,en;q=0.5";
    const result = parseAcceptLanguage(header);
    expect(result).toBe("fr");
  });

  it("should handle malformed quality values gracefully", () => {
    // Invalid q value should default to 1
    const header = "fr;q=invalid,en;q=0.5";
    const result = parseAcceptLanguage(header);
    expect(result).toBe("fr");
  });
});
