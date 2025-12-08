// Form option constants for beta signup
export const ROLE_OPTIONS = [
  { value: "Student", label: "Student" },
  { value: "Professor / Lecturer", label: "Professor / Lecturer" },
  { value: "Researcher / PI", label: "Researcher / PI" },
  { value: "TA / PhD student", label: "TA / PhD student" },
  { value: "ML Engineer / Data Scientist", label: "ML Engineer / Data Scientist" },
  { value: "AI Startup Founder / Co-founder", label: "AI Startup Founder / Co-founder" },
  { value: "Product Manager / Product Lead", label: "Product Manager / Product Lead" },
  { value: "AI / Data Consultant", label: "AI / Data Consultant" },
  { value: "IT / Infra / DevOps", label: "IT / Infra / DevOps" },
  { value: "Other", label: "Other" },
] as const;

export const SEGMENT_OPTIONS = [
  { value: "Education", label: "Education" },
  { value: "Startup / Scaleup", label: "Startup / Scaleup" },
  { value: "Enterprise / Product company", label: "Enterprise / Product company" },
  { value: "Consultancy", label: "Consultancy" },
  { value: "Other", label: "Other" },
] as const;

export const WORKLOAD_TYPE_OPTIONS = [
  { value: "Training small/medium models", label: "Training small/medium models" },
  { value: "Fine-tuning", label: "Fine-tuning" },
  { value: "Inference (LLM / RAG / vision)", label: "Inference (LLM / RAG / vision)" },
  { value: "Data preprocessing / ETL", label: "Data preprocessing / ETL" },
  { value: "Prototyping / experimentation only", label: "Prototyping / experimentation only" },
] as const;

export const INFRA_SOURCE_OPTIONS = [
  { value: "University / on-prem HPC", label: "University / on-prem HPC" },
  { value: "AWS", label: "AWS" },
  { value: "Azure", label: "Azure" },
  { value: "GCP", label: "GCP" },
  { value: "Specialized GPU clouds (RunPod, Lambda, etc.)", label: "Specialized GPU clouds (RunPod, Lambda, etc.)" },
  { value: "Colab / free tiers", label: "Colab / free tiers" },
  { value: "Personal GPU / workstation", label: "Personal GPU / workstation" },
  { value: "Mostly CPU / no GPU yet", label: "Mostly CPU / no GPU yet" },
  { value: "Other", label: "Other" },
  { value: "Don't know", label: "Don't know" },
] as const;


export const MONTHLY_SPEND_OPTIONS = [
  { value: "0–100", label: "$0–100" },
  { value: "100–500", label: "$100–500" },
  { value: "500–2k", label: "$500–2k" },
  { value: "2k–10k", label: "$2k–10k" },
  { value: "10k–50k", label: "$10k–50k" },
  { value: "50k+", label: "$50k+" },
  { value: "Don't know", label: "Don't know" },
] as const;

export const PAIN_POINT_OPTIONS = [
  { value: "Capacity / queues", label: "Capacity / queues" },
  { value: "Cost / unpredictable bills", label: "Cost / unpredictable bills" },
  { value: "Environment setup (drivers, CUDA, dependencies)", label: "Environment setup (drivers, CUDA, dependencies)" },
  { value: "Onboarding new people (students, devs)", label: "Onboarding new people (students, devs)" },
  { value: "Hard to deploy models as services", label: "Hard to deploy models as services" },
  { value: "Data residency / compliance", label: "Data residency / compliance" },
  { value: "Many accounts / keys to manage", label: "Many accounts / keys to manage" },
  { value: "Poor observability / usage tracking", label: "Poor observability / usage tracking" },
  { value: "Other", label: "Other" },
] as const;

export const VALUABLE_FEATURES_OPTIONS = [
  { value: "OpenAI-compatible API", label: "OpenAI-compatible API" },
  { value: "Canadian / region-specific GPUs", label: "Canadian / region-specific GPUs" },
  { value: "Bring-your-own-model (Hugging Face / custom)", label: "Bring-your-own-model (Hugging Face / custom)" },
  { value: "Per-course / per-team budgets & quotas", label: "Per-course / per-team budgets & quotas" },
  { value: "\"No infra\" (we don't manage GPUs or Kubernetes)", label: "\"No infra\" (we don't manage GPUs or Kubernetes)" },
  { value: "Logs & metrics", label: "Logs & metrics" },
  { value: "SLAs / reliability", label: "SLAs / reliability" },
  { value: "Friendly pricing for education / startups", label: "Friendly pricing for education / startups" },
] as const;

// Form data types
export interface SurveyFormData {
  fullName: string;
  email: string;
  organizationName: string;
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
  pilotInterest: string;
  anythingElse: string;
}

export type FormState = "idle" | "applying" | "success" | "error";

export const INITIAL_FORM_DATA: SurveyFormData = {
  fullName: "",
  email: "",
  organizationName: "",
  role: "",
  segment: "",
  aiUseCase: "",
  workloadTypes: [],
  currentInfraSources: [],
  monthlySpend: "",
  workflow: "",
  topPainPoints: [],
  painNotes: "",
  mostValuableFeatures: [],
  pilotInterest: "Yes – ready for pilot",
  anythingElse: "",
};
