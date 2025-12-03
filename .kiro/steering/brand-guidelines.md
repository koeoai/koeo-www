# Koeo Brand Guidelines

This document defines the visual identity standards for the Koeo marketing website. All components and pages must adhere to these guidelines to maintain brand consistency.

## Color Palette

### Primary Colors

| Color Name | Hex Value | CSS Variable | Usage |
|------------|-----------|--------------|-------|
| Deep Purple | `#4C1D95` | `--color-purple-deep` | Dark accents, depth, footer backgrounds |
| Primary Purple | `#7C3AED` | `--color-purple-primary` | Main brand color, primary CTAs, links |
| Magenta | `#E02F87` | `--color-magenta` | Accents, energy, highlights, gradient endpoints |
| Light Pink | `#F472B6` | `--color-pink-light` | Hover states, subtle backgrounds |

### Text Colors

| Color Name | Hex Value | CSS Variable | Usage |
|------------|-----------|--------------|-------|
| Primary Text | `#0F172A` | `--color-text-primary` | Headings, body text on light backgrounds |
| Light Text | `#E2E8F0` | `--color-text-light` | Text on dark backgrounds |

### Background Colors

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| White | `#FFFFFF` | Primary page background |
| Slate 50 | `#F8FAFC` | Subtle section backgrounds |

## Gradients

### Primary Gradient
- **CSS**: `linear-gradient(135deg, #7C3AED, #E02F87)`
- **Usage**: Hero CTAs, primary buttons, accent elements
- **Direction**: 135 degrees (top-left to bottom-right)

### Deep Gradient
- **CSS**: `linear-gradient(135deg, #4C1D95, #7C3AED)`
- **Usage**: Dark section backgrounds, footer accents

## Typography

### Font Family
- **Primary Font**: Inter
- **Fallback Stack**: `'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif`
- **Loading**: Use Next.js font optimization (`next/font/google`)

### Font Weights

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, paragraphs |
| 500 | Medium | Navigation links, subtle emphasis |
| 600 | Semi-Bold | Subheadings, button text |
| 700 | Bold | Main headings, strong emphasis |

### Type Scale (Tailwind Classes)

| Element | Class | Size |
|---------|-------|------|
| H1 (Hero) | `text-4xl md:text-5xl lg:text-6xl` | 36px / 48px / 60px |
| H2 (Section) | `text-3xl md:text-4xl` | 30px / 36px |
| H3 (Subsection) | `text-xl md:text-2xl` | 20px / 24px |
| Body | `text-base` | 16px |
| Small | `text-sm` | 14px |

## Component Styling Guidelines

### Buttons
- Use `rounded-full` for pill-shaped buttons
- Primary buttons use the Primary Gradient
- Hover states should use `hover:opacity-90` or subtle scale transform
- Focus states must include visible ring (`focus-visible:ring-2`)

### Links
- Default color: Primary Purple (`#7C3AED`)
- Hover color: Light Pink (`#F472B6`)
- Include underline on hover for accessibility

### Cards and Containers
- Use subtle shadows: `shadow-sm` or `shadow-md`
- Border radius: `rounded-lg` (8px) or `rounded-xl` (12px)
- Max content width: 1280px (`max-w-7xl`)

## Accessibility Requirements

- All text must meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text)
- Interactive elements must have visible focus states
- Images must include descriptive alt text
- Use semantic HTML elements appropriately
