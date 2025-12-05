/**
 * Airtable table configurations with type-safe field mappings
 */

import type { AirtableAttachment } from "./client";

// Table names - centralized, no more magic strings
export const TABLES = {
  BETA_SIGNUPS: "User Feedback",
  PARTNERS: "Partners", 
  CAREER_APPLICATIONS: "Career Applications",
} as const;

// Helper to get current date in MM/DD/YYYY format
export function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

// ============================================
// Beta Signup
// ============================================

export interface BetaSignupInput {
  fullName: string;
  email: string;
  organizationName?: string;
  role: string;
  segment: string;
  aiUseCase: string;
  workloadTypes: string[];
  currentInfraSources: string[];
  monthlySpend: string;
  workflow: string;
  topPainPoints: string[];
  painNotes: string;
  mostValuableFeatures: string[];
  pilotInterest?: string;
  anythingElse?: string;
}

export function mapBetaSignupFields(input: BetaSignupInput): Record<string, unknown> {
  return {
    "Name": input.fullName,
    "Email": input.email,
    "Organization Name": input.organizationName || "",
    "Role / Persona": input.role,
    "Segment": input.segment,
    "What are you using (or planning to use) AI for?": input.aiUseCase,
    "Workload Types": input.workloadTypes,
    "Current Infra Sources": input.currentInfraSources,
    "Rough Monthly AI/GPU Spend": input.monthlySpend,
    "How do you work today? (workflow)": input.workflow,
    "Top Pain Points": input.topPainPoints,
    "Pain – Notes": input.painNotes,
    "Most Valuable Features": input.mostValuableFeatures,
    "Pilot Interest": input.pilotInterest || "Yes – ready for pilot",
    "Could become": ["Beta tester only", "Lead / Customer", "Design Partner"],
    "Next Step": "Book call / demo",
    "Beta Status": "Applied for Beta",
    "Beta Application Date": formatDate(),
    "Raw Notes": input.anythingElse || "",
  };
}

// ============================================
// Partner Signup
// ============================================

export interface PartnerSignupInput {
  partnerName: string;
  website?: string;
  countryRegion: string;
  cityLocation?: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone?: string;
  partnershipType: string;
  capacityMw?: string;
  supportedPlatforms: string[];
  aiReadiness: string;
  infraDetails?: string;
  onboardingTimeline: string;
  goals?: string;
  preferredNextStep: string;
}

export function mapPartnerSignupFields(input: PartnerSignupInput): Record<string, unknown> {
  return {
    "Partner Name": input.partnerName,
    "Website": input.website || "",
    "Country / Region": input.countryRegion,
    "City / Facility Location": input.cityLocation || "",
    "Contact Name": input.contactName,
    "Contact Role / Title": input.contactRole,
    "Contact Email": input.contactEmail,
    "Contact Phone": input.contactPhone || "",
    "Partnership Type": input.partnershipType,
    "Capacity Available (MW)": input.capacityMw ? parseFloat(input.capacityMw) : null,
    "Supported Platforms / Services": input.supportedPlatforms,
    "AI Readiness / Current Use": input.aiReadiness,
    "Infrastructure Details (Partner)": input.infraDetails || "",
    "How soon could you onboard KOEO workloads?": input.onboardingTimeline,
    "What are you hoping KOEO can help with?": input.goals || "",
    "Preferred next step": input.preferredNextStep,
    "Status": "New",
    "Source": "Website form",
  };
}

// ============================================
// Career Application
// ============================================

export interface CareerApplicationInput {
  fullName: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  currentRole?: string;
  yearsExperience?: string;
  areasOfInterest: string[];
  whyKoeo: string;
  whatYouBring: string;
  resumeAttachment?: AirtableAttachment[];
  anythingElse?: string;
}

export function mapCareerApplicationFields(input: CareerApplicationInput): Record<string, unknown> {
  const fields: Record<string, unknown> = {
    "Full Name": input.fullName,
    "Email": input.email,
    "Areas of Interest": input.areasOfInterest,
    "Why Koeo": input.whyKoeo,
    "What You Bring": input.whatYouBring,
    "Status": "New",
    "Application Date": formatDate(),
    "Source": "Website form",
  };

  // Text fields - can be empty strings
  if (input.phone) fields["Phone"] = input.phone;
  if (input.linkedIn) fields["LinkedIn"] = input.linkedIn;
  if (input.portfolio) fields["Portfolio / GitHub"] = input.portfolio;
  if (input.currentRole) fields["Current Role"] = input.currentRole;
  if (input.anythingElse) fields["Additional Notes"] = input.anythingElse;

  // Single-select field - only include if has value (can't be empty string)
  if (input.yearsExperience) fields["Years of Experience"] = input.yearsExperience;

  // Attachment field
  if (input.resumeAttachment && input.resumeAttachment.length > 0) {
    fields["Resume"] = input.resumeAttachment;
  }

  return fields;
}
