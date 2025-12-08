export interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  linkedIn: string;
  portfolio: string;
  currentRole: string;
  yearsExperience: string;
  areasOfInterest: string[];
  whyKoeo: string;
  whatYouBring: string;
  resumeFileName: string;
  resumeBase64: string;
  anythingElse: string;
}

export type FormState = "idle" | "submitting" | "success" | "error";

export const EXPERIENCE_OPTIONS = [
  { value: "0-2", label: "0-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "6-10", label: "6-10 years" },
  { value: "10+", label: "10+ years" },
] as const;

export const INTEREST_OPTIONS = [
  { value: "Engineering", label: "Engineering" },
  { value: "Product", label: "Product" },
  { value: "Design", label: "Design" },
  { value: "Operations", label: "Operations" },
  { value: "Sales & Partnerships", label: "Sales & Partnerships" },
  { value: "Marketing", label: "Marketing" },
  { value: "Other", label: "Other" },
] as const;

export const INITIAL_FORM_DATA: CareerFormData = {
  fullName: "",
  email: "",
  phone: "",
  linkedIn: "",
  portfolio: "",
  currentRole: "",
  yearsExperience: "",
  areasOfInterest: [],
  whyKoeo: "",
  whatYouBring: "",
  resumeFileName: "",
  resumeBase64: "",
  anythingElse: "",
};
