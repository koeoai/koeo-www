import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import * as fc from "fast-check";
import { GlassCard } from "./glass-card";

/**
 * **Feature: codebase-refactor, Property 2: GlassCard renders correctly for all valid prop combinations**
 * **Validates: Requirements 7.1, 7.2**
 *
 * For any valid title string, optional description string, and children content,
 * the GlassCard component should render with the title visible, description visible
 * if provided, children rendered inside, and appropriate glass styling classes applied.
 */
describe("GlassCard Component - Property Tests", () => {
  // Arbitrary for non-empty alphanumeric strings (titles must be non-empty, no whitespace-only)
  const alphanumericChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const nonEmptyStringArb = fc
    .array(fc.constantFrom(...alphanumericChars.split('')), { minLength: 1, maxLength: 50 })
    .map((chars) => chars.join(''));

  // Arbitrary for optional description (can be undefined or non-empty string)
  const optionalDescriptionArb = fc.option(nonEmptyStringArb, { nil: undefined });

  // Arbitrary for children content (non-empty alphanumeric string)
  const childrenArb = fc
    .array(fc.constantFrom(...alphanumericChars.split('')), { minLength: 1, maxLength: 100 })
    .map((chars) => chars.join(''));

  // Arbitrary for optional className
  const optionalClassNameArb = fc.option(
    fc.constantFrom("custom-class", "test-class", "my-card"),
    { nil: undefined }
  );

  it("Property 2: GlassCard renders correctly for all valid prop combinations", () => {
    fc.assert(
      fc.property(
        nonEmptyStringArb,
        optionalDescriptionArb,
        childrenArb,
        optionalClassNameArb,
        (title, description, children, className) => {
          const { container, unmount } = render(
            <GlassCard
              title={title}
              description={description}
              className={className}
            >
              <div data-testid="children-content">{children}</div>
            </GlassCard>
          );

          // Verify title is rendered
          const heading = container.querySelector("h3");
          expect(heading).toBeInTheDocument();
          expect(heading?.textContent).toContain(title.trim());

          // Verify description is rendered if provided
          if (description !== undefined) {
            const descElement = container.querySelector("p");
            expect(descElement).toBeInTheDocument();
            expect(descElement?.textContent).toContain(description.trim());
          }

          // Verify children are rendered using within(container) to scope the query
          const childrenElement = within(container).getByTestId("children-content");
          expect(childrenElement).toBeInTheDocument();
          expect(childrenElement.textContent).toContain(children.trim());

          // Verify glass styling classes are applied
          const cardElement = container.firstChild as HTMLElement;
          expect(cardElement.className).toContain("rounded-2xl");
          expect(cardElement.className).toContain("backdrop-blur-xl");
          expect(cardElement.className).toContain("border");

          // Verify custom className is applied if provided
          if (className !== undefined) {
            expect(cardElement.className).toContain(className);
          }

          // Clean up for next iteration
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("Property 2: GlassCard without description renders correctly", () => {
    fc.assert(
      fc.property(nonEmptyStringArb, childrenArb, (title, children) => {
        const { container, unmount } = render(
          <GlassCard title={title}>
            <span>{children}</span>
          </GlassCard>
        );

        // Verify title is rendered
        const heading = container.querySelector("h3");
        expect(heading).toBeInTheDocument();
        expect(heading?.textContent).toContain(title.trim());

        // Verify no description paragraph exists (only the header section has p)
        const paragraphs = container.querySelectorAll("p");
        expect(paragraphs.length).toBe(0);

        // Verify children are rendered (use trim for whitespace normalization)
        expect(container.textContent).toContain(children.trim());

        // Clean up for next iteration
        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
