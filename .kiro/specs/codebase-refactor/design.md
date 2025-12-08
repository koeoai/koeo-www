# Design Document: Codebase Refactor

## Overview

This design document outlines the technical approach for refactoring the Koeo marketing website codebase across three phases. The refactoring aims to improve maintainability, reduce code duplication, establish consistent patterns, and enhance developer experience while preserving existing functionality.

## Architecture

The refactoring introduces several architectural improvements:

### Current Architecture
```
app/                    # Next.js App Router pages
components/
├── ui/                 # UI primitives
├── layout/             # Header, Footer
├── sections/           # Page sections (monolithic)
└── seo/                # SEO components
lib/
├── utils.ts            # Utilities
├── validation.ts       # Form validation
├── airtable/           # Airtable client
└── seo/                # SEO utilities
```

### Target Architecture
```
app/                    # Next.js App Router pages (thin, compose features)
components/
├── ui/                 # UI primitives (Button, Container, GlassCard)
├── blocks/             # Reusable marketing blocks
├── layout/             # Header, Footer, PageShell
└── seo/                # SEO components
content/                # Centralized marketing copy
├── homepage.ts
├── beta.ts
└── ...
features/               # Domain-specific code
├── beta-signup/
│   ├── components/
│   ├── hooks/
│   └── constants.ts
├── partner-signup/
└── careers/
lib/
├── utils.ts
├── validation.ts
├── airtable/
└── seo/
```

## Components and Interfaces

### PageShell Component

```typescript
// components/layout/page-shell.tsx
export interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps): JSX.Element;
```

The PageShell wraps all pages with consistent Header/Footer structure, eliminating duplication across page files.

### GlassCard Component

```typescript
// components/ui/glass-card.tsx
export interface GlassCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ title, description, children, className }: GlassCardProps): JSX.Element;
```

Extracted from beta-form.tsx, provides the frosted glass card styling with animated border effects.

### Content Types

```typescript
// content/types.ts
export interface HeroContent {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  cta: {
    primary: string;
    secondary: string;
  };
  microcopy: string;
}

export interface SectionContent {
  heading: string;
  intro?: string;
}

export interface FeatureItem {
  icon: string; // lucide-react icon name
  text: string;
}

export interface ProblemCard {
  category: string;
  title: string;
  description: string;
  icon: string;
}
```

### Form Hooks

```typescript
// features/beta-signup/hooks/use-beta-form.ts
export interface UseBetaFormReturn {
  formData: SurveyFormData;
  errors: Record<string, string>;
  formState: FormState;
  updateField: (field: keyof SurveyFormData) => (value: string | string[]) => void;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useBetaForm(onSubmit?: (data: SurveyFormData) => Promise<void>): UseBetaFormReturn;
```

## Data Models

### Content Structure

```typescript
// content/homepage.ts
export const HOMEPAGE_CONTENT = {
  hero: {
    badge: "Closed Beta · Not yet generally available",
    headline: "Run your AI models",
    headlineAccent: "without managing GPUs",
    subtitle: "We take care of the GPU mess so you can focus on building.",
    cta: {
      primary: "Join the private beta",
      secondary: "Read the Whitepaper",
    },
    microcopy: "We're gradually inviting teams into the private beta.",
  },
  problem: {
    heading: "Why AI infrastructure feels harder than it should",
    intro: "Running inference at scale usually means juggling providers...",
    cards: [
      {
        category: "COMPLEXITY",
        title: "Too many moving parts",
        description: "Model servers, schedulers, GPU pools...",
        icon: "grid-2x2",
      },
      // ...
    ],
  },
  // ...
} as const;
```

### Form Constants Structure

```typescript
// features/beta-signup/constants.ts
export const ROLE_OPTIONS = [
  { value: "Student", label: "Student" },
  // ...
] as const;

export const SEGMENT_OPTIONS = [...] as const;
export const WORKLOAD_TYPE_OPTIONS = [...] as const;
// ...

export const INITIAL_FORM_DATA: SurveyFormData = {
  fullName: "",
  email: "",
  // ...
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: PageShell renders correctly for all valid prop combinations

*For any* valid children content and optional className string, the PageShell component should render a structure containing Header, main element with the children, and Footer in that order, with the className applied to the main element.

**Validates: Requirements 1.1, 1.2**

### Property 2: GlassCard renders correctly for all valid prop combinations

*For any* valid title string, optional description string, and children content, the GlassCard component should render with the title visible, description visible if provided, children rendered inside, and appropriate glass styling classes applied.

**Validates: Requirements 7.1, 7.2**

### Property 3: Content changes propagate to rendered output

*For any* content object with valid structure, when the content is updated and components re-render, the new content values should appear in the rendered output.

**Validates: Requirements 6.3**

### Property 4: Form validation identifies invalid inputs

*For any* form data with invalid fields (empty required fields, invalid email format, etc.), the validation function should return appropriate error messages for each invalid field.

**Validates: Requirements 10.2**

### Property 5: Form state captures field values correctly

*For any* sequence of field updates with valid values, the form state should accurately reflect all entered values and the updateField function should correctly update the specified field.

**Validates: Requirements 10.4**

### Property 6: useBetaForm hook manages state transitions correctly

*For any* sequence of form interactions (field updates, validation calls, submission attempts), the hook should maintain consistent state and transition between idle, applying, success, and error states appropriately.

**Validates: Requirements 14.2**

## Error Handling

### Form Submission Errors

- API errors are caught and displayed to users via error state
- Network failures show a generic error message
- Validation errors are displayed inline next to fields

### Component Errors

- Missing required props should be caught by TypeScript at compile time
- Runtime errors in components should be caught by React error boundaries (existing Next.js behavior)

### Build Errors

- Dead code removal is verified by successful build
- Import errors are caught by TypeScript compilation
- CI pipeline catches all errors before merge

## Testing Strategy

### Dual Testing Approach

This refactoring uses both unit tests and property-based tests:

- **Unit tests**: Verify specific examples, edge cases, and integration points
- **Property-based tests**: Verify universal properties that should hold across all inputs

### Property-Based Testing

- **Library**: fast-check (already in use)
- **Minimum iterations**: 100 per property
- **Tag format**: `**Feature: codebase-refactor, Property {N}: {description}**`

### Unit Testing

Unit tests cover:
- Component rendering with specific props
- Hook behavior with specific inputs
- Integration between components

### Integration Testing

Integration tests verify:
- Beta form submission flow (success, validation errors, API errors)
- Form field value capture
- Component composition

### E2E Testing

E2E tests (Phase 3) verify:
- Navigation between pages
- Complete beta signup flow
- Mobile menu interactions

### Test File Organization

```
components/
├── layout/
│   ├── page-shell.tsx
│   └── page-shell.test.tsx
├── ui/
│   ├── glass-card.tsx
│   └── glass-card.test.tsx
features/
├── beta-signup/
│   ├── hooks/
│   │   ├── use-beta-form.ts
│   │   └── use-beta-form.test.ts
│   └── components/
│       └── beta-form.test.tsx
tests/
├── integration/
│   └── beta-signup.test.tsx
└── e2e/
    └── navigation.test.ts
```
