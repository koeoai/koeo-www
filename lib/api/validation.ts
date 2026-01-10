/**
 * API validation schemas using Zod
 * Provides type-safe validation for all API endpoints
 */

import { z } from "zod";

// Common validation patterns
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email is too long");

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long")
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Name contains invalid characters");

const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .max(2048, "URL is too long")
  .optional()
  .or(z.literal(""));

const phoneSchema = z
  .string()
  .regex(/^[+]?[\d\s()-]{7,20}$/, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""));

// Beta signup validation schema (matches BetaSignupInput in lib/airtable/tables.ts)
export const betaSignupSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  organizationName: z.string().max(200, "Organization name is too long").optional(),
  role: z.string().min(1, "Role is required").max(100, "Role is too long"),
  segment: z.string().max(100, "Segment is too long"),
  aiUseCase: z
    .string()
    .min(10, "Please provide more detail about your AI use case")
    .max(2000, "Use case description is too long"),
  workloadTypes: z.array(z.string().max(100)).max(20, "Too many workload types"),
  currentInfraSources: z.array(z.string().max(100)).max(20, "Too many sources"),
  monthlySpend: z.string().max(100, "Invalid spend value"),
  workflow: z.string().max(2000, "Workflow description is too long"),
  topPainPoints: z.array(z.string().max(200)).max(20, "Too many pain points"),
  painNotes: z.string().max(2000, "Pain notes are too long"),
  mostValuableFeatures: z.array(z.string().max(200)).max(20, "Too many features"),
  pilotInterest: z.string().max(100, "Invalid pilot interest value").optional(),
  anythingElse: z.string().max(3000, "Response is too long").optional(),
});

export type BetaSignupData = z.infer<typeof betaSignupSchema>;

// Career application validation schema
export const careerApplicationSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  linkedIn: urlSchema,
  portfolio: urlSchema,
  currentRole: z.string().max(100, "Role is too long").optional(),
  yearsExperience: z.string().max(50, "Invalid experience value").optional(),
  areasOfInterest: z
    .array(z.string().max(100))
    .min(1, "Please select at least one area of interest")
    .max(10, "Too many areas selected"),
  whyKoeo: z
    .string()
    .min(20, "Please provide more detail (at least 20 characters)")
    .max(3000, "Response is too long"),
  whatYouBring: z
    .string()
    .min(20, "Please provide more detail (at least 20 characters)")
    .max(3000, "Response is too long"),
  resumeFileName: z.string().max(255).optional(),
  resumeBase64: z.string().max(10_000_000).optional(), // ~7.5MB after base64 encoding
  anythingElse: z.string().max(2000, "Response is too long").optional(),
});

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;

// Partner signup validation schema (matches PartnerSignupInput in lib/airtable/tables.ts)
export const partnerSignupSchema = z.object({
  partnerName: z.string().min(1, "Partner name is required").max(200, "Partner name is too long"),
  website: urlSchema,
  countryRegion: z.string().min(1, "Country/Region is required").max(100, "Country/Region is too long"),
  cityLocation: z.string().max(200, "City/Location is too long").optional(),
  contactName: nameSchema,
  contactRole: z.string().min(1, "Contact role is required").max(100, "Contact role is too long"),
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  partnershipType: z.string().min(1, "Partnership type is required").max(100, "Partnership type is too long"),
  capacityMw: z.string().max(50, "Invalid capacity value").optional(),
  supportedPlatforms: z.array(z.string().max(100)).max(20, "Too many platforms"),
  aiReadiness: z.string().min(1, "AI readiness is required").max(200, "AI readiness is too long"),
  infraDetails: z.string().max(3000, "Infrastructure details are too long").optional(),
  onboardingTimeline: z.string().min(1, "Onboarding timeline is required").max(200, "Timeline is too long"),
  goals: z.string().max(3000, "Goals description is too long").optional(),
  preferredNextStep: z.string().min(1, "Preferred next step is required").max(200, "Next step is too long"),
});

export type PartnerSignupData = z.infer<typeof partnerSignupSchema>;

/**
 * Validate request data against a schema
 * Returns validated data or throws ZodError
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}

/**
 * Safe validation that returns result object instead of throwing
 */
export function safeValidateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors = result.error.issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`
  );
  
  return { success: false, errors };
}
