/**
 * Navigation content - French
 * Shared content for header and footer navigation
 */

import type { NavigationContent } from "../en/navigation";

export const NAVIGATION_CONTENT: NavigationContent = {
  header: {
    navItems: [
      { label: "Produit", href: "/product" },
    ],
    companyDropdown: {
      label: "Entreprise",
      items: [
        { label: "À propos", href: "/about" },
        { label: "Carrières", href: "/careers" },
      ],
    },
    joinBeta: "Rejoindre la bêta",
    languageLabel: "Langue",
  },
  footer: {
    tagline: "Un runtime, tous les modèles, sans tracas d'infrastructure.",
    groups: [
      {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/about" },
          { label: "Carrières", href: "/careers" },
          { label: "Rejoindre la bêta", href: "/beta" },
        ],
      },
      {
        title: "Ressources",
        links: [
          { label: "Suggérer une idée", href: "https://github.com/koeo-ai/feedback", external: true },
          { label: "Signaler un bug", href: "https://github.com/koeo-ai/feedback/issues", external: true },
          { label: "Kit de marque", href: "/brandkit" },
          { label: "Devenir fournisseur", href: "/providers" },
        ],
      },
    ],
    connectTitle: "Nous suivre",
    copyright: "Tous droits réservés.",
  },
};
