# Requirements Document

## Introduction

This specification defines a comprehensive refactoring initiative for the Koeo marketing website codebase. The goal is to improve maintainability, extensibility, and code quality through incremental improvements organized into three phases: quick wins, structural improvements, and deeper refactors. This refactoring addresses architectural debt, code duplication, missing abstractions, and documentation gaps identified during a staff-level code review.

## Glossary

- **PageShell**: A layout wrapper component that provides consistent page structure (Header, main content area, Footer)
- **Marketing Block**: A reusable UI component designed for marketing pages (e.g., feature grids, step lists, glass cards)
- **Content Layer**: A centralized location for marketing copy and text content, separate from component logic
- **Section Component**: A full-width page section that combines layout, styling, and content
- **UI Primitive**: A low-level, highly reusable component (Button, Container, Input)
- **Integration Test**: A test that verifies multiple components working together in a user flow
- **CI Pipeline**: Continuous Integration workflow that runs automated checks on code changes

## Requirements

### Requirement 1: PageShell Layout Component

**User Story:** As a developer, I want a shared layout wrapper component, so that I can avoid duplicating Header/Footer assembly across every page.

#### Acceptance Criteria

1. WHEN a developer creates a new page THEN the PageShell component SHALL provide Header, main content area, and Footer in a consistent structure
2. WHEN the PageShell component is used THEN the system SHALL accept a className prop for customizing the main content area styling
3. WHEN the PageShell component renders THEN the system SHALL maintain the existing flex layout with min-h-screen
4. WHEN all pages are refactored THEN the system SHALL use PageShell instead of manual Header/Footer assembly

### Requirement 2: Dead Code Removal

**User Story:** As a developer, I want unused code removed from the codebase, so that the project remains clean and maintainable.

#### Acceptance Criteria

1. WHEN the codebase is cleaned THEN the system SHALL remove all .gitkeep files from non-empty directories
2. WHEN the codebase is cleaned THEN the system SHALL remove unused utility files (lib/blob.ts if unused)
3. WHEN dead code is removed THEN the system SHALL verify no imports are broken by running the build

### Requirement 3: CI Pipeline Configuration

**User Story:** As a developer, I want automated quality checks on every pull request, so that code quality is maintained consistently.

#### Acceptance Criteria

1. WHEN code is pushed to the repository THEN the CI pipeline SHALL run ESLint checks
2. WHEN code is pushed to the repository THEN the CI pipeline SHALL run TypeScript type checking
3. WHEN code is pushed to the repository THEN the CI pipeline SHALL run the test suite
4. WHEN code is pushed to the repository THEN the CI pipeline SHALL run the production build
5. WHEN any CI check fails THEN the pipeline SHALL report the failure clearly

### Requirement 4: README Documentation

**User Story:** As a new developer, I want comprehensive setup documentation, so that I can quickly understand and run the project.

#### Acceptance Criteria

1. WHEN a developer reads the README THEN the documentation SHALL explain project-specific setup steps
2. WHEN a developer reads the README THEN the documentation SHALL list all required environment variables
3. WHEN a developer reads the README THEN the documentation SHALL describe available npm scripts
4. WHEN a developer reads the README THEN the documentation SHALL explain the project structure

### Requirement 5: Icon Consolidation

**User Story:** As a developer, I want consistent icon usage across the codebase, so that the UI is uniform and maintenance is simplified.

#### Acceptance Criteria

1. WHEN icons are needed in components THEN the system SHALL use lucide-react as the primary icon source
2. WHEN custom SVG icons are required (social icons, brand icons) THEN the system SHALL centralize them in a dedicated location
3. WHEN icon consolidation is complete THEN the system SHALL remove duplicate inline SVG definitions

### Requirement 6: Centralized Content Layer

**User Story:** As a content editor, I want marketing copy centralized in dedicated files, so that I can update text without modifying component code.

#### Acceptance Criteria

1. WHEN content is needed for the homepage THEN the system SHALL import it from a centralized content file
2. WHEN content is centralized THEN the content files SHALL be organized by page or feature
3. WHEN content is updated THEN the changes SHALL reflect across all components using that content
4. WHEN content is centralized THEN the system SHALL maintain TypeScript types for content structures

### Requirement 7: GlassCard Component Extraction

**User Story:** As a developer, I want the glass card pattern extracted as a reusable component, so that I can use it consistently across forms and sections.

#### Acceptance Criteria

1. WHEN a glass card UI is needed THEN the GlassCard component SHALL provide the frosted glass styling with border effects
2. WHEN the GlassCard component is used THEN the system SHALL accept title, description, and children props
3. WHEN the GlassCard component renders THEN the system SHALL include the animated gradient border effect on hover
4. WHEN the component is extracted THEN the beta-form SHALL be refactored to use the shared GlassCard

### Requirement 8: Beta Form Component Splitting

**User Story:** As a developer, I want the beta form split into smaller, focused components, so that the code is easier to understand and maintain.

#### Acceptance Criteria

1. WHEN the beta form is refactored THEN the system SHALL separate form sections into individual components
2. WHEN form constants are needed THEN the system SHALL import them from a dedicated constants file
3. WHEN the form is split THEN each section component SHALL handle its own field rendering
4. WHEN the refactoring is complete THEN the main BetaForm component SHALL compose the section components

