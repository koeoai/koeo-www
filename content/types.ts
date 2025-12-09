/**
 * Content type definitions for centralized marketing content.
 * These types ensure type safety when working with content across the site.
 */

/**
 * Hero section content structure
 */
export interface HeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  microcopy: string;
}

/**
 * Generic section content with heading and optional intro
 */
export interface SectionContent {
  heading: string;
  intro?: string;
}

/**
 * Feature item with icon and text
 */
export interface FeatureItem {
  icon: string; // lucide-react icon name or custom identifier
  text: string;
}

/**
 * Problem card for the problem section
 */
export interface ProblemCard {
  category: string;
  title: string;
  description: string;
  icon: string; // Icon identifier
}

/**
 * Developer feature for the how-works section
 */
export interface DeveloperFeature {
  title: string;
  description: string;
  link: {
    text: string;
    href: string;
  };
}

/**
 * Step item for process/workflow sections
 */
export interface StepItem {
  stepNumber: number;
  title: string;
  description: string;
}

/**
 * Problem section content structure
 */
export interface ProblemSectionContent extends SectionContent {
  cards: ProblemCard[];
}

/**
 * What-is section content structure
 */
export interface WhatIsSectionContent {
  heading: string;
  subheading: string;
  description: string;
  features: FeatureItem[];
  cta: {
    text: string;
    href: string;
  };
}

/**
 * How-works section content structure
 */
export interface HowWorksSectionContent {
  heading: string;
  headingAccent: string;
  subheading: string;
  developerFeatures: DeveloperFeature[];
  stepsHeading: string;
  steps: StepItem[];
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
}

/**
 * Complete homepage content structure
 */
export interface HomepageContent {
  hero: HeroContent;
  problem: ProblemSectionContent;
  whatIs: WhatIsSectionContent;
  howWorks: HowWorksSectionContent;
}

/**
 * Form option item for select/multiselect fields
 */
export interface FormOption {
  value: string;
  label: string;
}

/**
 * Validation messages for form fields
 */
export interface ValidationMessages {
  required: string;
  email: string;
  invalidEmail: string;
  selectOne: string;
  selectAtLeastOne: string;
  fileType: string;
  fileSize: string;
}

/**
 * Common form button labels
 */
export interface FormButtonLabels {
  submit: string;
  submitting: string;
  apply: string;
  applying: string;
}

/**
 * Common form status messages
 */
export interface FormStatusMessages {
  success: {
    title: string;
    message: string;
  };
  error: string;
  privacyNotice: string;
}

/**
 * Beta signup form section content
 */
export interface BetaFormSectionContent {
  title: string;
  description?: string;
}

/**
 * Beta signup form content structure
 */
export interface BetaFormContent {
  heading: string;
  sections: {
    aboutYou: BetaFormSectionContent;
    aiUsage: BetaFormSectionContent;
    currentSetup: BetaFormSectionContent;
    painPoints: BetaFormSectionContent;
    features: BetaFormSectionContent;
  };
  fields: {
    fullName: { label: string; placeholder: string };
    email: { label: string; placeholder: string; helperText: string };
    organizationName: { label: string; placeholder: string; helperText: string };
    role: { label: string; placeholder: string };
    segment: { label: string; placeholder: string };
    aiUseCase: { label: string; placeholder: string; helperText: string };
    workloadTypes: { label: string; helperText: string };
    currentInfraSources: { label: string; helperText: string };
    monthlySpend: { label: string; placeholder: string };
    workflow: { label: string; placeholder: string };
    topPainPoints: { label: string; helperText: string };
    painNotes: { label: string; placeholder: string };
    mostValuableFeatures: { label: string; helperText: string };
    anythingElse: { label: string; placeholder: string };
  };
  options: {
    roles: FormOption[];
    segments: FormOption[];
    workloadTypes: FormOption[];
    infraSources: FormOption[];
    monthlySpend: FormOption[];
    painPoints: FormOption[];
    valuableFeatures: FormOption[];
  };
  validation: ValidationMessages;
  buttons: FormButtonLabels;
  status: FormStatusMessages;
}

/**
 * Career form content structure
 */
export interface CareerFormContent {
  sections: {
    contact: BetaFormSectionContent;
    background: BetaFormSectionContent;
    whyKoeo: BetaFormSectionContent;
    resume: BetaFormSectionContent;
    anythingElse: BetaFormSectionContent;
  };
  fields: {
    fullName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    linkedIn: { label: string; placeholder: string };
    portfolio: { label: string; placeholder: string };
    currentRole: { label: string; placeholder: string };
    yearsExperience: { label: string; placeholder: string };
    areasOfInterest: { label: string; helperText: string };
    whyKoeo: { label: string; placeholder: string };
    whatYouBring: { label: string; placeholder: string };
    resume: { label: string; placeholder: string; helperText: string };
    anythingElse: { label: string; placeholder: string };
  };
  options: {
    experience: FormOption[];
    interests: FormOption[];
  };
  validation: ValidationMessages;
  buttons: FormButtonLabels;
  status: FormStatusMessages;
}

/**
 * Partner form content structure
 */
export interface PartnerFormContent {
  heading: string;
  subheading: string;
  sections: {
    organization: BetaFormSectionContent;
    contact: BetaFormSectionContent;
    infrastructure: BetaFormSectionContent;
    readiness: BetaFormSectionContent;
  };
  fields: {
    partnerName: { label: string; placeholder: string; helperText: string };
    website: { label: string; placeholder: string; helperText: string };
    countryRegion: { label: string; placeholder: string; helperText: string };
    cityLocation: { label: string; placeholder: string; helperText: string };
    contactName: { label: string; placeholder: string; helperText: string };
    contactRole: { label: string; placeholder: string; helperText: string };
    contactEmail: { label: string; placeholder: string; helperText: string };
    contactPhone: { label: string; placeholder: string; helperText: string };
    partnershipType: { label: string; placeholder: string; helperText: string };
    capacityMw: { label: string; placeholder: string; helperText: string };
    supportedPlatforms: { label: string; helperText: string };
    aiReadiness: { label: string; placeholder: string; helperText: string };
    infraDetails: { label: string; placeholder: string; helperText: string };
    onboardingTimeline: { label: string; placeholder: string; helperText: string };
    goals: { label: string; placeholder: string; helperText: string };
    preferredNextStep: { label: string; placeholder: string; helperText: string };
  };
  options: {
    partnershipTypes: FormOption[];
    supportedPlatforms: FormOption[];
    aiReadiness: FormOption[];
    onboardingTimeline: FormOption[];
    preferredNextStep: FormOption[];
  };
  validation: ValidationMessages;
  buttons: FormButtonLabels;
  status: FormStatusMessages;
}
