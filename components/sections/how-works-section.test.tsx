import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowWorksSection } from "./how-works";
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

describe("HowWorksSection - Developer Features", () => {
  it("renders heading 'Built by developers, for developers'", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText("Built by developers,")).toBeInTheDocument();
    expect(screen.getByText("for developers")).toBeInTheDocument();
  });

  it("renders subheading 'Developer-first experience, even in beta'", () => {
    renderWithLocale(<HowWorksSection />);
    expect(
      screen.getByText("Developer-first experience, even in beta")
    ).toBeInTheDocument();
  });

  it("renders OpenAI-compatible card with correct title", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText("OpenAI-compatible API")).toBeInTheDocument();
  });

  it("renders OpenAI-compatible card with beta-honest description", () => {
    renderWithLocale(<HowWorksSection />);
    expect(
      screen.getByText(/Once you are onboarded, you get OpenAI-style endpoints/)
    ).toBeInTheDocument();
  });

  it("renders OpenAI-compatible card with 'View API docs' link", () => {
    renderWithLocale(<HowWorksSection />);
    const apiDocsLink = screen.getByRole("link", { name: /View API docs/i });
    expect(apiDocsLink).toBeInTheDocument();
    expect(apiDocsLink).toHaveAttribute("href", "/docs/api");
  });

  it("renders dashboard card with 'Early-access dashboard' title", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText("Early-access dashboard")).toBeInTheDocument();
  });

  it("renders dashboard card with evolving dashboard description", () => {
    renderWithLocale(<HowWorksSection />);
    expect(
      screen.getByText(/Monitor usage, latency, and error rates/)
    ).toBeInTheDocument();
  });

  it("renders dashboard card with 'Request dashboard access' link to /beta", () => {
    renderWithLocale(<HowWorksSection />);
    const dashboardLink = screen.getByRole("link", {
      name: /Request dashboard access/i,
    });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/beta");
  });
});


describe("HowWorksSection - Steps", () => {
  it("renders steps heading 'How the private beta works'", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText(/How the private beta works/)).toBeInTheDocument();
  });

  it("renders step 1 with 'Request access' title", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText("Request access")).toBeInTheDocument();
  });

  it("renders step 1 with correct description", () => {
    renderWithLocale(<HowWorksSection />);
    expect(
      screen.getByText(/Tell us about your use case, your current setup, and your constraints/)
    ).toBeInTheDocument();
  });

  it("renders step 2 with 'Onboarding and API keys' title", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText("Onboarding and API keys")).toBeInTheDocument();
  });

  it("renders step 2 with correct description", () => {
    renderWithLocale(<HowWorksSection />);
    expect(
      screen.getByText(/If it is a match, we onboard you, set initial limits/)
    ).toBeInTheDocument();
  });

  it("renders step 3 with 'Integrate, then scale together' title", () => {
    renderWithLocale(<HowWorksSection />);
    expect(screen.getByText("Integrate, then scale together")).toBeInTheDocument();
  });

  it("renders step 3 with correct description", () => {
    renderWithLocale(<HowWorksSection />);
    expect(
      screen.getByText(/Start routing real traffic through Koeo/)
    ).toBeInTheDocument();
  });
});

describe("HowWorksSection - CTAs", () => {
  it("renders primary CTA 'Request beta access' linking to /beta", () => {
    renderWithLocale(<HowWorksSection />);
    const primaryCta = screen.getByRole("link", {
      name: "Request beta access",
    });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute("href", "/beta");
  });

  it("renders secondary CTA 'Talk to the team' with mailto link", () => {
    renderWithLocale(<HowWorksSection />);
    const secondaryCta = screen.getByRole("link", {
      name: /Talk to the team/i,
    });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute("href", "mailto:info@koeo.ai");
  });
});
