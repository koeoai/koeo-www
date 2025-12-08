# Implementation Plan

- [x] 1. Set up i18n configuration and utilities






  - [x] 1.1 Create i18n configuration file with locale definitions

    - Create `lib/i18n/config.ts` with locale constants and types
    - Define `Locale` type, `i18nConfig` object with `defaultLocale`, `locales`, and `localeNames`
    - _Requirements: 1.1, 1.2, 1.3_


  - [x] 1.2 Implement URL utility functions

    - Create `lib/i18n/utils.ts` with `getLocalizedPath`, `removeLocalePrefix`, `getLocaleFromPath`

    - Implement `parseAcceptLanguage` for browser language detection
    - _Requirements: 2.1, 2.2, 5.1_
  - [x] 1.3 Write property tests for URL utilities

    - **Property 1: French locale routing**
    - **Property 2: Default locale routing**
    - **Property 3: URL generation preserves path across locales**
    - **Property 9: Accept-Language header parsing**
    - **Validates: Requirements 1.1, 1.2, 2.1, 2.2, 5.1**

- [x] 2. Implement locale context and provider





  - [x] 2.1 Create LocaleProvider context


    - Create `lib/i18n/locale-context.tsx` with context and provider
    - Implement `useLocale` hook for accessing current locale
    - Export from `lib/i18n/index.ts` barrel file
    - _Requirements: 2.3_
  - [x] 2.2 Write property test for HTML lang attribute


    - **Property 4: HTML lang attribute matches locale**
    - **Validates: Requirements 2.3**

- [x] 3. Reorganize content layer for locales





  - [x] 3.1 Create locale-based content structure


    - Move existing content files to `content/en/` directory
    - Create `content/fr/` directory structure mirroring English
    - Update `content/index.ts` with `getContent` function supporting locale and fallback
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 3.2 Write property test for content fallback


    - **Property 5: Translation fallback to English**
    - **Validates: Requirements 3.2**
  - [x] 3.3 Create French translations for homepage


    - Translate `content/fr/homepage.ts` with all homepage content
    - Ensure type compatibility with English content
    - _Requirements: 1.1, 3.1_


  - [x] 3.4 Create French translations for beta page


    - Translate `content/fr/beta.ts` with beta page content
    - _Requirements: 1.1, 3.1_
  - [x] 3.5 Create French translations for remaining pages
    - Translate `content/fr/about.ts`, `content/fr/careers.ts`, `content/fr/product.ts`
    - _Requirements: 1.1, 3.1_

- [x] 4. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Set up App Router locale routing






  - [x] 5.1 Create middleware for locale handling

    - Create `middleware.ts` at project root
    - Implement locale detection from URL path
    - Configure matcher to exclude static files and API routes
    - _Requirements: 1.1, 1.2, 1.3_


  - [x] 5.2 Create locale-aware layout structure

    - Create `app/[locale]/layout.tsx` with LocaleProvider wrapper
    - Update HTML lang attribute based on locale parameter

    - Move existing layout content to locale layout
    - _Requirements: 2.3_
  - [x] 5.3 Migrate pages to locale routing

    - Move `app/page.tsx` to `app/[locale]/page.tsx`
    - Move `app/beta/page.tsx` to `app/[locale]/beta/page.tsx`
    - Move remaining pages (`about`, `careers`, `product`, `brandkit`, `providers`) to `app/[locale]/`
    - Update page components to use `useContent` hook for localized content
    - _Requirements: 1.1, 1.2_

- [x] 6. Implement language switcher component





  - [x] 6.1 Create LanguageSwitcher component


    - Create `components/ui/language-switcher.tsx`
    - Implement locale switching with path preservation
    - Style consistently with existing UI components
    - _Requirements: 2.1, 2.2_

  - [x] 6.2 Integrate language switcher into navigation

    - Add LanguageSwitcher to header/navigation component
    - Ensure proper positioning and responsive behavior
    - _Requirements: 2.1_


  - [x] 6.3 Write unit tests for language switcher
    - Test correct link generation for each locale
    - Test current locale highlighting
    - _Requirements: 2.1, 2.2_

- [x] 7. Implement SEO for i18n





  - [x] 7.1 Add hreflang tags to pages


    - Update metadata generation to include hreflang link tags
    - Add alternate links for all supported locales
    - _Requirements: 4.1_

  - [x] 7.2 Write property test for hreflang tags

    - **Property 6: Hreflang tags present for all locales**
    - **Validates: Requirements 4.1**


  - [x] 7.3 Update metadata generation for locale-aware Open Graph
    - Modify `lib/seo/metadata.ts` to accept locale parameter
    - Generate locale-specific OG tags (og:locale)
    - _Requirements: 4.2_
  - [x] 7.4 Write property test for locale-aware metadata
    - **Property 7: Locale-aware metadata generation**
    - **Validates: Requirements 4.2**
  - [x] 7.5 Update sitemap for multi-locale support
    - Modify `app/sitemap.ts` to generate URLs for all locales
    - Add xhtml:link hreflang annotations
    - _Requirements: 4.3_
  - [x] 7.6 Write property test for sitemap locale variants
    - **Property 8: Sitemap includes all locale variants**
    - **Validates: Requirements 4.3**

- [x] 8. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement language suggestion banner





  - [x] 9.1 Create language suggestion banner component


    - Create `components/ui/language-suggestion-banner.tsx`
    - Implement non-intrusive banner UI with dismiss functionality
    - Use session storage to remember dismissal
    - _Requirements: 5.2, 5.3_
  - [x] 9.2 Integrate banner with locale detection


    - Add banner to root layout
    - Connect to Accept-Language detection from middleware
    - Show only when detected locale differs from current
    - _Requirements: 5.1, 5.2_


  - [x] 9.3 Write property test for banner display logic


    - **Property 10: Language suggestion banner display**
    - **Validates: Requirements 5.2**

- [x] 10. Localize forms

  - [x] 10.1 Create form content translations
    - Add form labels, placeholders, and validation messages to locale content files
    - Define `FormContent` type in `content/types.ts`
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 10.2 Update beta signup form for i18n
    - Modify `features/beta-signup/` components to use localized content
    - Update validation messages to use locale-specific strings
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 10.3 Update other forms for i18n
    - Localize career application form
    - Localize partner signup form
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 10.4 Write property test for form localization
    - **Property 11: Form content localization**
    - **Validates: Requirements 7.1, 7.2, 7.3**

- [x] 11. Final Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.
