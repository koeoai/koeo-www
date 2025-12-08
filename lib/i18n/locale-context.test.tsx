import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { render, screen } from "@testing-library/react";
import { LocaleProvider, useLocale } from "./locale-context";
import { i18nConfig, Locale } from "./config";

/**
 * Test component that displays the locale from context
 * This simulates how the HTML lang attribute would be set
 */
function LocaleDisplay() {
  const { locale, isDefaultLocale } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="is-default">{isDefaultLocale.toString()}</span>
    </div>
  );
}

/**
 * **Feature: i18n-support, Property 4: HTML lang attribute matches locale**
 * **Validates: Requirements 2.3**
 *
 * For any supported locale, when that locale is active, the HTML lang attribute
 * value SHALL equal the locale code.
 */
describe("Property 4: HTML lang attribute matches locale", () => {
  it("should provide correct locale value for all supported locales", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...i18nConfig.locales),
        (locale: Locale) => {
          const { unmount } = render(
            <LocaleProvider locale={locale}>
              <LocaleDisplay />
            </LocaleProvider>
          );

          const localeElement = screen.getByTestId("locale");
          expect(localeElement.textContent).toBe(locale);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should correctly identify default locale", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...i18nConfig.locales),
        (locale: Locale) => {
          const { unmount } = render(
            <LocaleProvider locale={locale}>
              <LocaleDisplay />
            </LocaleProvider>
          );

          const isDefaultElement = screen.getByTestId("is-default");
          const expectedIsDefault = locale === i18nConfig.defaultLocale;
          expect(isDefaultElement.textContent).toBe(expectedIsDefault.toString());

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should return default locale when no provider is present", () => {
    render(<LocaleDisplay />);

    const localeElement = screen.getByTestId("locale");
    expect(localeElement.textContent).toBe(i18nConfig.defaultLocale);

    const isDefaultElement = screen.getByTestId("is-default");
    expect(isDefaultElement.textContent).toBe("true");
  });

  it("locale value matches what would be used for HTML lang attribute", () => {
    // This test verifies the contract: the locale from useLocale()
    // is exactly what should be set as the HTML lang attribute
    fc.assert(
      fc.property(
        fc.constantFrom(...i18nConfig.locales),
        (locale: Locale) => {
          const { unmount } = render(
            <LocaleProvider locale={locale}>
              <LocaleDisplay />
            </LocaleProvider>
          );

          const localeElement = screen.getByTestId("locale");
          const providedLocale = localeElement.textContent;

          // The locale should be a valid HTML lang attribute value
          // HTML lang attributes use BCP 47 language tags (e.g., "en", "fr")
          expect(providedLocale).toMatch(/^[a-z]{2}$/);
          expect(providedLocale).toBe(locale);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
