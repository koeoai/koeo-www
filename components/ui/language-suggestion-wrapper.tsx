"use client";

/**
 * Language Suggestion Banner Wrapper
 *
 * Client component that reads the detected locale from cookie
 * and renders the language suggestion banner.
 *
 * Requirements: 5.1, 5.2
 */

import { useDetectedLocale } from "@/lib/i18n";
import { LanguageSuggestionBanner } from "./language-suggestion-banner";

/**
 * Wrapper component that connects the language suggestion banner
 * to the detected locale from the middleware cookie.
 */
export function LanguageSuggestionWrapper() {
  const detectedLocale = useDetectedLocale();

  return <LanguageSuggestionBanner detectedLocale={detectedLocale} />;
}
