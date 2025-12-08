"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import type { BetaFormContent } from "@/content";

export interface AiUsageSectionProps {
  aiUseCase: string;
  workloadTypes: string[];
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
  content: BetaFormContent;
}

export function AiUsageSection({
  aiUseCase,
  workloadTypes,
  errors,
  onFieldChange,
  content,
}: AiUsageSectionProps) {
  const { sections, fields, options } = content;

  return (
    <GlassCard
      title={sections.aiUsage.title}
      description={sections.aiUsage.description}
    >
      <FormField
        id="aiUseCase"
        label={fields.aiUseCase.label}
        type="textarea"
        placeholder={fields.aiUseCase.placeholder}
        helperText={fields.aiUseCase.helperText}
        required
        value={aiUseCase}
        onChange={onFieldChange("aiUseCase")}
        error={errors.aiUseCase}
        variant="glass"
      />
      <FormField
        id="workloadTypes"
        label={fields.workloadTypes.label}
        type="multiselect"
        helperText={fields.workloadTypes.helperText}
        options={options.workloadTypes}
        required
        value={workloadTypes}
        onChange={onFieldChange("workloadTypes")}
        error={errors.workloadTypes}
        variant="glass"
      />
    </GlassCard>
  );
}
