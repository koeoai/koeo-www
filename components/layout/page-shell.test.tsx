import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import * as fc from "fast-check";
import { PageShell } from "./page-shell";

/**
 * **Feature: codebase-refactor, Property 1: PageShell renders correctly for all valid prop combinations**
 * **Validates: Requirements 1.1, 1.2**
 *
 * For any valid children content and optional className string, the PageShell component
 * should render a structure containing Header, main element with the children, and Footer
 * in that order, with the className applied to the main element.
 */
describe("PageShell - Property Tests", () => {
  // Arbitrary for generating valid className strings (Tailwind-like classes)
  const classNameArb = fc.oneof(
    fc.constant(undefined),
    fc.constant(""),
    fc.constant("bg-purple-500"),
    fc.constant("relative flex-1 overflow-hidden"),
    fc.constant("bg-[#7C3AED]"),
    fc.stringMatching(/^[a-z][a-z0-9-]*$/).filter((s) => s.length > 0 && s.length < 50)
  );

  // Arbitrary for generating valid children content
  const childrenTextArb = fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0);

  it("Property 1: PageShell renders Header, main with children, and Footer in correct order", () => {
    fc.assert(
      fc.property(childrenTextArb, classNameArb, (childText, className) => {
        // Clean up before each iteration to avoid multiple elements
        cleanup();

        const { container } = render(
          <PageShell className={className}>
            <div data-testid="test-child">{childText}</div>
          </PageShell>
        );

        // Verify the root structure has flex min-h-screen layout
        const rootDiv = container.firstElementChild;
        expect(rootDiv).toHaveClass("flex", "min-h-screen", "flex-col");

        // Verify Header is present (header element exists)
        const header = container.querySelector("header");
        expect(header).toBeInTheDocument();

        // Verify main element is present with flex-1 class
        const main = container.querySelector("main");
        expect(main).toBeInTheDocument();
        expect(main).toHaveClass("flex-1");

        // Verify className is applied to main when provided
        if (className && className.trim().length > 0) {
          className.split(" ").forEach((cls) => {
            if (cls.trim()) {
              expect(main).toHaveClass(cls.trim());
            }
          });
        }

        // Verify children are rendered inside main
        const testChild = container.querySelector('[data-testid="test-child"]');
        expect(testChild).toBeInTheDocument();
        expect(testChild?.textContent).toBe(childText);
        expect(main).toContainElement(testChild);

        // Verify Footer is present (footer element exists)
        const footer = container.querySelector("footer");
        expect(footer).toBeInTheDocument();

        // Verify order: header comes before main, main comes before footer
        const allElements = Array.from(rootDiv?.children || []);
        const headerIndex = allElements.findIndex((el) => el.tagName === "HEADER");
        const mainIndex = allElements.findIndex((el) => el.tagName === "MAIN");
        const footerIndex = allElements.findIndex((el) => el.tagName === "FOOTER");

        expect(headerIndex).toBeLessThan(mainIndex);
        expect(mainIndex).toBeLessThan(footerIndex);
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: PageShell maintains flex min-h-screen layout for any children", () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        cleanup();

        const { container } = render(
          <PageShell>
            <section>Test Section</section>
          </PageShell>
        );

        const rootDiv = container.firstElementChild;
        expect(rootDiv).toHaveClass("flex");
        expect(rootDiv).toHaveClass("min-h-screen");
        expect(rootDiv).toHaveClass("flex-col");
      }),
      { numRuns: 100 }
    );
  });

  it("Property 1: PageShell applies rootClassName to root div", () => {
    const rootClassNameArb = fc.oneof(
      fc.constant(undefined),
      fc.constant("bg-purple-500"),
      fc.constant("bg-[#7C3AED]")
    );

    fc.assert(
      fc.property(rootClassNameArb, (rootClassName) => {
        cleanup();

        const { container } = render(
          <PageShell rootClassName={rootClassName}>
            <section>Test Section</section>
          </PageShell>
        );

        const rootDiv = container.firstElementChild;
        expect(rootDiv).toHaveClass("flex", "min-h-screen", "flex-col");

        if (rootClassName && rootClassName.trim().length > 0) {
          expect(rootDiv).toHaveClass(rootClassName);
        }
      }),
      { numRuns: 100 }
    );
  });
});
