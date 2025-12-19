import type {
  HomepageContent,
  HeroContent,
  ProblemSectionContent,
  WhatIsSectionContent,
  HowWorksSectionContent,
} from "../types";

/**
 * Hero section content - French (Quebec)
 */
export const HERO_CONTENT: HeroContent = {
  badge: "Bêta privée · Sur invitation seulement",
  headline: "Inférence IA prête à livrer",
  headlineAccent: "sans la complexité",
  subtitle:
    "Un runtime, tous tes modèles, zéro bordel.",
  cta: {
    primary: {
      text: "Demander l'accès bêta",
      href: "/fr/beta",
    },
    secondary: {
      text: "Lire le livre blanc",
      href: "/whitepaper.pdf",
    },
  },
  microcopy: "On invite les équipes graduellement, selon la compatibilité et la capacité.",
};

/**
 * Problem section content - French (Quebec)
 */
export const PROBLEM_CONTENT: ProblemSectionContent = {
  heading: "Pourquoi l'inférence IA semble plus compliquée qu'elle devrait",
  intro:
    "L'inférence en production finit souvent en pile de fournisseurs, de décisions de capacité GPU, et de code d'intégration que personne veut maintenir à long terme.",
  cards: [
    {
      category: "COMPLEXITÉ",
      title: "Trop de pièces mobiles",
      description:
        "Serveurs de modèles, schedulers, pools GPU et facturation doivent rester synchronisés. Chaque nouvelle couche ajoute de la configuration, des cas limites, et plus de façons que ça peut planter.",
      icon: "grid-2x2",
    },
    {
      category: "PRODUCTIVITÉ",
      title: "L'infra vole le focus",
      description:
        "Les équipes perdent du temps à déboguer des nœuds, des quotas et des cold starts au lieu d'améliorer le produit. L'infra devient le travail par défaut.",
      icon: "clock",
    },
    {
      category: "CONTRÔLE DES COÛTS",
      title: "Les coûts sont durs à prévoir",
      description:
        "L'utilisation fragmentée et les compromis flous rendent difficile de prévoir les dépenses, comparer les tiers GPU, et router les workloads avec confiance.",
      icon: "dollar-sign",
    },
  ],
};


/**
 * What-is section content - French (Quebec)
 */
export const WHAT_IS_CONTENT: WhatIsSectionContent = {
  heading: "L'inférence IA, simplifiée",
  subheading: "Un runtime unifié pour l'inférence IA serverless",
  description:
    "Au lieu de connecter ensemble des fournisseurs, runtimes et schedulers personnalisés, tu intègres une seule fois. Koeo route les requêtes vers la capacité GPU disponible, vérifie la santé des services, et suit l'utilisation pour que tu puisses te concentrer sur livrer.",
  features: [
    {
      icon: "check",
      text: "Une API pour exécuter tes modèles supportés via un seul endpoint",
    },
    {
      icon: "check",
      text: "Routage et health checks inclus, conçus pour du vrai trafic",
    },
    {
      icon: "check",
      text: "Métriques d'utilisation et de latence incluses, avec plus d'observabilité qui évolue en bêta",
    },
  ],
  cta: {
    text: "Voir comment ça marche",
    href: "/fr/beta",
  },
};

/**
 * How-works section content - French (Quebec)
 */
export const HOW_WORKS_CONTENT: HowWorksSectionContent = {
  heading: "Bâti par des développeurs,",
  headingAccent: "pour des développeurs",
  subheading: "Une expérience axée développeur, même en bêta",
  developerFeatures: [
    {
      title: "API compatible OpenAI",
      description:
        "Une fois intégré, tu reçois des endpoints style OpenAI qui se branchent sur tes clients et SDKs existants. Dans la plupart des cas, c'est juste un changement de base URL et d'authentification.",
      link: { text: "Voir la documentation API", href: "/docs/api" },
    },
    {
      title: "Dashboard en accès anticipé",
      description:
        "Surveille l'utilisation, la latence et les taux d'erreur, et gère tes clés et modèles. On itère vite ici, et tes retours influencent directement ce qu'on livre.",
      link: { text: "Demander l'accès au dashboard", href: "/fr/beta" },
    },
  ],
  stepsHeading: "Comment la bêta privée fonctionne",
  steps: [
    {
      stepNumber: 1,
      title: "Demander l'accès",
      description:
        "Parle-nous de ton cas d'utilisation, ta configuration actuelle, et tes contraintes. On révise les demandes pour s'assurer que la bêta est une bonne compatibilité.",
    },
    {
      stepNumber: 2,
      title: "Intégration et clés API",
      description:
        "Si c'est compatible, on t'intègre, on définit les limites initiales, et on te partage des clés API plus des exemples de requêtes pour démarrer rapidement.",
    },
    {
      stepNumber: 3,
      title: "Intégrer, puis grandir ensemble",
      description:
        "Commence à router du vrai trafic via Koeo. On suit la fiabilité et la performance avec toi, on ajuste les politiques de routage, et on augmente la capacité selon ton usage.",
    },
  ],
  cta: {
    primary: {
      text: "Demander l'accès bêta",
      href: "/fr/beta",
    },
    secondary: {
      text: "Parler à l'équipe",
      href: "mailto:info@koeo.ai",
    },
  },
};

/**
 * Complete homepage content - combines all sections - French (Quebec)
 */
export const HOMEPAGE_CONTENT: HomepageContent = {
  hero: HERO_CONTENT,
  problem: PROBLEM_CONTENT,
  whatIs: WHAT_IS_CONTENT,
  howWorks: HOW_WORKS_CONTENT,
};
