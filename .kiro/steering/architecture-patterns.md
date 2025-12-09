# Architecture & Scaling Patterns

This document defines the architectural patterns and scaling guidelines for the Koeo marketing website. Follow these patterns to maintain consistency and enable sustainable growth.

## Core Architecture Principles

### 1. Separation of Concerns

The codebase follows a clear separation:

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Pages | `app/` | Route definitions, metadata, page composition |
| Features | `features/` | Domain-specific logic, forms, hooks |
| Components | `components/` | Reusable UI (layout, sections, primitives) |
| Content | `content/` | Marketing copy, centralized text |
| Utilities | `lib/` | Shared helpers, API clients, validation |

### 2. Component Hierarchy

```
PageShell (layout)
└── Section Components (components/sections/)
    └── UI Primitives (components/ui/)
        └── Content from content/*.ts
```

## Adding New Features

### When to Create a Feature Module

Create a new `features/<feature-name>/` directory when:
- The feature has its own form or complex state
- Multiple components are tightly coupled
- The feature has domain-specific constants or hooks

### Feature Module Structure

```
features/<feature-name>/
├── components/           # Feature-specific UI
│   ├── form-section.tsx
│   └── index.ts          # Barrel export
├── hooks/                # Custom hooks
│   └── use-<feature>.ts
├── constants.ts          # Options, initial data
└── index.ts              # Public API
```

### Feature Module Rules

