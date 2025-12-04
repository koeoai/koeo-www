import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowWorksSection } from "./how-works-section";

describe("HowWorksSection - Developer Features", () => {
  it("renders heading 'Built by Developers, for Developers'", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("Built by Developers,")).toBeInTheDocument();
    expect(screen.getByText("for Developers")).toBeInTheDocument();
  });

  it("renders subheading 'Developer-first experience, even in beta'", () => {
    render(<HowWorksSection />);
    expect(
      screen.getByText("Developer-first experience, even in beta")
    ).toBeInTheDocument();
  });

  it("renders OpenAI-compatible card with correct title", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("OpenAI-compatible API")).toBeInTheDocument();
  });

  it("renders OpenAI-compatible card with beta-honest description", () => {
    render(<HowWorksSection />);
    expect(
      screen.getByText(/Once you're onboarded to the beta, you'll get OpenAI-style endpoints/)
    ).toBeInTheDocument();
  });

  it("renders OpenAI-compatible card with 'View API Docs' link", () => {
    render(<HowWorksSection />);
    const apiDocsLink = screen.getByRole("link", { name: /View API Docs/i });
    expect(apiDocsLink).toBeInTheDocument();
    expect(apiDocsLink).toHaveAttribute("href", "/docs/api");
  });

  it("renders dashboard card with 'Early-access dashboard' title", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("Early-access dashboard")).toBeInTheDocument();
  });

  it("renders dashboard card with evolving dashboard description", () => {
    render(<HowWorksSection />);
    expect(
      screen.getByText(/Beta users get access to an evolving dashboard/)
    ).toBeInTheDocument();
  });

  it("renders dashboard card with 'Request Dashboard Access' link to /beta", () => {
    render(<HowWorksSection />);
    const dashboardLink = screen.getByRole("link", {
      name: /Request Dashboard Access/i,
    });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/beta");
  });
});


describe("HowWorksSection - Steps", () => {
  it("renders steps heading 'How the private beta works'", () => {
    render(<HowWorksSection />);
    expect(screen.getByText(/How the/)).toBeInTheDocument();
    expect(screen.getByText("private beta")).toBeInTheDocument();
    expect(screen.getByText(/works/)).toBeInTheDocument();
  });

  it("renders step 1 with 'Apply for access' title", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("Apply for access")).toBeInTheDocument();
  });

  it("renders step 1 with correct description", () => {
    render(<HowWorksSection />);
    expect(
      screen.getByText(/Tell us about your use case, current setup and constraints/)
    ).toBeInTheDocument();
  });

  it("renders step 2 with 'Onboarding & API keys' title", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("Onboarding & API keys")).toBeInTheDocument();
  });

  it("renders step 2 with correct description", () => {
    render(<HowWorksSection />);
    expect(
      screen.getByText(/If there's a fit, we'll onboard you, agree on initial limits/)
    ).toBeInTheDocument();
  });

  it("renders step 3 with 'Integrate, then scale together' title", () => {
    render(<HowWorksSection />);
    expect(screen.getByText("Integrate, then scale together")).toBeInTheDocument();
  });

  it("renders step 3 with correct description", () => {
    render(<HowWorksSection />);
    expect(
      screen.getByText(/Start routing real traffic through KOEO/)
    ).toBeInTheDocument();
  });
});

describe("HowWorksSection - CTAs", () => {
  it("renders primary CTA 'Apply for Private Beta' linking to /beta", () => {
    render(<HowWorksSection />);
    const primaryCta = screen.getByRole("link", {
      name: "Apply for Private Beta",
    });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute("href", "/beta");
  });

  it("renders secondary CTA 'Talk to the team' with mailto link", () => {
    render(<HowWorksSection />);
    const secondaryCta = screen.getByRole("link", {
      name: /Talk to the team/i,
    });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute("href", "mailto:hello@koeo.ai");
  });
});
