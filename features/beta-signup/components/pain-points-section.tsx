"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import type { BetaFormContent } from "@/content";

export interface PainPointsSectionProps {
  topPainPoints: string[];
  painNotes: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
  content: BetaFormContent;
}

export function PainPointsSection({
  topPainPoints,
  painNotes,
  errors,
  onFieldChange,
  content,
}: PainPointsSectionProps) {
  const { sections, fields, options } = content;

  return (
    <GlassCard
      title={sections.painPoints.title}
      description={sections.painPoints.description}
    >
      <FormField
        id="topPainPoints"
        label={fields.topPainPoints.label}
        type="multiselect"
        helperText={fields.topPainPoints.helperText}
        options={options.painPoints}
        required
        value={topPainPoints}
        onChange={onFieldChange("topPainPoints")}
        error={errors.topPainPoints}
        variant="glass"
      />
      <FormField
        id="painNotes"
        label={fields.painNotes.label}
        type="textarea"
        placeholder={fields.painNotes.placeholder}
        required
        value={painNotes}
        onChange={onFieldChange("painNotes")}
        error={errors.painNotes}
        variant="glass"
      />
    </GlassCard>
  );
}
