"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useContent } from "@/lib/i18n/use-content";
import type { CareerFormContent } from "@/content";
import {
  CareerFormData,
  FormState,
  INITIAL_FORM_DATA,
} from "../constants";

// Re-export types for backward compatibility
export type { CareerFormData } from "../constants";

export interface CareerFormProps {
  onSubmit?: (data: CareerFormData) => Promise<void>;
  className?: string;
}

export function CareerForm({ onSubmit, className }: CareerFormProps) {
  const content = useContent<CareerFormContent>("CAREER_FORM_CONTENT");
  const [formData, setFormData] = useState<CareerFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const updateField = (field: keyof CareerFormData) => (value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: content.validation.fileType }));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: content.validation.fileSize }));
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setFormData((prev) => ({
        ...prev,
        resumeFileName: file.name,
        resumeBase64: base64,
      }));
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { validation } = content;
    if (!formData.fullName.trim()) newErrors.fullName = validation.required;
    if (!formData.email.trim()) newErrors.email = validation.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = validation.invalidEmail;
    }
    if (formData.areasOfInterest.length === 0) newErrors.areasOfInterest = validation.selectAtLeastOne;
    if (!formData.whyKoeo.trim()) newErrors.whyKoeo = validation.required;
    if (!formData.whatYouBring.trim()) newErrors.whatYouBring = validation.required;
    if (!formData.resumeBase64) newErrors.resume = validation.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState("submitting");
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        const response = await fetch("/api/career-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to submit");
      }
      setFormState("success");
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setFormState("error");
    }
  };

  const GlassCard = ({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-primary/20 via-magenta/20 to-pink-light/20" />
      </div>
      <div className="relative">
        <div className="mb-6 border-b border-white/10 pb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {description && <p className="mt-1 text-sm text-white/60">{description}</p>}
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );

  if (formState === "success") {
    return (
      <div className={cn("rounded-3xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-xl", className)}>
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta shadow-lg shadow-magenta/30">
          <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">{content.status.success.title}</h3>
        <p className="text-lg text-white/70">
          {content.status.success.message}
        </p>
      </div>
    );
  }

  const { sections, fields, options } = content;

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-8", className)}>
      <GlassCard title={sections.contact.title} description={sections.contact.description}>
        <FormField
          id="fullName"
          label={fields.fullName.label}
          placeholder={fields.fullName.placeholder}
          required
          value={formData.fullName}
          onChange={updateField("fullName")}
          error={errors.fullName}
          variant="glass"
        />
        <FormField
          id="email"
          label={fields.email.label}
          type="email"
          placeholder={fields.email.placeholder}
          required
          value={formData.email}
          onChange={updateField("email")}
          error={errors.email}
          variant="glass"
        />
        <FormField
          id="phone"
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          value={formData.phone}
          onChange={updateField("phone")}
          variant="glass"
        />
        <FormField
          id="linkedIn"
          label={fields.linkedIn.label}
          placeholder={fields.linkedIn.placeholder}
          value={formData.linkedIn}
          onChange={updateField("linkedIn")}
          variant="glass"
        />
        <FormField
          id="portfolio"
          label={fields.portfolio.label}
          placeholder={fields.portfolio.placeholder}
          value={formData.portfolio}
          onChange={updateField("portfolio")}
          variant="glass"
        />
      </GlassCard>

      <GlassCard title={sections.background.title} description={sections.background.description}>
        <FormField
          id="currentRole"
          label={fields.currentRole.label}
          placeholder={fields.currentRole.placeholder}
          value={formData.currentRole}
          onChange={updateField("currentRole")}
          variant="glass"
        />
        <FormField
          id="yearsExperience"
          label={fields.yearsExperience.label}
          type="select"
          placeholder={fields.yearsExperience.placeholder}
          options={options.experience}
          value={formData.yearsExperience}
          onChange={updateField("yearsExperience")}
          variant="glass"
        />
        <FormField
          id="areasOfInterest"
          label={fields.areasOfInterest.label}
          type="multiselect"
          helperText={fields.areasOfInterest.helperText}
          options={options.interests}
          required
          value={formData.areasOfInterest}
          onChange={updateField("areasOfInterest")}
          error={errors.areasOfInterest}
          variant="glass"
        />
      </GlassCard>

      <GlassCard title={sections.whyKoeo.title} description={sections.whyKoeo.description}>
        <FormField
          id="whyKoeo"
          label={fields.whyKoeo.label}
          type="textarea"
          placeholder={fields.whyKoeo.placeholder}
          required
          value={formData.whyKoeo}
          onChange={updateField("whyKoeo")}
          error={errors.whyKoeo}
          variant="glass"
        />
        <FormField
          id="whatYouBring"
          label={fields.whatYouBring.label}
          type="textarea"
          placeholder={fields.whatYouBring.placeholder}
          required
          value={formData.whatYouBring}
          onChange={updateField("whatYouBring")}
          error={errors.whatYouBring}
          variant="glass"
        />
      </GlassCard>

      <GlassCard title={sections.resume.title} description={sections.resume.description}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90">
            {fields.resume.label} <span className="text-pink-light">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-describedby={errors.resume ? "resume-error" : undefined}
            />
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200",
                "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10",
                errors.resume && "border-red-400/50"
              )}
            >
              <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-white/60">
                {formData.resumeFileName || fields.resume.placeholder}
              </span>
            </div>
          </div>
          <p className="text-sm text-white/50">{fields.resume.helperText}</p>
          {errors.resume && (
            <p id="resume-error" className="text-sm text-red-300" role="alert">
              {errors.resume}
            </p>
          )}
        </div>
      </GlassCard>

      <GlassCard title={sections.anythingElse.title}>
        <FormField
          id="anythingElse"
          label={fields.anythingElse.label}
          type="textarea"
          placeholder={fields.anythingElse.placeholder}
          value={formData.anythingElse}
          onChange={updateField("anythingElse")}
          variant="glass"
        />
      </GlassCard>

      {formState === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 backdrop-blur-sm" role="alert">
          {content.status.error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={formState === "submitting"}
        className="w-full bg-gradient-to-r from-purple-primary to-magenta text-lg font-semibold shadow-lg shadow-magenta/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-magenta/40"
      >
        {formState === "submitting" ? content.buttons.submitting : content.buttons.submit}
      </Button>
    </form>
  );
}
