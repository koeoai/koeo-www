---
inclusion: fileMatch
fileMatchPattern: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx']
---

# Koeo Coding Standards

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `hero-section.tsx`, `use-beta-form.ts` |
| Components | PascalCase | `HeroSection`, `BetaForm` |
| Functions/Variables | camelCase | `handleClick`, `isOpen` |
| Constants | SCREAMING_SNAKE_CASE | `NAV_ITEMS`, `ROLE_OPTIONS` |
| Interfaces/Types | PascalCase + suffix | `ButtonProps`, `NavItem` |
| Test files | `.test.tsx` suffix | `button.test.tsx` |

## Component File Structure

Follow this order in every component file:

```typescript
// 1. Imports (external → internal via @/ alias → relative)
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 2. Types/Interfaces
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
}

// 3. Constants
const buttonVariants = cva("...", { variants: { ... } });

// 4. Component + export
export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
```

## TypeScript Rules

- Define explicit types for all component props
- Never use `any` — use `unknown` if type is uncertain
- Use union types for constrained values: `variant: "default" | "secondary"`
- Prefer interfaces for objects, types for unions/primitives
- Use `React.ComponentPropsWithoutRef<"element">` when extending HTML elements
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Avoid non-null assertions (`!`)

## React/Next.js Patterns

- Use function components with hooks (no class components)
- Add `"use client"` only when client interactivity is required
- Keep components single-responsibility; extract logic to custom hooks
- Use `PageShell` wrapper for all pages
- Use `Section`, `Container`, `SectionHeader` for page sections

## Styling

- Use Tailwind CSS utility classes exclusively
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Use `class-variance-authority` (cva) for component variants
- Order responsive classes: base → sm → md → lg → xl

## Accessibility Requirements

- Add ARIA labels on all interactive elements
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`
- Ensure keyboard navigation works for all interactive elements

## Import Order

1. React/Next.js (`import { useState } from "react"`)
2. External libraries (`import { cva } from "class-variance-authority"`)
3. Internal imports via alias (`import { Button } from "@/components/ui/button"`)
4. Relative imports (`import { helper } from "./utils"`)
5. Type-only imports (`import type { Props } from "./types"`)

## Path Aliases

- `@/components` — UI components
- `@/lib` — Utilities, validation, API clients
- `@/content` — Marketing copy and content
- `@/features` — Feature modules with forms/hooks

## Testing

- Co-locate tests: `button.tsx` → `button.test.tsx`
- Use `tests/` for setup files and shared utilities
- Property-based tests: tag with `**Feature: koeo-marketing-website, Property {N}: {description}**`, run 100+ iterations
