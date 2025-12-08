"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import { NetworkBackground } from "@/components/ui/network-background";

export interface SurveyFormData {
  fullName: string;
  email: string;
  organizationName: string;
  role: string;
  segment: string;
  aiUseCase: string;
  workloadTypes: string[];
  currentInfraSources: string[];
  monthlySpend: string;
  workflow: string;
  topPainPoints: string[];
  painNotes: string;
  mostValuableFeatures: string[];
  pilotInterest: string;
  anythingElse: string;
}

export interface BetaFormProps {
  onSubmit?: (data: SurveyFormData) => Promise<void>;
  className?: string;
}

type FormState = "idle" | "applying" | "success" | "error";

const ROLE_OPTIONS = [
  { value: "Student", label: "Student" },
  { value: "Professor / Lecturer", label: "Professor / Lecturer" },
  { value: "Researcher / PI", label: "Researcher / PI" },
  { value: "TA / PhD student", label: "TA / PhD student" },
  { value: "ML Engineer / Data Scientist", label: "ML Engineer / Data Scientist" },
  { value: "AI Startup Founder / Co-founder", label: "AI Startup Founder / Co-founder" },
  { value: "Product Manager / Product Lead", label: "Product Manager / Product Lead" },
  { value: "AI / Data Consultant", label: "AI / Data Consultant" },
  { value: "IT / Infra / DevOps", label: "IT / Infra / DevOps" },
  { value: "Other", label: "Other" },
];

const SEGMENT_OPTIONS = [
  { value: "Education", label: "Education" },
  { value: "Startup / Scaleup", label: "Startup / Scaleup" },
  { value: "Enterprise / Product company", label: "Enterprise / Product company" },
  { value: "Consultancy", label: "Consultancy" },
  { value: "Other", label: "Other" },
];

const WORKLOAD_TYPE_OPTIONS = [
  { value: "Training small/medium models", label: "Training small/medium models" },
  { value: "Fine-tuning", label: "Fine-tuning" },
  { value: "Inference (LLM / RAG / vision)", label: "Inference (LLM / RAG / vision)" },
  { value: "Data preprocessing / ETL", label: "Data preprocessing / ETL" },
  { value: "Prototyping / experimentation only", label: "Prototyping / experimentation only" },
];

const INFRA_SOURCE_OPTIONS = [
  { value: "University / on-prem HPC", label: "University / on-prem HPC" },
  { value: "AWS", label: "AWS" },
  { value: "Azure", label: "Azure" },
  { value: "GCP", label: "GCP" },
  { value: "Specialized GPU clouds (RunPod, Lambda, etc.)", label: "Specialized GPU clouds (RunPod, Lambda, etc.)" },
  { value: "Colab / free tiers", label: "Colab / free tiers" },
  { value: "Personal GPU / workstation", label: "Personal GPU / workstation" },
  { value: "Mostly CPU / no GPU yet", label: "Mostly CPU / no GPU yet" },
  { value: "Other", label: "Other" },
  { value: "Don't know", label: "Don't know" },
];

const MONTHLY_SPEND_OPTIONS = [
  { value: "0–100", label: "$0–100" },
  { value: "100–500", label: "$100–500" },
  { value: "500–2k", label: "$500–2k" },
  { value: "2k–10k", label: "$2k–10k" },
  { value: "10k–50k", label: "$10k–50k" },
  { value: "50k+", label: "$50k+" },
  { value: "Don't know", label: "Don't know" },
];

const PAIN_POINT_OPTIONS = [
  { value: "Capacity / queues", label: "Capacity / queues" },
  { value: "Cost / unpredictable bills", label: "Cost / unpredictable bills" },
  { value: "Environment setup (drivers, CUDA, dependencies)", label: "Environment setup (drivers, CUDA, dependencies)" },
  { value: "Onboarding new people (students, devs)", label: "Onboarding new people (students, devs)" },
  { value: "Hard to deploy models as services", label: "Hard to deploy models as services" },
  { value: "Data residency / compliance", label: "Data residency / compliance" },
  { value: "Many accounts / keys to manage", label: "Many accounts / keys to manage" },
  { value: "Poor observability / usage tracking", label: "Poor observability / usage tracking" },
  { value: "Other", label: "Other" },
];

