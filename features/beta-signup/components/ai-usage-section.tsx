"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import { WORKLOAD_TYPE_OPTIONS } from "../constants";

export interface AiUsageSectionProps {
  aiUseCase: string;
  workloadTypes: string[];
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
}

export function AiUsageSection({
  aiUseCase,
  workloadTypes,
  errors,
  onFieldChange,
}: AiUsageSectionProps) {
  return (
    <GlassCard
      title="What you're doing with AI"
      description="A quick snapshot of why you use AI."
    >
      <FormField
        id="aiUseCase"
        label="What are you using AI for?"
        type="textarea"
        placeholder="Tell us what you're working on..."
        helperText="Plain language is perfect."
        required
        value={aiUseCase}
        onChange={onFieldChange("aiUseCase")}
        error={errors.aiUseCase}
        variant="glass"
      />
      <FormField
        id="workloadTypes"
        label="Workload types"
        type="multiselect"
        helperText="Select all that apply."
        options={[...WORKLOAD_TYPE_OPTIONS]}
        required
        value={workloadTypes}
        onChange={onFieldChange("workloadTypes")}
        error={errors.workloadTypes}
        variant="glass"
      />
    </GlassCard>
  );
}
