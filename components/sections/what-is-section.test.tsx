import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatIsSection } from "./what-is";
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

describe("WhatIsSection Component - Unit Tests", () => {
  it("renders section heading 'AI inference, simplified'", () => {
    renderWithLocale(<WhatIsSection />);
    // Text is split into animated spans, so we check for the h2 containing the text
    const headings = screen.getAllByRole("heading", { level: 2 });
    const mainHeading = headings.find(h => h.textContent?.includes("inference") && h.textContent?.includes("simplified"));
    expect(mainHeading).toBeInTheDocument();
  });

  it("renders subheading about unified runtime", () => {
    renderWithLocale(<WhatIsSection />);
    expect(
      screen.getByRole("heading", {
        name: "A unified runtime for serverless AI inference",
      })
    ).toBeInTheDocument();
  });

  it("renders body paragraph with single runtime copy", () => {
    renderWithLocale(<WhatIsSection />);
    expect(
      screen.getByText(
        /Instead of wiring together providers, runtimes, and custom schedulers, you integrate once/
      )
    ).toBeInTheDocument();
  });

  it("renders first feature bullet about single endpoint", () => {
    renderWithLocale(<WhatIsSection />);
    expect(
      screen.getByText(
        "One API to run your models through a single endpoint"
      )
    ).toBeInTheDocument();
  });

  it("renders second feature bullet about routing and health checks", () => {
    renderWithLocale(<WhatIsSection />);
    expect(
      screen.getByText(
        "Routing and health checks built in, designed for real traffic"
      )
    ).toBeInTheDocument();
  });

  it("renders third feature bullet about observability", () => {
    renderWithLocale(<WhatIsSection />);
    expect(
      screen.getByText(
        "Usage and latency metrics included, with deeper observability evolving in beta"
      )
    ).toBeInTheDocument();
  });

  it("renders CTA 'Learn how it works' linking to /beta", () => {
    renderWithLocale(<WhatIsSection />);
    const cta = screen.getByRole("link", { name: "Learn how it works" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/beta");
  });
});
