import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProblemSection } from "./problem-section";

describe("ProblemSection Component - Unit Tests", () => {
  it("renders heading 'Why AI inference feels harder than it should'", () => {
    render(<ProblemSection />);
    expect(
      screen.getByRole("heading", {
        name: "Why AI inference feels harder than it should",
      })
    ).toBeInTheDocument();
  });

  it("renders intro paragraph with production inference phrasing", () => {
    render(<ProblemSection />);
    expect(
      screen.getByText(/Production inference usually turns into a pile of providers/)
    ).toBeInTheDocument();
  });

  describe("Problem Cards", () => {
    it("renders COMPLEXITY card with correct content", () => {
      render(<ProblemSection />);
      expect(screen.getByText("COMPLEXITY")).toBeInTheDocument();
      expect(screen.getByText("Too many moving parts")).toBeInTheDocument();
      expect(
        screen.getByText(/GPU pools, and billing need to stay in sync/)
      ).toBeInTheDocument();
    });

    it("renders PRODUCTIVITY card with correct content", () => {
      render(<ProblemSection />);
      expect(screen.getByText("PRODUCTIVITY")).toBeInTheDocument();
      expect(screen.getByText("Infrastructure steals focus")).toBeInTheDocument();
      expect(
        screen.getByText(/improving the product experience/)
      ).toBeInTheDocument();
    });

    it("renders COST CONTROL card with correct content", () => {
      render(<ProblemSection />);
      expect(screen.getByText("COST CONTROL")).toBeInTheDocument();
      expect(screen.getByText("Costs are hard to reason about")).toBeInTheDocument();
      expect(
        screen.getByText(/route workloads confidently/)
      ).toBeInTheDocument();
    });
  });
});
