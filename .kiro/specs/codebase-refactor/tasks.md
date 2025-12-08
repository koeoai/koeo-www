# Implementation Plan

## Phase 1: Quick Wins

- [x] 1. Create PageShell layout component





  - [x] 1.1 Create components/layout/page-shell.tsx with Header, main, Footer structure


    - Accept children and className props
    - Maintain flex min-h-screen layout
    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 1.2 Write property test for PageShell component


    - **Property 1: PageShell renders correctly for all valid prop combinations**
    - **Validates: Requirements 1.1, 1.2**


  - [x] 1.3 Refactor app/page.tsx to use PageShell



    - Remove manual Header/Footer imports
    - _Requirements: 1.4_
  - [x] 1.4 Refactor app/beta/page.tsx to use PageShell
    - _Requirements: 1.4_
  - [x] 1.5 Refactor remaining pages to use PageShell

    - app/about/page.tsx, app/careers/page.tsx, app/product/page.tsx, app/providers/page.tsx, app/brandkit/page.tsx
    - _Requirements: 1.4_

- [x] 2. Remove dead code






  - [x] 2.1 Remove .gitkeep files from non-empty directories

    - components/sections/.gitkeep, components/ui/.gitkeep
    - _Requirements: 2.1_


  - [x] 2.2 Verify and remove unused lib/blob.ts if no imports exist
    - Search codebase for imports
    - **Result: lib/blob.ts is actively used by app/api/career-application/route.ts - NOT removed**
    - _Requirements: 2.2_
  - [x] 2.3 Run build to verify no broken imports

    - _Requirements: 2.3_

- [x] 3. Add CI pipeline configuration





  - [x] 3.1 Create .github/workflows/ci.yml


    - Configure Node.js setup
    - Run npm ci, lint, typecheck, test, build
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4. Update README documentation






  - [x] 4.1 Rewrite README.md with project-specific content

    - Add project description
    - Document setup steps
    - List environment variables (AIRTABLE_API_KEY, AIRTABLE_BASE_ID)
    - Describe npm scripts
    - Explain project structure
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 5. Consolidate icon usage





  - [x] 5.1 Create components/ui/icons.tsx for custom SVG icons


    - Centralize social icons (Twitter, LinkedIn, Discord, Reddit)
    - Export as named components
    - _Requirements: 5.2_
  - [x] 5.2 Update footer.tsx to use centralized icons


    - Import from icons.tsx instead of inline SVGs
    - _Requirements: 5.3_

  - [x] 5.3 Update header.tsx to use lucide-react consistently

    - Verify Menu and ChevronDown are from lucide-react
    - _Requirements: 5.1_

- [ ] 6. Checkpoint - Phase 1 complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: Structural Improvements

- [ ] 7. Create centralized content layer
  - [ ] 7.1 Create content/types.ts with content type definitions
    - HeroContent, SectionContent, FeatureItem, ProblemCard types
    - _Requirements: 6.4_
  - [ ] 7.2 Create content/homepage.ts with homepage content
    - Hero, problem, what-is, how-works section content
    - _Requirements: 6.1, 6.2_
  - [ ] 7.3 Write property test for content propagation
    - **Property 3: Content changes propagate to rendered output**
    - **Validates: Requirements 6.3**

- [ ] 8. Extract GlassCard component
  - [ ] 8.1 Create components/ui/glass-card.tsx
    - Extract from beta-form.tsx GlassCard pattern
    - Accept title, description, children, className props
    - Include animated gradient border effect
    - _Requirements: 7.1, 7.2, 7.3_
  - [ ] 8.2 Write property test for GlassCard component
    - **Property 2: GlassCard renders correctly for all valid prop combinations**
    - **Validates: Requirements 7.1, 7.2**
  - [ ] 8.3 Refactor beta-form.tsx to use shared GlassCard
    - Remove inline GlassCard definition
    - Import from components/ui/glass-card
    - _Requirements: 7.4_

- [ ] 9. Split beta form into smaller components
  - [ ] 9.1 Create features/beta-signup/constants.ts
    - Move ROLE_OPTIONS, SEGMENT_OPTIONS, etc.
    - Move INITIAL_FORM_DATA
    - _Requirements: 8.2_
  - [ ] 9.2 Create features/beta-signup/components/about-you-section.tsx
    - Handle fullName, email, organizationName, role, segment fields
    - _Requirements: 8.1, 8.3_
  - [ ] 9.3 Create features/beta-signup/components/ai-usage-section.tsx
    - Handle aiUseCase, workloadTypes fields
    - _Requirements: 8.1, 8.3_
  - [ ] 9.4 Create features/beta-signup/components/current-setup-section.tsx
    - Handle currentInfraSources, monthlySpend, workflow fields
    - _Requirements: 8.1, 8.3_
  - [ ] 9.5 Create features/beta-signup/components/pain-points-section.tsx
    - Handle topPainPoints, painNotes fields
    - _Requirements: 8.1, 8.3_
  - [ ] 9.6 Create features/beta-signup/components/features-section.tsx
    - Handle mostValuableFeatures, anythingElse fields
    - _Requirements: 8.1, 8.3_
  - [ ] 9.7 Refactor components/sections/beta-form.tsx to compose sections
    - Import and use section components
    - Keep form state and submission logic in main component
    - _Requirements: 8.4_