### Requirement 9: Section Component Standardization

**User Story:** As a developer, I want all section components to follow a consistent pattern, so that the codebase is predictable and maintainable.

#### Acceptance Criteria

1. WHEN a section component is created THEN the system SHALL use the Section wrapper component for consistent styling
2. WHEN a section has a heading THEN the system SHALL use the SectionHeader component
3. WHEN a section needs content width constraints THEN the system SHALL use the Container component
4. WHEN sections are standardized THEN the problem-section, what-is-section, and how-works-section SHALL follow the pattern

### Requirement 10: Integration Tests for Beta Signup

**User Story:** As a developer, I want integration tests for the beta signup flow, so that critical user journeys are protected from regressions.

#### Acceptance Criteria

1. WHEN the beta form is submitted successfully THEN the integration test SHALL verify the success state is displayed
2. WHEN the beta form has validation errors THEN the integration test SHALL verify error messages are shown
3. WHEN the API returns an error THEN the integration test SHALL verify the error state is handled gracefully
4. WHEN form fields are filled THEN the integration test SHALL verify field values are captured correctly

### Requirement 11: Architecture Documentation

**User Story:** As a new developer, I want architecture documentation, so that I can understand the project structure and patterns.

#### Acceptance Criteria

1. WHEN a developer reads ARCHITECTURE.md THEN the documentation SHALL explain the folder structure
2. WHEN a developer reads ARCHITECTURE.md THEN the documentation SHALL describe how to add new pages
3. WHEN a developer reads ARCHITECTURE.md THEN the documentation SHALL explain component patterns and conventions
4. WHEN a developer reads ARCHITECTURE.md THEN the documentation SHALL describe data fetching patterns

### Requirement 12: Section Component Decomposition

**User Story:** As a developer, I want large section components split into focused sub-components, so that each file has a single responsibility.

#### Acceptance Criteria

1. WHEN the what-is-section is refactored THEN the system SHALL extract the feature list into a separate component
2. WHEN the what-is-section is refactored THEN the system SHALL extract the architecture diagram into a separate component
3. WHEN the how-works-section is refactored THEN the system SHALL extract developer features into a separate component
4. WHEN the how-works-section is refactored THEN the system SHALL extract beta steps into a separate component
5. WHEN sections are decomposed THEN the main section files SHALL compose the extracted sub-components

### Requirement 13: Feature Directory Structure

**User Story:** As a developer, I want domain-specific code organized into feature directories, so that related code is co-located.

#### Acceptance Criteria

1. WHEN beta signup code is organized THEN the system SHALL place it in a features/beta-signup directory
2. WHEN partner signup code is organized THEN the system SHALL place it in a features/partner-signup directory
3. WHEN career application code is organized THEN the system SHALL place it in a features/careers directory
4. WHEN features are organized THEN each feature directory SHALL contain its components, hooks, and constants

### Requirement 14: Form Logic Extraction

**User Story:** As a developer, I want form state management extracted into custom hooks, so that form logic is reusable and testable.

#### Acceptance Criteria

1. WHEN the beta form is refactored THEN the system SHALL extract form state into a useBetaForm hook
2. WHEN form hooks are created THEN the hooks SHALL handle validation, submission, and state management
3. WHEN form hooks are used THEN the form components SHALL focus on rendering and user interaction
4. WHEN form logic is extracted THEN the hooks SHALL be testable in isolation

### Requirement 15: Client Directive Optimization

**User Story:** As a developer, I want "use client" directives used only where necessary, so that server-side rendering is maximized.

#### Acceptance Criteria

1. WHEN a component has no client-side interactivity THEN the component SHALL NOT include "use client"
2. WHEN a section has interactive elements THEN the system SHALL extract them into client component islands
3. WHEN client directives are optimized THEN the system SHALL verify the build succeeds with the changes

### Requirement 16: Lazy Loading for Below-Fold Content

**User Story:** As a user, I want below-fold content loaded lazily, so that initial page load is faster.

#### Acceptance Criteria

1. WHEN heavy components are below the fold THEN the system SHALL use dynamic imports with loading states
2. WHEN lazy loading is implemented THEN the system SHALL maintain visual consistency during loading
3. WHEN lazy loading is complete THEN the system SHALL verify Core Web Vitals are not negatively impacted

### Requirement 17: Content Centralization for All Pages

**User Story:** As a content editor, I want all page content centralized, so that I can manage copy across the entire site from dedicated files.

#### Acceptance Criteria

1. WHEN content is needed for any page THEN the system SHALL import it from the content directory
2. WHEN content is centralized THEN the system SHALL cover homepage, beta page, about page, careers page, and product page
3. WHEN content is centralized THEN the system SHALL maintain consistent content structure patterns

### Requirement 18: E2E Tests for Critical Journeys

**User Story:** As a developer, I want end-to-end tests for critical user journeys, so that the full user experience is validated.

#### Acceptance Criteria

1. WHEN E2E tests are implemented THEN the system SHALL test navigation between main pages
2. WHEN E2E tests are implemented THEN the system SHALL test the complete beta signup flow
3. WHEN E2E tests are implemented THEN the system SHALL test mobile menu interactions
4. WHEN E2E tests are implemented THEN the system SHALL run in the CI pipeline
