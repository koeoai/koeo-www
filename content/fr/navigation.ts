/**
 * Navigation content - French
 * Shared content for header and footer navigation
 */

import type { NavigationContent } from "../en/navigation";

export const NAVIGATION_CONTENT: NavigationContent = {
  header: {
    navItems: [
      { label: "Produit", href: "/fr/product" },
    ],
    companyDropdown: {
      label: "Entreprise",
      items: [
        { label: "À propos", href: "/fr/about" },
        { label: "Carrières", href: "/fr/careers" },
      ],
    },
    joinBeta: "Rejoindre la bêta",
    languageLabel: "Langue",
  },
  footer: {
    tagline: "Un runtime, tous tes modèles, zéro bordel.",
    groups: [
      {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/fr/about" },
          { label: "Carrières", href: "/fr/careers" },
          { label: "Rejoindre la bêta", href: "/fr/beta" },
        ],
      },
      {
        title: "Ressources",
        links: [
          { label: "Suggérer une idée", href: "https://github.com/koeo-ai/feedback", external: true },
          { label: "Signaler un bug", href: "https://github.com/koeo-ai/feedback/issues", external: true },
          { label: "Kit de marque", href: "/fr/brandkit" },
          { label: "Devenir fournisseur", href: "/fr/providers" },
        ],
      },
    ],
    connectTitle: "Nous suivre",
    copyright: "Tous droits réservés.",
  },
};
