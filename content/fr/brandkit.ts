/**
 * Brandkit page content - French
 */

import type {
  BrandkitHeroContent,
  BrandkitTypographyContent,
  BrandkitGradientContent,
  BrandkitPageContent,
} from "../en/brandkit";

export const BRANDKIT_HERO_CONTENT: BrandkitHeroContent = {
  badge: "Ressources de marque officielles",
  headline: "Kit de",
  headlineAccent: "marque",
  subtitle: "Tout ce dont vous avez besoin pour représenter Koeo de manière cohérente sur toutes les plateformes et supports.",
};

export const BRANDKIT_SECTIONS: BrandkitPageContent["sections"] = {
  logos: {
    title: "Logos",
    description: "Logo complet avec nom. À utiliser sur les supports marketing, présentations et partenariats.",
  },
  icons: {
    title: "Icônes",
    description: "Marque icône uniquement. Pour les favicons, icônes d'applications, photos de profil et réseaux sociaux.",
  },
  banners: {
    title: "Bannières",
    description: "Bannières thématiques réseau neuronal pour les réseaux sociaux, en-têtes et supports marketing.",
  },
  colors: {
    title: "Palette de couleurs",
    description: "Couleurs officielles Koeo. Cliquez sur une nuance pour copier la valeur hexadécimale.",
  },
  gradient: {
    title: "Dégradé principal",
    description: "Le dégradé signature Koeo utilisé pour les CTA et éléments d'accentuation.",
  },
  typography: {
    title: "Typographie",
    description: "Familles de polices et graisses utilisées chez Koeo.",
  },
};

export const BRANDKIT_TYPOGRAPHY_CONTENT: BrandkitTypographyContent = {
  primaryFont: {
    title: "Police principale",
    name: "Inter",
    description: "Utilisée pour tout le texte courant, les titres et les éléments d'interface.",
    weights: [
      "Regular (400) — Texte courant",
      "Medium (500) — Navigation, emphase",
      "Semi-Bold (600) — Sous-titres, boutons",
      "Bold (700) — Titres principaux",
    ],
  },
  logoFont: {
    title: "Police du logo",
    name: "Outfit",
    description: "Utilisée exclusivement pour le nom Koeo.",
    weight: "900 (Black)",
    letterSpacing: "-0.03em",
  },
};

export const BRANDKIT_GRADIENT_CONTENT: BrandkitGradientContent = {
  cssLabel: "CSS",
  cssCode: "background: linear-gradient(135deg, #7C3AED, #E02F87);",
  tailwindLabel: "Tailwind",
  tailwindCode: "bg-gradient-to-br from-[#7C3AED] to-[#E02F87]",
};

export const BRANDKIT_PAGE_CONTENT: BrandkitPageContent = {
  hero: BRANDKIT_HERO_CONTENT,
  sections: BRANDKIT_SECTIONS,
  typography: BRANDKIT_TYPOGRAPHY_CONTENT,
  gradient: BRANDKIT_GRADIENT_CONTENT,
};
