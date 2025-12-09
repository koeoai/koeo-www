"use client";

/**
 * Content Retrieval Hook
 *
 * Provides locale-aware content retrieval for client components.
 * Uses the current locale from context to fetch appropriate translations.
 */

import { useLocale } from "./locale-context";
import { getContent } from "@/content";

/**
 * Hook to retrieve localized content based on the current locale.
 *
 * @param contentKey - The key identifying the content to retrieve
 * @returns The localized content for the current locale
 *
 * @example
 * ```tsx
 * const heroContent = useContent<HeroContent>("HERO_CONTENT");
 * ```
 */
export function useContent<T>(contentKey: string): T {
  const { locale } = useLocale();
  return getContent<T>(contentKey, locale);
}
