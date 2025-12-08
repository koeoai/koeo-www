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
