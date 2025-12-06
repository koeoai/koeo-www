import { describe, it, expect } from "vitest";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFAQPageSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
} from "./structured-data";
import { seoConfig } from "./config";

/**
 * Unit tests for structured data generators
 * **Validates: Requirements 4.7**
 */

describe("generateOrganizationSchema", () => {
  it("should generate valid Organization schema with default values", () => {
    const schema = generateOrganizationSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe(seoConfig.siteName);
    expect(schema.url).toBe(seoConfig.siteUrl);
    expect(schema.logo).toContain(seoConfig.siteUrl);
    expect(schema.description).toBe(seoConfig.defaultDescription);
    expect(schema.sameAs).toEqual(seoConfig.socialProfiles);
  });

  it("should allow custom values to override defaults", () => {
    const customOptions = {
      name: "Custom Name",
      url: "https://custom.example.com",
      logo: "https://custom.example.com/logo.png",
      description: "Custom description",
      sameAs: ["https://twitter.com/custom"],
    };

    const schema = generateOrganizationSchema(customOptions);

    expect(schema.name).toBe(customOptions.name);
    expect(schema.url).toBe(customOptions.url);
    expect(schema.logo).toBe(customOptions.logo);
    expect(schema.description).toBe(customOptions.description);
    expect(schema.sameAs).toEqual(customOptions.sameAs);
  });

  it("should include contactPoint when contactEmail is provided", () => {
    const schema = generateOrganizationSchema({
      contactEmail: "support@koeo.ai",
    });

    expect(schema.contactPoint).toBeDefined();
    expect(schema.contactPoint?.["@type"]).toBe("ContactPoint");
    expect(schema.contactPoint?.contactType).toBe("customer support");
    expect(schema.contactPoint?.email).toBe("support@koeo.ai");
  });


  it("should not include contactPoint when contactEmail is not provided", () => {
    const schema = generateOrganizationSchema();

    expect(schema.contactPoint).toBeUndefined();
  });
});

describe("generateWebSiteSchema", () => {
  it("should generate valid WebSite schema with default values", () => {
    const schema = generateWebSiteSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.name).toBe(seoConfig.siteName);
    expect(schema.url).toBe(seoConfig.siteUrl);
  });

  it("should allow custom values to override defaults", () => {
    const customOptions = {
      name: "Custom Site",
      url: "https://custom.example.com",
    };

    const schema = generateWebSiteSchema(customOptions);

    expect(schema.name).toBe(customOptions.name);
    expect(schema.url).toBe(customOptions.url);
  });

  it("should include potentialAction when includeSearchAction is true", () => {
    const schema = generateWebSiteSchema({ includeSearchAction: true });

    expect(schema.potentialAction).toBeDefined();
    expect(schema.potentialAction?.["@type"]).toBe("SearchAction");
    expect(schema.potentialAction?.target).toContain(seoConfig.siteUrl);
    expect(schema.potentialAction?.["query-input"]).toBe(
      "required name=search_term_string"
    );
  });

  it("should use custom searchActionTarget when provided", () => {
    const customTarget = "https://custom.example.com/search?q={search_term_string}";
    const schema = generateWebSiteSchema({
      includeSearchAction: true,
      searchActionTarget: customTarget,
    });

    expect(schema.potentialAction?.target).toBe(customTarget);
  });

  it("should not include potentialAction when includeSearchAction is false", () => {
    const schema = generateWebSiteSchema({ includeSearchAction: false });

    expect(schema.potentialAction).toBeUndefined();
  });
});

describe("generateFAQPageSchema", () => {
  it("should generate valid FAQPage schema with @context and @type", () => {
    const items = [
      { question: "What is Koeo?", answer: "Koeo is an AI inference platform." },
    ];

    const schema = generateFAQPageSchema(items);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
  });

  it("should correctly format FAQ items as Question/Answer pairs", () => {
    const items = [
      { question: "Question 1?", answer: "Answer 1" },
      { question: "Question 2?", answer: "Answer 2" },
    ];

    const schema = generateFAQPageSchema(items);

    expect(schema.mainEntity).toHaveLength(2);

    schema.mainEntity.forEach((entity, index) => {
      expect(entity["@type"]).toBe("Question");
      expect(entity.name).toBe(items[index].question);
      expect(entity.acceptedAnswer["@type"]).toBe("Answer");
      expect(entity.acceptedAnswer.text).toBe(items[index].answer);
    });
  });

  it("should handle empty FAQ items array", () => {
    const schema = generateFAQPageSchema([]);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(0);
  });
});


describe("generateSoftwareApplicationSchema", () => {
  it("should generate valid SoftwareApplication schema with default values", () => {
    const schema = generateSoftwareApplicationSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.name).toBe("Koeo Inference Runtime");
    expect(schema.applicationCategory).toBe("DeveloperApplication");
    expect(schema.operatingSystem).toBe("Cloud");
    expect(schema.description).toBeDefined();
  });

  it("should allow custom values to override defaults", () => {
    const customOptions = {
      name: "Custom App",
      description: "Custom description",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    };

    const schema = generateSoftwareApplicationSchema(customOptions);

    expect(schema.name).toBe(customOptions.name);
    expect(schema.description).toBe(customOptions.description);
    expect(schema.applicationCategory).toBe(customOptions.applicationCategory);
    expect(schema.operatingSystem).toBe(customOptions.operatingSystem);
  });

  it("should include offers when price is provided", () => {
    const schema = generateSoftwareApplicationSchema({
      price: "0",
      priceCurrency: "USD",
    });

    expect(schema.offers).toBeDefined();
    expect(schema.offers?.["@type"]).toBe("Offer");
    expect(schema.offers?.price).toBe("0");
    expect(schema.offers?.priceCurrency).toBe("USD");
  });

  it("should use default currency when only price is provided", () => {
    const schema = generateSoftwareApplicationSchema({ price: "99" });

    expect(schema.offers?.priceCurrency).toBe("USD");
  });

  it("should not include offers when price is not provided", () => {
    const schema = generateSoftwareApplicationSchema();

    expect(schema.offers).toBeUndefined();
  });
});

describe("generateBreadcrumbSchema", () => {
  it("should generate valid BreadcrumbList schema with @context and @type", () => {
    const items = [{ name: "Home", url: "/" }];

    const schema = generateBreadcrumbSchema(items);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("should correctly format breadcrumb items with positions", () => {
    const items = [
      { name: "Home", url: "/" },
      { name: "Product", url: "/product" },
      { name: "Features", url: "/product/features" },
    ];

    const schema = generateBreadcrumbSchema(items);

    expect(schema.itemListElement).toHaveLength(3);

    schema.itemListElement.forEach((element, index) => {
      expect(element["@type"]).toBe("ListItem");
      expect(element.position).toBe(index + 1);
      expect(element.name).toBe(items[index].name);
    });
  });

  it("should prepend site URL to relative paths", () => {
    const items = [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ];

    const schema = generateBreadcrumbSchema(items);

    expect(schema.itemListElement[0].item).toBe(`${seoConfig.siteUrl}/`);
    expect(schema.itemListElement[1].item).toBe(`${seoConfig.siteUrl}/about`);
  });

  it("should preserve absolute URLs", () => {
    const items = [
      { name: "External", url: "https://external.example.com/page" },
    ];

    const schema = generateBreadcrumbSchema(items);

    expect(schema.itemListElement[0].item).toBe(
      "https://external.example.com/page"
    );
  });

  it("should handle empty breadcrumb items array", () => {
    const schema = generateBreadcrumbSchema([]);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(0);
  });
});
