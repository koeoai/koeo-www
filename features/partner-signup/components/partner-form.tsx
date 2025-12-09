"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { useContent } from "@/lib/i18n/use-content";
import type { PartnerFormContent } from "@/content";
import {
  PartnerFormData,
  FormState,
  INITIAL_FORM_DATA,
} from "../constants";

// Re-export types for backward compatibility
export type { PartnerFormData } from "../constants";

export interface PartnerFormProps {
  onSubmit?: (data: PartnerFormData) => Promise<void>;
  className?: string;
}

export function PartnerForm({ onSubmit, className }: PartnerFormProps) {
  const content = useContent<PartnerFormContent>("PARTNER_FORM_CONTENT");
  const [formData, setFormData] = useState<PartnerFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const updateField = (field: keyof PartnerFormData) => (value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { validation } = content;
    
    // Section 1 - About your organization
    if (!formData.partnerName.trim()) newErrors.partnerName = validation.required;
    if (!formData.countryRegion.trim()) newErrors.countryRegion = validation.required;
    
    // Section 2 - Contact details
    if (!formData.contactName.trim()) newErrors.contactName = validation.required;
    if (!formData.contactRole.trim()) newErrors.contactRole = validation.required;
    if (!formData.contactEmail.trim()) newErrors.contactEmail = validation.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = validation.invalidEmail;
    }
    
    // Section 3 - Infrastructure profile
    if (!formData.partnershipType) newErrors.partnershipType = validation.selectOne;
    if (formData.supportedPlatforms.length === 0) newErrors.supportedPlatforms = validation.selectAtLeastOne;
    if (!formData.aiReadiness) newErrors.aiReadiness = validation.selectOne;
    
    // Section 4 - Readiness & next steps
    if (!formData.onboardingTimeline) newErrors.onboardingTimeline = validation.selectOne;
    if (!formData.preferredNextStep) newErrors.preferredNextStep = validation.selectOne;
    
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
        const response = await fetch("/api/partner-signup", {
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

  if (formState === "success") {
    return (
      <section id="provider-cta-form" className={cn("relative py-16 md:py-24", className)}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-xl">
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
        </div>
      </section>
    );
  }

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


  const { sections, fields, options } = content;

  return (
    <section id="provider-cta-form" className={cn("relative py-16 md:py-24", className)}>
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-80 w-80 rounded-full bg-pink-light/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-white via-pink-light to-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {content.subheading}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
            <span className="text-lg">🔒</span>
            {content.status.privacyNotice}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 - About your organization */}
          <GlassCard title={sections.organization.title} description={sections.organization.description}>
            <FormField
              id="partnerName"
              label={fields.partnerName.label}
              placeholder={fields.partnerName.placeholder}
              helperText={fields.partnerName.helperText}
              required
              value={formData.partnerName}
              onChange={updateField("partnerName")}
              error={errors.partnerName}
              variant="glass"
            />
            <FormField
              id="website"
              label={fields.website.label}
              type="text"
              placeholder={fields.website.placeholder}
              helperText={fields.website.helperText}
              value={formData.website}
              onChange={updateField("website")}
              variant="glass"
            />
            <FormField
              id="countryRegion"
              label={fields.countryRegion.label}
              placeholder={fields.countryRegion.placeholder}
              helperText={fields.countryRegion.helperText}
              required
              value={formData.countryRegion}
              onChange={updateField("countryRegion")}
              error={errors.countryRegion}
              variant="glass"
            />
            <FormField
              id="cityLocation"
              label={fields.cityLocation.label}
              placeholder={fields.cityLocation.placeholder}
              helperText={fields.cityLocation.helperText}
              value={formData.cityLocation}
              onChange={updateField("cityLocation")}
              variant="glass"
            />
          </GlassCard>

          {/* Section 2 - Contact details */}
          <GlassCard title={sections.contact.title} description={sections.contact.description}>
            <FormField
              id="contactName"
              label={fields.contactName.label}
              placeholder={fields.contactName.placeholder}
              helperText={fields.contactName.helperText}
              required
              value={formData.contactName}
              onChange={updateField("contactName")}
              error={errors.contactName}
              variant="glass"
            />
            <FormField
              id="contactRole"
              label={fields.contactRole.label}
              placeholder={fields.contactRole.placeholder}
              helperText={fields.contactRole.helperText}
              required
              value={formData.contactRole}
              onChange={updateField("contactRole")}
              error={errors.contactRole}
              variant="glass"
            />
            <FormField
              id="contactEmail"
              label={fields.contactEmail.label}
              type="email"
              placeholder={fields.contactEmail.placeholder}
              helperText={fields.contactEmail.helperText}
              required
              value={formData.contactEmail}
              onChange={updateField("contactEmail")}
              error={errors.contactEmail}
              variant="glass"
            />
            <FormField
              id="contactPhone"
              label={fields.contactPhone.label}
              type="text"
              placeholder={fields.contactPhone.placeholder}
              helperText={fields.contactPhone.helperText}
              value={formData.contactPhone}
              onChange={updateField("contactPhone")}
              variant="glass"
            />
          </GlassCard>


          {/* Section 3 - Infrastructure profile */}
          <GlassCard title={sections.infrastructure.title} description={sections.infrastructure.description}>
            <FormField
              id="partnershipType"
              label={fields.partnershipType.label}
              type="select"
              placeholder={fields.partnershipType.placeholder}
              helperText={fields.partnershipType.helperText}
              options={options.partnershipTypes}
              required
              value={formData.partnershipType}
              onChange={updateField("partnershipType")}
              error={errors.partnershipType}
              variant="glass"
            />
            <FormField
              id="capacityMw"
              label={fields.capacityMw.label}
              type="text"
              placeholder={fields.capacityMw.placeholder}
              helperText={fields.capacityMw.helperText}
              value={formData.capacityMw}
              onChange={updateField("capacityMw")}
              variant="glass"
            />
            <FormField
              id="supportedPlatforms"
              label={fields.supportedPlatforms.label}
              type="multiselect"
              helperText={fields.supportedPlatforms.helperText}
              options={options.supportedPlatforms}
              required
              value={formData.supportedPlatforms}
              onChange={updateField("supportedPlatforms")}
              error={errors.supportedPlatforms}
              variant="glass"
            />
            <FormField
              id="aiReadiness"
              label={fields.aiReadiness.label}
              type="select"
              placeholder={fields.aiReadiness.placeholder}
              helperText={fields.aiReadiness.helperText}
              options={options.aiReadiness}
              required
              value={formData.aiReadiness}
              onChange={updateField("aiReadiness")}
              error={errors.aiReadiness}
              variant="glass"
            />
            <FormField
              id="infraDetails"
              label={fields.infraDetails.label}
              type="textarea"
              placeholder={fields.infraDetails.placeholder}
              helperText={fields.infraDetails.helperText}
              value={formData.infraDetails}
              onChange={updateField("infraDetails")}
              variant="glass"
            />
          </GlassCard>

          {/* Section 4 - Readiness & next steps */}
          <GlassCard title={sections.readiness.title} description={sections.readiness.description}>
            <FormField
              id="onboardingTimeline"
              label={fields.onboardingTimeline.label}
              type="select"
              placeholder={fields.onboardingTimeline.placeholder}
              helperText={fields.onboardingTimeline.helperText}
              options={options.onboardingTimeline}
              required
              value={formData.onboardingTimeline}
              onChange={updateField("onboardingTimeline")}
              error={errors.onboardingTimeline}
              variant="glass"
            />
            <FormField
              id="goals"
              label={fields.goals.label}
              type="textarea"
              placeholder={fields.goals.placeholder}
              helperText={fields.goals.helperText}
              value={formData.goals}
              onChange={updateField("goals")}
              variant="glass"
            />
            <FormField
              id="preferredNextStep"
              label={fields.preferredNextStep.label}
              type="select"
              placeholder={fields.preferredNextStep.placeholder}
              helperText={fields.preferredNextStep.helperText}
              options={options.preferredNextStep}
              required
              value={formData.preferredNextStep}
              onChange={updateField("preferredNextStep")}
              error={errors.preferredNextStep}
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
      </div>
    </section>
  );
}
