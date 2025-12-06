/**
 * JSON-LD Component for Structured Data Injection
 * Renders Schema.org structured data as JSON-LD script tags
 */

/**
 * Base type for all Schema.org structured data
 * Requires @context and @type fields, allows any additional properties
 */
export interface SchemaData {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

/**
 * Type constraint for JSON-LD data - must have @context and @type
 */
type JsonLdData = {
  "@context": string;
  "@type": string;
};

export interface JsonLdProps {
  /**
   * Structured data object(s) to render as JSON-LD
   * Can be a single schema object or an array of schema objects
   * Accepts any object with @context and @type fields
   */
  data: JsonLdData | JsonLdData[];
}

/**
 * Renders structured data as a JSON-LD script tag
 * @param data - Schema.org structured data object(s)
 * @returns Script element with JSON-LD content
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Type definitions for common Schema.org types
 */

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email?: string;
  };
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}


export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface JobPostingSchema {
  "@context": "https://schema.org";
  "@type": "JobPosting";
  title: string;
  description: string;
  datePosted: string;
  hiringOrganization: {
    "@type": "Organization";
    name: string;
    sameAs?: string;
    logo?: string;
  };
  jobLocation?: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      addressLocality?: string;
      addressRegion?: string;
      addressCountry?: string;
    };
  };
  employmentType?: string | string[];
  validThrough?: string;
}
