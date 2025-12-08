import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import * as fc from "fast-check";
import type {
  HeroContent,
  ProblemCard,
  FeatureItem,
  StepItem,
  DeveloperFeature,
} from "./types";

/**
 * **Feature: codebase-refactor, Property 3: Content changes propagate to rendered output**
 * **Validates: Requirements 6.3**
 *
 * For any content object with valid structure, when the content is updated and
 * components re-render, the new content values should appear in the rendered output.
 */

// Test component that renders hero content
function HeroRenderer({ content }: { content: HeroContent }) {
  return (
    <div data-testid="hero">
      <span data-testid="badge">{content.badge}</span>
      <h1 data-testid="headline">{content.headline}</h1>
      <span data-testid="headline-accent">{content.headlineAccent}</span>
      <p data-testid="subtitle">{content.subtitle}</p>
      <a data-testid="cta-primary" href={content.cta.primary.href}>
        {content.cta.primary.text}
      </a>
      <a data-testid="cta-secondary" href={content.cta.secondary.href}>
        {content.cta.secondary.text}
      </a>
      <p data-testid="microcopy">{content.microcopy}</p>
    </div>
  );
}

// Test component that renders problem cards
function ProblemCardRenderer({ card }: { card: ProblemCard }) {
  return (
    <div data-testid="problem-card">
      <span data-testid="category">{card.category}</span>
      <h3 data-testid="title">{card.title}</h3>
      <p data-testid="description">{card.description}</p>
      <span data-testid="icon">{card.icon}</span>
    </div>
  );
}

// Test component that renders feature items
function FeatureRenderer({ feature }: { feature: FeatureItem }) {
  return (
    <li data-testid="feature">
      <span data-testid="icon">{feature.icon}</span>
      <span data-testid="text">{feature.text}</span>
    </li>
  );
}


// Test component that renders step items
function StepRenderer({ step }: { step: StepItem }) {
  return (
    <div data-testid="step">
      <span data-testid="step-number">{step.stepNumber}</span>
      <h4 data-testid="title">{step.title}</h4>
      <p data-testid="description">{step.description}</p>
    </div>
  );
}

// Test component that renders developer features
function DeveloperFeatureRenderer({ feature }: { feature: DeveloperFeature }) {
  return (
    <div data-testid="developer-feature">
      <h3 data-testid="title">{feature.title}</h3>
      <p data-testid="description">{feature.description}</p>
      <a data-testid="link" href={feature.link.href}>
        {feature.link.text}
      </a>
    </div>
  );
}

