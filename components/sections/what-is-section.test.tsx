import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatIsSection } from "./what-is";

describe("WhatIsSection Component - Unit Tests", () => {
  it("renders section heading 'AI inference, simplified'", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByRole("heading", { name: "AI inference, simplified" })
    ).toBeInTheDocument();
  });

  it("renders subheading about unified runtime", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByRole("heading", {
        name: "Koeo is a unified runtime for distributed GPU inference",
      })
    ).toBeInTheDocument();
  });

  it("renders body paragraph with single runtime copy", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        /Instead of wiring together providers, runtimes and custom schedulers, you integrate with a single runtime/
      )
    ).toBeInTheDocument();
  });

  it("renders first feature bullet about federated GPU fabric", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        "One API to run your supported models across our federated GPU fabric"
      )
    ).toBeInTheDocument();
  });

  it("renders second feature bullet about routing and health checks", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        "Automatic routing, health checks and basic cost controls across different GPU tiers"
      )
    ).toBeInTheDocument();
  });

  it("renders third feature bullet about observability", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        "Built-in usage and latency metrics, with deeper observability in active development"
      )
    ).toBeInTheDocument();
  });

  it("renders CTA 'Learn more' linking to /beta", () => {
    render(<WhatIsSection />);
    const cta = screen.getByRole("link", { name: "Learn more" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/beta");
  });
});
