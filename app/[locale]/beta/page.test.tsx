import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BetaPage from "./page";
import { LocaleProvider } from "@/lib/i18n";

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

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/beta"),
}));

// Helper to render with LocaleProvider
const renderWithLocale = (ui: React.ReactElement, locale: "en" | "fr" = "en") => {
  return render(
    <LocaleProvider locale={locale}>
      {ui}
    </LocaleProvider>
  );
};

describe("Beta Page Assembly", () => {
  /**
   * Verify Header and Footer render
   */
  it("renders Header and Footer for consistent navigation", () => {
    renderWithLocale(<BetaPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  /**
   * Verify beta page sections render
   * Requirements: 7.1, 7.2
   */
  it("renders hero and form sections", () => {
    renderWithLocale(<BetaPage />);

    // Verify BetaHero renders with title (text split across elements)
    expect(screen.getByText(/Apply for/i)).toBeInTheDocument();
    expect(screen.getByText(/our private beta/i)).toBeInTheDocument();

    // Verify Who we're looking for is in hero
    expect(screen.getByText("Who we are looking for")).toBeInTheDocument();

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
    renderWithLocale(<BetaPage />);

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
    const { container } = renderWithLocale(<BetaPage />);

    expect(container.querySelector("#beta-form")).toBeInTheDocument();
  });

  /**
   * Verify hero eyebrow badge renders
   * Requirements: 7.1
   */
  it("renders hero with eyebrow badge", () => {
    renderWithLocale(<BetaPage />);

    expect(screen.getByText(/Invite only/i)).toBeInTheDocument();
  });

  /**
   * Verify who section criteria bullets render (now in hero)
   * Requirements: 7.2
   */
  it("renders who section with three criteria", () => {
    renderWithLocale(<BetaPage />);

    expect(
      screen.getByText("You are shipping or about to ship AI features")
    ).toBeInTheDocument();
    expect(
      screen.getByText("You want to simplify your inference stack")
    ).toBeInTheDocument();
    expect(
      screen.getByText("You are open to giving feedback")
    ).toBeInTheDocument();
  });
});
