/**
 * About page content - centralized marketing copy for the about page.
 */

/**
 * About hero section content
 */
export interface AboutHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
}

/**
 * Vision section content
 */
export interface AboutVisionContent {
  label: string;
  headline: string;
  headlineAccent: string;
  paragraphs: string[];
  highlight: string;
}

/**
 * Principle item
 */
export interface AboutPrinciple {
  number: string;
  title: string;
  description: string;
}

/**
 * CTA section content
 */
export interface AboutCtaContent {
  headline: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

/**
 * Complete about page content structure
 */
export interface AboutPageContent {
  hero: AboutHeroContent;
  vision: AboutVisionContent;
  principles: {
    label: string;
    heading: string;
    items: AboutPrinciple[];
  };
  cta: AboutCtaContent;
}

/**
 * About hero content
 */
export const ABOUT_HERO_CONTENT: AboutHeroContent = {
  badge: "About Koeo",
  headline: "Make it",
  headlineAccent: "effortless",
  subtitle: "We started Koeo after seeing too many teams stuck between a cool demo and a reliable product. Our mission is to take the painful parts of AI infrastructure off your plate so you can focus on your customers, not your clusters.",
};


/**
 * Vision section content
 */
export const ABOUT_VISION_CONTENT: AboutVisionContent = {
  label: "Our Vision",
  headline: "Become the quiet runtime behind the",
  headlineAccent: "best AI products",
  paragraphs: [
    "We believe every serious AI team should be able to own its models without having to rebuild GPU infrastructure from scratch.",
    "Capacity may come from many places, but it should feel like one trusted fabric: fast, reliable, and fair.",
  ],
  highlight: "If we do our job right, Koeo fades into the background and your product is what people talk about.",
};

/**
 * Principles content
 */
export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
  {
    number: "01",
    title: "Start with the customer's problem",
    description: "We begin with a real person trying to ship a real feature. If it doesn't clearly help a customer, it's not a priority.",
  },
  {
    number: "02",
    title: "Own the outcome",
    description: "We treat customer workloads like our own. When something goes wrong, we dig in, fix it, and learn from it.",
  },
  {
    number: "03",
    title: "Reliability is the product",
    description: "Features attract people. Reliability keeps them. We design for failure so your users barely notice when it happens.",
  },
  {
    number: "04",
    title: "Simplicity wins",
    description: "Complexity is a tax. We keep it low with clear APIs, boring architecture, and obvious defaults.",
  },
  {
    number: "05",
    title: "Learn from production",
    description: "The best feedback comes from real workloads, not slide decks. We ship, observe, adjust, and repeat.",
  },
  {
    number: "06",
    title: "Talk straight",
    description: "We're honest about limits, tradeoffs, and pricing. No buzzword fog, just clear language.",
  },
  {
    number: "07",
    title: "Build for the long game",
    description: "We want Koeo to be infrastructure teams rely on for years. Shortcuts that damage trust aren't worth it.",
  },
  {
    number: "08",
    title: "Move fast, carefully",
    description: "Speed matters. We bias toward action, but anything touching reliability or security gets extra care.",
  },
];

/**
 * CTA section content
 */
export const ABOUT_CTA_CONTENT: AboutCtaContent = {
  headline: "Ready to build with us?",
  subtitle: "Whether you're a developer looking for compute or a provider with GPU capacity, we'd love to hear from you.",
  primaryCta: {
    text: "Apply for beta",
    href: "/beta",
  },
  secondaryCta: {
    text: "Become a provider",
    href: "/providers",
  },
};

/**
 * Complete about page content
 */
export const ABOUT_PAGE_CONTENT: AboutPageContent = {
  hero: ABOUT_HERO_CONTENT,
  vision: ABOUT_VISION_CONTENT,
  principles: {
    label: "How We Work",
    heading: "Our principles",
    items: ABOUT_PRINCIPLES,
  },
  cta: ABOUT_CTA_CONTENT,
};
