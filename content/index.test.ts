import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { getContent } from "./index";
import { i18nConfig, type Locale } from "@/lib/i18n/config";
import * as enContent from "./en";

/**
 * **Feature: i18n-support, Property 5: Translation fallback to English**
 * **Validates: Requirements 3.2**
 *
 * For any content key and locale, if the translation is missing for that locale,
 * the system SHALL return the English (default) content instead of undefined.
 */

describe("Content i18n - Property Tests", () => {
  // Get all available content keys from English content
  const contentKeys = Object.keys(enContent).filter(
    (key) => typeof (enContent as Record<string, unknown>)[key] !== "function"
  );

  // Arbitrary for valid content keys
  const contentKeyArb = fc.constantFrom(...contentKeys);

  // Arbitrary for supported locales
  const localeArb = fc.constantFrom(...i18nConfig.locales);

  it("Property 5: Translation fallback to English - content is never undefined", () => {
    /**
     * For any content key that exists in English and any supported locale,
     * getContent should return a defined value (either the locale-specific
     * translation or the English fallback).
     */
    fc.assert(
      fc.property(contentKeyArb, localeArb, (key, locale) => {
        const content = getContent<unknown>(key, locale);
        
        // Content should never be undefined for valid keys
        expect(content).toBeDefined();
        expect(content).not.toBeNull();
      }),
      { numRuns: 100 }
    );
  });

  it("Property 5: Translation fallback to English - fallback matches English content", () => {
    /**
     * For any content key, when the locale-specific content is the same as
     * English (indicating fallback or re-export), the returned content should
     * match the English content exactly.
     */
    fc.assert(
      fc.property(contentKeyArb, localeArb, (key, locale) => {
        const content = getContent<unknown>(key, locale);
        const englishContent = getContent<unknown>(key, "en" as Locale);
        
        // If content exists, it should either be locale-specific or match English
        expect(content).toBeDefined();
        
        // For the default locale, content should always match English
        if (locale === i18nConfig.defaultLocale) {
          expect(content).toEqual(englishContent);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("Property 5: Translation fallback to English - English content is always available", () => {
    /**
     * For any content key, the English (default) locale should always return
     * the expected content without fallback.
     */
    fc.assert(
      fc.property(contentKeyArb, (key) => {
        const content = getContent<unknown>(key, "en" as Locale);
        const directEnglishContent = (enContent as Record<string, unknown>)[key];
        
        // Content from getContent should match direct English import
        expect(content).toEqual(directEnglishContent);
      }),
      { numRuns: 100 }
    );
  });
});
