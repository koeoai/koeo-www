"use client";

import { FormField } from "@/components/ui/form-field";
import { GlassCard } from "@/components/ui/glass-card";
import type { BetaFormContent } from "@/content";

export interface AboutYouSectionProps {
  fullName: string;
  email: string;
  organizationName: string;
  role: string;
  segment: string;
  errors: Record<string, string>;
  onFieldChange: (field: string) => (value: string | string[]) => void;
  content: BetaFormContent;
}

export function AboutYouSection({
  fullName,
  email,
  organizationName,
  role,
  segment,
  errors,
  onFieldChange,
  content,
}: AboutYouSectionProps) {
  const { sections, fields, options } = content;

  return (
    <GlassCard
      title={sections.aboutYou.title}
      description={sections.aboutYou.description}
    >
      <FormField
        id="fullName"
        label={fields.fullName.label}
        placeholder={fields.fullName.placeholder}
        required
        value={fullName}
        onChange={onFieldChange("fullName")}
        error={errors.fullName}
        variant="glass"
      />
      <FormField
        id="email"
        label={fields.email.label}
        type="email"
        placeholder={fields.email.placeholder}
        helperText={fields.email.helperText}
        required
        value={email}
        onChange={onFieldChange("email")}
        error={errors.email}
        variant="glass"
      />
      <FormField
        id="organizationName"
        label={fields.organizationName.label}
        placeholder={fields.organizationName.placeholder}
        helperText={fields.organizationName.helperText}
        value={organizationName}
        onChange={onFieldChange("organizationName")}
        variant="glass"
      />
      <FormField
        id="role"
        label={fields.role.label}
        type="select"
        placeholder={fields.role.placeholder}
        options={options.roles}
        required
        value={role}
        onChange={onFieldChange("role")}
        error={errors.role}
        variant="glass"
      />
      <FormField
        id="segment"
        label={fields.segment.label}
        type="select"
        placeholder={fields.segment.placeholder}
        options={options.segments}
        required
        value={segment}
        onChange={onFieldChange("segment")}
        error={errors.segment}
        variant="glass"
      />
    </GlassCard>
  );
}
