/**
 * Careers page content - centralized marketing copy for the careers page.
 */

/**
 * Careers hero section content
 */
export interface CareersHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
}

/**
 * Hiring notice content
 */
export interface CareersNoticeContent {
  title: string;
  description: string;
}

/**
 * Form section content
 */
export interface CareersFormContent {
  heading: string;
  confidentialityNote: string;
}

/**
 * Complete careers page content structure
 */
export interface CareersPageContent {
  hero: CareersHeroContent;
  notice: CareersNoticeContent;
  form: CareersFormContent;
}

/**
 * Careers hero content
 */
export const CAREERS_HERO_CONTENT: CareersHeroContent = {
  badge: "Careers at Koeo",
  headline: "Build the future of",
  headlineAccent: "AI infrastructure",
  subtitle: "We're not actively hiring right now, but we're always interested in meeting talented people who share our mission.",
};

/**
 * Hiring notice content
 */
export const CAREERS_NOTICE_CONTENT: CareersNoticeContent = {
  title: "No open positions right now",
  description: "While we don't have any active roles at the moment, we're always excited to connect with exceptional people. If you're passionate about AI infrastructure and think you'd be a great fit, we'd love to hear from you. Submit your information below and we'll keep you in mind for future opportunities.",
};

/**
 * Form section content
 */
export const CAREERS_FORM_CONTENT: CareersFormContent = {
  heading: "Express your interest",
  confidentialityNote: "Your information is kept confidential",
};

/**
 * Complete careers page content
 */
export const CAREERS_PAGE_CONTENT: CareersPageContent = {
  hero: CAREERS_HERO_CONTENT,
  notice: CAREERS_NOTICE_CONTENT,
  form: CAREERS_FORM_CONTENT,
};
