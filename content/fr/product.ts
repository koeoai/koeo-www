/**
 * Product page content - French translations for the product page.
 */

/**
 * Product hero section content
 */
export interface ProductHeroContent {
  badge: string;
  headline: string;
  tagline: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: string;
}

/**
 * What Koeo is section content
 */
export interface ProductWhatIsContent {
  label: string;
  heading: string;
  description: string;
  points: string[];
}

/**
 * Who it's for item
 */
export interface ProductWhoForItem {
  title: string;
  description: string;
  iconName: string;
}

/**
 * Who it's for section content
 */
export interface ProductWhoForContent {
  label: string;
  heading: string;
  subtitle: string;
  items: ProductWhoForItem[];
}

/**
 * Why Koeo feature item
 */
export interface ProductWhyFeature {
  number: string;
  title: string;
  subtitle: string;
  points: string[];
  footer: string;
}

/**
 * Why Koeo section content
 */
export interface ProductWhyContent {
  label: string;
  heading: string;
  features: ProductWhyFeature[];
}

/**
 * How it works step
 */
export interface ProductHowStep {
  step: number;
  title: string;
  description: string;
}

/**
 * How it works section content
 */
export interface ProductHowContent {
  label: string;
  heading: string;
  steps: ProductHowStep[];
}

/**
 * CTA section content
 */
export interface ProductCtaContent {
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
 * Complete product page content structure
 */
export interface ProductPageContent {
  hero: ProductHeroContent;
  whatIs: ProductWhatIsContent;
  whoFor: ProductWhoForContent;
  why: ProductWhyContent;
  how: ProductHowContent;
  cta: ProductCtaContent;
}

/**
 * Product hero content - French
 */
export const PRODUCT_HERO_CONTENT: ProductHeroContent = {
  badge: "Bêta",
  headline: "Runtime d'inférence Koeo",
  tagline: "Si vous connaissez l'API OpenAI, vous connaissez déjà Koeo.",
  subtitle: "Un runtime d'inférence géré qui transforme vos modèles en API fiables. Mêmes bibliothèques client, pointez simplement vers un endpoint différent.",
  primaryCta: {
    text: "Rejoindre la bêta",
    href: "/fr/beta",
  },
  secondaryCta: "Voir comment ça marche",
};


/**
 * What Koeo is content - French
 */
export const PRODUCT_WHAT_IS_CONTENT: ProductWhatIsContent = {
  label: "Ce qu'est KOEO",
  heading: "Un runtime axé sur l'inférence pour les applications IA",
  description: "Pensez-y comme du serverless, mais uniquement pour l'inférence de modèles :",
  points: [
    "Envoyez des requêtes. Obtenez des réponses. C'est tout.",
    "Pas de VM à provisionner, pas de pilotes à installer.",
    "La capacité s'adapte automatiquement à votre trafic.",
    "Vous restez concentré sur les prompts et le produit.",
  ],
};

/**
 * Who it's for content - French
 */
export const PRODUCT_WHO_FOR_CONTENT: ProductWhoForContent = {
  label: "Pour qui c'est",
  heading: "Construit pour les équipes qui livrent de l'IA",
  subtitle: "Si vous savez déjà comment appeler l'API OpenAI, vous êtes au bon endroit.",
  items: [
    {
      title: "Startups IA",
      description: "Livrez des fonctionnalités, pas de l'infrastructure. Arrêtez de lancer des machines GPU pour chaque nouvelle capacité.",
      iconName: "rocket",
    },
    {
      title: "Équipes produit et plateforme",
      description: "Ajoutez l'IA à votre produit avec une API prévisible, pas une VM sidecar que vous devez surveiller.",
      iconName: "users",
    },
    {
      title: "Équipes ML et consultants",
      description: "Votre modèle fonctionne. Maintenant servez-le à de vrais utilisateurs sans construire un pipeline de déploiement.",
      iconName: "flask",
    },
  ],
};

/**
 * Why Koeo content - French
 */
export const PRODUCT_WHY_CONTENT: ProductWhyContent = {
  label: "Pourquoi KOEO",
  heading: "Pourquoi les équipes utilisent Koeo au lieu de GPU bruts",
  features: [
    {
      number: "01",
      title: "Runtime, pas du matériel brut",
      subtitle: "Les clouds GPU vous louent des machines. Koeo vous donne l'inférence en tant que service.",
      points: [
        "Pas de configuration VM ou de gestion de pilotes",
        "Pas de routage personnalisé ou de file d'attente à construire",
        "Vérifications de santé et basculement intégrés",
      ],
      footer: "Nous gérons l'infrastructure. Vous gérez le produit.",
    },
    {
      number: "02",
      title: "Résilient par défaut",
      subtitle: "Le runtime surveille la santé des GPU et contourne automatiquement les problèmes.",
      points: [
        "Les nœuds défaillants sont contournés instantanément",
        "Les pics de charge ne font pas tomber votre application",
        "Changez de matériel ou de fournisseur sans modifier le code",
      ],
      footer: "Vos utilisateurs voient des réponses cohérentes. Vous voyez un seul endpoint.",
    },
    {
      number: "03",
      title: "Zéro friction de migration",
      subtitle: "Vous utilisez déjà OpenAI ? Changez deux lignes et vous êtes sur Koeo.",
      points: [
        "Mêmes bibliothèques client que vous utilisez déjà",
        "Mêmes formats de requête et de réponse",
        "Exécutez les deux en parallèle pendant que vous évaluez",
      ],
      footer: "Pas de SDK à apprendre. Pas de migration de plusieurs semaines. Changez juste l'URL de base.",
    },
  ],
};

/**
 * How it works content - French
 */
export const PRODUCT_HOW_CONTENT: ProductHowContent = {
  label: "Comment ça marche",
  heading: "De l'inscription à la production en quelques minutes",
  steps: [
    {
      step: 1,
      title: "Obtenez une clé API",
      description: "Inscrivez-vous et générez une clé dans la console. Prend environ 30 secondes.",
    },
    {
      step: 2,
      title: "Changez votre URL de base",
      description: "Pointez votre client OpenAI existant vers Koeo. Deux lignes de code.",
    },
    {
      step: 3,
      title: "Envoyez des requêtes",
      description: "Le runtime gère l'authentification, le routage et le basculement. Vous obtenez juste des réponses.",
    },
    {
      step: 4,
      title: "Surveillez dans la console",
      description: "Suivez l'utilisation, la latence et les erreurs. Sachez quand quelque chose nécessite attention.",
    },
  ],
};

/**
 * CTA section content - French
 */
export const PRODUCT_CTA_CONTENT: ProductCtaContent = {
  headline: "Obtenez votre clé API en 30 secondes",
  subtitle: "Rejoignez la bêta et voyez comment ça se passe. Pas d'engagement, pas de carte de crédit requise.",
  primaryCta: {
    text: "Rejoindre la bêta",
    href: "/fr/beta",
  },
  secondaryCta: {
    text: "Devenir fournisseur",
    href: "/fr/providers",
  },
};

/**
 * Complete product page content - French
 */
export const PRODUCT_PAGE_CONTENT: ProductPageContent = {
  hero: PRODUCT_HERO_CONTENT,
  whatIs: PRODUCT_WHAT_IS_CONTENT,
  whoFor: PRODUCT_WHO_FOR_CONTENT,
  why: PRODUCT_WHY_CONTENT,
  how: PRODUCT_HOW_CONTENT,
  cta: PRODUCT_CTA_CONTENT,
};
