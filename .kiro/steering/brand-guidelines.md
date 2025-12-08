---
inclusion: fileMatch
fileMatchPattern: ['**/*.tsx', '**/*.css', 'components/**/*', 'app/**/*']
---

# Koeo Brand Guidelines

Visual identity standards for the Koeo marketing website. Apply these rules when creating or modifying UI components, styles, and layouts.

## Color Reference

### Primary Colors (use these Tailwind/CSS values)
| Name | Hex | Tailwind | When to Use |
|------|-----|----------|-------------|
| Deep Purple | `#4C1D95` | `purple-900` | Footer backgrounds, dark accents |
| Primary Purple | `#7C3AED` | `violet-500` | Primary CTAs, links, brand elements |
| Magenta | `#E02F87` | `pink-600` | Gradient endpoints, highlights |
| Light Pink | `#F472B6` | `pink-400` | Hover states, subtle accents |

### Text Colors
| Context | Hex | Tailwind |
|---------|-----|----------|
| Light backgrounds | `#0F172A` | `slate-900` |
| Dark backgrounds | `#E2E8F0` | `slate-200` |

### Backgrounds
- Primary: `#FFFFFF` (white)
- Alternate sections: `#F8FAFC` (`slate-50`)

## Gradients

```css
/* Primary - use for CTAs, primary buttons */
background: linear-gradient(135deg, #7C3AED, #E02F87);

/* Deep - use for dark sections, footer */
background: linear-gradient(135deg, #4C1D95, #7C3AED);
```

Tailwind: `bg-gradient-to-br from-violet-500 to-pink-600`

## Typography

Font: Inter via `next/font/google`

### Responsive Type Scale
| Element | Classes |
|---------|---------|
| H1 | `text-4xl md:text-5xl lg:text-6xl font-bold` |
| H2 | `text-3xl md:text-4xl font-bold` |
| H3 | `text-xl md:text-2xl font-semibold` |
| Body | `text-base font-normal` |
| Small | `text-sm` |

### Font Weights
- 400: Body text
- 500: Nav links, subtle emphasis
- 600: Subheadings, buttons
- 700: Main headings

## Component Patterns

### Buttons
```tsx
// Primary button pattern
className="rounded-full bg-gradient-to-br from-violet-500 to-pink-600 
           hover:opacity-90 focus-visible:ring-2 focus-visible:ring-violet-500"
```

### Links
```tsx
// Standard link pattern
className="text-violet-500 hover:text-pink-400 hover:underline"
```

### Cards
```tsx
// Card pattern
className="rounded-lg shadow-sm" // or rounded-xl shadow-md
```

### Container
- Max width: `max-w-7xl` (1280px)

## Accessibility Checklist

When creating UI components, ensure:
- [ ] Text contrast meets WCAG 2.1 AA (4.5:1 minimum)
- [ ] Interactive elements have `focus-visible:ring-2` states
- [ ] Images include descriptive `alt` text
- [ ] Use semantic HTML (`<nav>`, `<main>`, `<footer>`, `<button>`)
- [ ] Buttons are keyboard accessible
