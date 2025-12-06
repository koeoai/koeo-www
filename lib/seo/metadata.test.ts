import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  isValidTitleLength,
  isValidDescriptionLength,
  hasValidKeywords,
  validateMetadata,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  DESCRIPTION_MIN_LENGTH,
  DESCRIPTION_MAX_LENGTH,
} from "./metadata";

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
