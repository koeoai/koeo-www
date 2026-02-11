import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComparisonSection } from "./comparison-section";

describe("ComparisonSection Component - Unit Tests", () => {
  it("renders heading 'How Koeo is different'", () => {
    render(<ComparisonSection />);
    // SectionHeader uses animated text, so words are split into spans
    expect(screen.getByText("How")).toBeInTheDocument();
    expect(screen.getByText("is")).toBeInTheDocument();
    expect(screen.getByText("different")).toBeInTheDocument();
  });

  describe("Comparison Rows", () => {
    it("renders exactly 4 comparison rows", () => {
      render(<ComparisonSection />);
      const allRows = screen.getAllByTestId(/comparison-row|koeo-row/);
      expect(allRows).toHaveLength(4);
    });

    it("renders GPU clouds row with correct content", () => {
      render(<ComparisonSection />);
      expect(screen.getByText("GPU clouds")).toBeInTheDocument();
      expect(
        screen.getByText("You manage machines and routing yourself.")
      ).toBeInTheDocument();
    });

    it("renders Hosted model APIs row with correct content", () => {
      render(<ComparisonSection />);
      expect(screen.getByText("Hosted model APIs")).toBeInTheDocument();
      expect(
        screen.getByText("You get their models, not your models.")
      ).toBeInTheDocument();
    });

    it("renders Single vendor inference row with correct content", () => {
      render(<ComparisonSection />);
      expect(screen.getByText("Single vendor inference")).toBeInTheDocument();
      expect(
        screen.getByText("You inherit their outages and capacity limits.")
      ).toBeInTheDocument();
    });

    it("renders Koeo row with correct content", () => {
      render(<ComparisonSection />);
      // "Koeo Platform" is the name of the Koeo row
      expect(screen.getByText("Koeo Platform")).toBeInTheDocument();
      // The description is split into multiple spans for highlighting, so check individual parts
      expect(screen.getByText("No infra to manage.")).toBeInTheDocument();
      expect(screen.getByText(/Your models/)).toBeInTheDocument();
    });
  });

  describe("Koeo Row Distinct Styling", () => {
    it("renders Koeo row with distinct test id", () => {
      render(<ComparisonSection />);
      const koeoRow = screen.getByTestId("koeo-row");
      expect(koeoRow).toBeInTheDocument();
    });

    it("renders non-Koeo rows with comparison-row test id", () => {
      render(<ComparisonSection />);
      const comparisonRows = screen.getAllByTestId("comparison-row");
      expect(comparisonRows).toHaveLength(3);
    });
  });
});
