# Architecture Documentation

This document describes the architecture, folder structure, and development patterns for the Koeo marketing website.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `class-variance-authority` for component variants
- **Testing**: Vitest with `fast-check` for property-based testing
- **Data Storage**: Airtable (for form submissions)
- **Deployment**: Vercel

## Folder Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── beta/               # Beta signup page
│   ├── about/              # About page
│   ├── careers/            # Careers page
│   ├── product/            # Product page
│   ├── providers/          # Providers page
│   ├── brandkit/           # Brand kit page
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
│
├── components/
│   ├── layout/             # Layout components (Header, Footer, PageShell)
│   ├── sections/           # Page-specific sections (Hero, ProblemSection, etc.)
│   ├── seo/                # SEO components (JsonLd)
│   └── ui/                 # Reusable UI primitives
│
├── content/                # Centralized marketing copy
│   ├── types.ts            # TypeScript interfaces for content
│   ├── homepage.ts         # Homepage content
│   └── index.ts            # Barrel export
│
├── features/               # Domain-specific feature modules
│   └── beta-signup/        # Beta signup feature
│       ├── components/     # Feature-specific components
│       ├── constants.ts    # Form options and initial data
│       └── index.ts        # Barrel export
│
├── lib/                    # Shared utilities and services
│   ├── airtable/           # Airtable client and table definitions
│   ├── seo/                # SEO utilities and config
│   ├── utils.ts            # General utilities (cn helper)
│   └── validation.ts       # Form validation utilities
│
├── public/                 # Static assets
│   └── brand/              # Brand assets (logos, icons)
│
├── scripts/                # Development and utility scripts
│
└── tests/                  # Test utilities and integration tests
    ├── integration/        # Integration tests
    └── setup.ts            # Test setup configuration
```

## Adding New Pages

### 1. Create the Page File

Create a new directory under `app/` with a `page.tsx` file:

```typescript
// app/new-page/page.tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Page Title | KOEO",
  description: "Page description for SEO",
  openGraph: {
    title: "Page Title | KOEO",
    description: "Page description for SEO",
    url: "https://koeo.ai/new-page",
    siteName: "Koeo",
    type: "website",
  },
};

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

Update `components/layout/header.tsx` to add navigation links.

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

### Centralized Content Layer

Marketing copy is centralized in `content/` to separate content from components:

```typescript
// content/homepage.ts
import type { HeroContent } from "./types";

export const HERO_CONTENT: HeroContent = {
  badge: "Closed Beta · Not yet generally available",
  headline: "Run your AI models",
  headlineAccent: "without managing GPUs",
  subtitle: "We take care of the GPU mess so you can focus on building.",
  cta: {
    primary: { text: "Join the private beta", href: "/beta" },
    secondary: { text: "Read the Whitepaper", href: "#" },
  },
  microcopy: "We're gradually inviting teams into the private beta.",
};
```

### Using Content in Components

```typescript
import { HERO_CONTENT } from "@/content";

export function Hero() {
  return (
    <section>
      <h1>{HERO_CONTENT.headline}</h1>
      <span>{HERO_CONTENT.headlineAccent}</span>
    </section>
  );
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
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run with coverage
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
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run tests |
