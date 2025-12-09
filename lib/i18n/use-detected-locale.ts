"use client";

/**
 * Hook for reading the detected browser locale from cookie
 *
 * The middleware sets a cookie with the detected locale from the
 * Accept-Language header. This hook reads that cookie on the client.
 *
 * Requirements: 5.1
 */

import { useSyncExternalStore } from "react";
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

// External store functions for useSyncExternalStore
function subscribeToLocale(callback: () => void) {
  // Cookies don't have a native change event, but we can listen for storage
  // events in case the cookie is modified via another mechanism
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getLocaleSnapshot(): Locale | null {
  if (typeof window === "undefined") return null;
  const cookieValue = getCookie(DETECTED_LOCALE_COOKIE);
  if (cookieValue && isValidLocale(cookieValue)) {
    return cookieValue;
  }
  return null;
}

function getLocaleServerSnapshot(): Locale | null {
  return null; // No cookie access on server
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
  return useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );
}
