import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { HOMEPAGE_CONTENT } from "./en/homepage";
import { PRODUCT_PAGE_CONTENT } from "./en/product";
import { PROVIDERS_PAGE_CONTENT } from "./en/providers";
import { HOMEPAGE_CONTENT as FR_HOMEPAGE_CONTENT } from "./fr/homepage";
import { PRODUCT_PAGE_CONTENT as FR_PRODUCT_PAGE_CONTENT } from "./fr/product";
import { PROVIDERS_PAGE_CONTENT as FR_PROVIDERS_PAGE_CONTENT } from "./fr/providers";
import { ABOUT_PAGE_CONTENT as FR_ABOUT_PAGE_CONTENT } from "./fr/about";

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


/**
 * **Feature: copy-credibility-fixes, Property 4: Compliance Claim Qualification**
 * **Validates: Requirements 4.1, 4.2**
 *
 * For any providers page content describing Koeo's responsibilities,
 * the content SHALL NOT contain the unqualified phrase "We handle compliance"
 * or "handle compliance" without accompanying qualification language.
 */

// Check if a string contains unqualified "handle compliance" claim
function containsUnqualifiedComplianceClaim(str: string): boolean {
  // Match "handle compliance" or "handle...compliance" patterns
  // This catches "We handle compliance", "handle compliance", etc.
  return /handle[^.]*compliance/i.test(str);
}

