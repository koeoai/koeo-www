/**
 * Beta page content - French (Quebec) translations for the beta signup page.
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
 * Beta hero content - French (Quebec)
 */
export const BETA_HERO_CONTENT: BetaHeroContent = {
  badge: "Bêta privée · Sur invitation seulement",
  headline: "Rejoins",
  headlineAccent: "notre bêta privée",
  subtitle: "On intègre les équipes graduellement.",
  scrollIndicator: "Défiler pour postuler",
};


/**
 * Who we're looking for criteria - French (Quebec)
 */
export const BETA_CRITERIA: BetaCriterion[] = [
  {
    title: "Tu livres des fonctionnalités IA",
    description: "Interfaces de chat, copilotes, agents, ou tout produit qui repose sur l'inférence de modèles.",
  },
  {
    title: "Tu veux simplifier ton stack d'inférence",
    description: "T'es tanné de gérer plusieurs fournisseurs, pools GPU ou orchestrations complexes.",
  },
  {
    title: "Tu es ouvert à donner du feedback",
    description: "On cherche des partenaires qui vont nous aider à façonner le produit avec une utilisation réelle.",
  },
];

/**
 * Beta benefits content - French (Quebec)
 * TODO: Not currently rendered on the beta page - sections left out intentionally
 */
export const BETA_BENEFITS: BetaBenefit[] = [
  {
    title: "Accès anticipé au runtime",
    description: "Utilise la couche d'inférence unifiée de Koeo avant la disponibilité générale et aide à façonner la roadmap.",
  },
  {
    title: "Ligne directe avec l'équipe",
    description: "Support prioritaire et accès direct à notre équipe d'ingénierie pour tes questions et retours.",
  },
  {
    title: "Tarification partenaire fondateur",
    description: "Verrouille une tarification spéciale en tant que partenaire fondateur qui se poursuit après la bêta.",
  },
  {
    title: "Support de migration",
    description: "On va t'aider à intégrer Koeo dans ton stack et à migrer depuis ta configuration actuelle.",
  },
];

/**
 * Beta expectations content - French (Quebec)
 * TODO: Not currently rendered on the beta page - sections left out intentionally
 */
export const BETA_EXPECTATIONS: BetaExpectation[] = [
  {
    title: "Intégration par étapes",
    description: "On commence par un court appel pour comprendre ton cas d'utilisation, puis on t'aide à intégrer étape par étape.",
  },
  {
    title: "Points réguliers",
    description: "Attends-toi à de brefs syncs hebdomadaires ou aux deux semaines pour recueillir du feedback et régler les problèmes rapidement.",
  },
  {
    title: "Plateforme en évolution",
    description: "Le produit va évoluer selon tes retours. On te tient informé des mises à jour et des nouvelles fonctionnalités.",
  },
];

/**
 * Complete beta page content - French (Quebec)
 * Note: Only hero and criteria are currently rendered. Benefits and expectations sections are not shown.
 */
export const BETA_PAGE_CONTENT: BetaPageContent = {
  hero: BETA_HERO_CONTENT,
  whoHeading: "Qui on recherche",
  criteria: BETA_CRITERIA,
  benefits: {
    heading: "Ce que tu obtiens comme partenaire bêta",
    items: BETA_BENEFITS,
  },
  expectations: {
    heading: "À quoi t'attendre pendant la bêta",
    intro: "Voici à quoi ressemble l'expérience bêta pour que tu saches à quoi t'attendre.",
    items: BETA_EXPECTATIONS,
  },
};
