 # Implementation Plan

- [x] 1. Set up SEO infrastructure and configuration





  - [x] 1.1 Create SEO configuration module


    - Create `lib/seo/config.ts` with site-wide SEO constants
    - Define seoConfig object with siteName, siteUrl, defaultTitle, titleTemplate, defaultDescription, defaultKeywords, defaultOgImage, twitterHandle, socialProfiles
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2_

  - [x] 1.2 Create metadata generation utilities

    - Create `lib/seo/metadata.ts` with generateMetadata and validateMetadata functions
    - Implement title length validation (50-60 chars)
    - Implement description length validation (150-160 chars)
    - _Requirements: 2.1, 2.2, 2.4_
  - [x] 1.3 Write property tests for metadata validation


    - **Property 2: Metadata title length bounds**
    - **Property 3: Metadata description length bounds**
    - **Property 4: Metadata keywords non-empty**
    - **Validates: Requirements 2.1, 2.2, 2.3**


  - [x] 1.4 Create JSON-LD component





    - Create `components/seo/json-ld.tsx` for structured data injection
    - Implement type-safe props interface
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 2. Implement sitemap and robots.txt






  - [x] 2.1 Create sitemap generator

    - Create `app/sitemap.ts` using Next.js MetadataRoute.Sitemap
    - Include all public pages with lastModified, changeFrequency, priority
    - Use production domain (https://koeo.ai) for all URLs
    - _Requirements: 1.1, 1.3, 1.5_

  - [x] 2.2 Create robots.txt generator

    - Create `app/robots.ts` using Next.js MetadataRoute.Robots
    - Allow crawling of public pages, disallow /api/ routes
    - Include sitemap reference
    - _Requirements: 1.2, 1.4_
  - [x] 2.3 Write property tests for sitemap


    - **Property 1: Sitemap URL format consistency**
    - **Validates: Requirements 1.3, 8.1**

  - [x] 2.4 Write unit tests for sitemap and robots

    - Test sitemap includes all expected pages
    - Test robots.txt has correct Allow/Disallow directives
    - Test sitemap reference is present in robots.txt
    - _Requirements: 1.1, 1.2, 1.4_

- [x] 3. Checkpoint - Ensure all tests pass





  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Update root layout with enhanced metadata





  - [x] 4.1 Add metadataBase configuration


    - Update `app/layout.tsx` to include metadataBase pointing to https://koeo.ai
    - Add alternates.canonical configuration
    - _Requirements: 5.1, 2.4_


  - [x] 4.2 Expand keywords in root metadata
    - Add comprehensive keyword list from seoConfig


    - Include industry-specific terms: inference runtime, GPU orchestration, distributed compute
    - _Requirements: 2.3, 13.1_

  - [x] 4.3 Add Organization structured data to root layout
    - Inject Organization schema with name, url, logo, description, sameAs
    - Inject WebSite schema with name, url, potentialAction
    - _Requirements: 4.1, 4.2_
  - [x] 4.4 Write property test for JSON-LD validity

    - **Property 8: JSON-LD schema validity**
    - **Validates: Requirements 4.7**

- [ ] 5. Create OG image asset
  - [ ] 5.1 Add default OG image to public directory
    - Copy or create `public/og-image.png` at 1200x630 pixels
    - Use existing brand banner or create new branded image
    - _Requirements: 3.3, 3.4, 3.5_

- [ ] 6. Add metadata to client component pages
  - [ ] 6.1 Create about page layout with metadata
    - Create `app/about/layout.tsx` with page-specific metadata
    - Title: "About Us - Our Mission & Principles"
    - Description optimized for company/mission keywords
    - Add Organization schema with expanded company info
    - _Requirements: 2.1, 2.2, 4.4_
  - [ ] 6.2 Create product page layout with metadata
    - Create `app/product/layout.tsx` with page-specific metadata
    - Title: "Koeo Inference Runtime - Managed GPU API"
    - Description optimized for product keywords
    - Add SoftwareApplication schema
    - _Requirements: 2.1, 2.2, 4.3_
  - [ ] 6.3 Create providers page layout with metadata
    - Create `app/providers/layout.tsx` with page-specific metadata
    - Title: "Become a GPU Provider - Monetize Your Infrastructure"
    - Description optimized for provider/partner keywords
    - Add FAQPage schema for FAQ section
    - _Requirements: 2.1, 2.2, 4.5_
  - [ ] 6.4 Create careers page layout with metadata
    - Create `app/careers/layout.tsx` with page-specific metadata
    - Title: "Careers at Koeo - Build AI Infrastructure"
    - Description optimized for careers/jobs keywords
    - Add Organization schema
    - _Requirements: 2.1, 2.2, 4.6_
  - [ ] 6.5 Create brandkit page layout with metadata
    - Create `app/brandkit/layout.tsx` with page-specific metadata
    - Title: "Brand Kit - Koeo Logo & Assets"
    - Set noindex for brandkit page (internal resource)
    - _Requirements: 2.1, 2.2_
  - [ ] 6.6 Write property tests for page metadata
    - **Property 5: Canonical URL presence**
    - **Property 6: Open Graph completeness**
    - **Property 7: Twitter Card completeness**
    - **Validates: Requirements 2.4, 3.1, 3.2**

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Create structured data generators
  - [ ] 8.1 Create structured data utility module
    - Create `lib/seo/structured-data.ts`
    - Implement generateOrganizationSchema function
    - Implement generateWebSiteSchema function
    - Implement generateFAQPageSchema function
    - Implement generateSoftwareApplicationSchema function
    - Implement generateBreadcrumbSchema function
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 8.5_
  - [ ] 8.2 Write unit tests for structured data generators
    - Test each schema generator produces valid output
    - Test required fields are present
    - Test @context and @type are correct
    - _Requirements: 4.7_

- [ ] 9. Enhance Next.js configuration
  - [ ] 9.1 Update next.config.ts for image optimization
    - Enable AVIF and WebP image formats
    - Configure image optimization settings
    - _Requirements: 7.4, 6.5_
  - [ ] 9.2 Add security headers configuration
    - Add X-Content-Type-Options header
    - Add X-Frame-Options header
    - Consider Content-Security-Policy header
    - _Requirements: 11.2_

- [ ] 10. Audit and fix external links
  - [ ] 10.1 Update footer external links
    - Ensure all external links have rel="noopener noreferrer"
    - Review and update social links
    - _Requirements: 5.5_
  - [ ] 10.2 Update header and page external links
    - Audit all external links across components
    - Add proper rel attributes where missing
    - _Requirements: 5.5_
  - [ ] 10.3 Write property test for external link attributes
    - **Property 9: External link security attributes**
    - **Validates: Requirements 5.5**

- [ ] 11. Image SEO audit and fixes
  - [ ] 11.1 Audit image alt text across components
    - Review all img tags and Next.js Image components
    - Add descriptive alt text to content images
    - Use empty alt="" for decorative images
    - _Requirements: 7.1, 7.2_
  - [ ] 11.2 Write property test for image alt text
    - **Property 10: Image alt text presence**
    - **Validates: Requirements 7.1**

- [ ] 12. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
