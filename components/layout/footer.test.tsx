import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import { Footer } from "./footer";

/**
 * Helper function to check if a URL is external (starts with http:// or https://)
 */
function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Helper function to validate external link has proper security attributes
 */
function hasSecurityAttributes(element: HTMLAnchorElement): boolean {
  const rel = element.getAttribute("rel");
  return rel !== null && rel.includes("noopener") && rel.includes("noreferrer");
}

/**
 * **Feature: seo-optimization, Property 9: External link security attributes**
 * **Validates: Requirements 5.5**
 *
 * For any external link rendered by the application, the link SHALL include
 * rel="noopener noreferrer" attributes.
 */
describe("Property 9: External link security attributes", () => {
  it("should ensure all external links in Footer have rel='noopener noreferrer'", () => {
    render(<Footer />);

    // Get all anchor elements
    const allLinks = document.querySelectorAll("a");

    // Filter to external links only
    const externalLinks = Array.from(allLinks).filter((link) =>
      isExternalUrl(link.getAttribute("href") || "")
    );

    // Verify we have external links to test
    expect(externalLinks.length).toBeGreaterThan(0);

    // Property: For all external links, they must have security attributes
    externalLinks.forEach((link) => {
      expect(hasSecurityAttributes(link)).toBe(true);
    });
  });

  it("should ensure all external links have target='_blank'", () => {
    render(<Footer />);

    const allLinks = document.querySelectorAll("a");
    const externalLinks = Array.from(allLinks).filter((link) =>
      isExternalUrl(link.getAttribute("href") || "")
    );

    externalLinks.forEach((link) => {
      expect(link.getAttribute("target")).toBe("_blank");
    });
  });

  /**
   * Property-based test: For any generated external URL, when rendered as a link,
   * it should have proper security attributes
   */
  it("should validate external URL detection works for any valid URL", () => {
    fc.assert(
      fc.property(fc.webUrl(), (url) => {
        // All web URLs should be detected as external
        expect(isExternalUrl(url)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it("should validate internal URLs are not flagged as external", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^\/[a-z0-9-/]*$/),
        (path) => {
          // Internal paths starting with / should not be external
          expect(isExternalUrl(path)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should verify social links have proper security attributes", () => {
    render(<Footer />);

    // Social links are identified by aria-label
    const socialLabels = ["Twitter", "LinkedIn", "Discord", "Reddit"];

    socialLabels.forEach((label) => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("rel")).toContain("noopener");
      expect(link.getAttribute("rel")).toContain("noreferrer");
      expect(link.getAttribute("target")).toBe("_blank");
    });
  });

  it("should verify GitHub links have proper security attributes", () => {
    render(<Footer />);

    const suggestIdeaLink = screen.getByText("Suggest an Idea");
    const reportBugLink = screen.getByText("Report a Bug");

    [suggestIdeaLink, reportBugLink].forEach((link) => {
      expect(link.getAttribute("rel")).toContain("noopener");
      expect(link.getAttribute("rel")).toContain("noreferrer");
      expect(link.getAttribute("target")).toBe("_blank");
    });
  });
});
