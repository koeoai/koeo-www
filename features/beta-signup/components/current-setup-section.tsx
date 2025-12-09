"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import type { BetaFormContent } from "@/content";

export interface CurrentSetupSectionProps {
  currentInfraSources: string[];
  monthlySpend: string;
  workflow: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
  content: BetaFormContent;
}

export function CurrentSetupSection({
  currentInfraSources,
  monthlySpend,
  workflow,
  errors,
  onFieldChange,
  content,
}: CurrentSetupSectionProps) {
  const { sections, fields, options } = content;

  return (
    <GlassCard
      title={sections.currentSetup.title}
      description={sections.currentSetup.description}
    >
      <FormField
        id="currentInfraSources"
        label={fields.currentInfraSources.label}
        type="multiselect"
        helperText={fields.currentInfraSources.helperText}
        options={options.infraSources}
        required
        value={currentInfraSources}
        onChange={onFieldChange("currentInfraSources")}
        error={errors.currentInfraSources}
        variant="glass"
      />
      <FormField
        id="monthlySpend"
        label={fields.monthlySpend.label}
        type="select"
        placeholder={fields.monthlySpend.placeholder}
        options={options.monthlySpend}
        required
        value={monthlySpend}
        onChange={onFieldChange("monthlySpend")}
        error={errors.monthlySpend}
        variant="glass"
      />
      <FormField
        id="workflow"
        label={fields.workflow.label}
        type="textarea"
        placeholder={fields.workflow.placeholder}
        required
        value={workflow}
        onChange={onFieldChange("workflow")}
        error={errors.workflow}
        variant="glass"
      />
    </GlassCard>
  );
}
