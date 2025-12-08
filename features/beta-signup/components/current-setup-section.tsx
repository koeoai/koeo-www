"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import { INFRA_SOURCE_OPTIONS, MONTHLY_SPEND_OPTIONS } from "../constants";

export interface CurrentSetupSectionProps {
  currentInfraSources: string[];
  monthlySpend: string;
  workflow: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
}

export function CurrentSetupSection({
  currentInfraSources,
  monthlySpend,
  workflow,
  errors,
  onFieldChange,
}: CurrentSetupSectionProps) {
  return (
    <GlassCard
      title="Your current setup"
      description="How and where your models run today."
    >
      <FormField
        id="currentInfraSources"
        label="Current Infra sources"
        type="multiselect"
        helperText="Select all that apply."
        options={[...INFRA_SOURCE_OPTIONS]}
        required
        value={currentInfraSources}
        onChange={onFieldChange("currentInfraSources")}
        error={errors.currentInfraSources}
        variant="glass"
      />
      <FormField
        id="monthlySpend"
        label="Rough monthly AI/GPU spend"
        type="select"
        placeholder="Select your spend range"
        options={[...MONTHLY_SPEND_OPTIONS]}
        required
        value={monthlySpend}
        onChange={onFieldChange("monthlySpend")}
        error={errors.monthlySpend}
        variant="glass"
      />
      <FormField
        id="workflow"
        label="How do you work today?"
        type="textarea"
        placeholder="e.g. 'Local dev + call OpenAI API'"
        required
        value={workflow}
        onChange={onFieldChange("workflow")}
        error={errors.workflow}
        variant="glass"
      />
    </GlassCard>
  );
}
