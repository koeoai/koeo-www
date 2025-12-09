# Architecture Documentation

This document describes the architecture, folder structure, and development patterns for the Koeo marketing website.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with `class-variance-authority` for component variants
- **Testing**: Vitest with `fast-check` for property-based testing, Playwright for E2E
- **Data Storage**: Airtable (for form submissions)
- **Deployment**: Vercel

## Folder Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── [locale]/           # Locale-based routing (en, fr)
│   │   ├── about/          # About page
│   │   ├── beta/           # Beta signup page
│   │   ├── brandkit/       # Brand kit page
│   │   ├── careers/        # Careers page
│   │   ├── product/        # Product page
│   │   ├── providers/      # Providers page
│   │   ├── layout.tsx      # Locale layout with LocaleProvider
│   │   └── page.tsx        # Homepage
│   ├── layout.tsx          # Root layout with metadata
│   └── globals.css         # Global styles
│
├── components/
│   ├── layout/             # Layout components (Header, Footer, PageShell)
│   ├── sections/           # Page-specific sections (Hero, ProblemSection, etc.)
│   ├── seo/                # SEO components (JsonLd)
│   └── ui/                 # Reusable UI primitives (LanguageSwitcher, etc.)
│
├── content/                # Centralized marketing copy (locale-based)
│   ├── types.ts            # TypeScript interfaces for content
│   ├── index.ts            # Content retrieval API with getContent()
│   ├── en/                 # English content (default)
│   │   ├── homepage.ts
│   │   ├── beta.ts
│   │   ├── forms.ts
│   │   └── ...
│   └── fr/                 # French content
│       ├── homepage.ts
│       ├── beta.ts
│       ├── forms.ts
│       └── ...
│
├── features/               # Domain-specific feature modules
│   ├── beta-signup/        # Beta signup feature
│   │   ├── components/     # Feature-specific components
│   │   ├── hooks/          # Custom hooks (useBetaForm)
│   │   ├── constants.ts    # Form options and initial data
│   │   └── index.ts        # Barrel export
│   ├── partner-signup/     # Partner signup feature
│   └── careers/            # Career application feature
│
├── lib/                    # Shared utilities and services
│   ├── airtable/           # Airtable client and table definitions
│   ├── i18n/               # Internationalization utilities
│   │   ├── config.ts       # Locale configuration (en, fr)
│   │   ├── locale-context.tsx # LocaleProvider and useLocale hook
│   │   ├── use-content.ts  # useContent hook for localized content
│   │   └── utils.ts        # URL utilities (getLocalizedPath, etc.)
│   ├── seo/                # SEO utilities and config
│   ├── utils.ts            # General utilities (cn helper)
│   └── validation.ts       # Form validation utilities
│
├── public/                 # Static assets
│   └── brand/              # Brand assets (logos, icons)
│
├── scripts/                # Development and utility scripts
│
├── middleware.ts           # Locale detection middleware
│
└── tests/                  # Test utilities and integration tests
    ├── e2e/                # End-to-end tests (Playwright)
    ├── integration/        # Integration tests
    └── setup.ts            # Test setup configuration
```

## Adding New Pages

### 1. Create the Page File

Create a new directory under `app/[locale]/` with a `page.tsx` file:

```typescript
// app/[locale]/new-page/page.tsx
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
    description: "Page description for SEO",
    path: "/new-page",
    locale,
  });
}

export default function NewPage() {
  return (
    <PageShell>
      {/* Page content goes here */}
    </PageShell>
  );
}
```

### 2. Use PageShell for Consistent Layout

Always wrap page content with `PageShell` to get consistent Header/Footer:

```typescript
import { PageShell } from "@/components/layout/page-shell";

// For custom background styling
<PageShell rootClassName="bg-purple-primary">
  {/* Content */}
</PageShell>

// For custom main content styling
<PageShell className="pt-20">
  {/* Content */}
</PageShell>
```

### 3. Add to Navigation (if needed)

Update `components/layout/header.tsx` to add navigation links. Use `LocaleLink` for locale-aware navigation:

```typescript
import { LocaleLink } from "@/components/ui/locale-link";

<LocaleLink href="/new-page">New Page</LocaleLink>
```

## Component Patterns

### UI Primitives (`components/ui/`)

Low-level, highly reusable components. Use `class-variance-authority` for variants:

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-primary to-magenta text-white",
        secondary: "border border-purple-primary text-purple-primary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Section Components (`components/sections/`)

Full-width page sections. Use the standard pattern with `Section`, `Container`, and `SectionHeader`:

```typescript
// components/sections/example-section.tsx
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function ExampleSection() {
  return (
    <Section background="default">
      <Container>
        <SectionHeader
          heading="Section Heading"
          intro="Optional introductory text for the section."
        />
        {/* Section content */}
      </Container>
    </Section>
  );
}
```

### Layout Components (`components/layout/`)

- `PageShell`: Wraps pages with Header/Footer
- `Header`: Site navigation
- `Footer`: Site footer with links and social icons

### Feature Modules (`features/`)

Domain-specific code organized by feature:

```
features/
└── beta-signup/
    ├── components/         # Feature-specific UI components
    │   ├── about-you-section.tsx
    │   ├── ai-usage-section.tsx
    │   └── index.ts        # Barrel export
    ├── constants.ts        # Form options, initial data
    └── index.ts            # Public API
