/**
 * Brandkit page content - English
 */

export interface BrandkitHeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
}

export interface BrandkitSectionHeader {
  title: string;
  description: string;
}

export interface BrandkitTypographyContent {
  primaryFont: {
    title: string;
    name: string;
    description: string;
    weights: string[];
  };
  logoFont: {
    title: string;
    name: string;
    description: string;
    weight: string;
    letterSpacing: string;
  };
}

export interface BrandkitGradientContent {
  cssLabel: string;
  cssCode: string;
  tailwindLabel: string;
  tailwindCode: string;
}

export interface BrandkitPageContent {
  hero: BrandkitHeroContent;
  sections: {
    logos: BrandkitSectionHeader;
    icons: BrandkitSectionHeader;
    banners: BrandkitSectionHeader;
    colors: BrandkitSectionHeader;
    gradient: BrandkitSectionHeader;
    typography: BrandkitSectionHeader;
  };
  typography: BrandkitTypographyContent;
  gradient: BrandkitGradientContent;
}

export const BRANDKIT_HERO_CONTENT: BrandkitHeroContent = {
  badge: "Official brand assets",
  headline: "Brand",
  headlineAccent: "kit",
  subtitle: "Everything you need to represent Koeo consistently across all platforms and materials.",
};

export const BRANDKIT_SECTIONS: BrandkitPageContent["sections"] = {
  logos: {
    title: "Logos",
    description: "Full logo with wordmark. Use on marketing materials, presentations, and partnerships.",
  },
  icons: {
    title: "Icons",
    description: "Icon-only mark. Use for favicons, app icons, profile pictures, and social media platforms.",
  },
  banners: {
    title: "Banners",
    description: "Neural network-themed banners for social media, headers, and marketing materials.",
  },
  colors: {
    title: "Color Palette",
    description: "Official Koeo colors. Click any swatch to copy the hex value.",
  },
  gradient: {
    title: "Primary Gradient",
    description: "The signature Koeo gradient used for CTAs and accent elements.",
  },
  typography: {
    title: "Typography",
    description: "Font families and weights used across Koeo.",
  },
};

export const BRANDKIT_TYPOGRAPHY_CONTENT: BrandkitTypographyContent = {
  primaryFont: {
    title: "Primary Font",
    name: "Inter",
    description: "Used for all body text, headings, and UI elements.",
    weights: [
      "Regular (400) — Body text",
      "Medium (500) — Navigation, emphasis",
      "Semi-Bold (600) — Subheadings, buttons",
      "Bold (700) — Main headings",
    ],
  },
  logoFont: {
    title: "Logo Font",
    name: "Outfit",
    description: "Used exclusively for the Koeo wordmark.",
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
