# Requirements Document

## Introduction

This document defines the requirements for expanding the Koeo marketing website with updated homepage content and a new Beta Program page. The expansion includes a refreshed hero section with new copy and email capture form, four new homepage sections explaining the product value proposition, and a complete Beta Program page with application form. All components follow the existing design system and brand guidelines.

## Glossary

- **Koeo**: The startup brand name, an AI inference-first platform that unifies GPU infrastructure
- **Hero Section**: The prominent top section containing the main value proposition and primary CTAs
- **Eyebrow Badge**: A small label above the main headline indicating status (e.g., "Closed Beta")
- **CTA (Call-to-Action)**: Interactive elements prompting users to take action
- **Beta Program**: Early access program for teams to use Koeo before general availability
- **Email Capture Form**: Form component collecting user email for beta access requests
- **Section Component**: Reusable page section with consistent styling and layout
- **Feature Card**: Card component displaying a feature title and description
- **Application Form**: Multi-field form for beta program applications

## Requirements

### Requirement 1: Updated Hero Section

**User Story:** As a visitor, I want to see a clear, compelling hero section, so that I immediately understand what Koeo does and how to get access.

#### Acceptance Criteria

1. WHEN the hero section renders THEN the System SHALL display an eyebrow badge with text "Closed Beta · Infrastructure for AI"
2. WHEN the hero section renders THEN the System SHALL display the headline "Run Your AI Models Without Managing GPUs" using Primary Text color
3. WHEN the hero section renders THEN the System SHALL display the subheadline describing KOEO as a unified runtime for distributed GPU inference
4. WHEN the hero section renders THEN the System SHALL display a primary CTA button "Join the Private Beta" linking to /beta
5. WHEN the hero section renders THEN the System SHALL display a secondary ghost CTA button "Read the Whitepaper" linking to a PDF
6. WHEN the hero section renders THEN the System SHALL display an email capture form with placeholder "Enter your work email" and button "Request Access"
7. WHEN the email form renders THEN the System SHALL display microcopy "We're gradually inviting teams into the private beta."

### Requirement 2: Problem Section

**User Story:** As a visitor, I want to understand the problems Koeo solves, so that I can relate to the pain points and see the need for the solution.

#### Acceptance Criteria

1. WHEN the problem section renders THEN the System SHALL display the heading "Why AI infrastructure feels harder than it should"
2. WHEN the problem section renders THEN the System SHALL display introductory body text explaining the infrastructure complexity
3. WHEN the problem section renders THEN the System SHALL display three problem cards: "Too many moving parts", "Infrastructure steals focus", "Costs are unpredictable"
4. WHEN each problem card renders THEN the System SHALL display a title and descriptive body text

### Requirement 3: What KOEO Is Section

**User Story:** As a visitor, I want to understand what Koeo is, so that I can evaluate if it fits my needs.

#### Acceptance Criteria

1. WHEN the what-is-koeo section renders THEN the System SHALL display the heading "KOEO is a runtime layer for AI inference"
2. WHEN the what-is-koeo section renders THEN the System SHALL display body text explaining the single API integration concept
3. WHEN the what-is-koeo section renders THEN the System SHALL display three feature cards: "One API instead of many", "Federated GPU fabric", "Built-in reliability and visibility"
4. WHEN each feature card renders THEN the System SHALL display a title and descriptive body text

### Requirement 4: Who KOEO Is For Section

**User Story:** As a visitor, I want to see if Koeo is built for teams like mine, so that I can determine relevance to my use case.

#### Acceptance Criteria

1. WHEN the who-it-s-for section renders THEN the System SHALL display the heading "Built for teams turning AI into real products"
2. WHEN the who-it-s-for section renders THEN the System SHALL display an intro line about builders who care about features over GPUs
3. WHEN the who-it-s-for section renders THEN the System SHALL display four audience tiles: "SaaS teams adding AI features", "AI-native startups with growing bills", "Agencies and consultancies", "Internal platform teams"
4. WHEN each audience tile renders THEN the System SHALL display a title and descriptive body text

### Requirement 5: How KOEO Works Section

