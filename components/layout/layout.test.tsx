import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import * as fc from "fast-check";
import { Header } from "./header";
import { Footer } from "./footer";
import { KoeoLogo } from "@/components/ui/KoeoLogo";

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
  // KoeoLogo uses numeric sizes and showWordmark boolean
  const logoSizes = [24, 32, 48] as const;
  const showWordmarkOptions = [true, false] as const;
  const variantOptions = ["gradient", "white", "dark"] as const;

  const sizeArb = fc.constantFrom(...logoSizes);
  const showWordmarkArb = fc.constantFrom(...showWordmarkOptions);
  const variantArb = fc.constantFrom(...variantOptions);

  it("Property 4: Logo has aria-label for accessibility", () => {
    fc.assert(
      fc.property(sizeArb, showWordmarkArb, variantArb, (size, showWordmark, variant) => {
        const { container } = render(
          <KoeoLogo size={size} showWordmark={showWordmark} variant={variant} />
        );

        // The wrapper div should have role="img" and aria-label
        const logoWrapper = container.querySelector('[role="img"]');
        expect(logoWrapper).toBeInTheDocument();
        expect(logoWrapper).toHaveAttribute("aria-label");
        
        const ariaLabel = logoWrapper?.getAttribute("aria-label");
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

        // Find all elements with role="img" (KoeoLogo wrapper div)
        const imgElements = container.querySelectorAll('[role="img"]');
        
        imgElements.forEach((element) => {
          expect(element).toHaveAttribute("aria-label");
          const ariaLabel = element.getAttribute("aria-label");
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

        // Find all elements with role="img" (KoeoLogo wrapper div)
        const imgElements = container.querySelectorAll('[role="img"]');
        
        imgElements.forEach((element) => {
          expect(element).toHaveAttribute("aria-label");
          const ariaLabel = element.getAttribute("aria-label");
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel!.length).toBeGreaterThan(0);
        });
      }),
      { numRuns: 100 }
    );
  });
});
