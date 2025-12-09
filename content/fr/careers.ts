/**
 * Careers page content - French translations for the careers page.
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
 * Careers hero content - French
 */
export const CAREERS_HERO_CONTENT: CareersHeroContent = {
  badge: "Carrières chez Koeo",
  headline: "Construisez l'avenir de",
  headlineAccent: "l'infrastructure IA",
  subtitle: "Nous ne recrutons pas activement en ce moment, mais nous sommes toujours intéressés à rencontrer des personnes talentueuses qui partagent notre mission.",
};

/**
 * Hiring notice content - French
 */
export const CAREERS_NOTICE_CONTENT: CareersNoticeContent = {
  title: "Pas de postes ouverts pour le moment",
  description: "Bien que nous n'ayons pas de rôles actifs pour le moment, nous sommes toujours ravis de nous connecter avec des personnes exceptionnelles. Si vous êtes passionné par l'infrastructure IA et pensez que vous seriez un excellent ajout, nous serions ravis de vous entendre. Soumettez vos informations ci-dessous et nous vous garderons en tête pour les opportunités futures.",
};

/**
 * Form section content - French
 */
export const CAREERS_FORM_CONTENT: CareersFormContent = {
  heading: "Exprimez votre intérêt",
  confidentialityNote: "Vos informations sont gardées confidentielles",
};

/**
 * Complete careers page content - French
 */
export const CAREERS_PAGE_CONTENT: CareersPageContent = {
  hero: CAREERS_HERO_CONTENT,
  notice: CAREERS_NOTICE_CONTENT,
  form: CAREERS_FORM_CONTENT,
};
