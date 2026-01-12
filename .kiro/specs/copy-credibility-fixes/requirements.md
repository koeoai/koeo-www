# Requirements Document

## Introduction

This document defines requirements for improving copy credibility and fixing French localization issues on the Koeo marketing website. The changes address specific trust gaps identified in a comprehensive copy audit: overly broad claims, misleading CTAs, unfinished French translations, and missing trust signals. All changes preserve existing component architecture while updating content strings and adding targeted new elements.

## Glossary

- **Koeo**: The AI inference platform brand name
- **Hero_Section**: The prominent top section containing the main value proposition and primary CTAs
- **CTA**: Call-to-action button or link prompting user action
- **Trust_Signal**: Content element that builds credibility (security statement, data handling info, etc.)
- **Persona_Card**: UI card describing a target customer segment on the product page
- **Console_Metrics**: The dashboard-style UI showing operational stats on the product page
- **Locale**: Language/region variant (en for English, fr for French)
- **Content_Layer**: The `content/` directory containing all marketing copy strings

## Requirements

### Requirement 1: Tighten Core Claim

**User Story:** As a visitor, I want to see defensible claims about model support, so that I can trust the platform's capabilities.

#### Acceptance Criteria

1. WHEN the homepage hero renders THEN the Hero_Section SHALL NOT display "Any model" in the headline or supporting copy
2. WHEN the homepage hero renders THEN the Hero_Section SHALL display a claim scoped to "open source and fine-tuned models" or equivalent defensible phrasing
3. WHEN the product page renders THEN the Product_Page SHALL use consistent model support language matching the homepage

### Requirement 2: Fix "View API Docs" CTA Behavior

**User Story:** As a developer, I want the "View API docs" CTA to match its behavior, so that I'm not misled about what clicking it does.

#### Acceptance Criteria

1. WHEN the homepage displays a docs-related CTA THEN the CTA SHALL either link to actual public documentation OR use text that accurately describes the beta application flow
2. IF no public documentation exists THEN the CTA text SHALL be "Get API Docs Access" or similar honest phrasing
3. WHEN the developer section displays a docs link THEN the Link SHALL use text matching its actual destination behavior

### Requirement 3: Label Console Metrics as Sample UI

**User Story:** As a visitor, I want to know if dashboard metrics are real or illustrative, so that I don't feel deceived.

#### Acceptance Criteria

1. WHEN the product page displays console metrics THEN the Console_Metrics component SHALL include a visible label indicating "Sample UI" or "Example dashboard"
2. WHEN the console metrics label renders THEN the Label SHALL be positioned clearly near the metrics display
3. IF metrics become real production data THEN the Label MAY be removed or changed to indicate live status

### Requirement 4: Soften Compliance Claim on Providers Page

**User Story:** As a potential provider partner, I want accurate claims about compliance handling, so that I can evaluate the partnership realistically.

#### Acceptance Criteria

1. WHEN the providers page describes Koeo's responsibilities THEN the Providers_Page SHALL NOT claim "We handle compliance" without qualification
2. WHEN describing compliance THEN the Providers_Page SHALL use qualified language such as "We work toward common compliance requirements with partners" or similar defensible phrasing

### Requirement 5: Fix French Localization Gaps

**User Story:** As a French-speaking visitor, I want a fully translated experience, so that the site feels professional and complete.

#### Acceptance Criteria

1. WHEN the French homepage renders THEN the Homepage SHALL NOT contain English strings in visible UI elements
2. WHEN the French product page renders THEN the Product_Page SHALL NOT contain English labels like "Your App", "Runtime", "GPU Network", or "Sending request"
3. WHEN the French about page renders THEN the About_Page SHALL NOT contain English lines in the hero headline
4. WHEN any French page renders THEN the Page SHALL use consistent tone (either "tu" or "vous" throughout, with "vous" preferred for B2B)

### Requirement 6: Add Fourth Persona for Labs/Universities

**User Story:** As a researcher or academic, I want to see my use case represented, so that I know Koeo is relevant for my needs.

#### Acceptance Criteria

1. WHEN the product page displays persona cards THEN the Product_Page SHALL include a fourth persona card for "Research labs and universities"
2. WHEN the labs persona card renders THEN the Card SHALL describe benefits relevant to academic use cases (serving models to internal tools, research workflows)
3. WHEN the homepage mentions target users THEN the Homepage MAY include a brief reference to labs/academic users

### Requirement 7: Add Trust Section or Link

**User Story:** As an enterprise evaluator, I want to understand data handling and security posture, so that I can assess risk.

#### Acceptance Criteria

1. WHEN the homepage renders THEN the Homepage SHALL include a trust signal element (link or brief statement about data handling)
2. WHEN a trust link is displayed THEN the Link SHALL use text like "How we handle your data" or "Security & Privacy"
3. IF a dedicated trust page does not exist THEN the Link MAY point to a section within an existing page or a brief inline statement

### Requirement 8: Add "Supported in Beta" Clarity

**User Story:** As a potential beta user, I want to know exactly what's supported today, so that I can evaluate fit for my use case.

#### Acceptance Criteria

1. WHEN the product page renders THEN the Product_Page SHALL include a "Supported in beta" section or callout
2. WHEN the supported features section renders THEN the Section SHALL list current capabilities explicitly (even if brief)
3. WHEN the homepage describes capabilities THEN the Homepage MAY reference beta limitations or link to the product page for details

