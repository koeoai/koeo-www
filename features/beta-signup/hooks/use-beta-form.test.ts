import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import * as fc from "fast-check";
import { useBetaForm } from "./use-beta-form";
import { SurveyFormData } from "../constants";

/**
 * **Feature: codebase-refactor, Property 6: useBetaForm hook manages state transitions correctly**
 * **Validates: Requirements 14.2**
 *
 * For any sequence of form interactions (field updates, validation calls, submission attempts),
 * the hook should maintain consistent state and transition between idle, applying, success,
 * and error states appropriately.
 */
describe("Property 6: useBetaForm hook manages state transitions correctly", () => {
  // Generator for valid non-empty strings
  const validTextArb = fc
    .string({ minLength: 1, maxLength: 50 })
    .filter((s) => s.trim().length > 0);

  // Generator for valid email addresses
  const validEmailArb = fc
    .tuple(
      fc.stringMatching(/^[a-zA-Z0-9]+$/),
      fc.stringMatching(/^[a-zA-Z0-9]+$/),
      fc.stringMatching(/^[a-zA-Z]{2,4}$/)
    )
    .filter(
      ([local, domain, tld]) =>
        local.length > 0 && domain.length > 0 && tld.length >= 2
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

  // Generator for valid form data
  const validFormDataArb = fc.record({
    fullName: validTextArb,
    email: validEmailArb,
    organizationName: fc.string(),
    role: fc.constantFrom(
      "Student",
      "Professor / Lecturer",
      "ML Engineer / Data Scientist"
    ),
    segment: fc.constantFrom("Education", "Startup / Scaleup", "Consultancy"),
    aiUseCase: validTextArb,
    workloadTypes: fc.array(fc.constantFrom("Fine-tuning", "Training small/medium models"), { minLength: 1, maxLength: 3 }),
    currentInfraSources: fc.array(fc.constantFrom("AWS", "GCP", "Azure"), { minLength: 1, maxLength: 3 }),
    monthlySpend: fc.constantFrom("0–100", "100–500", "500–2k"),
    workflow: validTextArb,
    topPainPoints: fc.array(fc.constantFrom("Capacity / queues", "Cost / unpredictable bills"), { minLength: 1, maxLength: 3 }),
    painNotes: validTextArb,
    mostValuableFeatures: fc.array(fc.constantFrom("OpenAI-compatible API", "Logs & metrics"), { minLength: 1, maxLength: 3 }),
    pilotInterest: fc.constant("Yes – ready for pilot"),
    anythingElse: fc.string(),
  }) as fc.Arbitrary<SurveyFormData>;

  describe("State transitions", () => {
    it("should start in idle state", () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { result } = renderHook(() => useBetaForm());
          expect(result.current.formState).toBe("idle");
        }),
        { numRuns: 100 }
      );
    });

    it("should transition to applying state during submission with valid data", async () => {
      await fc.assert(
        fc.asyncProperty(validFormDataArb, async (formData) => {
          let resolveSubmit: () => void;
          const mockOnSubmit = vi.fn().mockImplementation(
            () =>
              new Promise<void>((resolve) => {
                resolveSubmit = resolve;
              })
          );

          const { result } = renderHook(() =>
            useBetaForm({ onSubmit: mockOnSubmit, initialData: formData })
          );

          // Start submission
          const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
          
          // Don't await - we want to check the intermediate state
          act(() => {
            result.current.handleSubmit(mockEvent);
          });

          // Should be in applying state
          expect(result.current.formState).toBe("applying");

          // Resolve the submission
          await act(async () => {
            resolveSubmit!();
          });
        }),
        { numRuns: 100 }
      );
    });

    it("should transition to success state after successful submission", async () => {
      await fc.assert(
        fc.asyncProperty(validFormDataArb, async (formData) => {
          const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

          const { result } = renderHook(() =>
            useBetaForm({ onSubmit: mockOnSubmit, initialData: formData })
          );

          const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

          await act(async () => {
            await result.current.handleSubmit(mockEvent);
          });

          expect(result.current.formState).toBe("success");
        }),
        { numRuns: 100 }
      );
    });

    it("should transition to error state after failed submission", async () => {
      await fc.assert(
        fc.asyncProperty(validFormDataArb, async (formData) => {
          const mockOnSubmit = vi.fn().mockRejectedValue(new Error("API Error"));

          const { result } = renderHook(() =>
            useBetaForm({ onSubmit: mockOnSubmit, initialData: formData })
          );

          const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

          await act(async () => {
            await result.current.handleSubmit(mockEvent);
          });

          expect(result.current.formState).toBe("error");
        }),
        { numRuns: 100 }
      );
    });

    it("should reset to idle state when resetForm is called", async () => {
      await fc.assert(
        fc.asyncProperty(validFormDataArb, async (formData) => {
          const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

          const { result } = renderHook(() =>
            useBetaForm({ onSubmit: mockOnSubmit, initialData: formData })
          );

          const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

          // Submit to change state
          await act(async () => {
            await result.current.handleSubmit(mockEvent);
          });

          expect(result.current.formState).toBe("success");

          // Reset
          act(() => {
            result.current.resetForm();
          });

          expect(result.current.formState).toBe("idle");
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("Field updates", () => {
    it("should update formData when updateField is called", () => {
      fc.assert(
        fc.property(validTextArb, (newValue) => {
          const { result } = renderHook(() => useBetaForm());

          act(() => {
            result.current.updateField("fullName")(newValue);
          });

          expect(result.current.formData.fullName).toBe(newValue);
        }),
        { numRuns: 100 }
      );
    });

    it("should clear field error when field is updated", () => {
      fc.assert(
        fc.property(validTextArb, (newValue) => {
          const { result } = renderHook(() => useBetaForm());

          // Trigger validation to create errors
          act(() => {
            result.current.validateForm();
          });

          // Should have fullName error
          expect(result.current.errors.fullName).toBeDefined();

          // Update the field
          act(() => {
            result.current.updateField("fullName")(newValue);
          });

          // Error should be cleared
          expect(result.current.errors.fullName).toBeUndefined();
        }),
        { numRuns: 100 }
      );
    });

    it("should handle array field updates correctly", () => {
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom("AWS", "GCP", "Azure"), { minLength: 1, maxLength: 3 }),
          (newValues) => {
            const { result } = renderHook(() => useBetaForm());

            act(() => {
              result.current.updateField("currentInfraSources")(newValues);
            });

            expect(result.current.formData.currentInfraSources).toEqual(newValues);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe("Validation", () => {
    it("should return false and set errors for invalid form data", () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { result } = renderHook(() => useBetaForm());

          let isValid: boolean;
          act(() => {
            isValid = result.current.validateForm();
          });

          expect(isValid!).toBe(false);
          expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it("should return true and have no errors for valid form data", () => {
      fc.assert(
        fc.property(validFormDataArb, (formData) => {
          const { result } = renderHook(() =>
            useBetaForm({ initialData: formData })
          );

          let isValid: boolean;
          act(() => {
            isValid = result.current.validateForm();
          });

          expect(isValid!).toBe(true);
          expect(Object.keys(result.current.errors).length).toBe(0);
        }),
        { numRuns: 100 }
      );
    });

    it("should not submit when validation fails", async () => {
      await fc.assert(
        fc.asyncProperty(fc.constant(null), async () => {
          const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

          const { result } = renderHook(() =>
            useBetaForm({ onSubmit: mockOnSubmit })
          );

          const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

          await act(async () => {
            await result.current.handleSubmit(mockEvent);
          });

          // Should not have called onSubmit
          expect(mockOnSubmit).not.toHaveBeenCalled();
          // Should still be in idle state (not applying or success)
          expect(result.current.formState).toBe("idle");
        }),
        { numRuns: 100 }
      );
    });
  });
});
