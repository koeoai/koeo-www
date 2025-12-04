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
        screen.getByRole("button", { name: /submit survey/i })
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
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
      });
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select your role/i)).toBeInTheDocument();
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
    it("should show success message after successful submission", async () => {
      const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
      render(<BetaForm onSubmit={mockOnSubmit} />);

      // Fill in all required fields
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/role \/ persona/i), {
        target: { value: "ML Engineer / Data Scientist" },
      });
      fireEvent.change(screen.getByLabelText("Segment", { exact: false }), {
        target: { value: "Startup / Scaleup" },
      });
      fireEvent.change(screen.getByLabelText(/what are you using.*ai for/i), {
        target: { value: "Building AI features for our product" },
      });
      fireEvent.change(screen.getByLabelText(/rough monthly ai\/gpu spend/i), {
        target: { value: "500–2k" },
      });
      fireEvent.change(screen.getByLabelText(/how do you work today/i), {
        target: { value: "Local dev + call OpenAI API" },
      });
      fireEvent.change(screen.getByLabelText(/pain notes/i), {
        target: { value: "Cost is unpredictable" },
      });

      // Select multi-select options by clicking checkboxes
      const workloadCheckbox = screen.getByLabelText(/fine-tuning/i);
      fireEvent.click(workloadCheckbox);

      const infraCheckbox = screen.getByLabelText(/^aws$/i);
      fireEvent.click(infraCheckbox);

      const painCheckbox = screen.getByLabelText(/cost \/ unpredictable bills/i);
      fireEvent.click(painCheckbox);

      const featureCheckbox = screen.getByLabelText(/openai-compatible api/i);
      fireEvent.click(featureCheckbox);

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

      // Fill in required fields
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/role \/ persona/i), {
        target: { value: "ML Engineer / Data Scientist" },
      });
      fireEvent.change(screen.getByLabelText("Segment", { exact: false }), {
        target: { value: "Startup / Scaleup" },
      });
      fireEvent.change(screen.getByLabelText(/what are you using.*ai for/i), {
        target: { value: "Building AI features" },
      });
      fireEvent.change(screen.getByLabelText(/rough monthly ai\/gpu spend/i), {
        target: { value: "500–2k" },
      });
      fireEvent.change(screen.getByLabelText(/how do you work today/i), {
        target: { value: "Local dev" },
      });
      fireEvent.change(screen.getByLabelText(/pain notes/i), {
        target: { value: "Cost issues" },
      });

      // Select multi-select options
      fireEvent.click(screen.getByLabelText(/fine-tuning/i));
      fireEvent.click(screen.getByLabelText(/^aws$/i));
      fireEvent.click(screen.getByLabelText(/cost \/ unpredictable bills/i));
      fireEvent.click(screen.getByLabelText(/openai-compatible api/i));

      const form = document.querySelector("form");

      act(() => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /submitting/i })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: /submitting/i })
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
