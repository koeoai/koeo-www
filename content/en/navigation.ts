/**
 * Navigation content - English
 * Shared content for header and footer navigation
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface NavDropdown {
  label: string;
  items: NavItem[];
}

export interface FooterLinkGroup {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface NavigationContent {
  header: {
    navItems: NavItem[];
    companyDropdown: NavDropdown;
    joinBeta: string;
    languageLabel: string;
  };
  footer: {
    tagline: string;
    groups: FooterLinkGroup[];
    connectTitle: string;
    copyright: string;
  };
}

export const NAVIGATION_CONTENT: NavigationContent = {
  header: {
    navItems: [
      { label: "Product", href: "/product" },
    ],
    companyDropdown: {
      label: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
    },
    joinBeta: "Join Beta",
    languageLabel: "Language",
  },
  footer: {
    tagline: "Any model, one place, no infra to chase.",
    groups: [
      {
        title: "Company",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Join Beta", href: "/beta" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Suggest an Idea", href: "https://github.com/koeo-ai/feedback", external: true },
          { label: "Report a Bug", href: "https://github.com/koeo-ai/feedback/issues", external: true },
          { label: "Brandkit", href: "/brandkit" },
          { label: "Become a Provider", href: "/providers" },
        ],
      },
    ],
    connectTitle: "Connect",
    copyright: "All rights reserved.",
  },
};
