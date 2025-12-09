/**
 * English form content for all forms
 */
import type {
  BetaFormContent,
  CareerFormContent,
  PartnerFormContent,
  ValidationMessages,
  FormButtonLabels,
  FormStatusMessages,
} from "../types";

/**
 * Common validation messages (English)
 */
export const COMMON_VALIDATION: ValidationMessages = {
  required: "This field is required",
  email: "Email is required",
  invalidEmail: "Please enter a valid email",
  selectOne: "Please select an option",
  selectAtLeastOne: "Please select at least one option",
  fileType: "Please upload a PDF or Word document",
  fileSize: "File size must be less than 5MB",
};

/**
 * Common button labels (English)
 */
export const COMMON_BUTTONS: FormButtonLabels = {
  submit: "Submit",
  submitting: "Submitting...",
  apply: "Apply",
  applying: "Applying...",
};

/**
 * Common status messages (English)
 */
export const COMMON_STATUS: FormStatusMessages = {
  success: {
    title: "Thank you!",
    message: "We've received your submission and will be in touch soon.",
  },
  error: "Something went wrong. Please try again.",
  privacyNotice: "We won't share your information outside our team",
};

/**
 * Beta signup form content (English)
 */
export const BETA_FORM_CONTENT: BetaFormContent = {
  heading: "Tell us about your use case and we'll be in touch.",
  sections: {
    aboutYou: {
      title: "About you",
      description: "A bit about who you are and how you'd like us to contact you.",
    },
    aiUsage: {
      title: "What you're doing with AI",
      description: "A quick snapshot of why you use AI.",
    },
    currentSetup: {
      title: "Your current setup",
      description: "How and where your models run today.",
    },
    painPoints: {
      title: "Pain points",
      description: "What's hard, annoying, slow, or expensive.",
    },
    features: {
      title: "What would help you most",
    },
  },
  fields: {
    fullName: {
      label: "Full name",
      placeholder: "Jane Smith",
    },
    email: {
      label: "Email",
      placeholder: "jane@company.com",
      helperText: "We'll only use this to follow up. No spam.",
    },
    organizationName: {
      label: "Organization name",
      placeholder: "e.g. McGill University, Stealth AI startup",
      helperText: "Where you work or study.",
    },
    role: {
      label: "Role / Persona",
      placeholder: "Select your role",
    },
    segment: {
      label: "Segment",
      placeholder: "Select your segment",
    },
    aiUseCase: {
      label: "What are you using AI for?",
      placeholder: "Tell us what you're working on...",
      helperText: "Plain language is perfect.",
    },
    workloadTypes: {
      label: "Workload types",
      helperText: "Select all that apply.",
    },
    currentInfraSources: {
      label: "Current Infra sources",
      helperText: "Select all that apply.",
    },
    monthlySpend: {
      label: "Rough monthly AI/GPU spend",
      placeholder: "Select your spend range",
    },
    workflow: {
      label: "How do you work today?",
      placeholder: "e.g. 'Local dev + call OpenAI API'",
    },
    topPainPoints: {
      label: "Top pain points",
      helperText: "Focus on the top 2–3 that really hurt.",
    },
    painNotes: {
      label: "Pain notes",
      placeholder: "Any extra context...",
    },
    mostValuableFeatures: {
      label: "Most valuable features",
      helperText: "Pick the ones you actually care about.",
    },
    anythingElse: {
      label: "Anything else you'd like to share?",
      placeholder: "Edge cases, ideas, concerns, wishlist items...",
    },
  },
  options: {
    roles: [
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
    ],
    segments: [
      { value: "Education", label: "Education" },
      { value: "Startup / Scaleup", label: "Startup / Scaleup" },
      { value: "Enterprise / Product company", label: "Enterprise / Product company" },
      { value: "Consultancy", label: "Consultancy" },
      { value: "Other", label: "Other" },
    ],
    workloadTypes: [
      { value: "Training small/medium models", label: "Training small/medium models" },
      { value: "Fine-tuning", label: "Fine-tuning" },
      { value: "Inference (LLM / RAG / vision)", label: "Inference (LLM / RAG / vision)" },
      { value: "Data preprocessing / ETL", label: "Data preprocessing / ETL" },
      { value: "Prototyping / experimentation only", label: "Prototyping / experimentation only" },
    ],
    infraSources: [
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
    ],
    monthlySpend: [
      { value: "0–100", label: "$0–100" },
      { value: "100–500", label: "$100–500" },
      { value: "500–2k", label: "$500–2k" },
      { value: "2k–10k", label: "$2k–10k" },
      { value: "10k–50k", label: "$10k–50k" },
      { value: "50k+", label: "$50k+" },
      { value: "Don't know", label: "Don't know" },
    ],
    painPoints: [
      { value: "Capacity / queues", label: "Capacity / queues" },
      { value: "Cost / unpredictable bills", label: "Cost / unpredictable bills" },
      { value: "Environment setup (drivers, CUDA, dependencies)", label: "Environment setup (drivers, CUDA, dependencies)" },
      { value: "Onboarding new people (students, devs)", label: "Onboarding new people (students, devs)" },
      { value: "Hard to deploy models as services", label: "Hard to deploy models as services" },
      { value: "Data residency / compliance", label: "Data residency / compliance" },
      { value: "Many accounts / keys to manage", label: "Many accounts / keys to manage" },
      { value: "Poor observability / usage tracking", label: "Poor observability / usage tracking" },
      { value: "Other", label: "Other" },
    ],
    valuableFeatures: [
      { value: "OpenAI-compatible API", label: "OpenAI-compatible API" },
      { value: "Canadian / region-specific GPUs", label: "Canadian / region-specific GPUs" },
      { value: "Bring-your-own-model (Hugging Face / custom)", label: "Bring-your-own-model (Hugging Face / custom)" },
      { value: "Per-course / per-team budgets & quotas", label: "Per-course / per-team budgets & quotas" },
      { value: "\"No infra\" (we don't manage GPUs or Kubernetes)", label: "\"No infra\" (we don't manage GPUs or Kubernetes)" },
      { value: "Logs & metrics", label: "Logs & metrics" },
      { value: "SLAs / reliability", label: "SLAs / reliability" },
      { value: "Friendly pricing for education / startups", label: "Friendly pricing for education / startups" },
    ],
  },
  validation: {
    ...COMMON_VALIDATION,
    required: "This field is required",
  },
  buttons: {
    ...COMMON_BUTTONS,
    submit: "Apply",
    submitting: "Applying...",
  },
  status: {
    success: {
      title: "Thanks for sharing your insights!",
      message: "We'll review your responses and reach out if you expressed interest in the pilot.",
    },
    error: "Something went wrong. Please try again.",
    privacyNotice: "We won't share your answers outside our team",
  },
};


