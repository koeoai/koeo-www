"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import { ROLE_OPTIONS, SEGMENT_OPTIONS } from "../constants";

export interface AboutYouSectionProps {
  fullName: string;
  email: string;
  organizationName: string;
  role: string;
  segment: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
}

export function AboutYouSection({
  fullName,
  email,
  organizationName,
  role,
  segment,
  errors,
  onFieldChange,
}: AboutYouSectionProps) {
  return (
    <GlassCard
      title="About you"
      description="A bit about who you are and how you'd like us to contact you."
    >
      <FormField
        id="fullName"
        label="Full name"
        placeholder="Jane Smith"
        required
        value={fullName}
        onChange={onFieldChange("fullName")}
        error={errors.fullName}
        variant="glass"
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="jane@company.com"
        helperText="We'll only use this to follow up. No spam."
        required
        value={email}
        onChange={onFieldChange("email")}
        error={errors.email}
        variant="glass"
      />
      <FormField
        id="organizationName"
        label="Organization name"
        placeholder="e.g. McGill University, Stealth AI startup"
        helperText="Where you work or study."
        value={organizationName}
        onChange={onFieldChange("organizationName")}
        variant="glass"
      />
      <FormField
        id="role"
        label="Role / Persona"
        type="select"
        placeholder="Select your role"
        options={[...ROLE_OPTIONS]}
        required
        value={role}
        onChange={onFieldChange("role")}
        error={errors.role}
        variant="glass"
      />
      <FormField
        id="segment"
        label="Segment"
        type="select"
        placeholder="Select your segment"
        options={[...SEGMENT_OPTIONS]}
        required
        value={segment}
        onChange={onFieldChange("segment")}
        error={errors.segment}
        variant="glass"
      />
    </GlassCard>
  );
}
