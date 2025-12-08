import type {
  HomepageContent,
  HeroContent,
  ProblemSectionContent,
  WhatIsSectionContent,
  HowWorksSectionContent,
} from "../types";

/**
 * Hero section content
 */
export const HERO_CONTENT: HeroContent = {
  badge: "Closed Beta · Not yet generally available",
  headline: "Run your AI models",
  headlineAccent: "without managing GPUs",
  subtitle:
    "We take care of the GPU mess so you can focus on building. One runtime, any model, no infra headaches.",
  cta: {
    primary: {
      text: "Join the private beta",
      href: "/beta",
    },
    secondary: {
      text: "Read the Whitepaper",
      href: "/whitepaper.pdf",
    },
  },
  microcopy: "We're gradually inviting teams into the private beta.",
};

/**
 * Problem section content
 */
export const PROBLEM_CONTENT: ProblemSectionContent = {
  heading: "Why AI infrastructure feels harder than it should",
  intro:
    "Running inference at scale usually means juggling providers, managing GPU availability, and stitching together tools that weren't designed to work together.",
  cards: [
    {
      category: "COMPLEXITY",
      title: "Too many moving parts",
      description:
        "Model servers, schedulers, GPU pools and billing systems all have to be wired together and kept in sync. Every new component adds configuration, edge cases and failure modes.",
      icon: "grid-2x2",
    },
    {
      category: "PRODUCTIVITY",
      title: "Infrastructure steals focus",
      description:
        "Product teams lose time debugging nodes, quotas and cold starts instead of improving the experience for users. Infra work becomes the default instead of the exception.",
      icon: "clock",
    },
    {
      category: "COST CONTROL",
      title: "Costs are unpredictable",
      description:
        "Fragmented GPU usage, spot instances and opaque pricing make it hard to forecast spend or decide where to run each workload efficiently.",
      icon: "dollar-sign",
    },
  ],
};


/**
 * What-is section content
 */
export const WHAT_IS_CONTENT: WhatIsSectionContent = {
  heading: "AI inference, simplified",
  subheading: "Koeo is a unified runtime for distributed GPU inference",
  description:
    "Instead of wiring together providers, runtimes and custom schedulers, you integrate with a single runtime. Koeo connects your workloads to a federated pool of GPUs and applies routing, health checks and usage tracking for you.",
  features: [
    {
      icon: "check",
      text: "One API to run your supported models across our federated GPU fabric",
    },
    {
      icon: "check",
      text: "Automatic routing, health checks and basic cost controls across different GPU tiers",
    },
    {
      icon: "check",
      text: "Built-in usage and latency metrics, with deeper observability in active development",
    },
  ],
  cta: {
    text: "Learn more",
    href: "/beta",
  },
};

/**
 * How-works section content
 */
export const HOW_WORKS_CONTENT: HowWorksSectionContent = {
  heading: "Built by Developers,",
  headingAccent: "for Developers",
  subheading: "Developer-first experience, even in beta",
  developerFeatures: [
    {
      title: "OpenAI-compatible API",
      description:
        "Once you're onboarded to the beta, you'll get OpenAI-style endpoints you can plug into existing clients and SDKs. In most cases you just update the base URL and auth, and keep the rest of your code the same.",
      link: { text: "View API Docs", href: "/docs/api" },
    },
    {
      title: "Early-access dashboard",
      description:
        "Beta users get access to an evolving dashboard to monitor usage, latency and error rates, and to manage keys and models. We're iterating quickly here, and your feedback directly shapes what we build next.",
      link: { text: "Request Dashboard Access", href: "/beta" },
    },
  ],
  stepsHeading: "How the private beta works",
  steps: [
    {
      stepNumber: 1,
      title: "Apply for access",
      description:
        "Tell us about your use case, current setup and constraints. We review applications to make sure the beta is a good fit for what you're building.",
    },
    {
      stepNumber: 2,
      title: "Onboarding & API keys",
      description:
        "If there's a fit, we'll onboard you, agree on initial limits and give you API keys, example requests and guidance for your first integration.",
    },
    {
      stepNumber: 3,
      title: "Integrate, then scale together",
      description:
        "Start routing real traffic through KOEO. We'll monitor reliability and performance with you, adjust routing policies and grow capacity as your usage increases.",
    },
  ],
  cta: {
    primary: {
      text: "Apply for Private Beta",
      href: "/beta",
    },
    secondary: {
      text: "Talk to the team",
      href: "mailto:hello@koeo.ai",
    },
  },
};

/**
 * Complete homepage content - combines all sections
 */
export const HOMEPAGE_CONTENT: HomepageContent = {
  hero: HERO_CONTENT,
  problem: PROBLEM_CONTENT,
  whatIs: WHAT_IS_CONTENT,
  howWorks: HOW_WORKS_CONTENT,
};
