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
        name: "A unified runtime for serverless AI inference",
      })
    ).toBeInTheDocument();
  });

  it("renders body paragraph with single runtime copy", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        /Instead of wiring together providers, runtimes, and custom schedulers, you integrate once/
      )
    ).toBeInTheDocument();
  });

  it("renders first feature bullet about single endpoint", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        "One API to run your models through a single endpoint"
      )
    ).toBeInTheDocument();
  });

  it("renders second feature bullet about routing and health checks", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        "Routing and health checks built in, designed for real traffic"
      )
    ).toBeInTheDocument();
  });

  it("renders third feature bullet about observability", () => {
    render(<WhatIsSection />);
    expect(
      screen.getByText(
        "Usage and latency metrics included, with deeper observability evolving in beta"
      )
    ).toBeInTheDocument();
  });

  it("renders CTA 'Learn how it works' linking to /beta", () => {
    render(<WhatIsSection />);
    const cta = screen.getByRole("link", { name: "Learn how it works" });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/beta");
  });
});