- [ ] 10. Standardize section component patterns
  - [ ] 10.1 Refactor problem-section.tsx to use Section, Container, SectionHeader
    - Wrap with Section component
    - Use SectionHeader for heading
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ] 10.2 Refactor what-is-section.tsx to use standard pattern
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ] 10.3 Refactor how-works-section.tsx to use standard pattern
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 11. Add integration tests for beta signup
  - [ ] 11.1 Create tests/integration/beta-signup.test.tsx
    - Test successful form submission shows success state
    - _Requirements: 10.1_
  - [ ] 11.2 Write property test for form validation
    - **Property 4: Form validation identifies invalid inputs**
    - **Validates: Requirements 10.2**
  - [ ] 11.3 Add test for API error handling
    - Mock API to return error, verify error state
    - _Requirements: 10.3_
  - [ ] 11.4 Write property test for field value capture
    - **Property 5: Form state captures field values correctly**
    - **Validates: Requirements 10.4**

- [ ] 12. Create architecture documentation
  - [ ] 12.1 Create ARCHITECTURE.md
    - Document folder structure
    - Explain how to add new pages
    - Describe component patterns
    - Document data fetching patterns
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 13. Checkpoint - Phase 2 complete
  - Ensure all tests pass, ask the user if questions arise.

## Phase 3: Deeper Refactors

- [ ] 14. Decompose what-is-section
  - [ ] 14.1 Create components/sections/what-is/feature-list.tsx
    - Extract FEATURES array and rendering logic
    - _Requirements: 12.1_
  - [ ] 14.2 Create components/sections/what-is/architecture-diagram.tsx
    - Extract the technical visualization component
    - _Requirements: 12.2_
  - [ ] 14.3 Create components/sections/what-is/index.tsx
    - Compose feature-list and architecture-diagram
    - _Requirements: 12.5_

- [ ] 15. Decompose how-works-section
  - [ ] 15.1 Create components/sections/how-works/developer-features.tsx
    - Extract DEVELOPER_FEATURES and rendering
    - _Requirements: 12.3_
  - [ ] 15.2 Create components/sections/how-works/beta-steps.tsx
    - Extract STEPS and rendering
    - _Requirements: 12.4_
  - [ ] 15.3 Create components/sections/how-works/index.tsx
    - Compose developer-features and beta-steps
    - _Requirements: 12.5_

- [ ] 16. Create feature directory structure
  - [ ] 16.1 Move beta signup code to features/beta-signup/
    - Move components, create index.ts barrel export
    - _Requirements: 13.1, 13.4_
  - [ ] 16.2 Create features/partner-signup/ structure
    - Move partner-form.tsx and related code
    - _Requirements: 13.2, 13.4_
  - [ ] 16.3 Create features/careers/ structure
    - Move career application related code
    - _Requirements: 13.3, 13.4_
  - [ ] 16.4 Update imports across codebase
    - Update all files importing from old locations
    - _Requirements: 13.1, 13.2, 13.3_

- [ ] 17. Extract form logic into custom hooks
  - [ ] 17.1 Create features/beta-signup/hooks/use-beta-form.ts
    - Extract form state, validation, submission logic
    - Return formData, errors, formState, updateField, validateForm, handleSubmit
    - _Requirements: 14.1, 14.2_
  - [ ] 17.2 Write property test for useBetaForm hook
    - **Property 6: useBetaForm hook manages state transitions correctly**
    - **Validates: Requirements 14.2**
  - [ ] 17.3 Refactor BetaForm component to use useBetaForm hook
    - Remove inline state management
    - _Requirements: 14.3_
  - [ ] 17.4 Write unit tests for useBetaForm hook
    - Test validation, state transitions, submission
    - _Requirements: 14.4_

- [ ] 18. Optimize client directives
  - [ ] 18.1 Audit section components for unnecessary "use client"
    - Identify components that could be server components
    - _Requirements: 15.1_
  - [ ] 18.2 Extract interactive elements into client component islands
    - Create small client components for interactive parts
    - _Requirements: 15.2_
  - [ ] 18.3 Verify build succeeds with optimizations
    - Run next build and verify no errors
    - _Requirements: 15.3_

- [ ] 19. Implement lazy loading for below-fold content
  - [ ] 19.1 Add dynamic imports for heavy section components
    - Use next/dynamic for what-is-section, how-works-section
    - Add loading states
    - _Requirements: 16.1, 16.2_
  - [ ] 19.2 Verify Core Web Vitals are not negatively impacted
    - Run Lighthouse audit
    - _Requirements: 16.3_

- [ ] 20. Centralize content for all pages
  - [ ] 20.1 Create content/beta.ts
    - Centralize beta page content
    - _Requirements: 17.1, 17.2_
  - [ ] 20.2 Create content/about.ts
    - Centralize about page content
    - _Requirements: 17.1, 17.2_
  - [ ] 20.3 Create content/careers.ts
    - Centralize careers page content
    - _Requirements: 17.1, 17.2_
  - [ ] 20.4 Create content/product.ts
    - Centralize product page content
    - _Requirements: 17.1, 17.2_
  - [ ] 20.5 Update all pages to use centralized content
    - _Requirements: 17.3_

- [ ] 21. Add E2E tests for critical journeys
  - [ ] 21.1 Set up E2E testing framework (Playwright or Cypress)
    - Add dependencies and configuration
    - _Requirements: 18.4_
  - [ ] 21.2 Create E2E test for page navigation
    - Test navigation between main pages
    - _Requirements: 18.1_
  - [ ] 21.3 Create E2E test for beta signup flow
    - Test complete form submission
    - _Requirements: 18.2_
  - [ ] 21.4 Create E2E test for mobile menu
    - Test menu open/close and navigation
    - _Requirements: 18.3_
  - [ ] 21.5 Add E2E tests to CI pipeline
    - Update .github/workflows/ci.yml
    - _Requirements: 18.4_

- [ ] 22. Final Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.
