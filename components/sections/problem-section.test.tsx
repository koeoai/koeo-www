import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProblemSection } from "./problem-section";
import { LocaleProvider } from "@/lib/i18n";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

// Helper to render with LocaleProvider
const renderWithLocale = (ui: React.ReactElement) => {
  return render(
    <LocaleProvider locale="en">
      {ui}
    </LocaleProvider>
  );
};

describe("ProblemSection Component - Unit Tests", () => {
  it("renders heading 'Why AI inference feels harder than it should'", () => {
    renderWithLocale(<ProblemSection />);
    // Text is split into animated spans with non-breaking spaces, so we check for key words
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toContain("Why");
    expect(heading.textContent).toContain("inference");
    expect(heading.textContent).toContain("harder");
  });

  it("renders intro paragraph with production inference phrasing", () => {
    renderWithLocale(<ProblemSection />);
    expect(
      screen.getByText(/Production inference usually turns into a pile of providers/)
    ).toBeInTheDocument();
  });

  describe("Problem Cards", () => {
    it("renders COMPLEXITY card with correct content", () => {
      renderWithLocale(<ProblemSection />);
      expect(screen.getByText("COMPLEXITY")).toBeInTheDocument();
      expect(screen.getByText("Too many moving parts")).toBeInTheDocument();
      expect(
        screen.getByText(/GPU pools, and billing need to stay in sync/)
      ).toBeInTheDocument();
    });

    it("renders PRODUCTIVITY card with correct content", () => {
      renderWithLocale(<ProblemSection />);
      expect(screen.getByText("PRODUCTIVITY")).toBeInTheDocument();
      expect(screen.getByText("Infrastructure steals focus")).toBeInTheDocument();
      expect(
        screen.getByText(/improving the product experience/)
      ).toBeInTheDocument();
    });

    it("renders COST CONTROL card with correct content", () => {
      renderWithLocale(<ProblemSection />);
      expect(screen.getByText("COST CONTROL")).toBeInTheDocument();
      expect(screen.getByText("Costs are hard to reason about")).toBeInTheDocument();
      expect(
        screen.getByText(/route workloads confidently/)
      ).toBeInTheDocument();
    });
  });
});
