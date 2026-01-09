/**
 * Providers page content - French (Quebec)
 */

import type {
  ProvidersHeroContent,
  ProvidersBenefit,
  ProvidersType,
  ProvidersFaqItem,
  ProvidersSectionContent,
  ProvidersPageContent,
} from "../en/providers";

export const PROVIDERS_HERO_CONTENT: ProvidersHeroContent = {
  badge: "On accepte des partenaires",
  headline: "Fournis le compute,",
  headlineAccent: "on amène la demande",
  subtitle: "Rejoins notre réseau GPU fédéré. Monétise ta capacité inutilisée en alimentant la prochaine vague de produits IA.",
  primaryCta: "Nous contacter",
  secondaryCta: "Voir la FAQ",
};

export const PROVIDERS_SECTIONS: ProvidersSectionContent = {
  benefits: {
    label: "Pourquoi devenir partenaire",
    heading: "Tes GPU, qui travaillent plus fort",
  },
  types: {
    label: "Avec qui on travaille",
    heading: "Conçu pour les opérateurs sérieux",
    subtitle: "Des centres de données d'entreprise aux fournisseurs cloud régionaux, on s'associe avec des organisations prêtes à alimenter l'IA en production.",
  },
  faq: {
    heading: "Questions fréquentes",
    subtitle: "Ce que tu dois savoir avant de te joindre",
  },
};

export const PROVIDERS_BENEFITS: ProvidersBenefit[] = [
  {
    number: "01",
    title: "Monétise ta capacité inutilisée",
    description: "Transforme tes GPU sous-utilisés en revenus stables. On agrège la demande pour que tu puisses te concentrer sur tes opérations.",
  },
  {
    number: "02",
    title: "Pas de cycle de vente",
    description: "On amène des workloads IA qualifiés directement sur ton matériel. Pas d'équipe de vente, pas de dépenses marketing, pas de support à gérer.",
  },
  {
    number: "03",
    title: "Intègre une fois, reste hands-off",
    description: "Déploie notre agent léger en quelques minutes. On gère l'orchestration, la facturation et la conformité. Tes opérations restent inchangées.",
  },
];

export const PROVIDERS_TYPES: ProvidersType[] = [
  {
    number: "01",
    title: "Centres de données",
    description: "Installations d'entreprise avec clusters GPU qui cherchent une utilisation constante et des revenus prévisibles.",
    iconName: "dataCenter",
  },
  {
    number: "02",
    title: "Fournisseurs cloud",
    description: "Plateformes régionales et spécialisées qui étendent leurs capacités IA et rejoignent de nouveaux marchés.",
    iconName: "cloud",
  },
  {
    number: "03",
    title: "Partenaires infrastructure",
    description: "Organisations avec des ressources GPU dédiées, prêtes à participer à l'économie du compute distribué.",
    iconName: "infrastructure",
  },
];

export const PROVIDERS_FAQ: ProvidersFaqItem[] = [
  {
    question: "Quelles sont les exigences pour participer ?",
    answer: "Tu as besoin de GPU NVIDIA (RTX 3090/4090 ou cartes de centre de données comme A100/H100), d'une connexion internet stable, de drivers à jour, et de la capacité de rouler notre agent léger. On t'aide à te configurer.",
  },
  {
    question: "Comment fonctionne la tarification et le paiement ?",
    answer: "Tu gagnes selon le temps de compute livré. Les tarifs varient avec la demande du marché, donc les périodes de pointe rapportent plus. On gère toute la facturation et on te paie mensuellement avec un suivi d'utilisation transparent.",
  },
  {
    question: "Combien de temps prend l'intégration ?",
    answer: "La plupart des fournisseurs déploient notre agent et complètent la vérification en une journée. Une fois en ligne, tu commences à générer des revenus dès que les workloads arrivent sur ton matériel.",
  },
  {
    question: "Qui contrôle les workloads sur mon matériel ?",
    answer: "Koeo gère l'orchestration et le routage. Les workloads roulent dans des conteneurs isolés sans données persistantes. Tu restes hands-off pendant qu'on gère la complexité.",
  },
  {
    question: "Quel est l'engagement requis ?",
    answer: "Aucun lock-in. Tu définis ta propre disponibilité et tu peux augmenter ou réduire selon tes besoins. On valorise les partenaires fiables, mais la flexibilité est intégrée.",
  },
];

export const PROVIDERS_PAGE_CONTENT: ProvidersPageContent = {
  hero: PROVIDERS_HERO_CONTENT,
  sections: PROVIDERS_SECTIONS,
  benefits: PROVIDERS_BENEFITS,
  providerTypes: PROVIDERS_TYPES,
  faq: PROVIDERS_FAQ,
};
