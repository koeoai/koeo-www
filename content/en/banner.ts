/**
 * Language suggestion banner content - English
 */

export interface LanguageBannerContent {
  /** Message shown to suggest switching language */
  message: string;
  /** Button text to switch to suggested language */
  switchButton: string;
  /** Button text to dismiss the banner */
  dismissButton: string;
  /** Aria label for the banner */
  ariaLabel: string;
}

export const LANGUAGE_BANNER_CONTENT: LanguageBannerContent = {
  message: "This page is also available in {language}",
  switchButton: "Switch to {language}",
  dismissButton: "Stay in English",
  ariaLabel: "Language suggestion",
};
