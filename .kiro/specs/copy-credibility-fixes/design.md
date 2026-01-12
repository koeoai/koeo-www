# Design Document: Copy Credibility Fixes

## Overview

This design addresses trust and credibility gaps identified in a comprehensive copy audit of the Koeo marketing website. The changes focus on eight key areas: tightening the core claim, fixing misleading CTAs, labeling sample UI, softening compliance claims, completing French localization, adding a fourth persona, adding trust signals, and clarifying beta support.

All changes follow the existing content architecture pattern: updates to `content/en/*.ts` and `content/fr/*.ts` files, with minimal component modifications where needed for new UI elements.

## Architecture

The implementation follows the established content layer pattern:

```
content/
├── en/
│   ├── homepage.ts      # Hero, problem, what-is, how-works sections
│   ├── product.ts       # Product page content including personas
│   ├── providers.ts     # Provider page content
│   └── about.ts         # About page content
├── fr/
│   ├── homepage.ts      # French translations
│   ├── product.ts       # French product page
│   ├── providers.ts     # French providers page
│   └── about.ts         # French about page
└── types.ts             # Shared TypeScript interfaces
```

Component changes are limited to:
- `components/ui/request-flow-animation.tsx` - Add locale support for labels
- `app/[locale]/product/page.tsx` - Add "Sample UI" label and fourth persona

## Components and Interfaces

### Content Type Extensions

```typescript
// content/types.ts - Add trust signal type
export interface TrustSignal {
  text: string;
  href?: string;
}

// Extend HomepageContent
export interface HomepageContent {
  hero: HeroContent;
  problem: ProblemSectionContent;
  whatIs: WhatIsSectionContent;
  howWorks: HowWorksSectionContent;
  trustSignal?: TrustSignal;  // New
}

// Extend ProductWhoForContent to support 4 personas
// (Already supports array, just add 4th item)
```

### Request Flow Animation Localization

```typescript
// content/types.ts - Add animation labels type
export interface RequestFlowLabels {
  yourApp: string;
  runtime: string;
  gpuNetwork: string;
  sendingRequest: string;
  routingToGpu: string;
  processingInference: string;
  streamingResponse: string;
  requestComplete: string;
  newRequest: string;
  gpuNodeFailed: string;
  runtimeRerouting: string;
  processingOnHealthyGpu: string;
}
```

## Data Models

### Updated Content Strings

**Homepage Hero (EN):**
```typescript
subtitle: "Your models, one place, no infra to chase."
// Replaces: "Any model, one place, no infra to chase."
```

**Homepage Hero (FR):**
```typescript
subtitle: "Vos modèles, un seul endroit, zéro infra à gérer."
// Replaces: "Un runtime, tous tes modèles, zéro bordel."
// Note: Also shifts to "vous" form for B2B consistency
```

**Developer Section CTA (EN):**
```typescript
link: { text: "Get API docs access", href: "/beta" }
// Replaces: "View API docs"
```

**Providers Benefits (EN):**
```typescript
description: "Deploy our lightweight agent in minutes. We handle orchestration and billing. Your ops stay unchanged."
// Replaces: "...We handle orchestration, billing, and compliance..."
```

**Fourth Persona (EN):**
```typescript
{
  title: "Research Labs & Universities",
  description: "Serve models to internal tools and research workflows without building deployment infrastructure.",
  iconName: "academic",
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Core Claim Consistency
*For any* page content (homepage or product) that mentions model support, the content SHALL NOT contain the string "Any model" or "any model" in headlines, subtitles, or feature descriptions. The claim should use possessive framing ("Your models") rather than universal claims.

**Validates: Requirements 1.1, 1.3**

### Property 2: French Localization Completeness
*For any* French locale content file, all string fields SHALL NOT contain common English UI strings including "Your App", "Runtime", "GPU Network", "Sending request", "Routing to GPU", "Processing", "Request complete", or "New request".

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 3: French Tone Consistency
*For any* French locale content file, the text SHALL use consistent formal address ("vous", "votre", "vos") rather than informal ("tu", "ton", "ta", "tes") for B2B credibility.

**Validates: Requirements 5.4**

### Property 4: Compliance Claim Qualification
*For any* providers page content describing Koeo's responsibilities, the content SHALL NOT contain the unqualified phrase "We handle compliance" or "handle compliance" without accompanying qualification language.

**Validates: Requirements 4.1, 4.2**

### Example Tests (Non-Property)

The following acceptance criteria are best validated as specific examples rather than universal properties:

- **Requirement 1.2**: Verify homepage subtitle contains "open source and fine-tuned models" or equivalent
- **Requirements 2.1, 2.2, 2.3**: Verify specific CTA text matches expected values ("Get API docs access")
- **Requirement 3.1**: Verify product page console metrics section includes "Sample UI" label
- **Requirements 6.1, 6.2**: Verify product page has exactly 4 persona cards including "Research Labs"
- **Requirements 7.1, 7.2**: Verify homepage includes trust signal element
- **Requirements 8.1, 8.2**: Verify product page includes "Supported in beta" section

## Error Handling

Content changes are static strings with no runtime error conditions. The primary risk is:

1. **Missing translations**: If a French translation is missing, the content system falls back to English (existing behavior)
2. **Type mismatches**: TypeScript interfaces ensure content structure matches expected types at build time

## Testing Strategy

### Unit Tests
- Verify content strings match expected values for updated copy
- Verify French content contains no English strings in key fields
- Verify persona count equals 4 on product page
- Verify trust signal exists in homepage content
- Verify "Sample UI" label exists in product page metrics section
- Verify CTA text matches expected values

### Property-Based Tests (using fast-check)
- **Property 1 (Core Claim)**: For all content strings in homepage and product content, verify none contain "any model" (case-insensitive)
- **Property 2 (French Completeness)**: For all string fields in French content files, verify none contain known English UI strings
- **Property 3 (French Tone)**: For all French content strings, verify they use "vous" form rather than "tu" form
- **Property 4 (Compliance)**: For all providers content strings, verify none contain unqualified "handle compliance"

Each property test should run minimum 100 iterations.

### Integration Tests
- Render homepage in both locales, verify visual consistency
- Render product page, verify all 4 personas display
- Verify request flow animation displays correct locale labels

### Manual Verification
- Visual review of French pages for tone consistency
- Review of all CTAs to verify text matches behavior
