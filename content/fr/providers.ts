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
  badge: "Nous acceptons des partenaires",
  headline: "Fournissez le compute,",
  headlineAccent: "nous amenons la demande",
  subtitle: "Rejoignez notre réseau GPU fédéré. Monétisez votre capacité inutilisée en alimentant la prochaine vague de produits IA.",
  primaryCta: "Nous contacter",
  secondaryCta: "Voir la FAQ",
};

export const PROVIDERS_SECTIONS: ProvidersSectionContent = {
  benefits: {
    label: "Pourquoi devenir partenaire",
    heading: "Vos GPU, qui travaillent plus fort",
  },
  types: {
    label: "Avec qui nous travaillons",
    heading: "Conçu pour les opérateurs sérieux",
    subtitle: "Des centres de données d'entreprise aux fournisseurs cloud régionaux, nous nous associons avec des organisations prêtes à alimenter l'IA en production.",
  },
  faq: {
    heading: "Questions fréquentes",
    subtitle: "Ce que vous devez savoir avant de vous joindre",
  },
};

export const PROVIDERS_BENEFITS: ProvidersBenefit[] = [
  {
    number: "01",
    title: "Monétisez votre capacité inutilisée",
    description: "Transformez vos GPU sous-utilisés en revenus stables. Nous agrégeons la demande pour que vous puissiez vous concentrer sur vos opérations.",
  },
  {
    number: "02",
    title: "Pas de cycle de vente",
    description: "Nous amenons des workloads IA qualifiés directement sur votre matériel. Pas d'équipe de vente, pas de dépenses marketing, pas de support à gérer.",
  },
  {
    number: "03",
    title: "Intégrez une fois, restez hands-off",
    description: "Déployez notre agent léger en quelques minutes. Nous gérons l'orchestration et la facturation. Vos opérations restent inchangées.",
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
    answer: "Vous avez besoin de GPU NVIDIA (RTX 3090/4090 ou cartes de centre de données comme A100/H100), d'une connexion internet stable, de drivers à jour, et de la capacité de rouler notre agent léger. Nous vous aidons à vous configurer.",
  },
  {
    question: "Comment fonctionne la tarification et le paiement ?",
    answer: "Vous gagnez selon le temps de compute livré. Les tarifs varient avec la demande du marché, donc les périodes de pointe rapportent plus. Nous gérons toute la facturation et vous payons mensuellement avec un suivi d'utilisation transparent.",
  },
  {
    question: "Combien de temps prend l'intégration ?",
    answer: "La plupart des fournisseurs déploient notre agent et complètent la vérification en une journée. Une fois en ligne, vous commencez à générer des revenus dès que les workloads arrivent sur votre matériel.",
  },
  {
    question: "Qui contrôle les workloads sur mon matériel ?",
    answer: "Koeo gère l'orchestration et le routage. Les workloads roulent dans des conteneurs isolés sans données persistantes. Vous restez hands-off pendant que nous gérons la complexité.",
  },
  {
    question: "Quel est l'engagement requis ?",
    answer: "Aucun lock-in. Vous définissez votre propre disponibilité et vous pouvez augmenter ou réduire selon vos besoins. Nous valorisons les partenaires fiables, mais la flexibilité est intégrée.",
  },
];

export const PROVIDERS_PAGE_CONTENT: ProvidersPageContent = {
  hero: PROVIDERS_HERO_CONTENT,
  sections: PROVIDERS_SECTIONS,
  benefits: PROVIDERS_BENEFITS,
  providerTypes: PROVIDERS_TYPES,
  faq: PROVIDERS_FAQ,
};
