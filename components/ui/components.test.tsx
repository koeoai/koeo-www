import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { Button } from "./button";
import { Container } from "./container";
import { Section } from "./section";

/**
 * **Feature: koeo-marketing-website, Property 2: Components handle invalid props gracefully**
 * **Validates: Requirements 4.5**
 *
 * For any invalid or undefined prop value passed to UI components (Button, Container, Section),
 * the component should render with default styling without throwing an error or breaking the render tree.
 */
describe("UI Components - Property Tests for Invalid Props", () => {
  // Generate arbitrary values that could be passed as props
  const arbitraryValue = fc.oneof(
    fc.constant(undefined),
    fc.constant(null),
    fc.string(),
    fc.integer(),
    fc.boolean(),
    fc.constant("invalid-variant"),
    fc.constant("nonexistent"),
    fc.constant("")
  );

  it("Property 2: Button handles invalid variant props gracefully", () => {
    fc.assert(
      fc.property(arbitraryValue, (invalidVariant) => {
        // TypeScript would normally prevent this, but we're testing runtime behavior
        const { container } = render(
          <Button variant={invalidVariant as any}>Test Button</Button>
        );

        const button = container.querySelector("button");
        // Should render without throwing
        expect(button).toBeInTheDocument();
        // Should have base classes applied (defaults)
        expect(button?.className).toContain("inline-flex");
        expect(button?.className).toContain("rounded-full");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 2: Button handles invalid size props gracefully", () => {
    fc.assert(
      fc.property(arbitraryValue, (invalidSize) => {
        const { container } = render(
          <Button size={invalidSize as any}>Test Button</Button>
        );

        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        expect(button?.className).toContain("inline-flex");
        expect(button?.className).toContain("rounded-full");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 2: Container handles invalid className props gracefully", () => {
    fc.assert(
      fc.property(arbitraryValue, (invalidClassName) => {
        const { container } = render(
          <Container className={invalidClassName as any}>
            <div>Content</div>
          </Container>
        );

        const containerEl = container.firstChild as HTMLElement;
        expect(containerEl).toBeInTheDocument();
        // Should have base classes applied
        expect(containerEl?.className).toContain("mx-auto");
        expect(containerEl?.className).toContain("max-w-[1280px]");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 2: Section handles invalid background props gracefully", () => {
    fc.assert(
      fc.property(arbitraryValue, (invalidBackground) => {
        const { container } = render(
          <Section background={invalidBackground as any}>
            <div>Content</div>
          </Section>
        );

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
        // Should have base classes applied (vertical padding)
        expect(section?.className).toContain("py-16");
      }),
      { numRuns: 100 }
    );
  });
});
