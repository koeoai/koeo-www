import type {
  HomepageContent,
  HeroContent,
  ProblemSectionContent,
  WhatIsSectionContent,
  HowWorksSectionContent,
} from "../types";

/**
 * Hero section content - French
 */
export const HERO_CONTENT: HeroContent = {
  badge: "Bêta fermée · Pas encore disponible au public",
  headline: "Exécutez vos modèles IA",
  headlineAccent: "sans gérer les GPU",
  subtitle:
    "Nous nous occupons de la complexité GPU pour que vous puissiez vous concentrer sur la création. Un runtime, n'importe quel modèle, sans tracas d'infrastructure.",
  cta: {
    primary: {
      text: "Rejoindre la bêta privée",
      href: "/fr/beta",
    },
    secondary: {
      text: "Lire le livre blanc",
      href: "/whitepaper.pdf",
    },
  },
  microcopy: "Nous invitons progressivement des équipes dans la bêta privée.",
};

/**
 * Problem section content - French
 */
export const PROBLEM_CONTENT: ProblemSectionContent = {
  heading: "Pourquoi l'infrastructure IA semble plus difficile qu'elle ne devrait l'être",
  intro:
    "Exécuter l'inférence à grande échelle signifie généralement jongler avec les fournisseurs, gérer la disponibilité des GPU et assembler des outils qui n'ont pas été conçus pour fonctionner ensemble.",
  cards: [
    {
      category: "COMPLEXITÉ",
      title: "Trop de pièces mobiles",
      description:
        "Les serveurs de modèles, les planificateurs, les pools GPU et les systèmes de facturation doivent tous être connectés et synchronisés. Chaque nouveau composant ajoute de la configuration, des cas limites et des modes de défaillance.",
      icon: "grid-2x2",
    },
    {
      category: "PRODUCTIVITÉ",
      title: "L'infrastructure vole le focus",
      description:
        "Les équipes produit perdent du temps à déboguer les nœuds, les quotas et les démarrages à froid au lieu d'améliorer l'expérience utilisateur. Le travail d'infrastructure devient la norme plutôt que l'exception.",
      icon: "clock",
    },
    {
      category: "CONTRÔLE DES COÛTS",
      title: "Les coûts sont imprévisibles",
      description:
        "L'utilisation fragmentée des GPU, les instances spot et la tarification opaque rendent difficile la prévision des dépenses ou la décision de l'endroit où exécuter chaque charge de travail efficacement.",
      icon: "dollar-sign",
    },
  ],
};


/**
 * What-is section content - French
 */
export const WHAT_IS_CONTENT: WhatIsSectionContent = {
  heading: "L'inférence IA, simplifiée",
  subheading: "Koeo est un runtime unifié pour l'inférence GPU distribuée",
  description:
    "Au lieu de connecter ensemble des fournisseurs, des runtimes et des planificateurs personnalisés, vous intégrez un seul runtime. Koeo connecte vos charges de travail à un pool fédéré de GPU et applique le routage, les vérifications de santé et le suivi d'utilisation pour vous.",
  features: [
    {
      icon: "check",
      text: "Une seule API pour exécuter vos modèles supportés sur notre fabric GPU fédéré",
    },
    {
      icon: "check",
      text: "Routage automatique, vérifications de santé et contrôles de coûts de base sur différents niveaux de GPU",
    },
    {
      icon: "check",
      text: "Métriques d'utilisation et de latence intégrées, avec une observabilité plus approfondie en développement actif",
    },
  ],
  cta: {
    text: "En savoir plus",
    href: "/fr/beta",
  },
};

/**
 * How-works section content - French
 */
export const HOW_WORKS_CONTENT: HowWorksSectionContent = {
  heading: "Construit par des développeurs,",
  headingAccent: "pour des développeurs",
  subheading: "Une expérience axée sur les développeurs, même en bêta",
  developerFeatures: [
    {
      title: "API compatible OpenAI",
      description:
        "Une fois intégré à la bêta, vous obtiendrez des endpoints de style OpenAI que vous pouvez brancher sur vos clients et SDK existants. Dans la plupart des cas, vous mettez simplement à jour l'URL de base et l'authentification, et gardez le reste de votre code identique.",
      link: { text: "Voir la documentation API", href: "/docs/api" },
    },
    {
      title: "Tableau de bord en accès anticipé",
      description:
        "Les utilisateurs bêta ont accès à un tableau de bord en évolution pour surveiller l'utilisation, la latence et les taux d'erreur, et pour gérer les clés et les modèles. Nous itérons rapidement ici, et vos retours façonnent directement ce que nous construisons ensuite.",
      link: { text: "Demander l'accès au tableau de bord", href: "/fr/beta" },
    },
  ],
  stepsHeading: "Comment fonctionne la bêta privée",
  steps: [
    {
      stepNumber: 1,
      title: "Postuler pour l'accès",
      description:
        "Parlez-nous de votre cas d'utilisation, de votre configuration actuelle et de vos contraintes. Nous examinons les candidatures pour nous assurer que la bêta correspond bien à ce que vous construisez.",
    },
    {
      stepNumber: 2,
      title: "Intégration et clés API",
      description:
        "S'il y a une correspondance, nous vous intégrerons, conviendrons des limites initiales et vous donnerons des clés API, des exemples de requêtes et des conseils pour votre première intégration.",
    },
    {
      stepNumber: 3,
      title: "Intégrer, puis évoluer ensemble",
      description:
        "Commencez à router le trafic réel via KOEO. Nous surveillerons la fiabilité et les performances avec vous, ajusterons les politiques de routage et augmenterons la capacité à mesure que votre utilisation augmente.",
    },
  ],
  cta: {
    primary: {
      text: "Postuler pour la bêta privée",
      href: "/fr/beta",
    },
    secondary: {
      text: "Parler à l'équipe",
      href: "mailto:hello@koeo.ai",
    },
  },
};

/**
 * Complete homepage content - combines all sections - French
 */
export const HOMEPAGE_CONTENT: HomepageContent = {
  hero: HERO_CONTENT,
  problem: PROBLEM_CONTENT,
  whatIs: WHAT_IS_CONTENT,
  howWorks: HOW_WORKS_CONTENT,
};
