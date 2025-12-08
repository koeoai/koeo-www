/**
 * Providers page content - French
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
  badge: "Partenaires acceptés",
  headline: "Devenez",
  headlineAccent: "fournisseur GPU",
  subtitle: "Rejoignez notre réseau GPU fédéré. Contribuez de la capacité de calcul et générez des revenus tout en aidant les développeurs à créer des produits IA.",
  primaryCta: "Nous contacter",
  secondaryCta: "FAQ",
};

export const PROVIDERS_SECTIONS: ProvidersSectionContent = {
  benefits: {
    label: "Avantages du partenariat",
    heading: "Pourquoi devenir partenaire Koeo ?",
  },
  types: {
    label: "Profils partenaires",
    heading: "Avec qui nous travaillons",
    subtitle: "Des centres de données d'entreprise aux fournisseurs cloud régionaux, nous collaborons avec des organisations engagées à alimenter la prochaine génération d'IA.",
  },
  faq: {
    heading: "Questions fréquentes",
    subtitle: "Questions courantes sur le fait de devenir fournisseur GPU",
  },
};

export const PROVIDERS_BENEFITS: ProvidersBenefit[] = [
  {
    number: "01",
    title: "Monétisez la capacité inutilisée",
    description: "Transformez les ressources GPU sous-utilisées en flux de revenus régulier. Nous gérons l'agrégation de la demande pour que vous puissiez vous concentrer sur les opérations.",
  },
  {
    number: "02",
    title: "Zéro acquisition client",
    description: "Nous apportons des charges de travail IA qualifiées directement à votre infrastructure. Pas d'équipe commerciale, pas de dépenses marketing, pas de support client.",
  },
  {
    number: "03",
    title: "Intégration transparente",
    description: "Déployez notre agent léger en quelques minutes. Nous gérons l'orchestration, la facturation et la conformité. Vos opérations existantes restent inchangées.",
  },
];

export const PROVIDERS_TYPES: ProvidersType[] = [
  {
    number: "01",
    title: "Centres de données",
    description: "Installations de niveau entreprise avec clusters GPU recherchant une utilisation constante et des revenus prévisibles.",
    iconName: "dataCenter",
  },
  {
    number: "02",
    title: "Fournisseurs cloud",
    description: "Plateformes cloud régionales et spécialisées cherchant à étendre leurs capacités IA et atteindre de nouveaux marchés.",
    iconName: "cloud",
  },
  {
    number: "03",
    title: "Partenaires infrastructure",
    description: "Organisations avec des ressources GPU dédiées prêtes à participer à l'économie du calcul distribué.",
    iconName: "infrastructure",
  },
];

export const PROVIDERS_FAQ: ProvidersFaqItem[] = [
  {
    question: "Quels types de GPU acceptez-vous ?",
    answer: "Nous acceptons une large gamme de GPU NVIDIA, des cartes grand public comme RTX 3090/4090 aux GPU de centre de données comme A100 et H100. L'exigence clé est une connectivité et une disponibilité fiables.",
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer: "Vous gagnez des revenus basés sur le temps de calcul fourni par vos GPU. Nous gérons toute la facturation avec les clients finaux et vous payons mensuellement selon l'utilisation réelle.",
  },
  {
    question: "Quelles sont les exigences techniques ?",
    answer: "Vous aurez besoin d'une connexion internet stable, de GPU NVIDIA compatibles avec des pilotes à jour, et de la capacité d'exécuter notre logiciel agent léger. Nous vous aiderons à vous installer.",
  },
  {
    question: "Combien puis-je gagner ?",
    answer: "Les gains dépendent du type de GPU, de la disponibilité et de la demande du marché. Les GPU de centre de données rapportent généralement plus, mais même les GPU grand public peuvent générer des revenus significatifs pendant les pics de demande.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui. Les charges de travail s'exécutent dans des conteneurs isolés, et nous ne stockons jamais les données client sur le matériel du fournisseur au-delà de la session active. Nous prenons la sécurité au sérieux.",
  },
];

export const PROVIDERS_PAGE_CONTENT: ProvidersPageContent = {
  hero: PROVIDERS_HERO_CONTENT,
  sections: PROVIDERS_SECTIONS,
  benefits: PROVIDERS_BENEFITS,
  providerTypes: PROVIDERS_TYPES,
  faq: PROVIDERS_FAQ,
};
