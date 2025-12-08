/**
 * i18n Module - Public API
 */

export { i18nConfig, isValidLocale } from "./config";
export type { Locale } from "./config";
export {
  getLocalizedPath,
  removeLocalePrefix,
  getLocaleFromPath,
  parseAcceptLanguage,
} from "./utils";
export { LocaleProvider, useLocale } from "./locale-context";
export { useContent } from "./use-content";
