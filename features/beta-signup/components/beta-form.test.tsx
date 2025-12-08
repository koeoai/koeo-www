import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { BetaForm } from "./beta-form";

describe("BetaForm (Survey)", () => {
  describe("renders all fields with correct labels", () => {
    it("should render all required fields in About You section", () => {
      render(<BetaForm />);

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText("Email", { exact: false })).toBeInTheDocument();
      expect(screen.getByLabelText(/role \/ persona/i)).toBeInTheDocument();
      expect(screen.getByLabelText("Segment", { exact: false })).toBeInTheDocument();
    });

    it("should render AI use case fields", () => {
      render(<BetaForm />);

      expect(
        screen.getByLabelText(/what are you using.*ai for/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/workload types/i)).toBeInTheDocument();
    });

    it("should render current setup fields", () => {
      render(<BetaForm />);

      expect(screen.getByText(/current infra sources/i)).toBeInTheDocument();
      expect(
        screen.getByLabelText(/rough monthly ai\/gpu spend/i)
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/how do you work today/i)).toBeInTheDocument();
    });

    it("should render pain points fields", () => {
      render(<BetaForm />);

      expect(screen.getByText(/top pain points/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/pain notes/i)).toBeInTheDocument();
    });

    it("should render submit button", () => {
      render(<BetaForm />);

      expect(
        screen.getByRole("button", { name: /apply/i })
      ).toBeInTheDocument();
    });
  });

  describe("validation errors display", () => {
    it("should show validation errors when submitting empty required fields", async () => {
      const { container } = render(<BetaForm />);

      const form = container.querySelector("form");

      await act(async () => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        // Validation messages are now localized - check for the generic required message
        expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThan(0);
      });
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getAllByText(/please select an option/i).length).toBeGreaterThan(0);
    });

    it("should show email validation error for invalid email format", async () => {
      render(<BetaForm />);

      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
        target: { value: "invalid-email" },
      });

      const form = document.querySelector("form");

      await act(async () => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email/i)
        ).toBeInTheDocument();
      });
    });
  });


  describe("success message on submit", () => {
    // Helper to select an option from a dropdown (Select or MultiSelect)
    const selectDropdownOption = async (triggerId: string, optionText: RegExp) => {
      const trigger = document.getElementById(triggerId);
      expect(trigger).toBeTruthy();
      fireEvent.click(trigger!);
      
      await waitFor(() => {
        const option = screen.getByRole("option", { name: optionText });
        fireEvent.click(option);
      });
    };

    it("should show success message after successful submission", async () => {
      const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
      render(<BetaForm onSubmit={mockOnSubmit} />);

      // Fill in text fields
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/what are you using.*ai for/i), {
        target: { value: "Building AI features for our product" },
      });
      fireEvent.change(screen.getByLabelText(/how do you work today/i), {
        target: { value: "Local dev + call OpenAI API" },
      });
      fireEvent.change(screen.getByLabelText(/pain notes/i), {
        target: { value: "Cost is unpredictable" },
      });

      // Select single-select options
      await selectDropdownOption("role", /ML Engineer/i);
      await selectDropdownOption("segment", /Startup/i);
      await selectDropdownOption("monthlySpend", /500–2k/i);

      // Select multi-select options
      await selectDropdownOption("workloadTypes", /Fine-tuning/i);
      await selectDropdownOption("currentInfraSources", /AWS/i);
      await selectDropdownOption("topPainPoints", /Cost/i);
      await selectDropdownOption("mostValuableFeatures", /OpenAI-compatible/i);

      const form = document.querySelector("form");

      await act(async () => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/thanks for sharing your insights/i)
        ).toBeInTheDocument();
      });
    });

    it("should show loading state during submission", async () => {
      let resolveSubmit: () => void;
      const mockOnSubmit = vi
        .fn()
        .mockImplementation(
          () =>
            new Promise<void>((resolve) => {
              resolveSubmit = resolve;
            })
        );
      render(<BetaForm onSubmit={mockOnSubmit} />);

      // Fill in text fields
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/what are you using.*ai for/i), {
        target: { value: "Building AI features" },
      });
      fireEvent.change(screen.getByLabelText(/how do you work today/i), {
        target: { value: "Local dev" },
      });
      fireEvent.change(screen.getByLabelText(/pain notes/i), {
        target: { value: "Cost issues" },
      });

      // Select single-select options
      const selectOption = async (triggerId: string, optionText: RegExp) => {
        const trigger = document.getElementById(triggerId);
        fireEvent.click(trigger!);
        await waitFor(() => {
          const option = screen.getByRole("option", { name: optionText });
          fireEvent.click(option);
        });
      };

      await selectOption("role", /ML Engineer/i);
      await selectOption("segment", /Startup/i);
      await selectOption("monthlySpend", /500–2k/i);
      await selectOption("workloadTypes", /Fine-tuning/i);
      await selectOption("currentInfraSources", /AWS/i);
      await selectOption("topPainPoints", /Cost/i);
      await selectOption("mostValuableFeatures", /OpenAI-compatible/i);

      const form = document.querySelector("form");

      act(() => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /applying/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /applying/i })
        ).toBeDisabled();
      });

      await act(async () => {
        resolveSubmit!();
      });

      await waitFor(() => {
        expect(
          screen.getByText(/thanks for sharing your insights/i)
        ).toBeInTheDocument();
      });
    });
  });
});
