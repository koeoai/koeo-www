# Design Document: SEO Optimization

## Overview

This design document outlines the technical implementation for comprehensive SEO optimization of the Koeo marketing website. The implementation leverages Next.js 14+ App Router features including the Metadata API, dynamic sitemap/robots generation, and structured data injection. The goal is to achieve top search rankings for GPU infrastructure and AI inference keywords while maintaining excellent Core Web Vitals scores.

## Architecture

The SEO implementation follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                        │
├─────────────────────────────────────────────────────────────┤
│  Root Layout (app/layout.tsx)                               │
│  ├── Global Metadata (title template, OG defaults)          │
│  ├── Structured Data (Organization, WebSite schemas)        │
│  └── Performance Config (fonts, viewport)                   │
├─────────────────────────────────────────────────────────────┤
│  Page Layouts (app/*/layout.tsx)                            │
│  ├── Page-specific Metadata                                 │
│  └── Page-specific Structured Data                          │
├─────────────────────────────────────────────────────────────┤
│  Route Handlers                                             │
│  ├── app/sitemap.ts (XML Sitemap)                          │
│  ├── app/robots.ts (Robots.txt)                            │
│  └── app/opengraph-image.tsx (Dynamic OG Images)           │
├─────────────────────────────────────────────────────────────┤
│  Shared Components                                          │
│  ├── lib/seo/metadata.ts (Metadata utilities)              │
│  ├── lib/seo/structured-data.ts (JSON-LD generators)       │
│  └── components/seo/json-ld.tsx (Schema injection)         │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. SEO Configuration Module

```typescript
// lib/seo/config.ts
interface SeoConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  twitterHandle: string;
  socialProfiles: string[];
}

export const seoConfig: SeoConfig = {
  siteName: "Koeo",
  siteUrl: "https://koeo.ai",
  defaultTitle: "Koeo - Unify Your GPU Infrastructure",
  titleTemplate: "%s | Koeo",
  defaultDescription: "The runtime layer that brings fragmented GPUs together into one reliable inference fabric.",
  defaultKeywords: [
    "GPU infrastructure", "AI inference", "machine learning",
    "inference fabric", "GPU orchestration", "distributed GPU",
    "AI API", "model serving", "GPU cloud", "inference runtime",
    "AI deployment", "LLM hosting", "OpenAI alternative",
    "GPU marketplace", "serverless inference"
  ],
  defaultOgImage: "/og-image.png",
  twitterHandle: "@koeo_ai",
  socialProfiles: [
    "https://twitter.com/koeo_ai",
    "https://linkedin.com/company/koeoai",
    "https://discord.gg/koeo",
    "https://github.com/koeo-ai"
  ]
};
```

### 2. Metadata Generator Interface

```typescript
// lib/seo/metadata.ts
import { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

function generateMetadata(options: PageMetadataOptions): Metadata;
function validateMetadata(metadata: Metadata): ValidationResult;
```

### 3. Structured Data Interfaces

```typescript
// lib/seo/structured-data.ts
interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: ContactPoint;
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: SearchAction;
}

interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Question[];
}

interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  offers?: Offer;
}

interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}
```

### 4. Sitemap Generator Interface

```typescript
// app/sitemap.ts
import { MetadataRoute } from "next";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

function sitemap(): MetadataRoute.Sitemap;
```

### 5. JSON-LD Component Interface

```typescript
// components/seo/json-ld.tsx
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

function JsonLd({ data }: JsonLdProps): JSX.Element;
```

## Data Models

### Page SEO Configuration

```typescript
interface PageSeoConfig {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  priority: number;
  changeFrequency: ChangeFrequency;
  schemas: SchemaType[];
  ogImage?: string;
}

const PAGE_SEO_CONFIG: Record<string, PageSeoConfig> = {
  "/": {
    path: "/",
    title: "Koeo - Unify Your GPU Infrastructure",
    description: "The runtime layer that brings fragmented GPUs together into one reliable inference fabric. Build faster, scale smarter with Koeo.",
    keywords: ["GPU infrastructure", "AI inference", "inference runtime"],
    priority: 1.0,
    changeFrequency: "weekly",
    schemas: ["Organization", "WebSite"]
  },
  "/product": {
    path: "/product",
    title: "Koeo Inference Runtime - Managed GPU API",
    description: "A managed inference runtime that turns your models into reliable APIs. OpenAI-compatible, zero migration friction.",
    keywords: ["inference runtime", "GPU API", "model serving", "OpenAI compatible"],
    priority: 0.9,
    changeFrequency: "weekly",
    schemas: ["SoftwareApplication"]
  },
  // ... additional pages
};
```

### Structured Data Templates

```typescript
interface SchemaTemplate {
  type: string;
  required: string[];
  optional: string[];
  generator: (config: PageSeoConfig) => Record<string, unknown>;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following properties can be verified through property-based testing:

### Property 1: Sitemap URL format consistency
*For any* URL entry in the generated sitemap, the URL SHALL start with the production domain "https://koeo.ai" and use lowercase, hyphenated paths.
**Validates: Requirements 1.3, 8.1**

### Property 2: Metadata title length bounds
*For any* page metadata configuration, the title length SHALL be between 50 and 60 characters inclusive.
**Validates: Requirements 2.1**

### Property 3: Metadata description length bounds
*For any* page metadata configuration, the description length SHALL be between 150 and 160 characters inclusive.
**Validates: Requirements 2.2**

### Property 4: Metadata keywords non-empty
*For any* page metadata configuration, the keywords array SHALL contain at least one keyword.
**Validates: Requirements 2.3**

### Property 5: Canonical URL presence
*For any* page metadata configuration, the canonical URL SHALL be present and match the expected URL pattern for that page.
**Validates: Requirements 2.4**

### Property 6: Open Graph completeness
*For any* page metadata configuration, the Open Graph object SHALL contain all required fields: title, description, url, type, and images.
**Validates: Requirements 3.1**

### Property 7: Twitter Card completeness
*For any* page metadata configuration, the Twitter card object SHALL contain all required fields: card, title, description, and images.
**Validates: Requirements 3.2**

### Property 8: JSON-LD schema validity
*For any* JSON-LD structured data object, the object SHALL contain @context set to "https://schema.org" and a valid @type field.
**Validates: Requirements 4.7**

### Property 9: External link security attributes
*For any* external link rendered by the application, the link SHALL include rel="noopener noreferrer" attributes.
**Validates: Requirements 5.5**

### Property 10: Image alt text presence
*For any* content image (non-decorative) rendered by the application, the image SHALL have a non-empty alt attribute.
**Validates: Requirements 7.1**

## Error Handling

### Metadata Validation Errors

```typescript
class MetadataValidationError extends Error {
  constructor(
    public field: string,
    public value: unknown,
    public constraint: string
  ) {
    super(`Metadata validation failed: ${field} - ${constraint}`);
  }
}
```

### Structured Data Validation

- Invalid schema types should throw descriptive errors during build
- Missing required fields should be caught at compile time via TypeScript
- Runtime validation should log warnings but not break the page

### Fallback Strategies

1. **Missing OG Image**: Fall back to default `/og-image.png`
2. **Missing Page Metadata**: Inherit from root layout defaults
3. **Invalid Structured Data**: Omit the schema rather than render invalid JSON-LD

## Testing Strategy

### Dual Testing Approach

This implementation uses both unit tests and property-based tests:

- **Unit tests**: Verify specific examples, edge cases, and integration points
- **Property-based tests**: Verify universal properties hold across all valid inputs

### Property-Based Testing Framework

- **Library**: fast-check (already in devDependencies)
- **Minimum iterations**: 100 per property test
- **Tag format**: `**Feature: seo-optimization, Property {N}: {description}**`

### Unit Test Coverage

1. **Sitemap Generation**
   - Verify all public pages are included
   - Verify XML structure is valid
   - Verify priority values are within 0-1 range

2. **Robots.txt Generation**
   - Verify Allow/Disallow directives
   - Verify sitemap reference is included

3. **Metadata Generation**
   - Verify title template application
   - Verify OG image URL resolution
   - Verify canonical URL generation

4. **Structured Data Generation**
   - Verify Organization schema fields
   - Verify FAQPage schema structure
   - Verify JSON-LD script injection

### Property-Based Test Coverage

1. **Metadata Constraints**
   - Title length property (50-60 chars)
   - Description length property (150-160 chars)
   - Keywords non-empty property

2. **URL Format Properties**
   - Sitemap URLs use production domain
   - URLs are lowercase and hyphenated

3. **Schema Validity Properties**
   - All JSON-LD has @context and @type
   - Required fields present per schema type

### Integration Tests

1. **Build-time Validation**
   - Sitemap generates without errors
   - All pages have valid metadata exports

2. **Runtime Validation**
   - OG images resolve correctly
   - Structured data passes Google Rich Results Test

## File Structure

```
app/
├── layout.tsx              # Root layout with global metadata
├── sitemap.ts              # Dynamic sitemap generator
├── robots.ts               # Robots.txt generator
├── opengraph-image.tsx     # Dynamic OG image (optional)
├── page.tsx                # Homepage (already has metadata)
├── about/
│   └── layout.tsx          # About page metadata wrapper
├── beta/
│   └── page.tsx            # Already has metadata
├── brandkit/
│   └── layout.tsx          # Brandkit metadata wrapper
├── careers/
│   └── layout.tsx          # Careers metadata wrapper
├── product/
│   └── layout.tsx          # Product metadata wrapper
└── providers/
    └── layout.tsx          # Providers metadata wrapper

lib/
└── seo/
    ├── config.ts           # SEO configuration constants
    ├── metadata.ts         # Metadata generation utilities
    └── structured-data.ts  # JSON-LD schema generators

components/
└── seo/
    └── json-ld.tsx         # JSON-LD injection component

public/
└── og-image.png            # Default OG image (1200x630)
```

## Implementation Notes

### Next.js Metadata API Usage

- Use `export const metadata: Metadata` for static metadata
- Use `export async function generateMetadata()` for dynamic metadata
- Use layout.tsx files to provide metadata for client components

### Client Component Metadata Strategy

For pages using `"use client"` (about, brandkit, careers, product, providers):
- Create a `layout.tsx` file in the same directory
- Export metadata from the layout (server component)
- The page component remains a client component

### Structured Data Injection

```tsx
// components/seo/json-ld.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Performance Considerations

1. **Static Generation**: Sitemap and robots.txt are generated at build time
2. **Metadata Caching**: Page metadata is cached by Next.js
3. **Image Optimization**: OG images should be pre-generated, not dynamic
4. **Bundle Size**: SEO utilities should be tree-shakeable
