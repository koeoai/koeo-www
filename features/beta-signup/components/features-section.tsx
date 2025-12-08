"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import { VALUABLE_FEATURES_OPTIONS } from "../constants";

export interface FeaturesSectionProps {
  mostValuableFeatures: string[];
  anythingElse: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
}

export function FeaturesSection({
  mostValuableFeatures,
  anythingElse,
  errors,
  onFieldChange,
}: FeaturesSectionProps) {
  return (
    <GlassCard title="What would help you most">
      <FormField
        id="mostValuableFeatures"
        label="Most valuable features"
        type="multiselect"
        helperText="Pick the ones you actually care about."
        options={[...VALUABLE_FEATURES_OPTIONS]}
        required
        value={mostValuableFeatures}
        onChange={onFieldChange("mostValuableFeatures")}
        error={errors.mostValuableFeatures}
        variant="glass"
      />
      <FormField
        id="anythingElse"
        label="Anything else you'd like to share?"
        type="textarea"
        placeholder="Edge cases, ideas, concerns, wishlist items..."
        value={anythingElse}
        onChange={onFieldChange("anythingElse")}
        variant="glass"
      />
    </GlassCard>
  );
}
