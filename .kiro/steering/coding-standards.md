# Koeo Coding Standards

This document defines the coding conventions and best practices for the Koeo marketing website project.

## Component Naming Conventions

### File Naming
- Use **kebab-case** for all file names: `button.tsx`, `hero-section.tsx`, `mobile-nav.tsx`
- Test files use `.test.tsx` suffix: `button.test.tsx`
- Index files for barrel exports: `index.ts`

### Component Naming
- Use **PascalCase** for React components: `Button`, `HeroSection`, `MobileNav`
- Use **camelCase** for functions and variables: `handleClick`, `isOpen`, `navItems`
- Use **SCREAMING_SNAKE_CASE** for constants: `DEFAULT_HEADLINE`, `NAV_ITEMS`

### Interface/Type Naming
- Use **PascalCase** with descriptive suffixes: `ButtonProps`, `NavItem`, `FooterLinkGroup`
- Prefix interfaces with component name when specific: `HeroProps`, `HeaderProps`

## File Organization Standards

### Directory Structure
```
components/
├── ui/           # Reusable UI primitives (Button, Container, Section)
├── layout/       # Layout components (Header, Footer)
└── sections/     # Page-specific sections (Hero, Features)
```

### Component File Structure
Each component file should follow this order:
1. Imports (external, then internal)
2. Type definitions/interfaces
3. Constants
4. Helper functions
5. Component definition
6. Default export

### Example Component Structure
```typescript
// 1. Imports
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 2. Type definitions
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
}

// 3. Constants
const buttonVariants = cva("...", { variants: { ... } });

// 4. Component
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

## TypeScript Best Practices

### Type Safety
- Always define explicit types for component props
- Avoid `any` type - use `unknown` if type is truly unknown
- Use union types for constrained values: `variant: "default" | "secondary"`
- Prefer interfaces for object shapes, types for unions/primitives

### Props Handling
- Destructure props with defaults: `{ variant = "default", ...props }`
- Use `React.ComponentPropsWithoutRef<"element">` for extending HTML elements
- Support `className` prop for customization using `cn()` utility

### Null Safety
- Use optional chaining: `user?.name`
- Use nullish coalescing: `value ?? defaultValue`
- Avoid non-null assertions (`!`) unless absolutely necessary

## React/Next.js Conventions

### Component Patterns
- Prefer function components with hooks
- Use `"use client"` directive only when client-side interactivity is needed
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks

### Styling
- Use Tailwind CSS utility classes
- Use `cn()` helper for conditional classes
- Use `class-variance-authority` (cva) for component variants
- Keep responsive classes in order: base, sm, md, lg, xl

### Accessibility
- Include ARIA labels on interactive elements
- Use semantic HTML elements (`<nav>`, `<main>`, `<footer>`)
- Ensure keyboard navigation works
- Test with screen readers when possible

## Import Conventions

### Import Order
1. React/Next.js imports
2. External library imports
3. Internal component imports (using `@/` alias)
4. Relative imports
5. Type imports

### Path Aliases
- Use `@/components` for components
- Use `@/lib` for utilities
- Use `@/app` for app-specific code

## Testing Standards

### Test File Location
- Co-locate tests with source files: `button.tsx` → `button.test.tsx`
- Use `tests/` directory for setup and shared utilities

### Test Naming
- Describe what the component/function does
- Use clear, readable test names
- Group related tests with `describe` blocks

### Property-Based Tests
- Tag with: `**Feature: koeo-marketing-website, Property {N}: {description}**`
- Run minimum 100 iterations
- Reference correctness properties from design document
