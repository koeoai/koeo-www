import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { Header } from "./header";
import { Footer } from "./footer";
import { Logo } from "@/components/ui/logo";

/**
 * **Feature: koeo-marketing-website, Property 3: Interactive elements have ARIA attributes**
 * **Validates: Requirements 8.1**
 *
 * For any interactive element (buttons, links, navigation items) rendered by the components,
 * the element should include appropriate ARIA labels or roles for accessibility.
 */
describe("Layout Components - Property Tests for Accessibility", () => {
  it("Property 3: Header interactive elements have ARIA attributes", () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const { container } = render(<Header />);

        // Check navigation has aria-label
        const navElements = container.querySelectorAll("nav");
        navElements.forEach((nav) => {
          expect(nav).toHaveAttribute("aria-label");
        });

        // Check mobile menu button has aria-label
        const menuButton = container.querySelector('button[aria-label="Open menu"]');
        expect(menuButton).toBeInTheDocument();
        expect(menuButton).toHaveAttribute("aria-expanded");

        // Check logo link has aria-label
        const logoLink = container.querySelector('a[aria-label="Koeo home"]');
        expect(logoLink).toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  });

  it("Property 3: Footer interactive elements have proper structure", () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const { container } = render(<Footer />);

        // Check logo link has aria-label
        const logoLink = container.querySelector('a[aria-label="Koeo home"]');
        expect(logoLink).toBeInTheDocument();

        // Check link lists have role="list"
        const lists = container.querySelectorAll('ul[role="list"]');
        expect(lists.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

});

/**
 * **Feature: koeo-marketing-website, Property 4: Images have alt text**
 * **Validates: Requirements 8.2**
 *
 * For any image element rendered by the components, the element should include
 * a non-empty alt attribute describing the image content.
 */
describe("Layout Components - Property Tests for Image Alt Text", () => {
  const logoSizes = ["sm", "default", "lg"] as const;
  const showTextOptions = [true, false] as const;

  const sizeArb = fc.constantFrom(...logoSizes);
  const showTextArb = fc.constantFrom(...showTextOptions);

  it("Property 4: Logo SVG has aria-label for accessibility", () => {
    fc.assert(
      fc.property(sizeArb, showTextArb, (size, showText) => {
        const { container } = render(<Logo size={size} showText={showText} />);

        // SVG should have role="img" and aria-label
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute("role", "img");
        expect(svg).toHaveAttribute("aria-label");
        
        const ariaLabel = svg?.getAttribute("aria-label");
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel!.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("Property 4: Header Logo has accessible alt text", () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const { container } = render(<Header />);

        // Find all SVG elements with role="img"
        const svgImages = container.querySelectorAll('svg[role="img"]');
        
        svgImages.forEach((svg) => {
          expect(svg).toHaveAttribute("aria-label");
          const ariaLabel = svg.getAttribute("aria-label");
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel!.length).toBeGreaterThan(0);
        });
      }),
      { numRuns: 100 }
    );
  });

  it("Property 4: Footer Logo has accessible alt text", () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const { container } = render(<Footer />);

        // Find all SVG elements with role="img"
        const svgImages = container.querySelectorAll('svg[role="img"]');
        
        svgImages.forEach((svg) => {
          expect(svg).toHaveAttribute("aria-label");
          const ariaLabel = svg.getAttribute("aria-label");
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel!.length).toBeGreaterThan(0);
        });
      }),
      { numRuns: 100 }
    );
  });
});
