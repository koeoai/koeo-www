import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProblemSection } from "./problem-section";

describe("ProblemSection Component - Unit Tests", () => {
  it("renders heading 'Why AI infrastructure feels harder than it should'", () => {
    render(<ProblemSection />);
    expect(
      screen.getByRole("heading", {
        name: "Why AI infrastructure feels harder than it should",
      })
    ).toBeInTheDocument();
  });

  it("renders intro paragraph with 'usually means' phrasing", () => {
    render(<ProblemSection />);
    expect(
      screen.getByText(/Running inference at scale usually means juggling providers/)
    ).toBeInTheDocument();
  });

  describe("Problem Cards", () => {
    it("renders COMPLEXITY card with correct content", () => {
      render(<ProblemSection />);
      expect(screen.getByText("COMPLEXITY")).toBeInTheDocument();
      expect(screen.getByText("Too many moving parts")).toBeInTheDocument();
      expect(
        screen.getByText(/wired together and kept in sync/)
      ).toBeInTheDocument();
    });

    it("renders PRODUCTIVITY card with correct content", () => {
      render(<ProblemSection />);
      expect(screen.getByText("PRODUCTIVITY")).toBeInTheDocument();
      expect(screen.getByText("Infrastructure steals focus")).toBeInTheDocument();
      expect(
        screen.getByText(/improving the experience for users/)
      ).toBeInTheDocument();
    });

    it("renders COST CONTROL card with correct content", () => {
      render(<ProblemSection />);
      expect(screen.getByText("COST CONTROL")).toBeInTheDocument();
      expect(screen.getByText("Costs are unpredictable")).toBeInTheDocument();
      expect(
        screen.getByText(/decide where to run each workload efficiently/)
      ).toBeInTheDocument();
    });
  });
});
