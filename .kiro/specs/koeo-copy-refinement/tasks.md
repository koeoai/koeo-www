# Implementation Plan

- [x] 1. Update Hero section copy





  - [x] 1.1 Update Hero component content


    - Update eyebrow badge to "Closed Beta · Not yet generally available"
    - Update headline to "Run your AI models without managing GPUs"
    - Update subtitle with new copy about unified runtime
    - Update primary CTA to "Join the Private Beta"
    - Update secondary CTA to "Read the Whitepaper"
    - Add/update microcopy "We're gradually inviting teams into the private beta."
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x] 1.2 Write unit tests for Hero content


    - Verify eyebrow badge text renders
    - Verify headline and subtitle text
    - Verify CTA button text and links
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 2. Update Problem section copy





  - [x] 2.1 Update Problem section content


    - Update intro text with "usually means" phrasing
    - Update first card description with "wired together and kept in sync" copy
    - Update second card description with "improving the experience for users" copy
    - Update third card description with "decide where to run each workload" copy
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 2.2 Write unit tests for Problem section content


    - Verify section label and heading
    - Verify intro paragraph text
    - Verify each card's content
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 3. Update Platform section copy





  - [x] 3.1 Update What Is section content


    - Update body paragraph with new "single runtime" copy
    - Update first bullet to "One API to run your supported models across our federated GPU fabric"
    - Update second bullet to "Automatic routing, health checks and basic cost controls across different GPU tiers"
    - Update third bullet to "Built-in usage and latency metrics, with deeper observability in active development"
    - Update primary CTA to "Join the Private Beta" linking to /beta
    - Update secondary CTA to "Learn More" linking to /beta
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_


  - [x] 3.2 Write unit tests for Platform section content

    - Verify section label and headings
    - Verify body paragraph text
    - Verify each feature bullet text
    - Verify CTA text and links
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

- [x] 4. Update Developer section copy





  - [x] 4.1 Update How Works section developer features


    - Update section subheading to "Developer-first experience, even in beta"
    - Update OpenAI-compatible card title and description with beta-honest copy
    - Update dashboard card to "Early-access dashboard" with new description
    - Update dashboard card link to "Request Dashboard Access" linking to /beta
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 4.2 Update How Works section steps

    - Update steps heading to "How the private beta works"
    - Update step 1 to "Apply for access" with new description
    - Update step 2 to "Onboarding & API keys" with new description
    - Update step 3 to "Integrate, then scale together" with new description
    - Update primary CTA to "Apply for Private Beta" linking to /beta
    - Update secondary CTA to "Talk to the team" with mailto link
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 4.3 Write unit tests for Developer section content


    - Verify heading and subheading text
    - Verify OpenAI-compatible card content
    - Verify dashboard card content and link
    - Verify steps heading and each step's content
    - Verify CTA text and links
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 5. Update CTA Strip copy
  - [ ] 5.1 Update CTA Strip content
    - Update body text with "small group of teams" and "runtime, scheduler and observability" copy
    - Verify primary CTA is "Apply for Private Beta" linking to /beta
    - Verify secondary CTA is "Talk to the team" with mailto link
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 5.2 Write unit tests for CTA Strip content
    - Verify heading text
    - Verify body text
    - Verify CTA text and links
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 6. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.