const VALUABLE_FEATURES_OPTIONS = [
  { value: "OpenAI-compatible API", label: "OpenAI-compatible API" },
  { value: "Canadian / region-specific GPUs", label: "Canadian / region-specific GPUs" },
  { value: "Bring-your-own-model (Hugging Face / custom)", label: "Bring-your-own-model (Hugging Face / custom)" },
  { value: "Per-course / per-team budgets & quotas", label: "Per-course / per-team budgets & quotas" },
  { value: "\"No infra\" (we don't manage GPUs or Kubernetes)", label: "\"No infra\" (we don't manage GPUs or Kubernetes)" },
  { value: "Logs & metrics", label: "Logs & metrics" },
  { value: "SLAs / reliability", label: "SLAs / reliability" },
  { value: "Friendly pricing for education / startups", label: "Friendly pricing for education / startups" },
];

const INITIAL_FORM_DATA: SurveyFormData = {
  fullName: "",
  email: "",
  organizationName: "",
  role: "",
  segment: "",
  aiUseCase: "",
  workloadTypes: [],
  currentInfraSources: [],
  monthlySpend: "",
  workflow: "",
  topPainPoints: [],
  painNotes: "",
  mostValuableFeatures: [],
  pilotInterest: "Yes – ready for pilot", // Default: submitting form = interested in pilot
  anythingElse: "",
};


