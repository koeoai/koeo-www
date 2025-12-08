"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";
import { SurveyFormData } from "../constants";
import { useBetaForm } from "../hooks";
import {
  AboutYouSection,
  AiUsageSection,
  CurrentSetupSection,
  PainPointsSection,
  FeaturesSection,
} from "./index";

// Re-export types for backward compatibility
export type { SurveyFormData } from "../constants";

export interface BetaFormProps {
  onSubmit?: (data: SurveyFormData) => Promise<void>;
  className?: string;
}

export function BetaForm({ onSubmit, className }: BetaFormProps) {
  const {
    formData,
    errors,
    formState,
    updateField,
    handleSubmit,
  } = useBetaForm({ onSubmit });

  // Generic field change handler that works with section components
  const onFieldChange = (field: string) => (value: string | string[]) => {
    updateField(field as keyof SurveyFormData)(value);
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
      <NetworkBackground variant="dark" density="normal" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          <AboutYouSection
            fullName={formData.fullName}
            email={formData.email}
            organizationName={formData.organizationName}
            role={formData.role}
            segment={formData.segment}
            errors={errors}
            onFieldChange={onFieldChange}
          />

          <AiUsageSection
            aiUseCase={formData.aiUseCase}
            workloadTypes={formData.workloadTypes}
            errors={errors}
            onFieldChange={onFieldChange}
          />

          <CurrentSetupSection
            currentInfraSources={formData.currentInfraSources}
            monthlySpend={formData.monthlySpend}
            workflow={formData.workflow}
            errors={errors}
            onFieldChange={onFieldChange}
          />

          <PainPointsSection
            topPainPoints={formData.topPainPoints}
            painNotes={formData.painNotes}
            errors={errors}
            onFieldChange={onFieldChange}
          />

          <FeaturesSection
            mostValuableFeatures={formData.mostValuableFeatures}
            anythingElse={formData.anythingElse}
            errors={errors}
            onFieldChange={onFieldChange}
          />

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