/**
 * Career form content (English)
 */
export const CAREER_FORM_CONTENT: CareerFormContent = {
  sections: {
    contact: {
      title: "Contact information",
      description: "How can we reach you?",
    },
    background: {
      title: "Your background",
      description: "Tell us about your experience.",
    },
    whyKoeo: {
      title: "Why Koeo?",
      description: "Help us understand why you'd be a great fit.",
    },
    resume: {
      title: "Resume",
      description: "Upload your resume so we can learn more about you.",
    },
    anythingElse: {
      title: "Anything else?",
    },
  },
  fields: {
    fullName: {
      label: "Full name",
      placeholder: "Jane Smith",
    },
    email: {
      label: "Email",
      placeholder: "jane@example.com",
    },
    phone: {
      label: "Phone number",
      placeholder: "+1 (555) 123-4567",
    },
    linkedIn: {
      label: "LinkedIn profile",
      placeholder: "https://linkedin.com/in/yourprofile",
    },
    portfolio: {
      label: "Portfolio / GitHub / Website",
      placeholder: "https://github.com/yourusername",
    },
    currentRole: {
      label: "Current role / title",
      placeholder: "e.g. Senior Software Engineer",
    },
    yearsExperience: {
      label: "Years of experience",
      placeholder: "Select your experience level",
    },
    areasOfInterest: {
      label: "Areas of interest",
      helperText: "What kind of work excites you?",
    },
    whyKoeo: {
      label: "Why are you interested in Koeo?",
      placeholder: "What draws you to our mission? What excites you about AI infrastructure?",
    },
    whatYouBring: {
      label: "What would you bring to the team?",
      placeholder: "Tell us about your skills, experiences, or perspectives that would make you a valuable addition...",
    },
    resume: {
      label: "Resume / CV",
      placeholder: "Click to upload PDF or Word document (max 5MB)",
      helperText: "Accepted formats: PDF, DOC, DOCX",
    },
    anythingElse: {
      label: "Is there anything else you'd like us to know?",
      placeholder: "Side projects, interests, questions for us...",
    },
  },
  options: {
    experience: [
      { value: "0-2", label: "0-2 years" },
      { value: "3-5", label: "3-5 years" },
      { value: "6-10", label: "6-10 years" },
      { value: "10+", label: "10+ years" },
    ],
    interests: [
      { value: "Engineering", label: "Engineering" },
      { value: "Product", label: "Product" },
      { value: "Design", label: "Design" },
      { value: "Operations", label: "Operations" },
      { value: "Sales & Partnerships", label: "Sales & Partnerships" },
      { value: "Marketing", label: "Marketing" },
      { value: "Other", label: "Other" },
    ],
  },
  validation: COMMON_VALIDATION,
  buttons: {
    ...COMMON_BUTTONS,
    submit: "Submit application",
    submitting: "Submitting...",
  },
  status: {
    success: {
      title: "Thanks for your interest!",
      message: "We've received your application and will keep it on file. If a role opens up that matches your profile, we'll be in touch.",
    },
    error: "Something went wrong. Please try again.",
    privacyNotice: "We won't share your information outside our team",
  },
};