describe("Copy Credibility - Compliance Claim Tests", () => {
  describe("Property 4: Compliance Claim Qualification", () => {
    it("Providers content should not contain unqualified 'handle compliance' claims", () => {
      const allStrings = extractAllStrings(PROVIDERS_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            // Property: No content string should contain unqualified compliance claim
            const hasUnqualifiedClaim = containsUnqualifiedComplianceClaim(contentString);
            expect(hasUnqualifiedClaim).toBe(false);
            return !hasUnqualifiedClaim;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("All providers strings pass compliance claim check", () => {
      const allStrings = extractAllStrings(PROVIDERS_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(containsUnqualifiedComplianceClaim);

      expect(violatingStrings).toEqual([]);
    });
  });
});


/**
 * **Feature: copy-credibility-fixes, Property 2: French Localization Completeness**
 * **Validates: Requirements 5.1, 5.2, 5.3**
 *
 * For any French locale content file, all string fields SHALL NOT contain
 * common English UI strings including "Your App", "Runtime", "GPU Network",
 * "Sending request", "Routing to GPU", "Processing", "Request complete",
 * or "New request".
 */

// Common English UI strings that should not appear in French content
const ENGLISH_UI_STRINGS = [
  "Your App",
  "GPU Network",
  "Sending request",
  "Routing to GPU",
  "Request complete",
  "New request",
  "GPU node failed",
  "Runtime rerouting",
  "Processing on healthy GPU",
  "Streaming response",
  "Processing inference",
];

// Check if a string contains any English UI strings
function containsEnglishUIString(str: string): string | null {
  for (const englishString of ENGLISH_UI_STRINGS) {
    if (str.toLowerCase().includes(englishString.toLowerCase())) {
      return englishString;
    }
  }
  return null;
}

describe("Copy Credibility - French Localization Tests", () => {
  describe("Property 2: French Localization Completeness", () => {
    it("French homepage content should not contain English UI strings", () => {
      const allStrings = extractAllStrings(FR_HOMEPAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            // Property: No French content string should contain English UI strings
            const englishFound = containsEnglishUIString(contentString);
            expect(englishFound).toBeNull();
            return englishFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("French product content should not contain English UI strings", () => {
      const allStrings = extractAllStrings(FR_PRODUCT_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            const englishFound = containsEnglishUIString(contentString);
            expect(englishFound).toBeNull();
            return englishFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("French about content should not contain English UI strings", () => {
      const allStrings = extractAllStrings(FR_ABOUT_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            const englishFound = containsEnglishUIString(contentString);
            expect(englishFound).toBeNull();
            return englishFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("All French homepage strings pass English UI check", () => {
      const allStrings = extractAllStrings(FR_HOMEPAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsEnglishUIString(s) !== null);

      expect(violatingStrings).toEqual([]);
    });

    it("All French product strings pass English UI check", () => {
      const allStrings = extractAllStrings(FR_PRODUCT_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsEnglishUIString(s) !== null);

      expect(violatingStrings).toEqual([]);
    });

    it("All French about strings pass English UI check", () => {
      const allStrings = extractAllStrings(FR_ABOUT_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsEnglishUIString(s) !== null);

      expect(violatingStrings).toEqual([]);
    });
  });
});


/**
 * **Feature: copy-credibility-fixes, Property 3: French Tone Consistency**
 * **Validates: Requirements 5.4**
 *
 * For any French locale content file, the text SHALL use consistent formal
 * address ("vous", "votre", "vos") rather than informal ("tu", "ton", "ta", "tes")
 * for B2B credibility.
 */

// Check if a string contains informal "tu" form
// We need to be careful to avoid false positives like "bêta", "prêtes", "juste", etc.
function containsInformalTuForm(str: string): string | null {
  // Check for standalone "tu" (the pronoun)
  if (/(?<![a-zàâäéèêëïîôùûüç])\btu\b(?![a-zàâäéèêëïîôùûüç])/i.test(str)) {
    return "tu";
  }
  
  // Check for "ton" as possessive (not part of words like "carton", "bouton")
  // "ton" at start of sentence or after space/punctuation, followed by a noun
  if (/(?:^|[^a-zàâäéèêëïîôùûüç])\bton\s+[a-zàâäéèêëïîôùûüç]/i.test(str)) {
    return "ton";
  }
  
  // Check for "ta" as possessive - must be followed by a word starting with consonant
  // Avoid "bêta", "data", "delta", etc.
  if (/(?:^|[^a-zàâäéèêëïîôùûüç])\bta\s+[bcdfghjklmnpqrstvwxz]/i.test(str)) {
    return "ta";
  }
  
  // Check for "tes" as possessive - must be followed by a noun
  // Avoid "prêtes", "juste", "honnêtes", etc.
  if (/(?:^|[^a-zàâäéèêëïîôùûüç])\btes\s+[a-zàâäéèêëïîôùûüç]/i.test(str)) {
    return "tes";
  }
  
  // Check for "toi" (emphatic you)
  if (/(?<![a-zàâäéèêëïîôùûüç])\btoi\b(?![a-zàâäéèêëïîôùûüç])/i.test(str)) {
    return "toi";
  }
  
  // Check for "t'" elision before vowel (t'aide, t'intègre)
  if (/(?:^|[^a-zàâäéèêëïîôùûüç])\bt'[aeiouyéèêëàâäùûüôöîï]/i.test(str)) {
    return "t'";
  }
  
  return null;
}

describe("Copy Credibility - French Tone Tests", () => {
  describe("Property 3: French Tone Consistency", () => {
    it("French homepage content should use 'vous' form, not 'tu' form", () => {
      const allStrings = extractAllStrings(FR_HOMEPAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            // Property: No French content string should use informal "tu" form
            const informalFound = containsInformalTuForm(contentString);
            expect(informalFound).toBeNull();
            return informalFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("French product content should use 'vous' form, not 'tu' form", () => {
      const allStrings = extractAllStrings(FR_PRODUCT_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            const informalFound = containsInformalTuForm(contentString);
            expect(informalFound).toBeNull();
            return informalFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("French providers content should use 'vous' form, not 'tu' form", () => {
      const allStrings = extractAllStrings(FR_PROVIDERS_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            const informalFound = containsInformalTuForm(contentString);
            expect(informalFound).toBeNull();
            return informalFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("French about content should use 'vous' form, not 'tu' form", () => {
      const allStrings = extractAllStrings(FR_ABOUT_PAGE_CONTENT);

      fc.assert(
        fc.property(
          fc.constantFrom(...allStrings),
          (contentString) => {
            const informalFound = containsInformalTuForm(contentString);
            expect(informalFound).toBeNull();
            return informalFound === null;
          }
        ),
        { numRuns: Math.min(allStrings.length * 2, 100) }
      );
    });

    it("All French homepage strings use formal 'vous' form", () => {
      const allStrings = extractAllStrings(FR_HOMEPAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsInformalTuForm(s) !== null);

      expect(violatingStrings).toEqual([]);
    });

    it("All French product strings use formal 'vous' form", () => {
      const allStrings = extractAllStrings(FR_PRODUCT_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsInformalTuForm(s) !== null);

      expect(violatingStrings).toEqual([]);
    });

    it("All French providers strings use formal 'vous' form", () => {
      const allStrings = extractAllStrings(FR_PROVIDERS_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsInformalTuForm(s) !== null);

      expect(violatingStrings).toEqual([]);
    });

    it("All French about strings use formal 'vous' form", () => {
      const allStrings = extractAllStrings(FR_ABOUT_PAGE_CONTENT);
      const violatingStrings = allStrings.filter(s => containsInformalTuForm(s) !== null);

      expect(violatingStrings).toEqual([]);
    });
  });
});
