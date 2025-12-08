import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import * as fc from "fast-check";
import { BetaForm, SurveyFormData } from "@/features/beta-signup";

/**
 * Integration tests for beta signup flow
 * **Validates: Requirements 10.1, 10.2, 10.3, 10.4**
 */
describe("Beta Signup Integration Tests", () => {
  // Helper to fill all required form fields
  const fillRequiredFields = async () => {
    // Text fields
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

    // Helper to select dropdown options
    const selectOption = async (triggerId: string, optionText: RegExp) => {
      const trigger = document.getElementById(triggerId);
      expect(trigger).toBeTruthy();
      fireEvent.click(trigger!);
      await waitFor(() => {
        const option = screen.getByRole("option", { name: optionText });
        fireEvent.click(option);
      });
    };

    // Single-select options
    await selectOption("role", /ML Engineer/i);
    await selectOption("segment", /Startup/i);
    await selectOption("monthlySpend", /500–2k/i);

    // Multi-select options
    await selectOption("workloadTypes", /Fine-tuning/i);
    await selectOption("currentInfraSources", /AWS/i);
    await selectOption("topPainPoints", /Cost/i);
    await selectOption("mostValuableFeatures", /OpenAI-compatible/i);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Successful form submission", () => {
    /**
     * Test successful form submission shows success state
     * _Requirements: 10.1_
     */
    it("should show success message after successful submission", async () => {
      const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
      render(<BetaForm onSubmit={mockOnSubmit} />);

      await fillRequiredFields();

      const form = document.querySelector("form");
      await act(async () => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/thanks for sharing your insights/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe("API error handling", () => {
    /**
     * Test API error handling shows error state
     * _Requirements: 10.3_
     */
    it("should show error message when API returns error", async () => {
      const mockOnSubmit = vi.fn().mockRejectedValue(new Error("API Error"));
      render(<BetaForm onSubmit={mockOnSubmit} />);

      await fillRequiredFields();

      const form = document.querySelector("form");
      await act(async () => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/something went wrong/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it("should display error alert with proper role attribute", async () => {
      const mockOnSubmit = vi.fn().mockRejectedValue(new Error("Network Error"));
      render(<BetaForm onSubmit={mockOnSubmit} />);

      await fillRequiredFields();

      const form = document.querySelector("form");
      await act(async () => {
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        const errorAlert = screen.getByRole("alert");
        expect(errorAlert).toBeInTheDocument();
        expect(errorAlert).toHaveTextContent(/something went wrong/i);
      });
    });
  });
});

/**
 * **Feature: codebase-refactor, Property 5: Form state captures field values correctly**
 * **Validates: Requirements 10.4**
 * 
 * For any sequence of field updates with valid values, the form state should accurately
 * reflect all entered values and the updateField function should correctly update the specified field.
 */
describe("Property 5: Form state captures field values correctly", () => {
  // Generator for valid non-empty strings (for text fields)
  const validTextArb = fc.string({ minLength: 1, maxLength: 50 })
    .filter(s => s.trim().length > 0);

  // Generator for valid email addresses
  const validEmailArb = fc.tuple(
    fc.stringMatching(/^[a-zA-Z0-9]+$/),
    fc.stringMatching(/^[a-zA-Z0-9]+$/),
    fc.stringMatching(/^[a-zA-Z]{2,4}$/)
  ).filter(([local, domain, tld]) => local.length > 0 && domain.length > 0 && tld.length >= 2)
   .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

  it("should capture text field values correctly when changed", () => {
    fc.assert(
      fc.property(validTextArb, (textValue) => {
        const { unmount } = render(<BetaForm />);

        const fullNameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
        fireEvent.change(fullNameInput, { target: { value: textValue } });

        expect(fullNameInput.value).toBe(textValue);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should capture email field values correctly when changed", () => {
    fc.assert(
      fc.property(validEmailArb, (emailValue) => {
        const { unmount } = render(<BetaForm />);

        const emailInput = screen.getByLabelText("Email", { exact: false }) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: emailValue } });

        expect(emailInput.value).toBe(emailValue);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should capture textarea field values correctly when changed", () => {
    fc.assert(
      fc.property(validTextArb, (textValue) => {
        const { unmount } = render(<BetaForm />);

        const aiUseCaseInput = screen.getByLabelText(/what are you using.*ai for/i) as HTMLTextAreaElement;
        fireEvent.change(aiUseCaseInput, { target: { value: textValue } });

        expect(aiUseCaseInput.value).toBe(textValue);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should pass captured values to onSubmit handler", async () => {
    // Use specific values for this test to verify they're passed correctly
    const testData = {
      fullName: "Test User",
      email: "test@example.com",
      aiUseCase: "Building AI features",
      workflow: "Local development",
      painNotes: "Cost issues",
    };

    let capturedData: SurveyFormData | null = null;
    const mockOnSubmit = vi.fn().mockImplementation((data: SurveyFormData) => {
      capturedData = data;
      return Promise.resolve();
    });

    render(<BetaForm onSubmit={mockOnSubmit} />);

    // Fill text fields with test data
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: testData.fullName },
    });
    fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
      target: { value: testData.email },
    });
    fireEvent.change(screen.getByLabelText(/what are you using.*ai for/i), {
      target: { value: testData.aiUseCase },
    });
    fireEvent.change(screen.getByLabelText(/how do you work today/i), {
      target: { value: testData.workflow },
    });
    fireEvent.change(screen.getByLabelText(/pain notes/i), {
      target: { value: testData.painNotes },
    });

    // Select dropdown options
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
    await act(async () => {
      fireEvent.submit(form!);
    });

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    // Verify captured data matches what was entered
    expect(capturedData).not.toBeNull();
    expect(capturedData!.fullName).toBe(testData.fullName);
    expect(capturedData!.email).toBe(testData.email);
    expect(capturedData!.aiUseCase).toBe(testData.aiUseCase);
    expect(capturedData!.workflow).toBe(testData.workflow);
    expect(capturedData!.painNotes).toBe(testData.painNotes);
  });
});

/**
 * **Feature: codebase-refactor, Property 4: Form validation identifies invalid inputs**
 * **Validates: Requirements 10.2**
 * 
 * For any form data with invalid fields (empty required fields, invalid email format, etc.),
 * the validation function should return appropriate error messages for each invalid field.
 */
describe("Property 4: Form validation identifies invalid inputs", () => {
  // Generator for invalid email formats
  const invalidEmailArb = fc.oneof(
    // Empty string
    fc.constant(""),
    // Whitespace only
    fc.integer({ min: 1, max: 5 }).map(n => " ".repeat(n)),
    // No @ symbol
    fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes("@") && s.trim().length > 0),
    // @ but no domain
    fc.string({ minLength: 1, maxLength: 10 }).filter(s => !s.includes("@")).map(s => `${s}@`),
    // @ but no TLD (no dot after @)
    fc.tuple(
      fc.string({ minLength: 1, maxLength: 10 }).filter(s => !s.includes("@") && !s.includes(".")),
      fc.string({ minLength: 1, maxLength: 10 }).filter(s => !s.includes("@") && !s.includes("."))
    ).map(([local, domain]) => `${local}@${domain}`)
  );

  // Generator for empty/whitespace strings (invalid for required fields)
  const emptyOrWhitespaceArb = fc.oneof(
    fc.constant(""),
    fc.integer({ min: 1, max: 5 }).map(n => " ".repeat(n))
  );

  it("should show validation error for invalid email formats", () => {
    fc.assert(
      fc.property(invalidEmailArb, (invalidEmail) => {
        const { container, unmount } = render(<BetaForm />);

        // Fill in a valid name but invalid email
        fireEvent.change(screen.getByLabelText(/full name/i), {
          target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText("Email", { exact: false }), {
          target: { value: invalidEmail },
        });

        const form = container.querySelector("form");
        fireEvent.submit(form!);

        // Should show email validation error
        const emailError = screen.queryByText(/email is required/i) || 
                          screen.queryByText(/please enter a valid email/i);
        expect(emailError).toBeTruthy();

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should show validation error for empty required text fields", () => {
    fc.assert(
      fc.property(emptyOrWhitespaceArb, (emptyValue) => {
        const { container, unmount } = render(<BetaForm />);

        // Set fullName to empty/whitespace value
        fireEvent.change(screen.getByLabelText(/full name/i), {
          target: { value: emptyValue },
        });

        const form = container.querySelector("form");
        fireEvent.submit(form!);

        // Should show fullName validation error
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument();

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it("should show validation errors for all empty required fields when form is submitted empty", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container, unmount } = render(<BetaForm />);

        const form = container.querySelector("form");
        fireEvent.submit(form!);

        // All required field errors should be present
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/please select your role/i)).toBeInTheDocument();
        expect(screen.getByText(/please select your segment/i)).toBeInTheDocument();
        expect(screen.getByText(/please describe your ai use case/i)).toBeInTheDocument();
        expect(screen.getByText(/please select at least one workload type/i)).toBeInTheDocument();
        expect(screen.getByText(/please select at least one infrastructure source/i)).toBeInTheDocument();
        expect(screen.getByText(/please select your monthly spend/i)).toBeInTheDocument();
        expect(screen.getByText(/please describe your workflow/i)).toBeInTheDocument();
        expect(screen.getByText(/please select at least one pain point/i)).toBeInTheDocument();
        expect(screen.getByText(/please provide some context about your pain points/i)).toBeInTheDocument();
        expect(screen.getByText(/please select at least one valuable feature/i)).toBeInTheDocument();

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
