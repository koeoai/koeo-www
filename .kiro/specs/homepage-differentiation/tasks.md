# Implementation Plan: Homepage Differentiation

## Overview

This plan implements homepage differentiation improvements to make Koeo's value proposition unavoidable in the first screen. Changes include adding the "Inference fabric" category name, differentiator line, break behavior block, comparison section, and product/beta page enhancements. All changes follow the existing content architecture pattern.

## Tasks

- [x] 1. Extend content types for new homepage elements
  - [x] 1.1 Add new TypeScript interfaces to content/types.ts
    - Add CategoryBadge, BreakBehaviorItem, BreakBehaviorBlock interfaces
    - Add ExtendedHeroContent extending HeroContent
    - Add ComparisonRow, ComparisonBlockContent interfaces
    - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 2. Add differentiation content to English homepage
  - [x] 2.1 Update English hero content with differentiation elements
    - Add categoryBadge with "Inference fabric" label and definition
    - Add differentiatorLine explaining routing, health checks, failover
    - Add breakBehavior block with label and 3 bullet items
    - Add comingSoon text for multi-pool features
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 10.2, 10.3_
  - [x] 2.2 Add comparison block content to English homepage
    - Add COMPARISON_CONTENT with heading "How Koeo is different"
    - Add 4 comparison rows: GPU clouds, Hosted APIs, Single vendor, Koeo
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 2.3 Write property test for differentiator line presence
    - **Property 1: Differentiator Line Presence**
    - Verify differentiatorLine is non-empty and contains key terms
    - **Validates: Requirements 1.1, 1.2, 1.3**
  - [x] 2.4 Write property test for break behavior block completeness
    - **Property 2: Break Behavior Block Completeness**
    - Verify breakBehavior has label and exactly 3 items
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
  - [x] 2.5 Write property test for category badge presence
    - **Property 3: Category Badge Presence**
    - Verify categoryBadge has non-empty label and definition
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
  - [x] 2.6 Write property test for comparison block structure
    - **Property 4: Comparison Block Structure**
    - Verify comparison has 4 rows with last being Koeo
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

- [x] 3. Add differentiation content to French homepage
  - [x] 3.1 Update French hero content with translated differentiation elements
    - Translate categoryBadge label and definition
    - Translate differentiatorLine
    - Translate breakBehavior label and items
    - Translate comingSoon text
    - _Requirements: 1.3, 2.4, 3.4_
  - [x] 3.2 Add comparison block content to French homepage
    - Translate comparison heading and all 4 rows
    - _Requirements: 4.5_

- [x] 4. Update hero component with new elements
  - [x] 4.1 Add category badge to hero component
    - Add small pill/badge above headline displaying categoryBadge.label
    - Add tooltip or subtitle line with categoryBadge.definition
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 4.2 Add differentiator line to hero component
    - Add text element below subtitle displaying differentiatorLine
    - _Requirements: 1.1, 1.2_
  - [x] 4.3 Add break behavior block to hero component
    - Add block below CTAs with breakBehavior.label
    - Render 3 bullet items from breakBehavior.items
    - Add comingSoon text if present
    - _Requirements: 2.1, 2.2, 2.3, 10.2, 10.3_

- [x] 5. Create comparison section component
  - [x] 5.1 Create comparison-section.tsx component
    - Create new component in components/sections/
    - Render heading and 4 comparison rows
    - Style Koeo row distinctly (isKoeo flag)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 5.2 Write unit test for comparison section
    - Verify component renders heading and 4 rows
    - Verify Koeo row has distinct styling
    - _Requirements: 4.1, 4.3_

- [x] 6. Restructure homepage section order
  - [x] 6.1 Update homepage page component section order
    - Change order to: Hero → WhatIsSection (diagram) → ComparisonSection → ProblemSection → HowWorksSection
    - Import and add ComparisonSection component
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 6.2 Write unit test for section order
    - Verify sections render in correct order
    - _Requirements: 5.1_

- [ ] 7. Checkpoint - Homepage differentiation complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Fix product page code snippet
  - [x] 8.1 Update code snippet URLs in product page
    - Change OpenAI baseURL to "https://api.openai.com/v1"
    - Ensure Koeo baseURL is "https://api.koeo.ai/v1"
    - Clarify "two lines" claim to specify baseURL and apiKey changes
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [ ] 8.2 Write property test for code snippet URL validity
    - **Property 5: Code Snippet URL Validity**
    - Verify URLs start with https:// and include version path
    - **Validates: Requirements 6.1, 6.2, 6.3**

- [ ] 9. Add routing policies section to product page
  - [ ] 9.1 Add routing policies content types
    - Add RoutingPolicy and RoutingPoliciesContent interfaces to types.ts
    - _Requirements: 7.1_
  - [ ] 9.2 Add English routing policies content
    - Add ROUTING_POLICIES_CONTENT with 4 policy options
    - Include comingSoon label for beta status
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [ ] 9.3 Add French routing policies content
    - Translate routing policies heading and all 4 policies
    - _Requirements: 7.5_
  - [ ] 9.4 Create routing policies section component
    - Create component to render policies with descriptions
    - Show "Coming next in beta" label when comingSoon is set
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [ ] 9.5 Add routing policies section to product page
    - Insert section after "Resilient by default" in Why Koeo section
    - _Requirements: 7.1_
  - [ ] 9.6 Write property test for routing policies completeness
    - **Property 6: Routing Policies Completeness**
    - Verify at least 4 policies with names and descriptions
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.5**

- [ ] 10. Add failure behavior visual to product page
  - [ ] 10.1 Add failure behavior content types
    - Add FailureBehaviorStep and FailureBehaviorContent interfaces
    - _Requirements: 8.1_
  - [ ] 10.2 Add English failure behavior content
    - Add FAILURE_BEHAVIOR_CONTENT with 3 steps
    - _Requirements: 8.1, 8.2_
  - [ ] 10.3 Add French failure behavior content
    - Translate failure behavior heading and 3 steps
    - _Requirements: 8.3_
  - [ ] 10.4 Create failure behavior visual component
    - Create card/visual showing 3 sequential steps
    - _Requirements: 8.1, 8.2_
  - [ ] 10.5 Add failure behavior visual to product page
    - Insert under "The runtime handles authentication, routing, and failover"
    - _Requirements: 8.1_
  - [ ] 10.6 Write property test for failure behavior steps
    - **Property 7: Failure Behavior Steps**
    - Verify exactly 3 steps in sequential order
    - **Validates: Requirements 8.1, 8.2, 8.3**

- [ ] 11. Checkpoint - Product page enhancements complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Add beta page expectations block
  - [ ] 12.1 Add beta expectations content types
    - Add BetaExpectationsItem and BetaExpectationsBlockContent interfaces
    - _Requirements: 9.1_
  - [ ] 12.2 Add English beta expectations content
    - Add BETA_EXPECTATIONS_BLOCK with responseTime, whatYouGet, whatWeAsk
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ] 12.3 Add French beta expectations content
    - Translate expectations block content
    - _Requirements: 9.5_
  - [ ] 12.4 Create beta expectations block component
    - Create component to render expectations near top of beta page
    - _Requirements: 9.1_
  - [ ] 12.5 Add expectations block to beta page
    - Insert block right under "We are onboarding teams gradually"
    - _Requirements: 9.1_
  - [ ] 12.6 Write property test for beta expectations completeness
    - **Property 8: Beta Expectations Completeness**
    - Verify responseTime, whatYouGet, whatWeAsk are all non-empty
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

- [ ] 13. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive coverage
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- French content should maintain "vous" form for B2B consistency
- Code snippets must be copy-paste safe with valid URLs
