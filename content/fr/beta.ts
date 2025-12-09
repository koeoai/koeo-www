/**
 * Beta page content - French translations for the beta signup page.
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
 * Beta hero content - French
 */
export const BETA_HERO_CONTENT: BetaHeroContent = {
  badge: "Bêta privée · places limitées",
  headline: "Postulez pour",
  headlineAccent: "notre bêta privée",
  subtitle: "Nous intégrons les équipes progressivement pour garantir une excellente expérience.",
  scrollIndicator: "Défiler pour postuler",
};


/**
 * Who we're looking for criteria - French
 */
export const BETA_CRITERIA: BetaCriterion[] = [
  {
    title: "Vous lancez ou êtes sur le point de lancer des fonctionnalités IA",
    description: "Interfaces de chat, copilotes, agents, ou tout produit qui repose sur l'inférence de modèles.",
  },
  {
    title: "Vous voulez simplifier votre stack d'inférence",
    description: "Vous en avez assez de gérer plusieurs fournisseurs, pools GPU ou orchestrations complexes.",
  },
  {
    title: "Vous êtes ouvert à donner des retours",
    description: "Nous recherchons des partenaires qui nous aideront à façonner le produit grâce à une utilisation réelle.",
  },
];

/**
 * Beta benefits content - French
 */
export const BETA_BENEFITS: BetaBenefit[] = [
  {
    title: "Accès anticipé au runtime",
    description: "Utilisez la couche d'inférence unifiée de KOEO avant la disponibilité générale et façonnez la feuille de route du produit.",
  },
  {
    title: "Ligne directe avec l'équipe",
    description: "Bénéficiez d'un support prioritaire et d'un accès direct à notre équipe d'ingénierie pour vos questions et retours.",
  },
  {
    title: "Tarification partenaire fondateur",
    description: "Verrouillez une tarification spéciale en tant que partenaire fondateur qui se poursuit après la bêta.",
  },
  {
    title: "Support de migration",
    description: "Nous vous aiderons à intégrer KOEO dans votre stack et à migrer depuis votre configuration actuelle.",
  },
];

/**
 * Beta expectations content - French
 */
export const BETA_EXPECTATIONS: BetaExpectation[] = [
  {
    title: "Intégration par étapes",
    description: "Nous commencerons par un court appel pour comprendre votre cas d'utilisation, puis nous vous aiderons à intégrer étape par étape.",
  },
  {
    title: "Points réguliers",
    description: "Attendez-vous à de brèves synchronisations hebdomadaires ou bihebdomadaires pour recueillir des retours et résoudre rapidement tout problème.",
  },
  {
    title: "Plateforme en évolution",
    description: "Le produit évoluera en fonction de vos retours. Nous vous tiendrons informé des mises à jour et des nouvelles fonctionnalités.",
  },
];

/**
 * Complete beta page content - French
 */
export const BETA_PAGE_CONTENT: BetaPageContent = {
  hero: BETA_HERO_CONTENT,
  whoHeading: "Qui nous recherchons",
  criteria: BETA_CRITERIA,
  benefits: {
    heading: "Ce que vous obtenez en tant que partenaire bêta",
    items: BETA_BENEFITS,
  },
  expectations: {
    heading: "À quoi s'attendre pendant la bêta",
    intro: "Voici à quoi ressemble l'expérience bêta pour que vous sachiez à quoi vous attendre.",
    items: BETA_EXPECTATIONS,
  },
};
