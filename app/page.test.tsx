import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

// Mock next/link to render as a simple anchor
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Homepage Assembly", () => {
  /**
   * Verify Header, main content, and Footer render in correct order
   * Requirements: All homepage requirements
   */
  it("renders Header, main content, and Footer in correct order", () => {
    render(<Home />);

    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    const container = header.parentElement;
    const children = container ? Array.from(container.children) : [];

    const headerIndex = children.indexOf(header);
    const mainIndex = children.indexOf(main);
    const footerIndex = children.indexOf(footer);

    expect(headerIndex).toBeLessThan(mainIndex);
    expect(mainIndex).toBeLessThan(footerIndex);
  });

  /**
   * Verify all homepage sections render in correct order
   * Requirements: 2.1, 3.1, 4.1, 5.1, 6.1
   */
  it("renders all sections in correct order", () => {
    render(<Home />);

    const main = screen.getByRole("main");

    // Verify Problem section renders with heading
    expect(
      screen.getByText("Why AI infrastructure feels harder than it should")
    ).toBeInTheDocument();

    // Verify What Is section renders with heading
    expect(
      screen.getByText("AI inference, simplified")
    ).toBeInTheDocument();

    // Verify How Works section renders with heading
    expect(
      screen.getByText("for Developers")
    ).toBeInTheDocument();

    // Verify CTA Strip section renders with heading
    expect(
      screen.getByText("We're in closed beta and onboarding gradually")
    ).toBeInTheDocument();

    // Verify sections are within main
    expect(main).toContainElement(
      screen.getByText("Why AI infrastructure feels harder than it should")
    );
  });

  /**
   * Verify section IDs are present for navigation
   * Requirements: 2.1, 3.1, 4.1, 5.1, 6.1
   */
  it("renders sections with correct IDs for navigation", () => {
    const { container } = render(<Home />);

    // Verify each section has the correct ID for anchor navigation
    expect(container.querySelector("#problem")).toBeInTheDocument();
    expect(container.querySelector("#what-is-koeo")).toBeInTheDocument();
    expect(container.querySelector("#how-it-works")).toBeInTheDocument();
    expect(container.querySelector("#cta")).toBeInTheDocument();
  });

  /**
   * Verify Header component renders with navigation
   * Requirements: All homepage requirements
   */
  it("renders Header with navigation links", () => {
    render(<Home />);

    const header = screen.getByRole("banner");
    const nav = header.querySelector('nav[aria-label="Main navigation"]');

    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get started/i })).toBeInTheDocument();
  });

  /**
   * Verify Footer renders with link groups
   * Requirements: All homepage requirements
   */
  it("renders Footer with link groups and copyright", () => {
    render(<Home />);

    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Koeo`))).toBeInTheDocument();
  });
});
