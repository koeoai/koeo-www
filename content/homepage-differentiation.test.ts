import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type {
  ExtendedHeroContent,
  ComparisonBlockContent,
} from "./types";
import { HERO_CONTENT as EN_HERO_CONTENT, COMPARISON_CONTENT as EN_COMPARISON_CONTENT } from "./en/homepage";
import { HERO_CONTENT as FR_HERO_CONTENT, COMPARISON_CONTENT as FR_COMPARISON_CONTENT } from "./fr/homepage";

/**
 * Homepage Differentiation Property Tests
 * 
 * These tests validate the correctness properties for the homepage differentiation
 * feature as defined in the design document.
 */

// Test both English and French content
const heroContents = [
  { locale: "en", content: EN_HERO_CONTENT as ExtendedHeroContent },
  { locale: "fr", content: FR_HERO_CONTENT as ExtendedHeroContent },
];

const comparisonContents = [
  { locale: "en", content: EN_COMPARISON_CONTENT as ComparisonBlockContent },
  { locale: "fr", content: FR_COMPARISON_CONTENT as ComparisonBlockContent },
];

describe("Homepage Differentiation - Property Tests", () => {
  /**
   * **Feature: homepage-differentiation, Property 1: Differentiator Line Presence**
   * **Validates: Requirements 1.1, 1.2, 1.3**
   * 
   * For any homepage content (English or French), the hero section SHALL contain
   * a non-empty differentiatorLine field that mentions routing, health checks, or failover.
   */
  describe("Property 1: Differentiator Line Presence", () => {
    // Arbitrary for valid differentiator line content
    const differentiatorLineArb = fc
      .string({ minLength: 10, maxLength: 500 })
      .filter((s) => s.trim().length > 0);

    heroContents.forEach(({ locale, content }) => {
      it(`[${locale}] differentiatorLine is non-empty and contains key terms (routing, health checks, or failover)`, () => {
        fc.assert(
          fc.property(differentiatorLineArb, () => {
            // Verify differentiatorLine exists and is non-empty
            expect(content.differentiatorLine).toBeDefined();
            expect(content.differentiatorLine.trim().length).toBeGreaterThan(0);
            
            // Verify it contains at least one key term (in English or French)
            const keyTerms = [
              "routing", "health check", "failover", "retries",
              "route", "routage", "health checks", "failover"
            ];
            const containsKeyTerm = keyTerms.some((term) =>
              content.differentiatorLine.toLowerCase().includes(term.toLowerCase())
            );
            expect(containsKeyTerm).toBe(true);
          }),
          { numRuns: 100 }
        );
      });
    });
  });
});


  /**
   * **Feature: homepage-differentiation, Property 2: Break Behavior Block Completeness**
   * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
   * 
   * For any homepage content (English or French), the breakBehavior block SHALL
   * contain exactly 3 items, each with non-empty text.
   */
  describe("Property 2: Break Behavior Block Completeness", () => {
    // Arbitrary for break behavior item text
    const breakBehaviorItemTextArb = fc
      .string({ minLength: 5, maxLength: 200 })
      .filter((s) => s.trim().length > 0);

    heroContents.forEach(({ locale, content }) => {
      it(`[${locale}] breakBehavior has label and exactly 3 items with non-empty text`, () => {
        fc.assert(
          fc.property(breakBehaviorItemTextArb, () => {
            // Verify breakBehavior exists
            expect(content.breakBehavior).toBeDefined();
            
            // Verify label is non-empty
            expect(content.breakBehavior.label).toBeDefined();
            expect(content.breakBehavior.label.trim().length).toBeGreaterThan(0);
            
            // Verify exactly 3 items
            expect(content.breakBehavior.items).toHaveLength(3);
            
            // Verify each item has non-empty text
            content.breakBehavior.items.forEach((item, index) => {
              expect(item.text, `Item ${index + 1} should have non-empty text`).toBeDefined();
              expect(item.text.trim().length, `Item ${index + 1} text should not be empty`).toBeGreaterThan(0);
            });
          }),
          { numRuns: 100 }
        );
      });
    });
  });


  /**
   * **Feature: homepage-differentiation, Property 3: Category Badge Presence**
   * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
   * 
   * For any homepage content (English or French), the categoryBadge SHALL
   * contain both a non-empty label and a non-empty definition.
   */
  describe("Property 3: Category Badge Presence", () => {
    // Arbitrary for category badge text
    const categoryBadgeTextArb = fc
      .string({ minLength: 3, maxLength: 100 })
      .filter((s) => s.trim().length > 0);

    heroContents.forEach(({ locale, content }) => {
      it(`[${locale}] categoryBadge has non-empty label and definition`, () => {
        fc.assert(
          fc.property(categoryBadgeTextArb, () => {
            // Verify categoryBadge exists
            expect(content.categoryBadge).toBeDefined();
            
            // Verify label is non-empty
            expect(content.categoryBadge.label).toBeDefined();
            expect(content.categoryBadge.label.trim().length).toBeGreaterThan(0);
            
            // Verify definition is non-empty
            expect(content.categoryBadge.definition).toBeDefined();
            expect(content.categoryBadge.definition.trim().length).toBeGreaterThan(0);
          }),
          { numRuns: 100 }
        );
      });
    });
  });


  /**
   * **Feature: homepage-differentiation, Property 4: Comparison Block Structure**
   * **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**
   * 
   * For any homepage comparison content (English or French), the comparison block
   * SHALL contain exactly 4 rows, with the last row having isKoeo set to true.
   */
  describe("Property 4: Comparison Block Structure", () => {
    // Arbitrary for comparison row text
    const comparisonRowTextArb = fc
      .string({ minLength: 5, maxLength: 200 })
      .filter((s) => s.trim().length > 0);

    comparisonContents.forEach(({ locale, content }) => {
      it(`[${locale}] comparison has 4 rows with last being Koeo`, () => {
        fc.assert(
          fc.property(comparisonRowTextArb, () => {
            // Verify comparison block exists
            expect(content).toBeDefined();
            
            // Verify heading is non-empty
            expect(content.heading).toBeDefined();
            expect(content.heading.trim().length).toBeGreaterThan(0);
            
            // Verify exactly 4 rows
            expect(content.rows).toHaveLength(4);
            
            // Verify each row has non-empty name and description
            content.rows.forEach((row, index) => {
              expect(row.name, `Row ${index + 1} should have non-empty name`).toBeDefined();
              expect(row.name.trim().length, `Row ${index + 1} name should not be empty`).toBeGreaterThan(0);
              expect(row.description, `Row ${index + 1} should have non-empty description`).toBeDefined();
              expect(row.description.trim().length, `Row ${index + 1} description should not be empty`).toBeGreaterThan(0);
            });
            
            // Verify last row is Koeo (isKoeo = true)
            const lastRow = content.rows[content.rows.length - 1];
            expect(lastRow.isKoeo).toBe(true);
            
            // Verify other rows are not marked as Koeo
            content.rows.slice(0, -1).forEach((row, index) => {
              expect(row.isKoeo, `Row ${index + 1} should not be marked as Koeo`).toBeFalsy();
            });
          }),
          { numRuns: 100 }
        );
      });
    });
  });