/**
 * Partner form content (English)
 */
export const PARTNER_FORM_CONTENT: PartnerFormContent = {
  heading: "Ready to join the network?",
  subheading: "Fill out the form below and we'll be in touch to discuss partnership opportunities.",
  sections: {
    organization: {
      title: "About your organization",
      description: "Who are you, and where are you based?",
    },
    contact: {
      title: "Contact details",
      description: "Who should KOEO talk to?",
    },
    infrastructure: {
      title: "Infrastructure profile",
      description: "Understand what kind of infra / capacity you have.",
    },
    readiness: {
      title: "Readiness & next steps",
      description: "Qualify timeline and align on how to engage.",
    },
  },
  fields: {
    partnerName: {
      label: "Organization / partner name",
      placeholder: "Example: HydroCloud DC Montreal",
      helperText: "Your company or organization name.",
    },
    website: {
      label: "Website",
      placeholder: "https://yourcompany.com",
      helperText: "Main website or landing page, if available.",
    },
    countryRegion: {
      label: "Country / region",
      placeholder: "Canada – Quebec",
      helperText: "Where your main facility or operations relevant to KOEO are located.",
    },
    cityLocation: {
      label: "City / facility location",
      placeholder: "Montreal or Toronto DC1",
      helperText: "City and, if relevant, the specific facility or site.",
    },
    contactName: {
      label: "Your name",
      placeholder: "Jane Doe",
      helperText: "Main point of contact for this partnership.",
    },
    contactRole: {
      label: "Your role / title",
      placeholder: "CTO, Datacenter Ops Lead, Founder…",
      helperText: "Your position in the organization.",
    },
    contactEmail: {
      label: "Work email",
      placeholder: "name@yourcompany.com",
      helperText: "We'll use this to follow up about KOEO partnership details.",
    },
    contactPhone: {
      label: "Phone",
      placeholder: "+1 514 555 1234",
      helperText: "Only if you prefer a quick call. Include country code.",
    },
    partnershipType: {
      label: "Partnership type",
      placeholder: "Select one…",
      helperText: "Select the option that best describes how you'd work with KOEO.",
    },
    capacityMw: {
      label: "Capacity available (MW)",
      placeholder: "1 or 2.5",
      helperText: "Rough estimate of power capacity you could allocate to AI workloads. A ballpark is fine.",
    },
    supportedPlatforms: {
      label: "Supported platforms / services",
      helperText: "What types of infrastructure or services do you currently offer or plan to offer?",
    },
    aiReadiness: {
      label: "How mature is your infrastructure for AI workloads?",
      placeholder: "Select one…",
      helperText: "This helps us understand how quickly we can collaborate.",
    },
    infraDetails: {
      label: "Tell us about your infrastructure",
      placeholder: "We operate a 5 MW hydro-powered facility near Montreal with Tier 1 connectivity and are adding racks with NVIDIA and AMD GPUs…",
      helperText: "2–4 sentences about power, cooling, network, GPU types, regions, or anything else relevant.",
    },
    onboardingTimeline: {
      label: "How soon could you onboard KOEO workloads?",
      placeholder: "Select one…",
      helperText: "Even a rough estimate is helpful for planning.",
    },
    goals: {
      label: "What are you hoping KOEO can help with?",
      placeholder: "We'd like to attract AI customers to our Quebec facility and offer them a reliable GPU platform without building all the software ourselves…",
      helperText: "Share your main goals: filling GPU capacity, attracting AI customers, compliance positioning, regional focus, etc.",
    },
    preferredNextStep: {
      label: "Preferred next step",
      placeholder: "Select one…",
      helperText: "Tell us how you'd like to start the conversation.",
    },
  },
  options: {
    partnershipTypes: [
      { value: "Colocation", label: "Colocation" },
      { value: "Cloud provider", label: "Cloud provider" },
      { value: "Edge / ISP", label: "Edge / ISP" },
      { value: "GPU owner / community host", label: "GPU owner / community host" },
      { value: "Other", label: "Other" },
    ],
    supportedPlatforms: [
      { value: "GPU", label: "GPU" },
      { value: "CPU", label: "CPU" },
      { value: "TPU", label: "TPU" },
      { value: "Bare Metal", label: "Bare Metal" },
      { value: "Colocation only", label: "Colocation only" },
      { value: "Cloud VMs", label: "Cloud VMs" },
      { value: "Edge nodes", label: "Edge nodes" },
      { value: "Other", label: "Other" },
    ],
    aiReadiness: [
      { value: "Already hosting AI GPU workloads", label: "Already hosting AI GPU workloads" },
      { value: "Hosting generic infra, adding AI soon", label: "Hosting generic infra, adding AI soon" },
      { value: "Planning AI-ready infra", label: "Planning AI-ready infra" },
      { value: "Exploratory / early discussions", label: "Exploratory / early discussions" },
    ],
    onboardingTimeline: [
      { value: "Immediately / already operating", label: "Immediately / already operating" },
      { value: "0–3 months", label: "0–3 months" },
      { value: "3–6 months", label: "3–6 months" },
      { value: "6+ months / exploratory", label: "6+ months / exploratory" },
    ],
    preferredNextStep: [
      { value: "Book a quick intro call", label: "Book a quick intro call" },
      { value: "Email me more info first", label: "Email me more info first" },
      { value: "Just keep me in the loop", label: "Just keep me in the loop" },
    ],
  },
  validation: COMMON_VALIDATION,
  buttons: {
    ...COMMON_BUTTONS,
    submit: "Join our network",
    submitting: "Submitting...",
  },
  status: {
    success: {
      title: "Thanks for reaching out!",
      message: "We'll review your information and get back to you based on your preferred next step.",
    },
    error: "Something went wrong. Please try again.",
    privacyNotice: "We won't share your information outside our team",
  },
};
