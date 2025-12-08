"use client";

/**
 * Language Switcher Component
 *
 * Allows users to switch between supported locales while preserving the current page path.
 * Styled consistently with the existing navigation components.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, i18nConfig, getLocalizedPath } from "@/lib/i18n";

export interface LanguageSwitcherProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the globe icon */
  showIcon?: boolean;
  /** Visual variant for different contexts */
  variant?: "default" | "mobile";
}

/**
 * Language switcher component that displays links to switch between locales.
 *
 * @example
 * // In header navigation
 * <LanguageSwitcher />
 *
 * // In mobile menu
 * <LanguageSwitcher variant="mobile" />
 */
export function LanguageSwitcher({
  className,
  showIcon = true,
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { locale: currentLocale } = useLocale();

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        variant === "mobile" && "flex-col items-start gap-2",
        className
      )}
      role="navigation"
      aria-label="Language selection"
    >
      {showIcon && variant === "default" && (
        <Globe className="h-4 w-4 text-text-light/70" aria-hidden="true" />
      )}
      <div
        className={cn(
          "flex items-center",
          variant === "default" && "gap-1",
          variant === "mobile" && "flex-col items-start gap-1"
        )}
      >
        {i18nConfig.locales.map((locale, index) => (
          <span key={locale} className="flex items-center">
            <Link
              href={getLocalizedPath(pathname, locale)}
              hrefLang={locale}
              className={cn(
                "text-sm font-medium transition-colors",
                variant === "default" && [
                  "px-2 py-1 rounded-md",
                  locale === currentLocale
                    ? "text-pink-light bg-white/10"
                    : "text-text-light/70 hover:text-pink-light hover:bg-white/5",
                ],
                variant === "mobile" && [
                  "py-2 px-3 rounded-lg w-full",
                  locale === currentLocale
                    ? "text-pink-light bg-purple-primary/10"
                    : "text-text-primary/70 hover:text-pink-light hover:bg-purple-primary/5",
                ]
              )}
              aria-current={locale === currentLocale ? "true" : undefined}
              aria-label={`Switch to ${i18nConfig.localeFullNames[locale]}`}
            >
              {variant === "mobile" ? i18nConfig.localeFullNames[locale] : i18nConfig.localeNames[locale]}
            </Link>
            {variant === "default" &&
              index < i18nConfig.locales.length - 1 && (
                <span className="text-text-light/30 mx-0.5" aria-hidden="true">
                  |
                </span>
              )}
          </span>
        ))}
      </div>
    </div>
  );
}
