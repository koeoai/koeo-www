"use client";

/**
 * Locale Context Provider
 *
 * Provides locale information to client components throughout the application.
 * Used for accessing the current locale and determining if it's the default locale.
 */

import { createContext, useContext, ReactNode } from "react";
import { Locale, i18nConfig } from "./config";

interface LocaleContextValue {
  locale: Locale;
  isDefaultLocale: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: i18nConfig.defaultLocale,
  isDefaultLocale: true,
});

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

/**
 * Provider component that wraps the application to provide locale context.
 *
 * @param locale - The current locale
 * @param children - Child components
 */
export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider
      value={{
        locale,
        isDefaultLocale: locale === i18nConfig.defaultLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook to access the current locale context.
 *
 * @returns The current locale and whether it's the default locale
 *
 * @example
 * const { locale, isDefaultLocale } = useLocale();
 */
export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
