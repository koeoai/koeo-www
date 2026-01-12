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
    tagline: "Vos modèles, un seul endroit, zéro infra à gérer.",
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
          { label: "Kit de marque", href: "/fr/brandkit" },
          { label: "Devenir fournisseur", href: "/fr/providers" },
        ],
      },
    ],
    connectTitle: "Nous suivre",
    copyright: "Tous droits réservés.",
  },
};
