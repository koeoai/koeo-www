"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import { PAIN_POINT_OPTIONS } from "../constants";

export interface PainPointsSectionProps {
  topPainPoints: string[];
  painNotes: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
}

export function PainPointsSection({
  topPainPoints,
  painNotes,
  errors,
  onFieldChange,
}: PainPointsSectionProps) {
  return (
    <GlassCard
      title="Pain points"
      description="What's hard, annoying, slow, or expensive."
    >
      <FormField
        id="topPainPoints"
        label="Top pain points"
        type="multiselect"
        helperText="Focus on the top 2–3 that really hurt."
        options={[...PAIN_POINT_OPTIONS]}
        required
        value={topPainPoints}
        onChange={onFieldChange("topPainPoints")}
        error={errors.topPainPoints}
        variant="glass"
      />
      <FormField
        id="painNotes"
        label="Pain notes"
        type="textarea"
        placeholder="Any extra context..."
        required
        value={painNotes}
        onChange={onFieldChange("painNotes")}
        error={errors.painNotes}
        variant="glass"
      />
    </GlassCard>
  );
}
