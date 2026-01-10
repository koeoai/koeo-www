import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { HOMEPAGE_CONTENT } from "./en/homepage";
import { PRODUCT_PAGE_CONTENT } from "./en/product";

/**
 * **Feature: copy-credibility-fixes, Property 1: Core Claim Consistency**
 * **Validates: Requirements 1.1, 1.3**
 *
 * For any page content (homepage or product) that mentions model support,
 * the content SHALL NOT contain the string "Any model" or "any model" in
 * headlines, subtitles, or feature descriptions. The claim should use
 * possessive framing ("Your models") rather than universal claims.
 */

// Helper to recursively extract all string values from an object
function extractAllStrings(obj: unknown): string[] {
  const strings: string[] = [];

  function traverse(value: unknown): void {
    if (typeof value === "string") {
      strings.push(value);
    } else if (Array.isArray(value)) {
      value.forEach(traverse);
    } else if (value !== null && typeof value === "object") {
      Object.values(value).forEach(traverse);
    }
  }

  traverse(obj);
  return strings;
}

// Check if a string contains "any model" (case-insensitive)
function containsAnyModel(str: string): boolean {
  return /any\s+model/i.test(str);
}

describe("Copy Credibility - Property Tests", () => {
  describe("Property 1: Core Claim Consistency", () => {
    it("Homepage content should not contain 'any model' (case-insensitive)", () => {
      const allStrings = extractAllStrings(HOMEPAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            // Property: No content string should contain "any model"
            const hasAnyModel = containsAnyModel(contentString);
            expect(hasAnyModel).toBe(false);
            return !hasAnyModel;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("Product content should not contain 'any model' (case-insensitive)", () => {
      const allStrings = extractAllStrings(PRODUCT_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            // Property: No content string should contain "any model"
            const hasAnyModel = containsAnyModel(contentString);
            expect(hasAnyModel).toBe(false);
            return !hasAnyModel;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("All homepage strings pass core claim check", () => {
      const allStrings = extractAllStrings(HOMEPAGE_CONTENT);
      const violatingStrings = allStrings.filter(containsAnyModel);

      expect(violatingStrings).toEqual([]);
    });

    it("All product strings pass core claim check", () => {
      const allStrings = extractAllStrings(PRODUCT_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(containsAnyModel);

      expect(violatingStrings).toEqual([]);
    });
  });
});
