import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { Button } from "./button";

/**
 * **Feature: koeo-marketing-website, Property 1: Button renders correctly for all valid prop combinations**
 * **Validates: Requirements 4.1, 4.2**
 *
 * For any valid combination of variant ('default' | 'secondary' | 'ghost' | 'outline')
 * and size ('sm' | 'default' | 'lg'), the Button component should render without errors
 * and produce a valid React element with appropriate CSS classes applied.
 */
describe("Button Component - Property Tests", () => {
  const variants = ["default", "secondary", "ghost", "outline"] as const;
  const sizes = ["sm", "default", "lg"] as const;

  const variantArb = fc.constantFrom(...variants);
  const sizeArb = fc.constantFrom(...sizes);

  it("Property 1: Button renders correctly for all valid prop combinations", () => {
    fc.assert(
      fc.property(variantArb, sizeArb, (variant, size) => {
        const testText = "Test Button";
        const { container } = render(
          <Button variant={variant} size={size}>
            {testText}
          </Button>
        );

        const button = container.querySelector("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(testText);

        // Verify the button has classes from buttonVariants
        // Check that key classes are present (not all due to cn merging)
        expect(button?.className).toContain("inline-flex");
        expect(button?.className).toContain("rounded-full");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: Button with asChild renders correctly for all valid prop combinations", () => {
    fc.assert(
      fc.property(variantArb, sizeArb, (variant, size) => {
        const { container } = render(
          <Button variant={variant} size={size} asChild>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/test">Link Button</a>
          </Button>
        );

        const link = container.querySelector("a");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test");
        expect(link?.className).toContain("inline-flex");
        expect(link?.className).toContain("rounded-full");
      }),
      { numRuns: 100 }
    );
  });
});
