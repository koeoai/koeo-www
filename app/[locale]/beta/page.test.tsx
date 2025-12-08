import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BetaPage from "./page";

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

describe("Beta Page Assembly", () => {
  /**
   * Verify Header and Footer render
   */
  it("renders Header and Footer for consistent navigation", () => {
    render(<BetaPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  /**
   * Verify beta page sections render
   * Requirements: 7.1, 7.2
   */
  it("renders hero and form sections", () => {
    render(<BetaPage />);

    // Verify BetaHero renders with title (text split across elements)
    expect(screen.getByText(/Apply for/i)).toBeInTheDocument();
    expect(screen.getByText(/our private beta/i)).toBeInTheDocument();

    // Verify Who we're looking for is in hero
    expect(screen.getByText("Who we're looking for")).toBeInTheDocument();

    // Verify form renders
    expect(
      screen.getByText(/Tell us about your use case/i)
    ).toBeInTheDocument();
  });

  /**
   * Verify survey form is present on the page
   * Requirements: 7.5, 8.1
   */
  it("renders the survey form", () => {
    render(<BetaPage />);

    // Verify required form fields are present
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Email", { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText(/role \/ persona/i)).toBeInTheDocument();

    // Verify submit button
    expect(
      screen.getByRole("button", { name: /apply/i })
    ).toBeInTheDocument();
  });

  /**
   * Verify section IDs are present for navigation
   */
  it("renders sections with correct IDs", () => {
    const { container } = render(<BetaPage />);

    expect(container.querySelector("#beta-form")).toBeInTheDocument();
  });

  /**
   * Verify hero eyebrow badge renders
   * Requirements: 7.1
   */
  it("renders hero with eyebrow badge", () => {
    render(<BetaPage />);

    expect(screen.getByText(/limited spots/i)).toBeInTheDocument();
  });

  /**
   * Verify who section criteria bullets render (now in hero)
   * Requirements: 7.2
   */
  it("renders who section with three criteria", () => {
    render(<BetaPage />);

    expect(
      screen.getByText("You're shipping or about to ship AI features")
    ).toBeInTheDocument();
    expect(
      screen.getByText("You want to simplify your inference stack")
    ).toBeInTheDocument();
    expect(
      screen.getByText("You're open to giving feedback")
    ).toBeInTheDocument();
  });
});
