"use client";

/**
 * LocaleLink - A locale-aware Link component
 *
 * Automatically prefixes href with the current locale for non-default locales.
 * This ensures navigation preserves the user's language selection.
 *
 * Requirements: 2.1, 2.2
 */

import Link from "next/link";
import { useLocale, getLocalizedPath } from "@/lib/i18n";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link>;

export interface LocaleLinkProps extends Omit<LinkProps, "href"> {
  href: string;
}

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();

  // Only localize internal paths (starting with /)
  // External URLs and anchors should pass through unchanged
  const isInternalPath = href.startsWith("/") && !href.startsWith("//");
  const localizedHref = isInternalPath ? getLocalizedPath(href, locale) : href;

  return <Link href={localizedHref} {...props} />;
}
