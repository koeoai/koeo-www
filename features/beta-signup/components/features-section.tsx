"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import type { BetaFormContent } from "@/content";

export interface FeaturesSectionProps {
  mostValuableFeatures: string[];
  anythingElse: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
  content: BetaFormContent;
}

export function FeaturesSection({
  mostValuableFeatures,
  anythingElse,
  errors,
  onFieldChange,
  content,
}: FeaturesSectionProps) {
  const { sections, fields, options } = content;

  return (
    <GlassCard title={sections.features.title}>
      <FormField
        id="mostValuableFeatures"
        label={fields.mostValuableFeatures.label}
        type="multiselect"
        helperText={fields.mostValuableFeatures.helperText}
        options={options.valuableFeatures}
        required
        value={mostValuableFeatures}
        onChange={onFieldChange("mostValuableFeatures")}
        error={errors.mostValuableFeatures}
        variant="glass"
      />
      <FormField
        id="anythingElse"
        label={fields.anythingElse.label}
        type="textarea"
        placeholder={fields.anythingElse.placeholder}
        value={anythingElse}
        onChange={onFieldChange("anythingElse")}
        variant="glass"
      />
    </GlassCard>
  );
}