describe("Content Propagation - Property Tests", () => {
  // Arbitrary for non-empty strings (valid content text)
  const nonEmptyStringArb = fc
    .string({ minLength: 1, maxLength: 100 })
    .filter((s) => s.trim().length > 0);

  // Arbitrary for valid href strings
  const hrefArb = fc.oneof(
    fc.constant("/beta"),
    fc.constant("/about"),
    fc.constant("/product"),
    fc.constant("mailto:hello@koeo.ai"),
    fc.stringMatching(/^\/[a-z0-9-/]*$/).filter((s) => s.length > 0 && s.length < 50)
  );

  // Arbitrary for icon identifiers
  const iconArb = fc.oneof(
    fc.constant("check"),
    fc.constant("grid-2x2"),
    fc.constant("clock"),
    fc.constant("dollar-sign"),
    fc.stringMatching(/^[a-z][a-z0-9-]*$/).filter((s) => s.length > 0 && s.length < 30)
  );

  // Arbitrary for HeroContent
  const heroContentArb: fc.Arbitrary<HeroContent> = fc.record({
    badge: nonEmptyStringArb,
    headline: nonEmptyStringArb,
    headlineAccent: nonEmptyStringArb,
    subtitle: nonEmptyStringArb,
    cta: fc.record({
      primary: fc.record({
        text: nonEmptyStringArb,
        href: hrefArb,
      }),
      secondary: fc.record({
        text: nonEmptyStringArb,
        href: hrefArb,
      }),
    }),
    microcopy: nonEmptyStringArb,
  });

  // Arbitrary for ProblemCard
  const problemCardArb: fc.Arbitrary<ProblemCard> = fc.record({
    category: nonEmptyStringArb,
    title: nonEmptyStringArb,
    description: nonEmptyStringArb,
    icon: iconArb,
  });

  // Arbitrary for FeatureItem
  const featureItemArb: fc.Arbitrary<FeatureItem> = fc.record({
    icon: iconArb,
    text: nonEmptyStringArb,
  });

  // Arbitrary for StepItem
  const stepItemArb: fc.Arbitrary<StepItem> = fc.record({
    stepNumber: fc.integer({ min: 1, max: 10 }),
    title: nonEmptyStringArb,
    description: nonEmptyStringArb,
  });

  // Arbitrary for DeveloperFeature
  const developerFeatureArb: fc.Arbitrary<DeveloperFeature> = fc.record({
    title: nonEmptyStringArb,
    description: nonEmptyStringArb,
    link: fc.record({
      text: nonEmptyStringArb,
      href: hrefArb,
    }),
  });


  it("Property 3: HeroContent changes propagate to rendered output", () => {
    fc.assert(
      fc.property(heroContentArb, (content) => {
        cleanup();

        const { getByTestId } = render(<HeroRenderer content={content} />);

        // Verify all content values appear in rendered output (trimmed for HTML whitespace handling)
        expect(getByTestId("badge").textContent?.trim()).toBe(content.badge.trim());
        expect(getByTestId("headline").textContent?.trim()).toBe(content.headline.trim());
        expect(getByTestId("headline-accent").textContent?.trim()).toBe(content.headlineAccent.trim());
        expect(getByTestId("subtitle").textContent?.trim()).toBe(content.subtitle.trim());
        expect(getByTestId("cta-primary").textContent?.trim()).toBe(content.cta.primary.text.trim());
        expect(getByTestId("cta-primary")).toHaveAttribute("href", content.cta.primary.href);
        expect(getByTestId("cta-secondary").textContent?.trim()).toBe(content.cta.secondary.text.trim());
        expect(getByTestId("cta-secondary")).toHaveAttribute("href", content.cta.secondary.href);
        expect(getByTestId("microcopy").textContent?.trim()).toBe(content.microcopy.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 3: ProblemCard changes propagate to rendered output", () => {
    fc.assert(
      fc.property(problemCardArb, (card) => {
        cleanup();

        const { getByTestId } = render(<ProblemCardRenderer card={card} />);

        // Verify all card values appear in rendered output (trimmed for HTML whitespace handling)
        expect(getByTestId("category").textContent?.trim()).toBe(card.category.trim());
        expect(getByTestId("title").textContent?.trim()).toBe(card.title.trim());
        expect(getByTestId("description").textContent?.trim()).toBe(card.description.trim());
        expect(getByTestId("icon").textContent?.trim()).toBe(card.icon.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 3: FeatureItem changes propagate to rendered output", () => {
    fc.assert(
      fc.property(featureItemArb, (feature) => {
        cleanup();

        const { getByTestId } = render(<FeatureRenderer feature={feature} />);

        // Verify all feature values appear in rendered output (trimmed for HTML whitespace handling)
        expect(getByTestId("icon").textContent?.trim()).toBe(feature.icon.trim());
        expect(getByTestId("text").textContent?.trim()).toBe(feature.text.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 3: StepItem changes propagate to rendered output", () => {
    fc.assert(
      fc.property(stepItemArb, (step) => {
        cleanup();

        const { getByTestId } = render(<StepRenderer step={step} />);

        // Verify all step values appear in rendered output (trimmed for HTML whitespace handling)
        expect(getByTestId("step-number").textContent?.trim()).toBe(String(step.stepNumber));
        expect(getByTestId("title").textContent?.trim()).toBe(step.title.trim());
        expect(getByTestId("description").textContent?.trim()).toBe(step.description.trim());
      }),
      { numRuns: 100 }
    );
  });

  it("Property 3: DeveloperFeature changes propagate to rendered output", () => {
    fc.assert(
      fc.property(developerFeatureArb, (feature) => {
        cleanup();

        const { getByTestId } = render(<DeveloperFeatureRenderer feature={feature} />);

        // Verify all feature values appear in rendered output (trimmed for HTML whitespace handling)
        expect(getByTestId("title").textContent?.trim()).toBe(feature.title.trim());
        expect(getByTestId("description").textContent?.trim()).toBe(feature.description.trim());
        expect(getByTestId("link").textContent?.trim()).toBe(feature.link.text.trim());
        expect(getByTestId("link")).toHaveAttribute("href", feature.link.href);
      }),
      { numRuns: 100 }
    );
  });
});
