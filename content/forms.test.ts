import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { getContent } from "./index";
import { i18nConfig, type Locale } from "@/lib/i18n/config";
import type {
  BetaFormContent,
  CareerFormContent,
  PartnerFormContent,
} from "./types";

/**
 * **Feature: i18n-support, Property 11: Form content localization**
 * **Validates: Requirements 7.1, 7.2, 7.3**
 *
 * For any form field, validation message, or option label, and for any supported locale,
 * the displayed text SHALL match the translation for that locale (or fallback to English).
 */

describe("Property 11: Form content localization", () => {
  // Arbitrary for supported locales
  const localeArb = fc.constantFrom(...i18nConfig.locales);

  describe("Beta form content localization", () => {
    it("should provide localized field labels for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<BetaFormContent>("BETA_FORM_CONTENT", locale);
          
          // All field labels should be non-empty strings
          expect(content.fields.fullName.label).toBeTruthy();
          expect(content.fields.email.label).toBeTruthy();
          expect(content.fields.role.label).toBeTruthy();
          expect(content.fields.segment.label).toBeTruthy();
          expect(content.fields.aiUseCase.label).toBeTruthy();
          expect(content.fields.workloadTypes.label).toBeTruthy();
          expect(content.fields.currentInfraSources.label).toBeTruthy();
          expect(content.fields.monthlySpend.label).toBeTruthy();
          expect(content.fields.workflow.label).toBeTruthy();
          expect(content.fields.topPainPoints.label).toBeTruthy();
          expect(content.fields.painNotes.label).toBeTruthy();
          expect(content.fields.mostValuableFeatures.label).toBeTruthy();
          expect(content.fields.anythingElse.label).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it("should provide localized validation messages for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<BetaFormContent>("BETA_FORM_CONTENT", locale);
          
          // All validation messages should be non-empty strings
          expect(content.validation.required).toBeTruthy();
          expect(content.validation.email).toBeTruthy();
          expect(content.validation.invalidEmail).toBeTruthy();
          expect(content.validation.selectOne).toBeTruthy();
          expect(content.validation.selectAtLeastOne).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it("should provide localized option labels for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<BetaFormContent>("BETA_FORM_CONTENT", locale);
          
          // All option arrays should have items with non-empty labels
          expect(content.options.roles.length).toBeGreaterThan(0);
          content.options.roles.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.segments.length).toBeGreaterThan(0);
          content.options.segments.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.workloadTypes.length).toBeGreaterThan(0);
          content.options.workloadTypes.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.painPoints.length).toBeGreaterThan(0);
          content.options.painPoints.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });
        }),
        { numRuns: 100 }
      );
    });

    it("should preserve option values across locales (values are locale-independent)", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<BetaFormContent>("BETA_FORM_CONTENT", locale);
          const englishContent = getContent<BetaFormContent>("BETA_FORM_CONTENT", "en" as Locale);
          
          // Option values should be the same across locales (only labels change)
          const localeRoleValues = content.options.roles.map((o) => o.value);
          const englishRoleValues = englishContent.options.roles.map((o) => o.value);
          expect(localeRoleValues).toEqual(englishRoleValues);

          const localeSegmentValues = content.options.segments.map((o) => o.value);
          const englishSegmentValues = englishContent.options.segments.map((o) => o.value);
          expect(localeSegmentValues).toEqual(englishSegmentValues);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Career form content localization", () => {
    it("should provide localized field labels for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<CareerFormContent>("CAREER_FORM_CONTENT", locale);
          
          // All field labels should be non-empty strings
          expect(content.fields.fullName.label).toBeTruthy();
          expect(content.fields.email.label).toBeTruthy();
          expect(content.fields.phone.label).toBeTruthy();
          expect(content.fields.linkedIn.label).toBeTruthy();
          expect(content.fields.portfolio.label).toBeTruthy();
          expect(content.fields.currentRole.label).toBeTruthy();
          expect(content.fields.yearsExperience.label).toBeTruthy();
          expect(content.fields.areasOfInterest.label).toBeTruthy();
          expect(content.fields.whyKoeo.label).toBeTruthy();
          expect(content.fields.whatYouBring.label).toBeTruthy();
          expect(content.fields.resume.label).toBeTruthy();
          expect(content.fields.anythingElse.label).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it("should provide localized validation messages for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<CareerFormContent>("CAREER_FORM_CONTENT", locale);
          
          // All validation messages should be non-empty strings
          expect(content.validation.required).toBeTruthy();
          expect(content.validation.email).toBeTruthy();
          expect(content.validation.invalidEmail).toBeTruthy();
          expect(content.validation.fileType).toBeTruthy();
          expect(content.validation.fileSize).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it("should provide localized option labels for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<CareerFormContent>("CAREER_FORM_CONTENT", locale);
          
          // All option arrays should have items with non-empty labels
          expect(content.options.experience.length).toBeGreaterThan(0);
          content.options.experience.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.interests.length).toBeGreaterThan(0);
          content.options.interests.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Partner form content localization", () => {
    it("should provide localized field labels for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<PartnerFormContent>("PARTNER_FORM_CONTENT", locale);
          
          // All field labels should be non-empty strings
          expect(content.fields.partnerName.label).toBeTruthy();
          expect(content.fields.website.label).toBeTruthy();
          expect(content.fields.countryRegion.label).toBeTruthy();
          expect(content.fields.cityLocation.label).toBeTruthy();
          expect(content.fields.contactName.label).toBeTruthy();
          expect(content.fields.contactRole.label).toBeTruthy();
          expect(content.fields.contactEmail.label).toBeTruthy();
          expect(content.fields.contactPhone.label).toBeTruthy();
          expect(content.fields.partnershipType.label).toBeTruthy();
          expect(content.fields.capacityMw.label).toBeTruthy();
          expect(content.fields.supportedPlatforms.label).toBeTruthy();
          expect(content.fields.aiReadiness.label).toBeTruthy();
          expect(content.fields.infraDetails.label).toBeTruthy();
          expect(content.fields.onboardingTimeline.label).toBeTruthy();
          expect(content.fields.goals.label).toBeTruthy();
          expect(content.fields.preferredNextStep.label).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it("should provide localized validation messages for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<PartnerFormContent>("PARTNER_FORM_CONTENT", locale);
          
          // All validation messages should be non-empty strings
          expect(content.validation.required).toBeTruthy();
          expect(content.validation.email).toBeTruthy();
          expect(content.validation.invalidEmail).toBeTruthy();
          expect(content.validation.selectOne).toBeTruthy();
          expect(content.validation.selectAtLeastOne).toBeTruthy();
        }),
        { numRuns: 100 }
      );
    });

    it("should provide localized option labels for all locales", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<PartnerFormContent>("PARTNER_FORM_CONTENT", locale);
          
          // All option arrays should have items with non-empty labels
          expect(content.options.partnershipTypes.length).toBeGreaterThan(0);
          content.options.partnershipTypes.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.supportedPlatforms.length).toBeGreaterThan(0);
          content.options.supportedPlatforms.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.aiReadiness.length).toBeGreaterThan(0);
          content.options.aiReadiness.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.onboardingTimeline.length).toBeGreaterThan(0);
          content.options.onboardingTimeline.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });

          expect(content.options.preferredNextStep.length).toBeGreaterThan(0);
          content.options.preferredNextStep.forEach((option) => {
            expect(option.label).toBeTruthy();
            expect(option.value).toBeTruthy();
          });
        }),
        { numRuns: 100 }
      );
    });

    it("should preserve option values across locales (values are locale-independent)", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<PartnerFormContent>("PARTNER_FORM_CONTENT", locale);
          const englishContent = getContent<PartnerFormContent>("PARTNER_FORM_CONTENT", "en" as Locale);
          
          // Option values should be the same across locales (only labels change)
          const localePartnershipValues = content.options.partnershipTypes.map((o) => o.value);
          const englishPartnershipValues = englishContent.options.partnershipTypes.map((o) => o.value);
          expect(localePartnershipValues).toEqual(englishPartnershipValues);

          const localePlatformValues = content.options.supportedPlatforms.map((o) => o.value);
          const englishPlatformValues = englishContent.options.supportedPlatforms.map((o) => o.value);
          expect(localePlatformValues).toEqual(englishPlatformValues);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Form content structure consistency", () => {
    it("should have consistent structure across all locales for beta form", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<BetaFormContent>("BETA_FORM_CONTENT", locale);
          
          // Structure should be complete
          expect(content.heading).toBeTruthy();
          expect(content.sections).toBeDefined();
          expect(content.fields).toBeDefined();
          expect(content.options).toBeDefined();
          expect(content.validation).toBeDefined();
          expect(content.buttons).toBeDefined();
          expect(content.status).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it("should have consistent structure across all locales for career form", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<CareerFormContent>("CAREER_FORM_CONTENT", locale);
          
          // Structure should be complete
          expect(content.sections).toBeDefined();
          expect(content.fields).toBeDefined();
          expect(content.options).toBeDefined();
          expect(content.validation).toBeDefined();
          expect(content.buttons).toBeDefined();
          expect(content.status).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it("should have consistent structure across all locales for partner form", () => {
      fc.assert(
        fc.property(localeArb, (locale) => {
          const content = getContent<PartnerFormContent>("PARTNER_FORM_CONTENT", locale);
          
          // Structure should be complete
          expect(content.heading).toBeTruthy();
          expect(content.subheading).toBeTruthy();
          expect(content.sections).toBeDefined();
          expect(content.fields).toBeDefined();
          expect(content.options).toBeDefined();
          expect(content.validation).toBeDefined();
          expect(content.buttons).toBeDefined();
          expect(content.status).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });
  });
});
