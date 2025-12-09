"use client";

import { useState, useCallback, useMemo } from "react";
import type { BetaFormContent } from "@/content";
import {
  SurveyFormData,
  FormState,
  INITIAL_FORM_DATA,
} from "../constants";

export interface UseBetaFormReturn {
  formData: SurveyFormData;
  errors: Record<string, string>;
  formState: FormState;
  updateField: (field: keyof SurveyFormData) => (value: string | string[]) => void;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export interface UseBetaFormOptions {
  onSubmit?: (data: SurveyFormData) => Promise<void>;
  initialData?: Partial<SurveyFormData>;
  content?: BetaFormContent;
}

// Default validation messages
const DEFAULT_VALIDATION = {
  required: "This field is required",
  email: "Email is required",
  invalidEmail: "Please enter a valid email",
  selectOne: "Please select an option",
  selectAtLeastOne: "Please select at least one option",
  fileType: "Please upload a PDF or Word document",
  fileSize: "File size must be less than 5MB",
};

/**
 * Custom hook for managing beta signup form state, validation, and submission.
 * Extracts form logic from BetaForm component for reusability and testability.
 */
export function useBetaForm(options: UseBetaFormOptions = {}): UseBetaFormReturn {
  const { onSubmit, initialData, content } = options;
  
  const [formData, setFormData] = useState<SurveyFormData>({
    ...INITIAL_FORM_DATA,
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  // Memoize validation messages to avoid recreating on every render
  const validation = useMemo(
    () => content?.validation ?? DEFAULT_VALIDATION,
    [content?.validation]
  );

  const updateField = useCallback(
    (field: keyof SurveyFormData) => (value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (prev[field]) {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        }
        return prev;
      });
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    // Required string fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = validation.required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = validation.email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = validation.invalidEmail;
    }
    
    if (!formData.role) {
      newErrors.role = validation.selectOne;
    }
    
    if (!formData.segment) {
      newErrors.segment = validation.selectOne;
    }
    
    if (!formData.aiUseCase.trim()) {
      newErrors.aiUseCase = validation.required;
    }
    
    // Required array fields
    if (formData.workloadTypes.length === 0) {
      newErrors.workloadTypes = validation.selectAtLeastOne;
    }
    
    if (formData.currentInfraSources.length === 0) {
      newErrors.currentInfraSources = validation.selectAtLeastOne;
    }
    
    if (!formData.monthlySpend) {
      newErrors.monthlySpend = validation.selectOne;
    }
    
    if (!formData.workflow.trim()) {
      newErrors.workflow = validation.required;
    }
    
    if (formData.topPainPoints.length === 0) {
      newErrors.topPainPoints = validation.selectAtLeastOne;
    }
    
    if (!formData.painNotes.trim()) {
      newErrors.painNotes = validation.required;
    }
    
    if (formData.mostValuableFeatures.length === 0) {
      newErrors.mostValuableFeatures = validation.selectAtLeastOne;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validation]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setFormState("applying");
      
      try {
        if (onSubmit) {
          await onSubmit(formData);
        } else {
          const response = await fetch("/api/beta-signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          
          if (!response.ok) {
            throw new Error("Failed to apply");
          }
        }
        
        setFormState("success");
        setFormData(INITIAL_FORM_DATA);
      } catch {
        setFormState("error");
      }
    },
    [formData, onSubmit, validateForm]
  );

  const resetForm = useCallback(() => {
    setFormData({ ...INITIAL_FORM_DATA, ...initialData });
    setErrors({});
    setFormState("idle");
  }, [initialData]);

  return {
    formData,
    errors,
    formState,
    updateField,
    validateForm,
    handleSubmit,
    resetForm,
  };
}
