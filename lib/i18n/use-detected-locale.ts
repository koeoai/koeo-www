"use client";

/**
 * Hook for reading the detected browser locale from cookie
 *
 * The middleware sets a cookie with the detected locale from the
 * Accept-Language header. This hook reads that cookie on the client.
 *
 * Requirements: 5.1
 */

import { useState, useEffect } from "react";
import { isValidLocale, type Locale } from "./config";

const DETECTED_LOCALE_COOKIE = "koeo-detected-locale";

/**
 * Parses a cookie string to find a specific cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

/**
 * Hook that returns the detected browser locale from the cookie set by middleware.
 *
 * @returns The detected locale or null if not set or invalid
 *
 * @example
 * const detectedLocale = useDetectedLocale();
 * // Returns "fr" if browser prefers French, null otherwise
 */
export function useDetectedLocale(): Locale | null {
  const [detectedLocale, setDetectedLocale] = useState<Locale | null>(null);

  useEffect(() => {
    const cookieValue = getCookie(DETECTED_LOCALE_COOKIE);
    if (cookieValue && isValidLocale(cookieValue)) {
      setDetectedLocale(cookieValue);
    }
  }, []);

  return detectedLocale;
}
