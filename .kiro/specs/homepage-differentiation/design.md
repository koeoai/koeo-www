# Design Document: Homepage Differentiation

## Overview

This design restructures the Koeo homepage and product pages to make differentiation unavoidable in the first screen. The core changes introduce the "Inference fabric" category name, add a differentiator line explaining the mechanism, include a "what happens when things break" block above the fold, and add a comparison section. Product page improvements include fixing code snippets, adding routing policies, and a failure behavior visual. Beta page gets an expectations block.

All changes follow the existing content architecture pattern with updates to `content/en/*.ts` and `content/fr/*.ts` files, plus targeted component modifications.

## Architecture

The implementation extends the established content layer pattern:

```
content/
├── types.ts                    # Extended with new content types
├── en/
│   ├── homepage.ts             # Extended hero, new comparison block
│   ├── product.ts              # Routing policies, failure behavior
│   └── beta.ts                 # Expectations block
├── fr/
│   ├── homepage.ts             # French translations
│   ├── product.ts              # French product content
│   └── beta.ts                 # French beta content
```

Component changes:
- `components/sections/neural-network-canvas.tsx` - Add differentiator line, break behavior block, category badge
- `components/sections/comparison-section.tsx` - New component for "How Koeo is different"
- `app/[locale]/page.tsx` - Reorder sections (Hero → WhatIs/Diagram → Problem)
- `app/[locale]/product/page.tsx` - Add routing policies section, failure behavior visual
- `app/[locale]/beta/page.tsx` - Add expectations block

## Components and Interfaces

### Content Type Extensions

```typescript
// content/types.ts - New types for homepage differentiation

/**
 * Category badge for hero section
 */
export interface CategoryBadge {
  label: string;
  definition: string;
}

/**
 * Break behavior bullet item
 */
export interface BreakBehaviorItem {
  text: string;
}

/**
 * Break behavior block content
 */
export interface BreakBehaviorBlock {
  label: string;
  items: BreakBehaviorItem[];
  comingSoon?: string;
}

/**
 * Extended hero content with differentiation elements
 */
export interface ExtendedHeroContent extends HeroContent {
  categoryBadge: CategoryBadge;
  differentiatorLine: string;
  breakBehavior: BreakBehaviorBlock;
}

/**
 * Comparison row for alternatives section
 */
export interface ComparisonRow {
  name: string;
  description: string;
  isKoeo?: boolean;
}

/**
 * Comparison block content
 */
export interface ComparisonBlockContent {
  heading: string;
  rows: ComparisonRow[];
}

/**
 * Routing policy option
 */
export interface RoutingPolicy {
  name: string;
  description: string;
}

/**
 * Routing policies section content
 */
export interface RoutingPoliciesContent {
  label: string;
  heading: string;
  comingSoon?: string;
  policies: RoutingPolicy[];
}

/**
 * Failure behavior step
 */
export interface FailureBehaviorStep {
  step: number;
  description: string;
}

/**
 * Failure behavior visual content
 */
export interface FailureBehaviorContent {
  heading: string;
  steps: FailureBehaviorStep[];
}

/**
 * Beta expectations item
 */
export interface BetaExpectationsItem {
  title: string;
  description: string;
}

/**
 * Beta expectations block content
 */
export interface BetaExpectationsBlockContent {
  heading: string;
  responseTime: string;
  whatYouGet: BetaExpectationsItem;
  whatWeAsk: BetaExpectationsItem;
}
```

### Code Snippet Fix

The product page code snippet needs correction:

```typescript
// Current (incorrect)
baseURL: "api.openai.com"

// Fixed (correct)
baseURL: "https://api.openai.com/v1"

// Koeo version
baseURL: "https://api.koeo.ai/v1"
```

## Data Models

### Homepage Hero Content (EN)

```typescript
export const HERO_CONTENT: ExtendedHeroContent = {
  // Existing fields
  badge: "Private beta · Invite only",
  headline: "AI inference you can ship",
  headlineAccent: "without the complexity",
  subtitle: "Your models, one place, no infra to chase.",
  cta: { /* existing */ },
  microcopy: "We are inviting teams gradually, based on fit and capacity.",
  
  // New differentiation fields
  categoryBadge: {
    label: "Inference fabric",
    definition: "One API that routes across capacity and stays resilient as infrastructure changes.",
  },
  differentiatorLine: "One endpoint that routes requests to available GPU capacity, with health checks, retries, and failover built in.",
  breakBehavior: {
    label: "What happens when things break",
    items: [
      { text: "If a node becomes unhealthy, Koeo bypasses it automatically." },
      { text: "If traffic spikes, Koeo keeps routing without you touching infra." },
      { text: "You see latency and errors in the dashboard." },
    ],
    comingSoon: "Multi-pool routing and regional failover are next.",
  },
};
```

### Comparison Block Content (EN)

```typescript
export const COMPARISON_CONTENT: ComparisonBlockContent = {
  heading: "How Koeo is different",
  rows: [
    {
      name: "GPU clouds",
      description: "You manage machines and routing.",
    },
    {
      name: "Hosted model APIs",
      description: "You get models, not your models.",
    },
    {
      name: "Single vendor inference",
      description: "You inherit their outages and capacity limits.",
    },
    {
      name: "Koeo",
      description: "One endpoint with routing and failover, designed to span capacity sources over time.",
      isKoeo: true,
    },
  ],
};
```

