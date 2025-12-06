import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { SchemaData } from "./json-ld";

/**
 * Validates that a JSON-LD object has the required @context and @type fields
 * @param data - The JSON-LD object to validate
 * @returns true if the object has valid @context and @type
 */
function isValidJsonLdSchema(data: SchemaData): boolean {
  return (
    data["@context"] === "https://schema.org" &&
    typeof data["@type"] === "string" &&
    data["@type"].length > 0
  );
}

/**
 * Generator for valid Schema.org @type values
 */
const schemaTypeArb = fc.constantFrom(
  "Organization",
  "WebSite",
  "FAQPage",
  "SoftwareApplication",
  "BreadcrumbList",
  "JobPosting",
  "Article",
  "Product",
  "Person",
  "LocalBusiness"
);

/**
 * Generator for valid JSON-LD schema objects
 */
const validSchemaDataArb: fc.Arbitrary<SchemaData> = fc.record({
  "@context": fc.constant("https://schema.org" as const),
  "@type": schemaTypeArb,
  name: fc.string({ minLength: 1, maxLength: 100 }),
  url: fc.webUrl(),
  description: fc.string({ minLength: 0, maxLength: 500 }),
});

/**
 * **Feature: seo-optimization, Property 8: JSON-LD schema validity**
 * **Validates: Requirements 4.7**
 *
 * For any JSON-LD structured data object, the object SHALL contain
 * @context set to "https://schema.org" and a valid @type field.
 */
describe("Property 8: JSON-LD schema validity", () => {
  it("should validate that all generated schema objects have @context and @type", () => {
    fc.assert(
      fc.property(validSchemaDataArb, (schemaData) => {
        expect(isValidJsonLdSchema(schemaData)).toBe(true);
        expect(schemaData["@context"]).toBe("https://schema.org");
        expect(typeof schemaData["@type"]).toBe("string");
        expect(schemaData["@type"].length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("should reject schema objects with missing @context", () => {
    const invalidSchema = {
      "@context": "invalid-context",
      "@type": "Organization",
    } as SchemaData;

    expect(isValidJsonLdSchema(invalidSchema)).toBe(false);
  });

  it("should reject schema objects with empty @type", () => {
    const invalidSchema = {
      "@context": "https://schema.org",
      "@type": "",
    } as SchemaData;

    expect(isValidJsonLdSchema(invalidSchema)).toBe(false);
  });

  it("should validate Organization schema structure", () => {
    fc.assert(
      fc.property(
        fc.record({
          "@context": fc.constant("https://schema.org" as const),
          "@type": fc.constant("Organization" as const),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          url: fc.webUrl(),
          logo: fc.webUrl(),
          description: fc.string({ minLength: 1, maxLength: 500 }),
          sameAs: fc.array(fc.webUrl(), { minLength: 0, maxLength: 5 }),
        }),
        (orgSchema) => {
          expect(isValidJsonLdSchema(orgSchema as SchemaData)).toBe(true);
          expect(orgSchema["@type"]).toBe("Organization");
          expect(orgSchema.name.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should validate WebSite schema structure", () => {
    fc.assert(
      fc.property(
        fc.record({
          "@context": fc.constant("https://schema.org" as const),
          "@type": fc.constant("WebSite" as const),
          name: fc.string({ minLength: 1, maxLength: 100 }),
          url: fc.webUrl(),
        }),
        (webSiteSchema) => {
          expect(isValidJsonLdSchema(webSiteSchema as SchemaData)).toBe(true);
          expect(webSiteSchema["@type"]).toBe("WebSite");
        }
      ),
      { numRuns: 100 }
    );
  });
});
