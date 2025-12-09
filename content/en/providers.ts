/**
 * Providers page content - English
 */

export interface ProvidersHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface ProvidersBenefit {
  number: string;
  title: string;
  description: string;
}

export interface ProvidersType {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProvidersFaqItem {
  question: string;
  answer: string;
}

export interface ProvidersSectionContent {
  benefits: {
    label: string;
    heading: string;
  };
  types: {
    label: string;
    heading: string;
    subtitle: string;
  };
  faq: {
    heading: string;
    subtitle: string;
  };
}

export interface ProvidersPageContent {
  hero: ProvidersHeroContent;
  sections: ProvidersSectionContent;
  benefits: ProvidersBenefit[];
  providerTypes: ProvidersType[];
  faq: ProvidersFaqItem[];
}

export const PROVIDERS_HERO_CONTENT: ProvidersHeroContent = {
  badge: "Now accepting partners",
  headline: "Become a",
  headlineAccent: "GPU Provider",
  subtitle: "Join our federated GPU network. Contribute compute capacity and earn revenue while helping developers build AI products.",
  primaryCta: "Get in touch",
  secondaryCta: "FAQ",
};

export const PROVIDERS_SECTIONS: ProvidersSectionContent = {
  benefits: {
    label: "Partnership Benefits",
    heading: "Why partner with Koeo?",
  },
  types: {
    label: "Partner Profiles",
    heading: "Who we work with",
    subtitle: "From enterprise data centers to regional cloud providers, we partner with organizations committed to powering the next generation of AI.",
  },
  faq: {
    heading: "Frequently Asked Questions",
    subtitle: "Common questions about becoming a GPU provider",
  },
};

export const PROVIDERS_BENEFITS: ProvidersBenefit[] = [
  {
    number: "01",
    title: "Monetize idle capacity",
    description: "Transform underutilized GPU resources into a consistent revenue stream. We handle demand aggregation so you can focus on operations.",
  },
  {
    number: "02",
    title: "Zero customer acquisition",
    description: "We bring qualified AI workloads directly to your infrastructure. No sales team, no marketing spend, no customer support overhead.",
  },
  {
    number: "03",
    title: "Seamless integration",
    description: "Deploy our lightweight agent in minutes. We handle orchestration, billing, and compliance. Your existing operations remain unchanged.",
  },
];

export const PROVIDERS_TYPES: ProvidersType[] = [
  {
    number: "01",
    title: "Data Centers",
    description: "Enterprise-grade facilities with GPU clusters seeking consistent utilization and predictable revenue.",
    iconName: "dataCenter",
  },
  {
    number: "02",
    title: "Cloud Providers",
    description: "Regional and specialized cloud platforms looking to expand AI capabilities and reach new markets.",
    iconName: "cloud",
  },
  {
    number: "03",
    title: "Infrastructure Partners",
    description: "Organizations with dedicated GPU resources ready to participate in the distributed compute economy.",
    iconName: "infrastructure",
  },
];

export const PROVIDERS_FAQ: ProvidersFaqItem[] = [
  {
    question: "What types of GPUs do you accept?",
    answer: "We accept a wide range of NVIDIA GPUs, from consumer-grade cards like RTX 3090/4090 to data center GPUs like A100 and H100. The key requirement is reliable connectivity and availability.",
  },
  {
    question: "How does payment work?",
    answer: "You earn revenue based on the compute time your GPUs provide. We handle all billing with end customers and pay you monthly based on actual usage.",
  },
  {
    question: "What are the technical requirements?",
    answer: "You'll need a stable internet connection, compatible NVIDIA GPUs with up-to-date drivers, and the ability to run our lightweight agent software. We'll help you get set up.",
  },
  {
    question: "How much can I earn?",
    answer: "Earnings depend on your GPU type, availability, and market demand. Data center GPUs typically earn more, but even consumer GPUs can generate meaningful revenue during peak demand.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Workloads run in isolated containers, and we never store customer data on provider hardware beyond the active session. We take security seriously.",
  },
];

export const PROVIDERS_PAGE_CONTENT: ProvidersPageContent = {
  hero: PROVIDERS_HERO_CONTENT,
  sections: PROVIDERS_SECTIONS,
  benefits: PROVIDERS_BENEFITS,
  providerTypes: PROVIDERS_TYPES,
  faq: PROVIDERS_FAQ,
};
