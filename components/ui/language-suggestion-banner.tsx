"use client";

/**
 * Language Suggestion Banner Component
 *
 * Displays a non-intrusive banner suggesting the user switch to their
 * browser's preferred language when it differs from the current locale.
 * Uses session storage to remember dismissal.
 *
 * Requirements: 5.2, 5.3
 */

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, i18nConfig, getLocalizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getContent, type LanguageBannerContent } from "@/content";

const BANNER_DISMISSED_KEY = "koeo-language-banner-dismissed";

export interface LanguageSuggestionBannerProps {
  /** The detected locale from Accept-Language header */
  detectedLocale: Locale | null;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Determines if the banner should be displayed based on:
 * - Detected locale differs from current locale
 * - Detected locale is a supported locale
 * - Banner has not been dismissed in this session
 */
export function shouldShowBanner(
  detectedLocale: Locale | null,
  currentLocale: Locale,
  isDismissed: boolean
): boolean {
  if (!detectedLocale) return false;
  if (isDismissed) return false;
  if (detectedLocale === currentLocale) return false;
  if (!i18nConfig.locales.includes(detectedLocale)) return false;
  return true;
}

// External store for session storage dismissed state
function subscribeToDismissed(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getDismissedSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(BANNER_DISMISSED_KEY) === "true";
}

function getDismissedServerSnapshot(): boolean {
  return true; // Default to dismissed on server to avoid flash
}

// External store for hydration state
function subscribeToHydration() {
  // No-op: hydration state doesn't change after initial mount
  return () => {};
}

function getHydrationSnapshot(): boolean {
  return true; // Client is always hydrated when this runs
}

function getHydrationServerSnapshot(): boolean {
  return false; // Server is never hydrated
}

/**
 * Language suggestion banner that appears when the user's browser language
 * differs from the current page locale.
 *
 * @example
 * <LanguageSuggestionBanner detectedLocale="fr" />
 */
export function LanguageSuggestionBanner({
  detectedLocale,
  className,
}: LanguageSuggestionBannerProps) {
  const pathname = usePathname();
  const { locale: currentLocale } = useLocale();
  const [localDismissed, setLocalDismissed] = useState(false);
  
  // Use useSyncExternalStore for session storage to avoid lint error
  const storageDismissed = useSyncExternalStore(
    subscribeToDismissed,
    getDismissedSnapshot,
    getDismissedServerSnapshot
  );
  
  // Use useSyncExternalStore for hydration state to avoid lint error
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot
  );
  
  const isDismissed = storageDismissed || localDismissed;

  const handleDismiss = () => {
    sessionStorage.setItem(BANNER_DISMISSED_KEY, "true");
    setLocalDismissed(true);
  };

  // Get localized content
  const content = getContent<LanguageBannerContent>(
    "LANGUAGE_BANNER_CONTENT",
    currentLocale
  );

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) return null;

  // Check if banner should be shown
  const showBanner = shouldShowBanner(detectedLocale, currentLocale, isDismissed);
  if (!showBanner || !detectedLocale) return null;

  const suggestedLanguageName = i18nConfig.localeFullNames[detectedLocale];
  // For French, use lowercase language name (anglais instead of Anglais)
  const suggestedLanguageNameLower = detectedLocale === "en" ? "anglais" : suggestedLanguageName.toLowerCase();
  const messageText = content.message.replace("{language}", suggestedLanguageNameLower);
  const switchButtonText = content.switchButton.replace(
    "{language}",
    suggestedLanguageNameLower
  );

  return (
    <div
      role="banner"
      aria-label={content.ariaLabel}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg",
        "rounded-xl border border-white/20 bg-slate-900/95 backdrop-blur-xl",
        "p-4 shadow-2xl shadow-black/40",
        "animate-in slide-in-from-bottom-4 duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-white">
            {messageText}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={getLocalizedPath(pathname, detectedLocale)}
            className={cn(
              "rounded-lg bg-gradient-to-r from-purple-primary to-magenta",
              "px-3 py-1.5 text-sm font-medium text-white",
              "transition-all hover:opacity-90 hover:shadow-md"
            )}
            onClick={handleDismiss}
          >
            {switchButtonText}
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "rounded-lg p-1.5 text-white/60",
              "transition-colors hover:bg-white/10 hover:text-white"
            )}
            aria-label={content.dismissButton}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
