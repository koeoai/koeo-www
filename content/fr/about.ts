/**
 * About page content - French translations for the about page.
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
 * About hero content - French
 */
export const ABOUT_HERO_CONTENT: AboutHeroContent = {
  badge: "À propos de Koeo",
  headline: "Rendez-le",
  headlineAccent: "sans effort",
  subtitle: "Nous avons créé Koeo après avoir vu trop d'équipes coincées entre une démo cool et un produit fiable. Notre mission est de vous décharger des parties douloureuses de l'infrastructure IA pour que vous puissiez vous concentrer sur vos clients, pas sur vos clusters.",
};


/**
 * Vision section content - French
 */
export const ABOUT_VISION_CONTENT: AboutVisionContent = {
  label: "Notre vision",
  headline: "Devenir le runtime discret derrière les",
  headlineAccent: "meilleurs produits IA",
  paragraphs: [
    "Nous croyons que chaque équipe IA sérieuse devrait pouvoir posséder ses modèles sans avoir à reconstruire l'infrastructure GPU à partir de zéro.",
    "La capacité peut venir de nombreux endroits, mais elle devrait ressembler à un seul tissu de confiance : rapide, fiable et équitable.",
  ],
  highlight: "Si nous faisons bien notre travail, Koeo s'efface en arrière-plan et c'est votre produit dont les gens parlent.",
};

/**
 * Principles content - French
 */
export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
  {
    number: "01",
    title: "Commencer par le problème du client",
    description: "Nous commençons avec une vraie personne essayant de livrer une vraie fonctionnalité. Si cela n'aide pas clairement un client, ce n'est pas une priorité.",
  },
  {
    number: "02",
    title: "Assumer le résultat",
    description: "Nous traitons les charges de travail des clients comme les nôtres. Quand quelque chose ne va pas, nous creusons, réparons et apprenons.",
  },
  {
    number: "03",
    title: "La fiabilité est le produit",
    description: "Les fonctionnalités attirent les gens. La fiabilité les garde. Nous concevons pour la défaillance afin que vos utilisateurs la remarquent à peine.",
  },
  {
    number: "04",
    title: "La simplicité gagne",
    description: "La complexité est une taxe. Nous la gardons basse avec des API claires, une architecture ennuyeuse et des valeurs par défaut évidentes.",
  },
  {
    number: "05",
    title: "Apprendre de la production",
    description: "Les meilleurs retours viennent des charges de travail réelles, pas des présentations. Nous livrons, observons, ajustons et répétons.",
  },
  {
    number: "06",
    title: "Parler franchement",
    description: "Nous sommes honnêtes sur les limites, les compromis et les prix. Pas de brouillard de mots à la mode, juste un langage clair.",
  },
  {
    number: "07",
    title: "Construire pour le long terme",
    description: "Nous voulons que Koeo soit une infrastructure sur laquelle les équipes comptent pendant des années. Les raccourcis qui endommagent la confiance n'en valent pas la peine.",
  },
  {
    number: "08",
    title: "Avancer vite, prudemment",
    description: "La vitesse compte. Nous penchons vers l'action, mais tout ce qui touche à la fiabilité ou à la sécurité reçoit une attention supplémentaire.",
  },
];

/**
 * CTA section content - French
 */
export const ABOUT_CTA_CONTENT: AboutCtaContent = {
  headline: "Prêt à construire avec nous ?",
  subtitle: "Que vous soyez un développeur à la recherche de calcul ou un fournisseur avec une capacité GPU, nous serions ravis de vous entendre.",
  primaryCta: {
    text: "Postuler pour la bêta",
    href: "/fr/beta",
  },
  secondaryCta: {
    text: "Devenir fournisseur",
    href: "/fr/providers",
  },
};

/**
 * Complete about page content - French
 */
export const ABOUT_PAGE_CONTENT: AboutPageContent = {
  hero: ABOUT_HERO_CONTENT,
  vision: ABOUT_VISION_CONTENT,
  principles: {
    label: "Comment nous travaillons",
    heading: "Nos principes",
    items: ABOUT_PRINCIPLES,
  },
  cta: ABOUT_CTA_CONTENT,
};
