import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BreakBehaviorSection } from "./break-behavior-section";

describe("BreakBehaviorSection", () => {
  it("renders the section heading", () => {
    render(<BreakBehaviorSection />);
    expect(screen.getByText("What happens when things break")).toBeInTheDocument();
  });

  it("renders three resilience cards", () => {
    render(<BreakBehaviorSection />);
    expect(screen.getByText("Auto Failover")).toBeInTheDocument();
    expect(screen.getByText("Traffic Spikes")).toBeInTheDocument();
    expect(screen.getByText("Full Visibility")).toBeInTheDocument();
  });

  it("renders the break behavior content items", () => {
    render(<BreakBehaviorSection />);
    expect(
      screen.getByText(/If a node becomes unhealthy, Koeo bypasses it automatically/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/If traffic spikes, Koeo keeps routing without you touching infra/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You see latency and errors in the dashboard/)
    ).toBeInTheDocument();
  });

  it("renders the coming soon text", () => {
    render(<BreakBehaviorSection />);
    expect(
      screen.getByText(/Multi-pool routing and regional failover are next/)
    ).toBeInTheDocument();
  });
});
