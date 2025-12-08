/**
 * Beta page content - centralized marketing copy for the beta signup page.
 */

/**
 * Beta hero section content
 */
export interface BetaHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  scrollIndicator: string;
}

/**
 * Criterion item for who we're looking for
 */
export interface BetaCriterion {
  title: string;
  description: string;
}

/**
 * Beta benefit item
 */
export interface BetaBenefit {
  title: string;
  description: string;
}

/**
 * Beta expectation item
 */
export interface BetaExpectation {
  title: string;
  description: string;
}

/**
 * Complete beta page content structure
 */
export interface BetaPageContent {
  hero: BetaHeroContent;
  whoHeading: string;
  criteria: BetaCriterion[];
  benefits: {
    heading: string;
    items: BetaBenefit[];
  };
  expectations: {
    heading: string;
    intro: string;
    items: BetaExpectation[];
  };
}

/**
 * Beta hero content
 */
export const BETA_HERO_CONTENT: BetaHeroContent = {
  badge: "Private Beta · limited spots",
  headline: "Apply for",
  headlineAccent: "our private beta",
  subtitle: "We're onboarding teams gradually to ensure a great experience.",
  scrollIndicator: "Scroll to apply",
};


/**
 * Who we're looking for criteria
 */
export const BETA_CRITERIA: BetaCriterion[] = [
  {
    title: "You're shipping or about to ship AI features",
    description: "Chat interfaces, copilots, agents, or any product that relies on model inference.",
  },
  {
    title: "You want to simplify your inference stack",
    description: "You're tired of managing multiple providers, GPU pools, or complex orchestration.",
  },
  {
    title: "You're open to giving feedback",
    description: "We're looking for partners who will help us shape the product through real-world usage.",
  },
];

/**
 * Beta benefits content
 */
export const BETA_BENEFITS: BetaBenefit[] = [
  {
    title: "Early access to the runtime",
    description: "Use KOEO's unified inference layer before general availability and shape the product roadmap.",
  },
  {
    title: "Direct line to the team",
    description: "Get priority support and direct access to our engineering team for questions and feedback.",
  },
  {
    title: "Founding partner pricing",
    description: "Lock in special pricing as a founding partner that carries forward after the beta.",
  },
  {
    title: "Migration support",
    description: "We'll help you integrate KOEO into your stack and migrate from your current setup.",
  },
];

/**
 * Beta expectations content
 */
export const BETA_EXPECTATIONS: BetaExpectation[] = [
  {
    title: "Staged onboarding",
    description: "We'll start with a short call to understand your use case, then help you integrate step by step.",
  },
  {
    title: "Regular check-ins",
    description: "Expect brief weekly or bi-weekly syncs to gather feedback and address any issues quickly.",
  },
  {
    title: "Evolving platform",
    description: "The product will change based on your feedback. We'll keep you informed of updates and new features.",
  },
];

/**
 * Complete beta page content
 */
export const BETA_PAGE_CONTENT: BetaPageContent = {
  hero: BETA_HERO_CONTENT,
  whoHeading: "Who we're looking for",
  criteria: BETA_CRITERIA,
  benefits: {
    heading: "What you get as a beta partner",
    items: BETA_BENEFITS,
  },
  expectations: {
    heading: "What to expect during the beta",
    intro: "Here's what the beta experience looks like so you know what to expect.",
    items: BETA_EXPECTATIONS,
  },
};