1. Export only the public API from `index.ts`
2. Keep internal components private (don't export)
3. Co-locate tests with source files
4. Use the feature's hook for state management

```typescript
// features/beta-signup/index.ts - Public API
export { BetaForm } from "./components/beta-form";
export { useBetaForm } from "./hooks/use-beta-form";
export { ROLE_OPTIONS, SEGMENT_OPTIONS } from "./constants";
```

## Adding New Pages

### Page Template (Locale-Aware)

```typescript
// app/[locale]/<page-name>/page.tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: "Page Title",
    description: "SEO description",
    path: "/<page-name>",
    locale,
  });
}

export default function PageName() {
  return (
    <PageShell>
      {/* Compose section components here */}
    </PageShell>
  );
}
```

### Page Rules

1. Always use `PageShell` for consistent layout
2. Use `generatePageMetadata` for locale-aware SEO
3. Keep pages thin - delegate to section components
4. Add page content to both `content/en/<page-name>.ts` and `content/fr/<page-name>.ts`
5. Use `LocaleLink` for internal navigation links

## Adding New Sections

### Section Template

```typescript
// components/sections/<section-name>.tsx
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

interface SectionNameProps {
  // Props if needed
}

export function SectionName({ }: SectionNameProps) {
  return (
    <Section background="default">
      <Container>
        <SectionHeader
          heading="Section Heading"
          intro="Optional intro text"
        />
        {/* Section content */}
      </Container>
    </Section>
  );
}
```

### Section Decomposition

When a section grows large (>200 lines), decompose it:

```
components/sections/<section-name>/
├── index.tsx             # Main section, composes sub-components
├── feature-list.tsx      # Extracted sub-component
├── diagram.tsx           # Extracted sub-component
└── index.ts              # Barrel export
```

## Content Management

### Locale-Based Content Structure

Content is organized by locale in `content/en/` and `content/fr/`:

```
content/
├── types.ts          # Shared TypeScript interfaces
├── index.ts          # getContent() API with fallback
├── en/               # English content (default)
│   ├── homepage.ts
│   ├── beta.ts
│   ├── forms.ts
│   └── index.ts      # Barrel export
└── fr/               # French content
    ├── homepage.ts
    ├── beta.ts
    ├── forms.ts
    └── index.ts      # Barrel export
```

### Adding Page Content

1. Create `content/en/<page-name>.ts` with English content
2. Create `content/fr/<page-name>.ts` with French translations
3. Define TypeScript interfaces in `content/types.ts`
4. Export from both `content/en/index.ts` and `content/fr/index.ts`

```typescript
// content/en/<page-name>.ts
import type { HeroContent } from "../types";

export const pageName = {
  hero: {
    badge: "Badge text",
    headline: "Main headline",
    headlineAccent: "Accent part",
    subtitle: "Supporting text",
    cta: {
      primary: { text: "CTA", href: "/path" },
      secondary: { text: "Secondary", href: "#" },
    },
    microcopy: "Small print",
  } as HeroContent,
};
```

### Using Content in Components

Use the `useContent` hook for localized content:

```typescript
"use client";

import { useContent } from "@/lib/i18n/use-content";
import type { PageContent } from "@/content/types";

export function PageSection() {
  const content = useContent<PageContent>("pageName");
  return <h1>{content.hero.headline}</h1>;
}
```

### Content Rules

1. Never hardcode marketing copy in components
2. Use TypeScript interfaces for type safety
3. Group related content in single objects
4. Export all content from locale-specific `index.ts` files
5. Missing translations automatically fall back to English

## State Management Patterns

### Form State with Custom Hooks

```typescript
// features/<feature>/hooks/use-<feature>-form.ts
export function useFeatureForm() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const updateField = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation and submission logic
  };

  return { formData, errors, formState, updateField, handleSubmit };
}
```

### Client vs Server Components

| Use Server Component | Use Client Component |
|---------------------|---------------------|
| Static content display | Form inputs |
| Data fetching | Interactive animations |
| SEO-critical content | State management |
| Layout structure | Event handlers |

Extract interactive parts into small client component islands:

```typescript
// Server component
export function Section() {
  return (
    <div>
      <StaticContent />
      <InteractiveWidget /> {/* "use client" */}
    </div>
  );
}
```

## API Route Patterns

### Standard API Route Structure

```typescript
// app/api/<endpoint>/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate input
    // Process request
    // Return response
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}
```

## Testing Patterns

### Test Organization

| Test Type | Location | Purpose |
|-----------|----------|---------|
| Unit | `*.test.tsx` (co-located) | Component rendering, hooks |
| Integration | `tests/integration/` | Multi-component flows |
| E2E | `tests/e2e/` | Full user journeys |
| Property | Within unit tests | Universal properties |

### Property-Based Test Template

```typescript
import fc from "fast-check";

it("Property: description", () => {
  fc.assert(
    fc.property(fc.string(), (input) => {
      // Property that should hold for all inputs
      expect(result).toBeDefined();
    }),
    { numRuns: 100 }
  );
});
```

## Scaling Guidelines

### When to Extract

| Signal | Action |
|--------|--------|
| File > 200 lines | Split into sub-components |
| 3+ components share logic | Extract to custom hook |
| Copy used in 2+ places | Move to content layer |
| Form has complex state | Create feature module |

### Performance Optimization

1. Use `dynamic()` imports for below-fold sections
2. Keep "use client" boundaries small
3. Lazy load heavy components with loading states
4. Use SSR for SEO-critical content

```typescript
const HeavySection = dynamic(
  () => import("@/components/sections/heavy").then(mod => ({ default: mod.HeavySection })),
  { loading: () => <SectionSkeleton />, ssr: true }
);
```

### Avoiding Common Pitfalls

1. **Don't** nest buttons or interactive elements
2. **Don't** use `any` type - use proper interfaces
3. **Don't** hardcode text in components
4. **Don't** skip accessibility attributes
5. **Don't** create deeply nested component hierarchies

## Internationalization (i18n)

### URL Strategy

- English (default): No prefix (`/`, `/beta`, `/about`)
- French: `/fr` prefix (`/fr`, `/fr/beta`, `/fr/about`)

### Key i18n Utilities

| Utility | Location | Purpose |
|---------|----------|---------|
| `useLocale()` | `lib/i18n/locale-context.tsx` | Get current locale |
| `useContent<T>(key)` | `lib/i18n/use-content.ts` | Get localized content |
| `getLocalizedPath()` | `lib/i18n/utils.ts` | Generate locale-aware URLs |
| `LocaleLink` | `components/ui/locale-link.tsx` | Locale-aware navigation |
| `LanguageSwitcher` | `components/ui/language-switcher.tsx` | Language toggle UI |

### Adding New Translations

1. Add English content to `content/en/<page>.ts`
2. Add French translation to `content/fr/<page>.ts`
3. Export from both `content/en/index.ts` and `content/fr/index.ts`
4. Use `useContent<T>(key)` in components

### Form Localization

Form labels, placeholders, and validation messages are in `content/en/forms.ts` and `content/fr/forms.ts`.

## File Naming Quick Reference

| Type | Convention | Example |
|------|------------|---------|
| Component file | kebab-case | `hero-section.tsx` |
| Component name | PascalCase | `HeroSection` |
| Hook file | kebab-case with use- | `use-beta-form.ts` |
| Hook name | camelCase with use | `useBetaForm` |
| Constant | SCREAMING_SNAKE | `ROLE_OPTIONS` |
| Content file | kebab-case | `homepage.ts` |
| Test file | .test.tsx suffix | `hero-section.test.tsx` |
