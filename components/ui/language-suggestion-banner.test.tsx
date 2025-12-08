import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { shouldShowBanner } from "./language-suggestion-banner";
import { i18nConfig, type Locale } from "@/lib/i18n";

/**
 * **Feature: i18n-support, Property 10: Language suggestion banner display**
 * **Validates: Requirements 5.2**
 *
 * For any detected locale that differs from the current locale and matches
 * a supported locale, the language suggestion banner SHALL be displayed.
 */
describe("Property 10: Language suggestion banner display", () => {
  // Arbitrary for supported locales
  const supportedLocaleArb = fc.constantFrom(...i18nConfig.locales) as fc.Arbitrary<Locale>;
  
  // Arbitrary for unsupported locale strings
  const unsupportedLocaleArb = fc.constantFrom("de", "es", "it", "pt", "ja", "zh", "ko", "ru");

  it("should show banner when detected locale differs from current locale and is supported", () => {
    fc.assert(
      fc.property(
        supportedLocaleArb,
        supportedLocaleArb,
        (detectedLocale, currentLocale) => {
          // Only test when locales differ
          fc.pre(detectedLocale !== currentLocale);
          
          const result = shouldShowBanner(detectedLocale, currentLocale, false);
          expect(result).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not show banner when detected locale matches current locale", () => {
    fc.assert(
      fc.property(
        supportedLocaleArb,
        (locale) => {
          const result = shouldShowBanner(locale, locale, false);
          expect(result).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not show banner when detected locale is null", () => {
    fc.assert(
      fc.property(
        supportedLocaleArb,
        fc.boolean(),
        (currentLocale, isDismissed) => {
          const result = shouldShowBanner(null, currentLocale, isDismissed);
          expect(result).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not show banner when banner has been dismissed", () => {
    fc.assert(
      fc.property(
        supportedLocaleArb,
        supportedLocaleArb,
        (detectedLocale, currentLocale) => {
          // Even when locales differ, dismissed banner should not show
          const result = shouldShowBanner(detectedLocale, currentLocale, true);
          expect(result).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should not show banner for unsupported detected locales", () => {
    fc.assert(
      fc.property(
        unsupportedLocaleArb,
        supportedLocaleArb,
        (unsupportedLocale, currentLocale) => {
          // Cast to Locale to test the guard - this simulates invalid input
          const result = shouldShowBanner(unsupportedLocale as Locale, currentLocale, false);
          expect(result).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Specific examples for edge cases
  it("should show banner when French user visits English page", () => {
    const result = shouldShowBanner("fr", "en", false);
    expect(result).toBe(true);
  });

  it("should show banner when English user visits French page", () => {
    const result = shouldShowBanner("en", "fr", false);
    expect(result).toBe(true);
  });

  it("should not show banner when French user visits French page", () => {
    const result = shouldShowBanner("fr", "fr", false);
    expect(result).toBe(false);
  });

  it("should not show banner when English user visits English page", () => {
    const result = shouldShowBanner("en", "en", false);
    expect(result).toBe(false);
  });
});
