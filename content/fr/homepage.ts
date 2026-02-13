import type {
  HomepageContent,
  ProblemSectionContent,
  WhatIsSectionContent,
  HowWorksSectionContent,
  RequestFlowLabels,
  ExtendedHeroContent,
  ComparisonBlockContent,
} from "../types";

/**
 * Hero section content with differentiation elements - French (Quebec)
 */
export const HERO_CONTENT: ExtendedHeroContent = {
  badge: "Bêta privée · Sur invitation seulement",
  headline: "Inférence IA prête à livrer",
  headlineAccent: "sans la complexité",
  subtitlePrimary: "Un seul endpoint. Routage automatique. Failover intégré.",
  subtitle:
    "Vos modèles, un seul endroit, zéro infra à gérer.",
  cta: {
    primary: {
      text: "Demander l'accès bêta",
      href: "/fr/beta",
    },
    secondary: {
      text: "Voir comment ça marche",
      href: "/fr/product",
    },
  },
  microcopy: "Nous invitons les équipes graduellement, selon la compatibilité et la capacité.",
  categoryBadge: {
    label: "Fabric d'inférence",
    definition: "Une API qui route à travers la capacité et reste résiliente quand l'infrastructure change.",
  },
  differentiatorLine: "Un seul endpoint qui route les requêtes vers la capacité GPU disponible, avec health checks, retries et failover intégrés.",
  breakBehavior: {
    label: "Ce qui se passe quand ça plante",
    items: [
      { text: "Si un nœud devient non disponible, Koeo le contourne automatiquement." },
      { text: "Si le trafic explose, Koeo continue de router sans que vous touchiez à l'infra." },
      { text: "Vous voyez la latence et les erreurs dans le dashboard." },
    ],
    comingSoon: "Le routage multi-pool et le failover régional arrivent bientôt.",
  },
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
    "Au lieu de connecter ensemble des fournisseurs, runtimes et schedulers personnalisés, vous intégrez une seule fois. Koeo route les requêtes vers la capacité GPU disponible, vérifie la santé des services, et suit l'utilisation pour que vous puissiez vous concentrer sur livrer.",
  features: [
    {
      icon: "check",
      text: "Une API pour exécuter vos modèles supportés via un seul endpoint",
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
        "Une fois intégré, vous recevez des endpoints style OpenAI qui se branchent sur vos clients et SDKs existants. Dans la plupart des cas, c'est juste un changement de base URL et d'authentification.",
      link: { text: "Accéder à la documentation API", href: "/fr/beta" },
    },
    {
      title: "Dashboard en accès anticipé",
      description:
        "Surveillez l'utilisation, la latence et les taux d'erreur, et gérez vos clés et modèles. Nous itérons vite ici, et vos retours influencent directement ce que nous livrons.",
      link: { text: "Demander l'accès au dashboard", href: "/fr/beta" },
    },
  ],
  stepsHeading: "Comment la bêta privée fonctionne",
  steps: [
    {
      stepNumber: 1,
      title: "Demander l'accès",
      description:
        "Parlez-nous de votre cas d'utilisation, votre configuration actuelle, et vos contraintes. Nous révisons les demandes pour nous assurer que la bêta est une bonne compatibilité.",
    },
    {
      stepNumber: 2,
      title: "Intégration et accès complet",
      description:
        "Si c'est compatible, nous vous intégrons et vous donnons accès complet à la plateforme Koeo. Aidez-nous à définir comment l'IA se livre en production.",
    },
    {
      stepNumber: 3,
      title: "Intégrer, puis grandir ensemble",
      description:
        "Commencez à router du vrai trafic via Koeo. Nous suivons la fiabilité et la performance avec vous, ajustons les politiques de routage, et augmentons la capacité selon votre usage.",
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
 * Request flow animation labels - French (Quebec)
 */
export const REQUEST_FLOW_LABELS: RequestFlowLabels = {
  yourApp: "Votre App",
  runtime: "Runtime",
  gpuNetwork: "Réseau GPU",
  sendingRequest: "→ Envoi de la requête...",
  routingToGpu: "→ Routage vers GPU...",
  processingInference: "⚡ Traitement de l'inférence...",
  streamingResponse: "← Réponse en cours...",
  requestComplete: "✓ Requête complétée",
  newRequest: "→ Nouvelle requête...",
  gpuNodeFailed: "✕ Nœud GPU en échec!",
  runtimeRerouting: "↻ Reroutage en cours...",
  processingOnHealthyGpu: "⚡ Traitement sur GPU sain...",
};

/**
 * Comparison block content - "Comment Koeo est différent" - French (Quebec)
 */
export const COMPARISON_CONTENT: ComparisonBlockContent = {
  heading: "Comment Koeo est différent",
  intro: "Découvrez pourquoi les équipes choisissent Koeo",
  rows: [
    {
      name: "Clouds GPU",
      description: "Vous gérez les machines et le routage vous-même.",
    },
    {
      name: "APIs de modèles hébergés",
      description: "Vous obtenez leurs modèles, pas vos modèles.",
    },
    {
      name: "Inférence mono-fournisseur",
      description: "Vous héritez de leurs pannes et limites de capacité.",
    },
    {
      name: "Plateforme Koeo",
      description: "Zéro infra à gérer. Vos modèles. Failover intégré.",
      isKoeo: true,
    },
  ],
};

/**
 * Complete homepage content - combines all sections - French (Quebec)
 */
export const HOMEPAGE_CONTENT: HomepageContent = {
  hero: HERO_CONTENT,
  problem: PROBLEM_CONTENT,
  whatIs: WHAT_IS_CONTENT,
  howWorks: HOW_WORKS_CONTENT,
  requestFlowLabels: REQUEST_FLOW_LABELS,
};
