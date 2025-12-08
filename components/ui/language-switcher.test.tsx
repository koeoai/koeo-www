import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "./language-switcher";
import { LocaleProvider } from "@/lib/i18n";
import { i18nConfig } from "@/lib/i18n/config";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/beta"),
}));

import { usePathname } from "next/navigation";

const mockedUsePathname = vi.mocked(usePathname);

describe("LanguageSwitcher Component", () => {
  beforeEach(() => {
    mockedUsePathname.mockReturnValue("/beta");
  });

  describe("Link generation", () => {
    it("generates correct links for each locale when on English page", () => {
      mockedUsePathname.mockReturnValue("/beta");

      render(
        <LocaleProvider locale="en">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      // English link should point to /beta (no prefix for default locale)
      const englishLink = screen.getByRole("link", {
        name: /switch to english/i,
      });
      expect(englishLink).toHaveAttribute("href", "/beta");
      expect(englishLink).toHaveAttribute("hreflang", "en");

      // French link should point to /fr/beta
      const frenchLink = screen.getByRole("link", {
        name: /switch to français/i,
      });
      expect(frenchLink).toHaveAttribute("href", "/fr/beta");
      expect(frenchLink).toHaveAttribute("hreflang", "fr");
    });

    it("generates correct links for each locale when on French page", () => {
      mockedUsePathname.mockReturnValue("/fr/beta");

      render(
        <LocaleProvider locale="fr">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      // English link should point to /beta (removes /fr prefix)
      const englishLink = screen.getByRole("link", {
        name: /switch to english/i,
      });
      expect(englishLink).toHaveAttribute("href", "/beta");

      // French link should point to /fr/beta
      const frenchLink = screen.getByRole("link", {
        name: /switch to français/i,
      });
      expect(frenchLink).toHaveAttribute("href", "/fr/beta");
    });

    it("generates correct links for root path", () => {
      mockedUsePathname.mockReturnValue("/");

      render(
        <LocaleProvider locale="en">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      const englishLink = screen.getByRole("link", {
        name: /switch to english/i,
      });
      expect(englishLink).toHaveAttribute("href", "/");

      const frenchLink = screen.getByRole("link", {
        name: /switch to français/i,
      });
      expect(frenchLink).toHaveAttribute("href", "/fr");
    });
  });

  describe("Current locale highlighting", () => {
    it("highlights English when English is current locale", () => {
      mockedUsePathname.mockReturnValue("/beta");

      render(
        <LocaleProvider locale="en">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      const englishLink = screen.getByRole("link", {
        name: /switch to english/i,
      });
      const frenchLink = screen.getByRole("link", {
        name: /switch to français/i,
      });

      // English should have aria-current and highlighted styling
      expect(englishLink).toHaveAttribute("aria-current", "true");
      expect(englishLink.className).toContain("text-pink-light");

      // French should not have aria-current
      expect(frenchLink).not.toHaveAttribute("aria-current");
    });

    it("highlights French when French is current locale", () => {
      mockedUsePathname.mockReturnValue("/fr/beta");

      render(
        <LocaleProvider locale="fr">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      const englishLink = screen.getByRole("link", {
        name: /switch to english/i,
      });
      const frenchLink = screen.getByRole("link", {
        name: /switch to français/i,
      });

      // French should have aria-current
      expect(frenchLink).toHaveAttribute("aria-current", "true");
      expect(frenchLink.className).toContain("text-pink-light");

      // English should not have aria-current
      expect(englishLink).not.toHaveAttribute("aria-current");
    });
  });

  describe("Accessibility", () => {
    it("has proper navigation role and label", () => {
      render(
        <LocaleProvider locale="en">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      const nav = screen.getByRole("navigation", {
        name: /language selection/i,
      });
      expect(nav).toBeInTheDocument();
    });

    it("renders all supported locales", () => {
      render(
        <LocaleProvider locale="en">
          <LanguageSwitcher />
        </LocaleProvider>
      );

      // Should have links for all locales
      i18nConfig.locales.forEach((locale) => {
        const localeName = i18nConfig.localeNames[locale];
        expect(screen.getByText(localeName)).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    it("renders mobile variant correctly", () => {
      render(
        <LocaleProvider locale="en">
          <LanguageSwitcher variant="mobile" showIcon={false} />
        </LocaleProvider>
      );

      // Should still have all locale links
      const englishLink = screen.getByRole("link", {
        name: /switch to english/i,
      });
      const frenchLink = screen.getByRole("link", {
        name: /switch to français/i,
      });

      expect(englishLink).toBeInTheDocument();
      expect(frenchLink).toBeInTheDocument();
    });
  });
});
