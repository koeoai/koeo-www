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
  badge: "Private beta · Invite only",
  headline: "AI inference you can ship",
  headlineAccent: "without the complexity",
  subtitle:
    "Any model, one place, no infra to chase.",
  cta: {
    primary: {
      text: "Request beta access",
      href: "/beta",
    },
    secondary: {
      text: "Read the whitepaper",
      href: "/whitepaper.pdf",
    },
  },
  microcopy: "We are inviting teams gradually, based on fit and capacity.",
};

/**
 * Problem section content
 */
export const PROBLEM_CONTENT: ProblemSectionContent = {
  heading: "Why AI inference feels harder than it should",
  intro:
    "Production inference usually turns into a pile of providers, GPU capacity decisions, and glue code that nobody wants to own long term.",
  cards: [
    {
      category: "COMPLEXITY",
      title: "Too many moving parts",
      description:
        "Model servers, schedulers, GPU pools, and billing need to stay in sync. Every new layer adds configuration, edge cases, and more ways things can fail.",
      icon: "grid-2x2",
    },
    {
      category: "PRODUCTIVITY",
      title: "Infrastructure steals focus",
      description:
        "Teams lose time debugging nodes, quotas, and cold starts instead of improving the product experience. Infra becomes the default work.",
      icon: "clock",
    },
    {
      category: "COST CONTROL",
      title: "Costs are hard to reason about",
      description:
        "Fragmented usage and unclear tradeoffs make it difficult to forecast spend, compare GPU tiers, and route workloads confidently.",
      icon: "dollar-sign",
    },
  ],
};


/**
 * What-is section content
 */
export const WHAT_IS_CONTENT: WhatIsSectionContent = {
  heading: "AI inference, simplified",
  subheading: "A unified runtime for serverless AI inference",
  description:
    "Instead of wiring together providers, runtimes, and custom schedulers, you integrate once. Koeo routes requests to available GPU capacity, checks service health, and tracks usage so you can focus on shipping.",
  features: [
    {
      icon: "check",
      text: "One API to run your models through a single endpoint",
    },
    {
      icon: "check",
      text: "Routing and health checks built in, designed for real traffic",
    },
    {
      icon: "check",
      text: "Usage and latency metrics included, with deeper observability evolving in beta",
    },
  ],
  cta: {
    text: "Learn how it works",
    href: "/beta",
  },
};

/**
 * How-works section content
 */
export const HOW_WORKS_CONTENT: HowWorksSectionContent = {
  heading: "Built by developers,",
  headingAccent: "for developers",
  subheading: "Developer-first experience, even in beta",
  developerFeatures: [
    {
      title: "OpenAI-compatible API",
      description:
        "Once you are onboarded, you get OpenAI-style endpoints that plug into existing clients and SDKs. In most cases it is a base URL and auth change.",
      link: { text: "View API docs", href: "/docs/api" },
    },
    {
      title: "Early-access dashboard",
      description:
        "Monitor usage, latency, and error rates, and manage keys and models. We iterate fast here, and your feedback directly shapes what we ship next.",
      link: { text: "Request dashboard access", href: "/beta" },
    },
  ],
  stepsHeading: "How the private beta works",
  steps: [
    {
      stepNumber: 1,
      title: "Request access",
      description:
        "Tell us about your use case, your current setup, and your constraints. We review requests to make sure the beta is a good fit.",
    },
    {
      stepNumber: 2,
      title: "Onboarding and API keys",
      description:
        "If it is a match, we onboard you, set initial limits, and share API keys plus example requests so you can integrate quickly.",
    },
    {
      stepNumber: 3,
      title: "Integrate, then scale together",
      description:
        "Start routing real traffic through Koeo. We track reliability and performance with you, tune routing policies, and expand capacity as usage grows.",
    },
  ],
  cta: {
    primary: {
      text: "Request beta access",
      href: "/beta",
    },
    secondary: {
      text: "Talk to the team",
      href: "mailto:info@koeo.ai",
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