```

Import from the feature's public API:

```typescript
import { ROLE_OPTIONS, AboutYouSection } from "@/features/beta-signup";
```

## Content Management

### Locale-Based Content Layer

Marketing copy is centralized in `content/` with locale-based organization:

```
content/
├── types.ts          # Shared TypeScript interfaces
├── index.ts          # getContent() API with fallback
├── en/               # English content (default)
│   ├── homepage.ts
│   ├── beta.ts
│   └── forms.ts
└── fr/               # French content
    ├── homepage.ts
    ├── beta.ts
    └── forms.ts
```

```typescript
// content/en/homepage.ts
import type { HeroContent } from "../types";

export const homepage: { hero: HeroContent } = {
  hero: {
    badge: "Closed Beta · Not yet generally available",
    headline: "Run your AI models",
    headlineAccent: "without managing GPUs",
    subtitle: "We take care of the GPU mess so you can focus on building.",
    cta: {
      primary: { text: "Join the private beta", href: "/beta" },
      secondary: { text: "Read the Whitepaper", href: "#" },
    },
    microcopy: "We're gradually inviting teams into the private beta.",
  },
};
```

### Using Content in Components

Use the `useContent` hook to get localized content:

```typescript
"use client";

import { useContent } from "@/lib/i18n/use-content";
import type { HomepageContent } from "@/content/types";

export function Hero() {
  const content = useContent<HomepageContent>("homepage");
  
  return (
    <section>
      <h1>{content.hero.headline}</h1>
      <span>{content.hero.headlineAccent}</span>
    </section>
  );
}
```

### Content Fallback

If a translation is missing for a locale, the system automatically falls back to English:

```typescript
// content/index.ts
import { Locale, i18nConfig } from "@/lib/i18n/config";

export function getContent<T>(key: string, locale: Locale): T {
  const localeContent = contentByLocale[locale];
  const defaultContent = contentByLocale[i18nConfig.defaultLocale];
  
  // Return locale-specific content or fall back to default (English)
  return (localeContent[key] ?? defaultContent[key]) as T;
}
```

## Data Fetching Patterns

### API Routes

API routes are located in `app/api/` and handle form submissions:

```typescript
// app/api/beta-signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAirtableClient, TABLES, mapBetaSignupFields } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = getAirtableClient();

    if (!client.isConfigured()) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const fields = mapBetaSignupFields(data);
    const result = await client.createRecord(TABLES.BETA_SIGNUPS, fields);

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
```

### Client-Side Form Submission

```typescript
const handleSubmit = async (formData: FormData) => {
  const response = await fetch("/api/beta-signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  return response.json();
};
```

### Airtable Integration

The Airtable client is configured via environment variables:

```bash
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
```

Use the client through `lib/airtable`:

```typescript
import { getAirtableClient, TABLES } from "@/lib/airtable";

const client = getAirtableClient();
await client.createRecord(TABLES.BETA_SIGNUPS, fields);
```

## Styling Guidelines

### Tailwind CSS

Use Tailwind utility classes with the `cn()` helper for conditional classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

### Brand Colors

Use the defined CSS variables and Tailwind classes:

- `purple-primary` (#7C3AED) - Primary brand color
- `purple-deep` (#4C1D95) - Dark accents
- `magenta` (#E02F87) - Accent color
- `pink-light` (#F472B6) - Hover states

### Component Variants

Use `class-variance-authority` for component variants (see Button example above).

## Testing

### Test File Location

Co-locate tests with source files:

```
components/ui/button.tsx
components/ui/button.test.tsx
```

### Running Tests

```bash
npm test           # Run unit/integration tests
npm run test:e2e   # Run E2E tests with Playwright
```

### Property-Based Tests

Use `fast-check` for property-based testing:

```typescript
import { describe, it, expect } from "vitest";
import fc from "fast-check";

describe("Component", () => {
  it("property test", () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        // Test property holds for all inputs
        expect(someFunction(input)).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });
});
```

## Internationalization (i18n)

### Supported Locales

The site supports English (default) and French:

```typescript
// lib/i18n/config.ts
export const i18nConfig = {
  defaultLocale: "en" as const,
  locales: ["en", "fr"] as const,
  localeNames: {
    en: "English",
    fr: "Français",
  },
} as const;
```

### URL Strategy

- English (default): No prefix (`/`, `/beta`, `/about`)
- French: `/fr` prefix (`/fr`, `/fr/beta`, `/fr/about`)

### Key Hooks

| Hook | Purpose |
|------|---------|
| `useLocale()` | Get current locale and `isDefaultLocale` flag |
| `useContent<T>(key)` | Get localized content with automatic fallback |

### Adding Translations

1. Add content to `content/en/<page>.ts`
2. Create matching file in `content/fr/<page>.ts`
3. Export from `content/en/index.ts` and `content/fr/index.ts`

### Language Switcher

The `LanguageSwitcher` component in the header allows users to switch languages while preserving the current path.

### SEO for i18n

- Hreflang tags are automatically added to all pages
- Sitemap includes all locale variants
- Open Graph tags include locale information

## Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `AIRTABLE_API_KEY` | Airtable API key for form submissions |
| `AIRTABLE_BASE_ID` | Airtable base ID |

Create a `.env.local` file for local development (not committed to git).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit and integration tests |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