**User Story:** As a visitor, I want to understand how Koeo integrates into my stack, so that I can assess implementation effort.

#### Acceptance Criteria

1. WHEN the how-it-works section renders THEN the System SHALL display the heading "How KOEO fits into your stack"
2. WHEN the how-it-works section renders THEN the System SHALL display intro text about keeping existing clients and workflows
3. WHEN the how-it-works section renders THEN the System SHALL display three numbered steps: "Point your client at KOEO", "Choose or bring your model", "KOEO runs, routes and observes"
4. WHEN each step renders THEN the System SHALL display a step number, title, and descriptive body text

### Requirement 6: CTA Strip Section

**User Story:** As a visitor, I want a clear call-to-action after learning about Koeo, so that I can take the next step.

#### Acceptance Criteria

1. WHEN the cta section renders THEN the System SHALL display the heading "We're in closed beta and onboarding gradually"
2. WHEN the cta section renders THEN the System SHALL display body text about working with teams to harden the platform
3. WHEN the cta section renders THEN the System SHALL display a primary CTA button "Apply for Private Beta" linking to /beta
4. WHEN the cta section renders THEN the System SHALL display a secondary CTA "Talk to the team" linking to contact

### Requirement 7: Beta Program Page

**User Story:** As a visitor interested in early access, I want a dedicated beta program page, so that I can learn about the program and apply.

#### Acceptance Criteria

1. WHEN the beta page loads THEN the System SHALL display a hero with eyebrow "Private Beta · Limited spots", title "Apply for KOEO Private Beta", and subtitle
2. WHEN the beta page loads THEN the System SHALL display a "Who we're looking for" section with three criteria bullets
3. WHEN the beta page loads THEN the System SHALL display a "What you get as a beta partner" section with four benefit cards
4. WHEN the beta page loads THEN the System SHALL display a "What to expect during the beta" section with three expectation bullets
5. WHEN the beta page loads THEN the System SHALL set appropriate meta tags for SEO (title, description)

### Requirement 8: Beta Application Form

**User Story:** As a potential beta user, I want to submit an application, so that I can request access to the private beta.

#### Acceptance Criteria

1. WHEN the beta form renders THEN the System SHALL display required fields: Full name, Work email, Company or project, Your role, Describe your AI use case
2. WHEN the beta form renders THEN the System SHALL display optional fields: How are you running inference today?, Approximate monthly AI spend, What matters most right now?, Anything else we should know?
3. WHEN the priority field renders THEN the System SHALL display options: Cost, Reliability, Latency, Data residency / control, Other
4. WHEN a user submits the form with valid data THEN the System SHALL display a success message "Thanks for applying to the KOEO private beta..."
5. WHEN a user submits the form with invalid data THEN the System SHALL display appropriate validation errors
6. WHEN form fields render THEN the System SHALL display labels, placeholders, and helper text as specified in the content brief

### Requirement 9: Reusable Section Components

**User Story:** As a developer, I want reusable section components, so that I can build consistent page layouts efficiently.

#### Acceptance Criteria

1. WHEN a FeatureCard component is used THEN the System SHALL display a title and body text with consistent styling
2. WHEN an AudienceTile component is used THEN the System SHALL display a title and body text with consistent styling
3. WHEN a StepCard component is used THEN the System SHALL display a step number, title, and body text
4. WHEN a SectionHeader component is used THEN the System SHALL display a heading and optional intro text
5. WHEN components receive className prop THEN the System SHALL merge custom classes with default styling

### Requirement 10: Form Validation and Accessibility

**User Story:** As a user, I want accessible forms with clear validation, so that I can complete applications without confusion.

#### Acceptance Criteria

1. WHEN form fields render THEN the System SHALL include appropriate labels associated with inputs via htmlFor/id
2. WHEN form fields have errors THEN the System SHALL display error messages with aria-describedby linking
3. WHEN required fields are empty on submit THEN the System SHALL prevent submission and highlight errors
4. WHEN email field contains invalid format THEN the System SHALL display validation error
5. WHEN form is submitted THEN the System SHALL disable the submit button and show loading state

