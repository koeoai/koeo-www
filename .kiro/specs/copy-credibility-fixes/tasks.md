# Implementation Plan: Copy Credibility Fixes

## Overview

This plan implements copy credibility improvements across the Koeo marketing website, focusing on tightening claims, fixing French localization, and adding trust signals. Changes are primarily to content layer files with minimal component modifications.

## Tasks

- [x] 1. Tighten core claim and fix CTA text
  - [x] 1.1 Update English homepage content
    - Replace "Any model, one place, no infra to chase" with "Your models, one place, no infra to chase"
    - Update developer section CTA from "View API docs" to "Get API docs access"
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3_
  - [x] 1.2 Write property test for core claim consistency
    - **Property 1: Core Claim Consistency**
    - Verify no content strings contain "any model" (case-insensitive)
    - **Validates: Requirements 1.1, 1.3**

- [x] 2. Add Sample UI label to product page
  - [x] 2.1 Update product page component with Sample UI label
    - Add visible "Sample UI" label near console metrics display
    - Position label clearly to indicate metrics are illustrative
    - _Requirements: 3.1, 3.2_
  - [x] 2.2 Write unit test for Sample UI label
    - Verify label renders on product page
    - _Requirements: 3.1_

- [x] 3. Soften compliance claim on providers page
  - [x] 3.1 Update English providers content
    - Change "We handle orchestration, billing, and compliance" to "We handle orchestration and billing"
    - Remove or qualify compliance claim
    - _Requirements: 4.1, 4.2_
  - [x] 3.2 Write property test for compliance claim qualification
    - **Property 4: Compliance Claim Qualification**
    - Verify no unqualified "handle compliance" strings in providers content
    - **Validates: Requirements 4.1, 4.2**

- [x] 4. Fix French localization gaps
  - [x] 4.1 Update French homepage content for tone consistency
    - Shift from "tu" form to "vous" form throughout
    - Update subtitle to match English defensible claim
    - _Requirements: 5.1, 5.4_
  - [x] 4.2 Localize request flow animation component
    - Add locale-aware labels for "Your App", "Runtime", "GPU Network"
    - Add locale-aware status messages ("Sending request", etc.)
    - Create content entries in both en and fr homepage files
    - _Requirements: 5.2_
  - [x] 4.3 Update French product content for tone consistency
    - Ensure "vous" form is used consistently
    - _Requirements: 5.4_
  - [x] 4.4 Update French providers content for tone consistency
    - Shift from "tu" form to "vous" form
    - Update compliance claim to match English
    - _Requirements: 5.4, 4.2_
  - [x] 4.5 Verify French about page has no English in hero
    - Check and fix any English strings in French about content
    - _Requirements: 5.3_
  - [x] 4.6 Write property test for French localization completeness
    - **Property 2: French Localization Completeness**
    - Verify no English UI strings in French content
    - **Validates: Requirements 5.1, 5.2, 5.3**
  - [x] 4.7 Write property test for French tone consistency
    - **Property 3: French Tone Consistency**
    - Verify "vous" form used consistently, not "tu" form
    - **Validates: Requirements 5.4**

- [x] 5. Add fourth persona for labs/universities
  - [x] 5.1 Add Research Labs persona to English product content
    - Add fourth persona card with title "Research Labs & Universities"
    - Add description about serving models to internal tools and research workflows
    - _Requirements: 6.1, 6.2_
  - [x] 5.2 Add Research Labs persona to French product content
    - Translate fourth persona card to French
    - _Requirements: 6.1, 6.2_
  - [x] 5.3 Write unit test for persona count
    - Verify product page has exactly 4 personas
    - _Requirements: 6.1_

- [x] 6. Add trust signal to homepage
  - [ ] 6.1 Add trust signal content to English homepage
    - Add trust signal with text like "How we handle your data" or inline security statement
    - _Requirements: 7.1, 7.2_
  - [ ] 6.2 Add trust signal content to French homepage
    - Translate trust signal to French
    - _Requirements: 7.1, 7.2_
  - [ ] 6.3 Update homepage component to display trust signal
    - Add trust signal element to hero or appropriate section
    - _Requirements: 7.1_
  - [ ] 6.4 Write unit test for trust signal presence
    - Verify homepage includes trust signal element
    - _Requirements: 7.1_

- [ ] 7. Add "Supported in beta" clarity
  - [ ] 7.1 Add supported features section to English product content
    - Add "Supported in beta" section listing current capabilities
    - _Requirements: 8.1, 8.2_
  - [ ] 7.2 Add supported features section to French product content
    - Translate supported features section to French
    - _Requirements: 8.1, 8.2_
  - [ ] 7.3 Update product page component to display supported features
    - Add section or callout for beta support clarity
    - _Requirements: 8.1_
  - [ ] 7.4 Write unit test for supported features section
    - Verify product page includes supported features section
    - _Requirements: 8.1_

- [ ] 8. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive coverage
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- French content should use "vous" form consistently for B2B credibility
