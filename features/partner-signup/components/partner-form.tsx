"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import {
  PartnerFormData,
  FormState,
  INITIAL_FORM_DATA,
  PARTNERSHIP_TYPE_OPTIONS,
  SUPPORTED_PLATFORMS_OPTIONS,
  AI_READINESS_OPTIONS,
  ONBOARDING_TIMELINE_OPTIONS,
  PREFERRED_NEXT_STEP_OPTIONS,
} from "../constants";

// Re-export types for backward compatibility
export type { PartnerFormData } from "../constants";

export interface PartnerFormProps {
  onSubmit?: (data: PartnerFormData) => Promise<void>;
  className?: string;
}

export function PartnerForm({ onSubmit, className }: PartnerFormProps) {
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
    
    // Section 1 - About your organization
    if (!formData.partnerName.trim()) newErrors.partnerName = "Organization name is required";
    if (!formData.countryRegion.trim()) newErrors.countryRegion = "Country / region is required";
    
    // Section 2 - Contact details
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!formData.contactRole.trim()) newErrors.contactRole = "Role / title is required";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email";
    }
    
    // Section 3 - Infrastructure profile
    if (!formData.partnershipType) newErrors.partnershipType = "Please select a partnership type";
    if (formData.supportedPlatforms.length === 0) newErrors.supportedPlatforms = "Please select at least one platform";
    if (!formData.aiReadiness) newErrors.aiReadiness = "Please select your AI readiness level";
    
    // Section 4 - Readiness & next steps
    if (!formData.onboardingTimeline) newErrors.onboardingTimeline = "Please select a timeline";
    if (!formData.preferredNextStep) newErrors.preferredNextStep = "Please select your preferred next step";
    
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
            <h3 className="mb-3 text-2xl font-bold text-white">Thanks for reaching out!</h3>
            <p className="text-lg text-white/70">
              We&apos;ll review your information and get back to you based on your preferred next step.
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


  return (
    <section id="provider-cta-form" className={cn("relative py-16 md:py-24", className)}>
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-magenta/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-80 w-80 rounded-full bg-pink-light/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-white via-pink-light to-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            Ready to join the network?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Fill out the form below and we&apos;ll be in touch to discuss partnership opportunities.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
            <span className="text-lg">🔒</span>
            We won&apos;t share your information outside our team
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 - About your organization */}
          <GlassCard title="About your organization" description="Who are you, and where are you based?">
            <FormField
              id="partnerName"
              label="Organization / partner name"
              placeholder="Example: HydroCloud DC Montreal"
              helperText="Your company or organization name."
              required
              value={formData.partnerName}
              onChange={updateField("partnerName")}
              error={errors.partnerName}
              variant="glass"
            />
            <FormField
              id="website"
              label="Website"
              type="text"
              placeholder="https://yourcompany.com"
              helperText="Main website or landing page, if available."
              value={formData.website}
              onChange={updateField("website")}
              variant="glass"
            />
            <FormField
              id="countryRegion"
              label="Country / region"
              placeholder="Canada – Quebec"
              helperText="Where your main facility or operations relevant to KOEO are located."
              required
              value={formData.countryRegion}
              onChange={updateField("countryRegion")}
              error={errors.countryRegion}
              variant="glass"
            />
            <FormField
              id="cityLocation"
              label="City / facility location"
              placeholder="Montreal or Toronto DC1"
              helperText="City and, if relevant, the specific facility or site."
              value={formData.cityLocation}
              onChange={updateField("cityLocation")}
              variant="glass"
            />
          </GlassCard>

          {/* Section 2 - Contact details */}
          <GlassCard title="Contact details" description="Who should KOEO talk to?">
            <FormField
              id="contactName"
              label="Your name"
              placeholder="Jane Doe"
              helperText="Main point of contact for this partnership."
              required
              value={formData.contactName}
              onChange={updateField("contactName")}
              error={errors.contactName}
              variant="glass"
            />
            <FormField
              id="contactRole"
              label="Your role / title"
              placeholder="CTO, Datacenter Ops Lead, Founder…"
              helperText="Your position in the organization."
              required
              value={formData.contactRole}
              onChange={updateField("contactRole")}
              error={errors.contactRole}
              variant="glass"
            />
            <FormField
              id="contactEmail"
              label="Work email"
              type="email"
              placeholder="name@yourcompany.com"
              helperText="We'll use this to follow up about KOEO partnership details."
              required
              value={formData.contactEmail}
              onChange={updateField("contactEmail")}
              error={errors.contactEmail}
              variant="glass"
            />
            <FormField
              id="contactPhone"
              label="Phone"
              type="text"
              placeholder="+1 514 555 1234"
              helperText="Only if you prefer a quick call. Include country code."
              value={formData.contactPhone}
              onChange={updateField("contactPhone")}
              variant="glass"
            />
          </GlassCard>


          {/* Section 3 - Infrastructure profile */}
          <GlassCard title="Infrastructure profile" description="Understand what kind of infra / capacity you have.">
            <FormField
              id="partnershipType"
              label="Partnership type"
              type="select"
              placeholder="Select one…"
              helperText="Select the option that best describes how you'd work with KOEO."
              options={[...PARTNERSHIP_TYPE_OPTIONS]}
              required
              value={formData.partnershipType}
              onChange={updateField("partnershipType")}
              error={errors.partnershipType}
              variant="glass"
            />
            <FormField
              id="capacityMw"
              label="Capacity available (MW)"
              type="text"
              placeholder="1 or 2.5"
              helperText="Rough estimate of power capacity you could allocate to AI workloads. A ballpark is fine."
              value={formData.capacityMw}
              onChange={updateField("capacityMw")}
              variant="glass"
            />
            <FormField
              id="supportedPlatforms"
              label="Supported platforms / services"
              type="multiselect"
              helperText="What types of infrastructure or services do you currently offer or plan to offer?"
              options={[...SUPPORTED_PLATFORMS_OPTIONS]}
              required
              value={formData.supportedPlatforms}
              onChange={updateField("supportedPlatforms")}
              error={errors.supportedPlatforms}
              variant="glass"
            />
            <FormField
              id="aiReadiness"
              label="How mature is your infrastructure for AI workloads?"
              type="select"
              placeholder="Select one…"
              helperText="This helps us understand how quickly we can collaborate."
              options={[...AI_READINESS_OPTIONS]}
              required
              value={formData.aiReadiness}
              onChange={updateField("aiReadiness")}
              error={errors.aiReadiness}
              variant="glass"
            />
            <FormField
              id="infraDetails"
              label="Tell us about your infrastructure"
              type="textarea"
              placeholder="We operate a 5 MW hydro-powered facility near Montreal with Tier 1 connectivity and are adding racks with NVIDIA and AMD GPUs…"
              helperText="2–4 sentences about power, cooling, network, GPU types, regions, or anything else relevant."
              value={formData.infraDetails}
              onChange={updateField("infraDetails")}
              variant="glass"
            />
          </GlassCard>

          {/* Section 4 - Readiness & next steps */}
          <GlassCard title="Readiness & next steps" description="Qualify timeline and align on how to engage.">
            <FormField
              id="onboardingTimeline"
              label="How soon could you onboard KOEO workloads?"
              type="select"
              placeholder="Select one…"
              helperText="Even a rough estimate is helpful for planning."
              options={[...ONBOARDING_TIMELINE_OPTIONS]}
              required
              value={formData.onboardingTimeline}
              onChange={updateField("onboardingTimeline")}
              error={errors.onboardingTimeline}
              variant="glass"
            />
            <FormField
              id="goals"
              label="What are you hoping KOEO can help with?"
              type="textarea"
              placeholder="We'd like to attract AI customers to our Quebec facility and offer them a reliable GPU platform without building all the software ourselves…"
              helperText="Share your main goals: filling GPU capacity, attracting AI customers, compliance positioning, regional focus, etc."
              value={formData.goals}
              onChange={updateField("goals")}
              variant="glass"
            />
            <FormField
              id="preferredNextStep"
              label="Preferred next step"
              type="select"
              placeholder="Select one…"
              helperText="Tell us how you'd like to start the conversation."
              options={[...PREFERRED_NEXT_STEP_OPTIONS]}
              required
              value={formData.preferredNextStep}
              onChange={updateField("preferredNextStep")}
              error={errors.preferredNextStep}
              variant="glass"
            />
          </GlassCard>

          {formState === "error" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 backdrop-blur-sm" role="alert">
              Something went wrong. Please try again.
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={formState === "submitting"}
            className="w-full bg-gradient-to-r from-purple-primary to-magenta text-lg font-semibold shadow-lg shadow-magenta/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-magenta/40"
          >
            {formState === "submitting" ? "Submitting..." : "Join our network"}
          </Button>
        </form>
      </div>
    </section>
  );
}
