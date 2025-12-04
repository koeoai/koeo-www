# Requirements Document

## Introduction

This document defines the requirements for refining the Koeo marketing website copy to better align messaging with closed beta reality. The updates ensure claims are accurate, developer-friendly language is maintained, and the beta onboarding process is clearly communicated. All changes preserve the existing component structure while updating content strings.

## Glossary

- **Koeo**: The startup brand name, an AI inference-first platform that unifies GPU infrastructure
- **Hero Section**: The prominent top section containing the main value proposition and primary CTAs
- **Eyebrow Badge**: A small label above the main headline indicating status
- **CTA (Call-to-Action)**: Interactive elements prompting users to take action
- **Closed Beta**: Current product phase where access is limited and teams are onboarded gradually
- **Federated GPU Fabric**: KOEO's distributed network of GPU resources from various sources
- **OpenAI-Compatible API**: API endpoints that follow OpenAI's interface conventions

## Requirements

### Requirement 1: Hero Section Copy Update

**User Story:** As a visitor, I want to see accurate beta messaging in the hero, so that I understand KOEO's current availability and value proposition.

#### Acceptance Criteria

1. WHEN the hero section renders THEN the System SHALL display an eyebrow badge with text "Closed Beta · Not yet generally available"
2. WHEN the hero section renders THEN the System SHALL display the headline "Run your AI models without managing GPUs"
3. WHEN the hero section renders THEN the System SHALL display the subtitle "KOEO is a unified runtime for distributed GPU inference. We handle the GPU complexity—scheduling, routing and scaling—so you can focus on shipping AI features."
4. WHEN the hero section renders THEN the System SHALL display a primary CTA button "Join the Private Beta" linking to /beta
5. WHEN the hero section renders THEN the System SHALL display a secondary ghost CTA button "Read the Whitepaper" linking to whitepaper PDF
6. WHEN the hero section renders THEN the System SHALL display microcopy "We're gradually inviting teams into the private beta."

### Requirement 2: Problem Section Copy Update

**User Story:** As a visitor, I want to understand the infrastructure challenges clearly, so that I can relate to the problems KOEO solves.

#### Acceptance Criteria

1. WHEN the problem section renders THEN the System SHALL display the section label "The Challenge"
2. WHEN the problem section renders THEN the System SHALL display the heading "Why AI infrastructure feels harder than it should"
3. WHEN the problem section renders THEN the System SHALL display intro text "Running inference at scale usually means juggling providers, managing GPU availability, and stitching together tools that weren't designed to work together."
4. WHEN the first problem card renders THEN the System SHALL display label "COMPLEXITY", title "Too many moving parts", and body "Model servers, schedulers, GPU pools and billing systems all have to be wired together and kept in sync. Every new component adds configuration, edge cases and failure modes."
5. WHEN the second problem card renders THEN the System SHALL display label "PRODUCTIVITY", title "Infrastructure steals focus", and body "Product teams lose time debugging nodes, quotas and cold starts instead of improving the experience for users. Infra work becomes the default instead of the exception."
6. WHEN the third problem card renders THEN the System SHALL display label "COST CONTROL", title "Costs are unpredictable", and body "Fragmented GPU usage, spot instances and opaque pricing make it hard to forecast spend or decide where to run each workload efficiently."

### Requirement 3: Platform Section Copy Update

**User Story:** As a visitor, I want to understand what KOEO offers with accurate claims, so that I can evaluate the platform without misleading promises.

#### Acceptance Criteria

1. WHEN the platform section renders THEN the System SHALL display the section label "The Platform"
2. WHEN the platform section renders THEN the System SHALL display the heading "AI inference, simplified"
3. WHEN the platform section renders THEN the System SHALL display the subheading "KOEO is a unified runtime for distributed GPU inference"
4. WHEN the platform section renders THEN the System SHALL display body text "Instead of wiring together providers, runtimes and custom schedulers, you integrate with a single runtime. KOEO connects your workloads to a federated pool of GPUs and applies routing, health checks and usage tracking for you."
5. WHEN the first feature bullet renders THEN the System SHALL display "One API to run your supported models across our federated GPU fabric"
6. WHEN the second feature bullet renders THEN the System SHALL display "Automatic routing, health checks and basic cost controls across different GPU tiers"
7. WHEN the third feature bullet renders THEN the System SHALL display "Built-in usage and latency metrics, with deeper observability in active development"
8. WHEN the platform section renders THEN the System SHALL display primary CTA "Join the Private Beta" linking to /beta
9. WHEN the platform section renders THEN the System SHALL display secondary CTA "Learn More" linking to /beta

### Requirement 4: Developer Section Copy Update

**User Story:** As a developer, I want to see beta-honest messaging about the developer experience, so that I have accurate expectations about onboarding.

#### Acceptance Criteria

1. WHEN the developer section renders THEN the System SHALL display heading "Built by developers, for developers"
2. WHEN the developer section renders THEN the System SHALL display subheading "Developer-first experience, even in beta"
3. WHEN the OpenAI-compatible card renders THEN the System SHALL display title "OpenAI-compatible API" and body "Once you're onboarded to the beta, you'll get OpenAI-style endpoints you can plug into existing clients and SDKs. In most cases you just update the base URL and auth, and keep the rest of your code the same."
4. WHEN the OpenAI-compatible card renders THEN the System SHALL display link "View API Docs"
5. WHEN the dashboard card renders THEN the System SHALL display title "Early-access dashboard" and body "Beta users get access to an evolving dashboard to monitor usage, latency and error rates, and to manage keys and models. We're iterating quickly here, and your feedback directly shapes what we build next."
6. WHEN the dashboard card renders THEN the System SHALL display link "Request Dashboard Access" linking to /beta

### Requirement 5: Beta Process Steps Update

**User Story:** As a potential beta user, I want to understand the actual beta onboarding process, so that I know what to expect after applying.

#### Acceptance Criteria

1. WHEN the steps section renders THEN the System SHALL display heading "How the private beta works"
2. WHEN step 1 renders THEN the System SHALL display title "Apply for access" and body "Tell us about your use case, current setup and constraints. We review applications to make sure the beta is a good fit for what you're building."
3. WHEN step 2 renders THEN the System SHALL display title "Onboarding & API keys" and body "If there's a fit, we'll onboard you, agree on initial limits and give you API keys, example requests and guidance for your first integration."
4. WHEN step 3 renders THEN the System SHALL display title "Integrate, then scale together" and body "Start routing real traffic through KOEO. We'll monitor reliability and performance with you, adjust routing policies and grow capacity as your usage increases."
5. WHEN the steps section renders THEN the System SHALL display primary CTA "Apply for Private Beta" linking to /beta
6. WHEN the steps section renders THEN the System SHALL display secondary CTA "Talk to the team" with mailto link

### Requirement 6: CTA Strip Copy Update

**User Story:** As a visitor who has read about KOEO, I want a clear closing call-to-action, so that I can take the next step.

#### Acceptance Criteria

1. WHEN the CTA strip renders THEN the System SHALL display heading "We're in closed beta and onboarding gradually"
2. WHEN the CTA strip renders THEN the System SHALL display body "We're working closely with a small group of teams to harden the runtime, scheduler and observability before opening up more broadly. If you're building AI-powered products and want simpler infrastructure, we'd love to talk."
3. WHEN the CTA strip renders THEN the System SHALL display primary CTA "Apply for Private Beta" linking to /beta
4. WHEN the CTA strip renders THEN the System SHALL display secondary CTA "Talk to the team" with mailto link
