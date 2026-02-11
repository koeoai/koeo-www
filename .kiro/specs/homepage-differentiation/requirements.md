# Requirements Document

## Introduction

This document defines requirements for restructuring the Koeo homepage and product pages to make differentiation unavoidable in the first screen. The changes address positioning gaps identified in a comprehensive audit: the mechanism (routing, health checks, failover) appears too late, there's no category name for easy recall, and comparison with alternatives is missing. Changes also include product page fixes for code snippet accuracy and beta page improvements for setting expectations.

## Glossary

- **Koeo**: The AI inference platform brand name
- **Hero_Section**: The prominent top section containing the main value proposition and primary CTAs
- **Inference_Fabric**: The category name for Koeo's unified routing layer across GPU capacity
- **Differentiator_Line**: A single sentence explaining the core mechanism (routing, health checks, failover)
- **Break_Behavior_Block**: A small block explaining what happens when infrastructure fails
- **Comparison_Block**: A section comparing Koeo to alternatives (GPU clouds, hosted APIs, single vendor)
- **Routing_Policies_Section**: Product page section describing configurable routing behavior
- **Beta_Expectations_Block**: Section on beta page explaining what happens after form submission
- **Code_Snippet**: Example code showing SDK integration
- **Locale**: Language/region variant (en for English, fr for French)

## Requirements

### Requirement 1: Add Differentiator Line to Hero

**User Story:** As a visitor, I want to understand Koeo's mechanism immediately, so that I know what makes it different before scrolling.

#### Acceptance Criteria

1. WHEN the homepage hero renders THEN the Hero_Section SHALL display a differentiator line directly under the subtitle
2. WHEN the differentiator line renders THEN the Line SHALL explain the core mechanism: routing to available GPU capacity with health checks, retries, and failover
3. WHEN the French homepage hero renders THEN the Hero_Section SHALL display the translated differentiator line in the same position

### Requirement 2: Add Break Behavior Block Above the Fold

**User Story:** As a visitor, I want to see what happens when things break, so that I understand the resilience value immediately.

#### Acceptance Criteria

1. WHEN the homepage hero renders THEN the Hero_Section SHALL include a break behavior block below the CTAs
2. WHEN the break behavior block renders THEN the Block SHALL display a small label like "What happens when things break"
3. WHEN the break behavior block renders THEN the Block SHALL list three bullet points explaining automatic bypass, traffic spike handling, and dashboard visibility
4. WHEN the French homepage renders THEN the Break_Behavior_Block SHALL display translated content

### Requirement 3: Add Inference Fabric Category Label

**User Story:** As a visitor, I want a memorable category name, so that I can easily recall and describe what Koeo is.

#### Acceptance Criteria

1. WHEN the homepage hero renders THEN the Hero_Section SHALL display a small pill/badge label above the headline
2. WHEN the category label renders THEN the Label SHALL display "Inference fabric" or equivalent category name
3. WHEN the homepage includes the category label THEN the Page SHALL include a brief definition of "inference fabric" near the label or as a tooltip-style line
4. WHEN the French homepage renders THEN the Category_Label SHALL display the translated category name

### Requirement 4: Add Comparison Block to Homepage

**User Story:** As a visitor, I want to see how Koeo differs from alternatives, so that I can quickly understand the positioning.

#### Acceptance Criteria

1. WHEN the homepage renders THEN the Homepage SHALL include a comparison block after the diagram section
2. WHEN the comparison block renders THEN the Block SHALL have a title like "How Koeo is different"
3. WHEN the comparison block renders THEN the Block SHALL compare exactly 4 alternatives: GPU clouds, hosted model APIs, single vendor inference, and Koeo
4. WHEN each comparison row renders THEN the Row SHALL describe the key limitation or benefit in one line
5. WHEN the French homepage renders THEN the Comparison_Block SHALL display translated content

### Requirement 5: Restructure Homepage Section Order

**User Story:** As a visitor, I want to see the mechanism and diagram before the pain points, so that I understand what Koeo is before why I need it.

#### Acceptance Criteria

1. WHEN the homepage renders THEN the Homepage SHALL display sections in this order: Hero (with differentiator and break behavior), Diagram, Pain section
2. WHEN the diagram section renders THEN the Section SHALL appear immediately after the hero, visible on first scroll
3. WHEN the pain section renders THEN the Section SHALL appear after the diagram section

### Requirement 6: Fix Product Page Code Snippet

**User Story:** As a developer, I want copy-paste safe code examples, so that I can integrate without debugging typos.

#### Acceptance Criteria

1. WHEN the product page displays the OpenAI SDK snippet THEN the Snippet SHALL show a valid baseURL with scheme and version path
2. WHEN the OpenAI baseURL is shown THEN the URL SHALL be "https://api.openai.com/v1" not "api.openai.com"
3. WHEN the Koeo baseURL is shown THEN the URL SHALL be "https://api.koeo.ai/v1"
4. WHEN the "two lines" claim is made THEN the Claim SHALL clearly indicate what changes: baseURL and apiKey

### Requirement 7: Add Routing Policies Section to Product Page

**User Story:** As a developer, I want to see routing policies as a product feature, so that I understand the control I have over request routing.

#### Acceptance Criteria

1. WHEN the product page renders THEN the Product_Page SHALL include a routing policies section
2. WHEN the routing policies section renders THEN the Section SHALL list policy options (Reliability, Lowest latency, Lowest cost, Region locked)
3. WHEN each policy option renders THEN the Option SHALL include a one-sentence description
4. IF routing policies are not yet live THEN the Section SHALL include a "Coming next in beta" label
5. WHEN the French product page renders THEN the Routing_Policies_Section SHALL display translated content

### Requirement 8: Add Failure Behavior Visual to Product Page

**User Story:** As a developer, I want to see how failures are handled visually, so that I can trust the resilience claims.

#### Acceptance Criteria

1. WHEN the product page renders THEN the Product_Page SHALL include a failure behavior card or visual
2. WHEN the failure behavior visual renders THEN the Visual SHALL show three steps: request comes in, node is unhealthy and Koeo reroutes, response succeeds and event appears in logs
3. WHEN the French product page renders THEN the Failure_Behavior_Visual SHALL display translated content

### Requirement 9: Add Beta Page Expectations Block

**User Story:** As a potential beta user, I want to know what happens after I submit the form, so that I have clear expectations.

#### Acceptance Criteria

1. WHEN the beta page renders THEN the Beta_Page SHALL include an expectations block near the top
2. WHEN the expectations block renders THEN the Block SHALL state the response time target
3. WHEN the expectations block renders THEN the Block SHALL describe what accepted teams receive (docs, key, optional onboarding call)
4. WHEN the expectations block renders THEN the Block SHALL describe what Koeo asks in return (feedback, permission to track metrics)
5. WHEN the French beta page renders THEN the Expectations_Block SHALL display translated content

### Requirement 10: Add Multi-Pool Coming Soon Disclosure

**User Story:** As a visitor, I want honest disclosure about upcoming features, so that I'm not misled about current capabilities.

#### Acceptance Criteria

1. WHEN the homepage mentions routing across capacity THEN the Homepage SHALL use present-tense language for current capabilities only
2. WHEN multi-pool routing is mentioned THEN the Mention SHALL include a "Coming in beta" qualifier if not yet live
3. WHEN the break behavior bullets mention multi-pool features THEN the Bullets SHALL indicate future availability clearly

