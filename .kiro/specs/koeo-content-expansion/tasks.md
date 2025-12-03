# Implementation Plan

- [x] 1. Create reusable content components





  - [x] 1.1 Create FeatureCard component


    - Implement card with title and description
    - Support optional icon prop
    - Support className prop for customization
    - Apply consistent styling with brand colors
    - _Requirements: 9.1_

  - [x] 1.2 Create AudienceTile component


    - Implement tile with title and description
    - Support className prop for customization
    - Apply consistent styling matching design
    - _Requirements: 9.2_

  - [x] 1.3 Create StepCard component


    - Implement card with step number, title, and description
    - Style step number with brand gradient
    - Support className prop for customization
    - _Requirements: 9.3_


  - [x] 1.4 Create SectionHeader component

    - Implement heading with optional intro text
    - Apply consistent typography (text-3xl md:text-4xl)
    - Support className prop for customization
    - _Requirements: 9.4_

  - [x] 1.5 Write property test for content components


    - **Property 1: Content components render title and description for all valid inputs**
    - **Validates: Requirements 2.4, 3.4, 4.4, 5.4**

  - [x] 1.6 Write property test for className merging


    - **Property 5: className prop merges with default classes**
    - **Validates: Requirements 9.5**

- [x] 2. Create form components and validation





  - [x] 2.1 Create validation utility functions


    - Implement validateEmail function with regex pattern
    - Implement validateRequired function
    - Implement validateMinLength function
    - Create validateForm function that runs all field validations
    - _Requirements: 10.3, 10.4_

  - [x] 2.2 Write property test for email validation


    - **Property 2: Form validation correctly identifies invalid email formats**
    - **Validates: Requirements 10.4**

  - [x] 2.3 Write property test for required field validation


    - **Property 3: Form validation prevents submission with empty required fields**
    - **Validates: Requirements 10.3, 8.5**


  - [x] 2.4 Create FormField component

    - Implement field with label, input, placeholder, helper text
    - Support types: text, email, textarea, select
    - Display error state with aria-describedby linking
    - Associate label with input via htmlFor/id
    - _Requirements: 8.6, 10.1, 10.2_


  - [x] 2.5 Write property test for label accessibility

    - **Property 4: Form fields have accessible label associations**
    - **Validates: Requirements 10.1**

  - [x] 2.6 Create EmailCapture component


    - Implement inline form with email input and submit button
    - Add placeholder and microcopy text
    - Handle form submission
    - _Requirements: 1.6, 1.7_

- [x] 3. Update Hero section






  - [x] 3.1 Update Hero component with new content

    - Add eyebrow badge "Closed Beta · Infrastructure for AI"
    - Update headline to "Run Your AI Models Without Managing GPUs"
    - Update subheadline with new copy
    - Add primary CTA "Join the Private Beta" linking to /beta
    - Add secondary ghost CTA "Read the Whitepaper"
    - Integrate EmailCapture component
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [x] 3.2 Write unit tests for updated Hero


    - Verify eyebrow badge renders
    - Verify new headline and subheadline
    - Verify both CTAs render with correct links
    - Verify email capture form renders
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 4. Create homepage sections





  - [x] 4.1 Create Problem section


    - Add section with id="problem"
    - Implement SectionHeader with heading and intro text
    - Render three FeatureCards with problem content
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 4.2 Create What Is KOEO section


    - Add section with id="what-is-koeo"
    - Implement SectionHeader with heading and body text
    - Render three FeatureCards with feature content
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 4.3 Create Who It's For section


    - Add section with id="who-its-for"
    - Implement SectionHeader with heading and intro line
    - Render four AudienceTiles with audience content
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.4 Create How It Works section


    - Add section with id="how-it-works"
    - Implement SectionHeader with heading and intro text
    - Render three StepCards with step content
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 4.5 Create CTA Strip section


    - Add section with id="cta"
    - Display heading and body text
    - Add primary CTA "Apply for Private Beta" linking to /beta
    - Add secondary CTA "Talk to the team" with mailto link
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 5. Assemble updated homepage
  - [ ] 5.1 Update homepage with all sections
    - Import and render sections in order: Hero, Problem, WhatIs, WhoFor, HowWorks, CTAStrip
    - Maintain Header and Footer from existing layout
    - _Requirements: All homepage requirements_

  - [ ] 5.2 Write unit tests for homepage sections
    - Verify all sections render in correct order
    - Verify section IDs are present for navigation
    - _Requirements: 2.1, 3.1, 4.1, 5.1, 6.1_

- [ ] 6. Checkpoint - Verify homepage implementation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Create Beta page sections
  - [ ] 7.1 Create Beta Hero section
    - Add eyebrow "Private Beta · Limited spots"
    - Add title "Apply for KOEO Private Beta"
    - Add subtitle about onboarding teams
    - _Requirements: 7.1_

  - [ ] 7.2 Create Beta Who section
    - Add section with id="beta-who"
    - Display heading "Who we're looking for"
    - Display intro text and three criteria bullets
    - _Requirements: 7.2_

  - [ ] 7.3 Create Beta Benefits section
    - Add section with id="beta-benefits"
    - Display heading "What you get as a beta partner"
    - Render four benefit cards using FeatureCard
    - _Requirements: 7.3_

  - [ ] 7.4 Create Beta Expectations section
    - Add section with id="beta-expectations"
    - Display heading "What to expect during the beta"
    - Display intro text and three expectation bullets
    - _Requirements: 7.4_

- [ ] 8. Create Beta application form
  - [ ] 8.1 Create BetaForm component
    - Implement form with all required fields: name, email, company, role, useCase
    - Implement optional fields: currentInfra, spend, priority, notes
    - Add priority field as select with options
    - Display labels, placeholders, and helper text per content brief
    - _Requirements: 8.1, 8.2, 8.3, 8.6_

  - [ ] 8.2 Implement form validation and submission
    - Validate required fields on submit
    - Validate email format
    - Show loading state during submission
    - Display success message on successful submit
    - Display validation errors for invalid fields
    - _Requirements: 8.4, 8.5, 10.3, 10.4, 10.5_

  - [ ] 8.3 Write unit tests for BetaForm
    - Verify all fields render with correct labels
    - Verify validation errors display
    - Verify success message on submit
    - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [ ] 9. Assemble Beta page
  - [ ] 9.1 Create Beta page route
    - Create app/beta/page.tsx
    - Import and render BetaHero, BetaWho, BetaBenefits, BetaExpectations, BetaForm
    - Configure page metadata (title, description)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 9.2 Write unit tests for Beta page
    - Verify all sections render
    - Verify form is present
    - Verify meta tags
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 10. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.