export function BetaForm({ onSubmit, className }: BetaFormProps) {
  const [formData, setFormData] = useState<SurveyFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const updateField = (field: keyof SurveyFormData) => (value: string | string[]) => {
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
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.role) newErrors.role = "Please select your role";
    if (!formData.segment) newErrors.segment = "Please select your segment";
    if (!formData.aiUseCase.trim()) newErrors.aiUseCase = "Please describe your AI use case";
    if (formData.workloadTypes.length === 0) newErrors.workloadTypes = "Please select at least one workload type";
    if (formData.currentInfraSources.length === 0) newErrors.currentInfraSources = "Please select at least one infrastructure source";
    if (!formData.monthlySpend) newErrors.monthlySpend = "Please select your monthly spend";
    if (!formData.workflow.trim()) newErrors.workflow = "Please describe your workflow";
    if (formData.topPainPoints.length === 0) newErrors.topPainPoints = "Please select at least one pain point";
    if (!formData.painNotes.trim()) newErrors.painNotes = "Please provide some context about your pain points";
    if (formData.mostValuableFeatures.length === 0) newErrors.mostValuableFeatures = "Please select at least one valuable feature";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
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
        if (!response.ok) throw new Error("Failed to apply");
      }
      setFormState("success");
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <section id="beta-form" className={cn("relative py-16 md:py-24", className)}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-12 text-center backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta shadow-lg shadow-magenta/30">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-white">Thanks for sharing your insights!</h3>
            <p className="text-lg text-white/70">
              We&apos;ll review your responses and reach out if you expressed interest in the pilot.
            </p>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section id="beta-form" className={cn("relative py-16 md:py-24 bg-gradient-to-b from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]", className)}>
      {/* Neural Network Background */}
      <NetworkBackground variant="dark" density="normal" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-white via-pink-light to-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
            Tell us about your use case and we&apos;ll be in touch.
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
            <span className="text-lg">🔒</span>
            We won&apos;t share your answers outside our team
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <GlassCard title="About you" description="A bit about who you are and how you'd like us to contact you.">
            <FormField id="fullName" label="Full name" placeholder="Jane Smith" required value={formData.fullName} onChange={updateField("fullName")} error={errors.fullName} variant="glass" />
            <FormField id="email" label="Email" type="email" placeholder="jane@company.com" helperText="We'll only use this to follow up. No spam." required value={formData.email} onChange={updateField("email")} error={errors.email} variant="glass" />
            <FormField id="organizationName" label="Organization name" placeholder="e.g. McGill University, Stealth AI startup" helperText="Where you work or study." value={formData.organizationName} onChange={updateField("organizationName")} variant="glass" />
            <FormField id="role" label="Role / Persona" type="select" placeholder="Select your role" options={ROLE_OPTIONS} required value={formData.role} onChange={updateField("role")} error={errors.role} variant="glass" />
            <FormField id="segment" label="Segment" type="select" placeholder="Select your segment" options={SEGMENT_OPTIONS} required value={formData.segment} onChange={updateField("segment")} error={errors.segment} variant="glass" />
          </GlassCard>

          <GlassCard title="What you're doing with AI" description="A quick snapshot of why you use AI.">
            <FormField id="aiUseCase" label="What are you using AI for?" type="textarea" placeholder="Tell us what you're working on..." helperText="Plain language is perfect." required value={formData.aiUseCase} onChange={updateField("aiUseCase")} error={errors.aiUseCase} variant="glass" />
            <FormField id="workloadTypes" label="Workload types" type="multiselect" helperText="Select all that apply." options={WORKLOAD_TYPE_OPTIONS} required value={formData.workloadTypes} onChange={updateField("workloadTypes")} error={errors.workloadTypes} variant="glass" />
          </GlassCard>

          <GlassCard title="Your current setup" description="How and where your models run today.">
            <FormField id="currentInfraSources" label="Current Infra sources" type="multiselect" helperText="Select all that apply." options={INFRA_SOURCE_OPTIONS} required value={formData.currentInfraSources} onChange={updateField("currentInfraSources")} error={errors.currentInfraSources} variant="glass" />
            <FormField id="monthlySpend" label="Rough monthly AI/GPU spend" type="select" placeholder="Select your spend range" options={MONTHLY_SPEND_OPTIONS} required value={formData.monthlySpend} onChange={updateField("monthlySpend")} error={errors.monthlySpend} variant="glass" />
            <FormField id="workflow" label="How do you work today?" type="textarea" placeholder="e.g. 'Local dev + call OpenAI API'" required value={formData.workflow} onChange={updateField("workflow")} error={errors.workflow} variant="glass" />
          </GlassCard>

          <GlassCard title="Pain points" description="What's hard, annoying, slow, or expensive.">
            <FormField id="topPainPoints" label="Top pain points" type="multiselect" helperText="Focus on the top 2–3 that really hurt." options={PAIN_POINT_OPTIONS} required value={formData.topPainPoints} onChange={updateField("topPainPoints")} error={errors.topPainPoints} variant="glass" />
            <FormField id="painNotes" label="Pain notes" type="textarea" placeholder="Any extra context..." required value={formData.painNotes} onChange={updateField("painNotes")} error={errors.painNotes} variant="glass" />
          </GlassCard>

          <GlassCard title="What would help you most">
            <FormField id="mostValuableFeatures" label="Most valuable features" type="multiselect" helperText="Pick the ones you actually care about." options={VALUABLE_FEATURES_OPTIONS} required value={formData.mostValuableFeatures} onChange={updateField("mostValuableFeatures")} error={errors.mostValuableFeatures} variant="glass" />
            <FormField id="anythingElse" label="Anything else you'd like to share?" type="textarea" placeholder="Edge cases, ideas, concerns, wishlist items..." value={formData.anythingElse} onChange={updateField("anythingElse")} variant="glass" />
          </GlassCard>

          {formState === "error" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 backdrop-blur-sm" role="alert">
              Something went wrong. Please try again.
            </div>
          )}

          <Button type="submit" size="lg" disabled={formState === "applying"} className="w-full bg-gradient-to-r from-purple-primary to-magenta text-lg font-semibold shadow-lg shadow-magenta/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-magenta/40">
            {formState === "applying" ? "Applying..." : "Apply"}
          </Button>
        </form>
      </div>
    </section>
  );
}
