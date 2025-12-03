import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { FeatureCard } from "./feature-card";
import { AudienceTile } from "./audience-tile";
import { StepCard } from "./step-card";
import { SectionHeader } from "./section-header";

/**
 * **Feature: koeo-content-expansion, Property 1: Content components render title and description for all valid inputs**
 * **Validates: Requirements 2.4, 3.4, 4.4, 5.4**
 *
 * For any valid content component data (FeatureCard, AudienceTile, StepCard) with non-empty
 * title and description strings, the rendered output should contain both the title text
 * and description text.
 */
describe("Content Components - Property Tests", () => {
  // Arbitrary for alphanumeric strings without leading/trailing spaces
  // HTML normalizes whitespace, so we generate trimmed strings
  const validTextArb = fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9 ]*[a-zA-Z0-9]$/)
    .filter((s) => s.length >= 2 && s.length <= 50);
  const singleCharArb = fc.stringMatching(/^[a-zA-Z]$/);
  const textArb = fc.oneof(validTextArb, singleCharArb);
  const stepNumberArb = fc.integer({ min: 1, max: 100 });

  it("Property 1: FeatureCard renders title and description for all valid inputs", () => {
    fc.assert(
      fc.property(textArb, textArb, (title, description) => {
        const { container } = render(
          <FeatureCard title={title} description={description} />
        );

        const h3 = container.querySelector("h3");
        const p = container.querySelector("p");
        expect(h3?.textContent?.trim()).toBe(title.trim());
        expect(p?.textContent?.trim()).toBe(description.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: AudienceTile renders title and description for all valid inputs", () => {
    fc.assert(
      fc.property(textArb, textArb, (title, description) => {
        const { container } = render(
          <AudienceTile title={title} description={description} />
        );

        const h3 = container.querySelector("h3");
        const p = container.querySelector("p");
        expect(h3?.textContent?.trim()).toBe(title.trim());
        expect(p?.textContent?.trim()).toBe(description.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: StepCard renders step number, title and description for all valid inputs", () => {
    fc.assert(
      fc.property(
        stepNumberArb,
        textArb,
        textArb,
        (stepNumber, title, description) => {
          const { container } = render(
            <StepCard stepNumber={stepNumber} title={title} description={description} />
          );

          // The step number is in a nested div with rounded-full class
          const stepEl = container.querySelector(".bg-gradient-to-br.rounded-full");
          const h3 = container.querySelector("h3");
          const p = container.querySelector("p");
          expect(stepEl?.textContent?.trim()).toBe(String(stepNumber));
          expect(h3?.textContent?.trim()).toBe(title.trim());
          expect(p?.textContent?.trim()).toBe(description.trim());
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Property 1: SectionHeader renders heading for all valid inputs", () => {
    fc.assert(
      fc.property(textArb, (heading) => {
        const { container } = render(<SectionHeader heading={heading} />);

        const h2 = container.querySelector("h2");
        expect(h2?.textContent?.trim()).toBe(heading.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: SectionHeader renders heading and intro for all valid inputs", () => {
    fc.assert(
      fc.property(textArb, textArb, (heading, intro) => {
        const { container } = render(
          <SectionHeader heading={heading} intro={intro} />
        );

        const h2 = container.querySelector("h2");
        const p = container.querySelector("p");
        expect(h2?.textContent?.trim()).toBe(heading.trim());
        expect(p?.textContent?.trim()).toBe(intro.trim());
      }),
      { numRuns: 100 }
    );
  });
});


/**
 * **Feature: koeo-content-expansion, Property 5: className prop merges with default classes**
 * **Validates: Requirements 9.5**
 *
 * For any component that accepts a className prop, when a custom className is provided,
 * the rendered element should contain both the default component classes and the custom className.
 */
describe("Content Components - className Merging Property Tests", () => {
  // Arbitrary for valid CSS class names
  const classNameArb = fc.stringMatching(/^[a-z][a-z0-9-]*$/);

  it("Property 5: FeatureCard merges className with default classes", () => {
    fc.assert(
      fc.property(classNameArb, (customClass) => {
        const { container } = render(
          <FeatureCard
            title="Test"
            description="Test description"
            className={customClass}
          />
        );

        const card = container.firstChild as HTMLElement;
        expect(card.className).toContain(customClass);
        // Should also have default classes
        expect(card.className).toContain("rounded-2xl");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 5: AudienceTile merges className with default classes", () => {
    fc.assert(
      fc.property(classNameArb, (customClass) => {
        const { container } = render(
          <AudienceTile
            title="Test"
            description="Test description"
            className={customClass}
          />
        );

        const tile = container.firstChild as HTMLElement;
        expect(tile.className).toContain(customClass);
        expect(tile.className).toContain("rounded-2xl");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 5: StepCard merges className with default classes", () => {
    fc.assert(
      fc.property(classNameArb, (customClass) => {
        const { container } = render(
          <StepCard
            stepNumber={1}
            title="Test"
            description="Test description"
            className={customClass}
          />
        );

        const card = container.firstChild as HTMLElement;
        expect(card.className).toContain(customClass);
        expect(card.className).toContain("rounded-2xl");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 5: SectionHeader merges className with default classes", () => {
    fc.assert(
      fc.property(classNameArb, (customClass) => {
        const { container } = render(
          <SectionHeader heading="Test Heading" className={customClass} />
        );

        const header = container.firstChild as HTMLElement;
        expect(header.className).toContain(customClass);
        expect(header.className).toContain("text-center");
      }),
      { numRuns: 100 }
    );
  });
});