### Routing Policies Content (EN)

```typescript
export const ROUTING_POLICIES_CONTENT: RoutingPoliciesContent = {
  label: "Routing policies",
  heading: "Routing policies, not glue code",
  comingSoon: "Coming next in beta",
  policies: [
    { name: "Reliability", description: "Prioritize nodes with best uptime and lowest error rates." },
    { name: "Lowest latency", description: "Route to the fastest responding nodes." },
    { name: "Lowest cost", description: "Optimize for cost efficiency across available capacity." },
    { name: "Region locked", description: "Keep requests within specific geographic regions." },
  ],
};
```

### Failure Behavior Content (EN)

```typescript
export const FAILURE_BEHAVIOR_CONTENT: FailureBehaviorContent = {
  heading: "Failure behavior",
  steps: [
    { step: 1, description: "Request comes in" },
    { step: 2, description: "Node is unhealthy, Koeo retries and routes elsewhere" },
    { step: 3, description: "Response succeeds, and event appears in logs" },
  ],
};
```

### Beta Expectations Block Content (EN)

```typescript
export const BETA_EXPECTATIONS_BLOCK: BetaExpectationsBlockContent = {
  heading: "What happens after you apply",
  responseTime: "We respond within 2 business days.",
  whatYouGet: {
    title: "What accepted teams receive",
    description: "API docs, an API key, and an optional onboarding call.",
  },
  whatWeAsk: {
    title: "What we ask in return",
    description: "Feedback on your experience and permission to track reliability metrics.",
  },
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Differentiator Line Presence
*For any* homepage content (English or French), the hero section SHALL contain a non-empty differentiatorLine field that mentions routing, health checks, or failover.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Break Behavior Block Completeness
*For any* homepage content (English or French), the breakBehavior block SHALL contain exactly 3 items, each with non-empty text.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 3: Category Badge Presence
*For any* homepage content (English or French), the categoryBadge SHALL contain both a non-empty label and a non-empty definition.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

### Property 4: Comparison Block Structure
*For any* homepage comparison content (English or French), the comparison block SHALL contain exactly 4 rows, with the last row having isKoeo set to true.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

### Property 5: Code Snippet URL Validity
*For any* code snippet showing baseURL values, the URL SHALL start with "https://" and include a version path segment.

**Validates: Requirements 6.1, 6.2, 6.3**

### Property 6: Routing Policies Completeness
*For any* routing policies content (English or French), the policies array SHALL contain at least 4 policy options, each with non-empty name and description.

**Validates: Requirements 7.1, 7.2, 7.3, 7.5**

### Property 7: Failure Behavior Steps
*For any* failure behavior content (English or French), the steps array SHALL contain exactly 3 steps in sequential order (1, 2, 3).

**Validates: Requirements 8.1, 8.2, 8.3**

### Property 8: Beta Expectations Completeness
*For any* beta expectations content (English or French), the block SHALL contain non-empty responseTime, whatYouGet, and whatWeAsk fields.

**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

### Example Tests (Non-Property)

The following acceptance criteria are best validated as specific examples:

- **Requirement 5.1, 5.2, 5.3**: Verify homepage section order is Hero → WhatIs → Problem
- **Requirement 6.4**: Verify "two lines" claim text accurately describes changes
- **Requirement 7.4**: Verify "Coming next in beta" label appears when routing policies not live
- **Requirement 10.1, 10.2, 10.3**: Verify multi-pool features have "Coming in beta" qualifier

## Error Handling

Content changes are static strings with no runtime error conditions. The primary risks are:

1. **Missing translations**: If a French translation is missing, the content system falls back to English (existing behavior)
2. **Type mismatches**: TypeScript interfaces ensure content structure matches expected types at build time
3. **Component rendering**: New sections should gracefully handle missing optional content fields

## Testing Strategy

### Unit Tests
- Verify hero content contains all new differentiation fields
- Verify comparison block has exactly 4 rows
- Verify routing policies section renders with correct content
- Verify failure behavior visual shows 3 steps
- Verify beta expectations block renders all fields
- Verify code snippets contain valid URLs

### Property-Based Tests (using fast-check)
- **Property 1 (Differentiator)**: For all homepage content, verify differentiatorLine is non-empty and contains key terms
- **Property 2 (Break Behavior)**: For all homepage content, verify breakBehavior.items has length 3
- **Property 3 (Category Badge)**: For all homepage content, verify categoryBadge has label and definition
- **Property 4 (Comparison)**: For all comparison content, verify 4 rows with last being Koeo
- **Property 5 (URLs)**: For all code snippet URLs, verify https:// prefix and version path
- **Property 6 (Routing Policies)**: For all routing policies, verify at least 4 policies with names and descriptions
- **Property 7 (Failure Steps)**: For all failure behavior content, verify 3 sequential steps
- **Property 8 (Beta Expectations)**: For all beta expectations, verify all required fields present

Each property test should run minimum 100 iterations.

### Integration Tests
- Render homepage in both locales, verify new sections appear in correct order
- Render product page, verify routing policies and failure behavior sections
- Render beta page, verify expectations block appears near top
- Verify section order: Hero → WhatIs/Diagram → Problem

### Manual Verification
- Visual review of hero with new elements (category badge, differentiator, break behavior)
- Review comparison block styling and readability
- Verify code snippets are copy-paste safe
- Check French translations for consistency and tone
