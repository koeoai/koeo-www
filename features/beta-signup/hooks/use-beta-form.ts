"use client";

import { useState, useCallback } from "react";
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
}

/**
 * Custom hook for managing beta signup form state, validation, and submission.
 * Extracts form logic from BetaForm component for reusability and testability.
 */
export function useBetaForm(options: UseBetaFormOptions = {}): UseBetaFormReturn {
  const { onSubmit, initialData } = options;
  
  const [formData, setFormData] = useState<SurveyFormData>({
    ...INITIAL_FORM_DATA,
    ...initialData,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

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
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.role) {
      newErrors.role = "Please select your role";
    }
    
    if (!formData.segment) {
      newErrors.segment = "Please select your segment";
    }
    
    if (!formData.aiUseCase.trim()) {
      newErrors.aiUseCase = "Please describe your AI use case";
    }
    
    // Required array fields
    if (formData.workloadTypes.length === 0) {
      newErrors.workloadTypes = "Please select at least one workload type";
    }
    
    if (formData.currentInfraSources.length === 0) {
      newErrors.currentInfraSources = "Please select at least one infrastructure source";
    }
    
    if (!formData.monthlySpend) {
      newErrors.monthlySpend = "Please select your monthly spend";
    }
    
    if (!formData.workflow.trim()) {
      newErrors.workflow = "Please describe your workflow";
    }
    
    if (formData.topPainPoints.length === 0) {
      newErrors.topPainPoints = "Please select at least one pain point";
    }
    
    if (!formData.painNotes.trim()) {
      newErrors.painNotes = "Please provide some context about your pain points";
    }
    
    if (formData.mostValuableFeatures.length === 0) {
      newErrors.mostValuableFeatures = "Please select at least one valuable feature";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

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
