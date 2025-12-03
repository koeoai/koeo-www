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
   * Verify Header, Hero, Footer render in correct order
   * Requirements: 6.1
   */
  it("renders Header, Hero, and Footer in correct order", () => {
    render(<Home />);

    // Get all major sections
    const header = screen.getByRole("banner");
    const main = screen.getByRole("main");
    const footer = screen.getByRole("contentinfo");

    // Verify all sections exist
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    // Verify order by checking DOM positions
    const container = header.parentElement;
    const children = container ? Array.from(container.children) : [];

    const headerIndex = children.indexOf(header);
    const mainIndex = children.indexOf(main);
    const footerIndex = children.indexOf(footer);

    expect(headerIndex).toBeLessThan(mainIndex);
    expect(mainIndex).toBeLessThan(footerIndex);
  });

  /**
   * Verify Header component renders with navigation
   * Requirements: 6.1
   */
  it("renders Header with navigation links", () => {
    render(<Home />);

    const header = screen.getByRole("banner");
    const nav = header.querySelector('nav[aria-label="Main navigation"]');

    // Check for navigation links within header
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /get started/i })).toBeInTheDocument();
  });

  /**
   * Verify Hero section renders with correct content
   * Requirements: 6.1
   */
  it("renders Hero section with headline and CTA", () => {
    render(<Home />);

    // Check for hero headline
    expect(
      screen.getByRole("heading", { name: /unify your gpu infrastructure/i })
    ).toBeInTheDocument();

    // Check for subheadline within main section (hero is in main)
    const main = screen.getByRole("main");
    const subheadline = main.querySelector("p");
    expect(subheadline).toBeInTheDocument();
    expect(subheadline?.textContent).toMatch(/runtime layer that brings fragmented gpus/i);

    // Check for CTA button
    expect(screen.getByRole("link", { name: /start building/i })).toBeInTheDocument();
  });

  /**
   * Verify Footer renders with link groups
   * Requirements: 6.1
   */
  it("renders Footer with link groups and copyright", () => {
    render(<Home />);

    // Check for footer link group titles
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();

    // Check for copyright with current year
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Koeo`))).toBeInTheDocument();
  });
});
