export interface PartnerFormData {
  partnerName: string;
  website: string;
  countryRegion: string;
  cityLocation: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  partnershipType: string;
  capacityMw: string;
  supportedPlatforms: string[];
  aiReadiness: string;
  infraDetails: string;
  onboardingTimeline: string;
  goals: string;
  preferredNextStep: string;
}

export type FormState = "idle" | "submitting" | "success" | "error";

export const PARTNERSHIP_TYPE_OPTIONS = [
  { value: "Colocation", label: "Colocation" },
  { value: "Cloud provider", label: "Cloud provider" },
  { value: "Edge / ISP", label: "Edge / ISP" },
  { value: "GPU owner / community host", label: "GPU owner / community host" },
  { value: "Other", label: "Other" },
] as const;

export const SUPPORTED_PLATFORMS_OPTIONS = [
  { value: "GPU", label: "GPU" },
  { value: "CPU", label: "CPU" },
  { value: "TPU", label: "TPU" },
  { value: "Bare Metal", label: "Bare Metal" },
  { value: "Colocation only", label: "Colocation only" },
  { value: "Cloud VMs", label: "Cloud VMs" },
  { value: "Edge nodes", label: "Edge nodes" },
  { value: "Other", label: "Other" },
] as const;

export const AI_READINESS_OPTIONS = [
  { value: "Already hosting AI GPU workloads", label: "Already hosting AI GPU workloads" },
  { value: "Hosting generic infra, adding AI soon", label: "Hosting generic infra, adding AI soon" },
  { value: "Planning AI-ready infra", label: "Planning AI-ready infra" },
  { value: "Exploratory / early discussions", label: "Exploratory / early discussions" },
] as const;

export const ONBOARDING_TIMELINE_OPTIONS = [
  { value: "Immediately / already operating", label: "Immediately / already operating" },
  { value: "0–3 months", label: "0–3 months" },
  { value: "3–6 months", label: "3–6 months" },
  { value: "6+ months / exploratory", label: "6+ months / exploratory" },
] as const;

export const PREFERRED_NEXT_STEP_OPTIONS = [
  { value: "Book a quick intro call", label: "Book a quick intro call" },
  { value: "Email me more info first", label: "Email me more info first" },
  { value: "Just keep me in the loop", label: "Just keep me in the loop" },
] as const;

export const INITIAL_FORM_DATA: PartnerFormData = {
  partnerName: "",
  website: "",
  countryRegion: "",
  cityLocation: "",
  contactName: "",
  contactRole: "",
  contactEmail: "",
  contactPhone: "",
  partnershipType: "",
  capacityMw: "",
  supportedPlatforms: [],
  aiReadiness: "",
  infraDetails: "",
  onboardingTimeline: "",
  goals: "",
  preferredNextStep: "",
};
