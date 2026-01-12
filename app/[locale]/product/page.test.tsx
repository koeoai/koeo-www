import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
  usePathname: vi.fn(() => "/product"),
}));

// Mock RequestFlowAnimation to avoid content dependency issues
vi.mock("@/components/ui/request-flow-animation", () => ({
  RequestFlowAnimation: () => <div data-testid="request-flow-animation">Request Flow Animation</div>,
}));

// Import ProductPage after mocks are set up
import ProductPage from "./page";

// Helper to render with LocaleProvider
const renderWithLocale = (ui: React.ReactElement, locale: "en" | "fr" = "en") => {
  return render(
    <LocaleProvider locale={locale}>
      {ui}
    </LocaleProvider>
  );
};

describe("Product Page", () => {
  /**
   * Verify Sample UI label renders on the console metrics display
   * Requirements: 3.1
   */
  it("renders Sample UI label on console metrics display", () => {
    renderWithLocale(<ProductPage />);

    // Verify the Sample UI label is present
    expect(screen.getByText("Sample UI")).toBeInTheDocument();
  });

  /**
   * Verify French Sample UI label renders correctly
   * Requirements: 3.1
   */
  it("renders French Sample UI label when locale is French", () => {
    renderWithLocale(<ProductPage />, "fr");

    // Verify the French Sample UI label is present
    expect(screen.getByText("Exemple d'interface")).toBeInTheDocument();
  });

  /**
   * Verify product page has exactly 4 personas including Research Labs & Universities
   * Requirements: 6.1
   */
  it("renders exactly 4 persona cards including Research Labs", () => {
    renderWithLocale(<ProductPage />);

    // Verify all 4 personas are present
    expect(screen.getByText("AI Startups")).toBeInTheDocument();
    expect(screen.getByText("Product & Platform Teams")).toBeInTheDocument();
    expect(screen.getByText("ML Teams & Consultants")).toBeInTheDocument();
    expect(screen.getByText("Research Labs & Universities")).toBeInTheDocument();
  });

  /**
   * Verify French product page has exactly 4 personas
   * Requirements: 6.1
   */
  it("renders exactly 4 French persona cards including Research Labs", () => {
    renderWithLocale(<ProductPage />, "fr");

    // Verify all 4 French personas are present
    expect(screen.getByText("Startups IA")).toBeInTheDocument();
    expect(screen.getByText("Équipes produit et plateforme")).toBeInTheDocument();
    expect(screen.getByText("Équipes ML et consultants")).toBeInTheDocument();
    expect(screen.getByText("Laboratoires de recherche et universités")).toBeInTheDocument();
  });

  /**
   * Verify product page includes Supported in Beta section
   * Requirements: 8.1
   */
  it("renders Supported in Beta section with features", () => {
    renderWithLocale(<ProductPage />);

    // Verify the section heading is present
    expect(screen.getByText("What's available today")).toBeInTheDocument();
    expect(screen.getByText("Supported in beta")).toBeInTheDocument();
    
    // Verify at least one feature is listed
    expect(screen.getByText("OpenAI-compatible chat completions API")).toBeInTheDocument();
  });

  /**
   * Verify French product page includes Supported in Beta section
   * Requirements: 8.1
   */
  it("renders French Supported in Beta section with features", () => {
    renderWithLocale(<ProductPage />, "fr");

    // Verify the French section heading is present
    expect(screen.getByText("Ce qui est disponible aujourd'hui")).toBeInTheDocument();
    expect(screen.getByText("Disponible en bêta")).toBeInTheDocument();
    
    // Verify at least one French feature is listed
    expect(screen.getByText("API de complétion de chat compatible OpenAI")).toBeInTheDocument();
  });
});
