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
  headline: "Supply the compute,",
  headlineAccent: "we bring the demand",
  subtitle: "Join our federated GPU network. Monetize idle capacity while powering the next wave of AI products.",
  primaryCta: "Get in touch",
  secondaryCta: "See FAQ",
};

export const PROVIDERS_SECTIONS: ProvidersSectionContent = {
  benefits: {
    label: "Why partner",
    heading: "Your GPUs, working harder",
  },
  types: {
    label: "Who we work with",
    heading: "Built for serious operators",
    subtitle: "From enterprise data centers to regional cloud providers, we partner with organizations ready to power production AI.",
  },
  faq: {
    heading: "Common questions",
    subtitle: "What you need to know before joining",
  },
};

export const PROVIDERS_BENEFITS: ProvidersBenefit[] = [
  {
    number: "01",
    title: "Monetize idle capacity",
    description: "Turn underutilized GPUs into steady revenue. We aggregate demand so you can focus on running infrastructure.",
  },
  {
    number: "02",
    title: "Skip the sales cycle",
    description: "We bring qualified AI workloads to your hardware. No sales team, no marketing spend, no support overhead.",
  },
  {
    number: "03",
    title: "Integrate once, stay hands-off",
    description: "Deploy our lightweight agent in minutes. We handle orchestration and billing. Your ops stay unchanged.",
  },
];

export const PROVIDERS_TYPES: ProvidersType[] = [
  {
    number: "01",
    title: "Data Centers",
    description: "Enterprise facilities with GPU clusters looking for consistent utilization and predictable revenue.",
    iconName: "dataCenter",
  },
  {
    number: "02",
    title: "Cloud Providers",
    description: "Regional and specialized platforms expanding AI capabilities and reaching new markets.",
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
    question: "What are the requirements to join?",
    answer: "You need NVIDIA GPUs (RTX 3090/4090 or data center cards like A100/H100), stable internet, current drivers, and the ability to run our lightweight agent. We help you get set up.",
  },
  {
    question: "How does pricing and payment work?",
    answer: "You earn based on compute time delivered. Rates fluctuate with market demand, so peak periods mean higher earnings. We handle all billing and pay you monthly with transparent usage tracking.",
  },
  {
    question: "How long does onboarding take?",
    answer: "Most providers deploy our agent and complete verification within a day. Once live, you can start earning immediately as workloads route to your hardware.",
  },
  {
    question: "Who controls the workloads on my hardware?",
    answer: "Koeo handles orchestration and routing. Workloads run in isolated containers with no persistent data. You stay hands-off while we manage the complexity.",
  },
  {
    question: "What's the commitment?",
    answer: "No lock-in. You set your own availability and can scale up or down as needed. We value reliable partners, but flexibility is built in.",
  },
];

export const PROVIDERS_PAGE_CONTENT: ProvidersPageContent = {
  hero: PROVIDERS_HERO_CONTENT,
  sections: PROVIDERS_SECTIONS,
  benefits: PROVIDERS_BENEFITS,
  providerTypes: PROVIDERS_TYPES,
  faq: PROVIDERS_FAQ,
};
