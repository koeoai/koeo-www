/**
 * Product page content - centralized marketing copy for the product page.
 */

/**
 * Product hero section content
 */
export interface ProductHeroContent {
  badge: string;
  headline: string;
  tagline: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: string;
}

/**
 * What Koeo is section content
 */
export interface ProductWhatIsContent {
  label: string;
  heading: string;
  description: string;
  points: string[];
}

/**
 * Who it's for item
 */
export interface ProductWhoForItem {
  title: string;
  description: string;
  iconName: string;
}

/**
 * Who it's for section content
 */
export interface ProductWhoForContent {
  label: string;
  heading: string;
  subtitle: string;
  items: ProductWhoForItem[];
}

/**
 * Why Koeo feature item
 */
export interface ProductWhyFeature {
  number: string;
  title: string;
  subtitle: string;
  points: string[];
  footer: string;
}

/**
 * Why Koeo section content
 */
export interface ProductWhyContent {
  label: string;
  heading: string;
  features: ProductWhyFeature[];
}

/**
 * How it works step
 */
export interface ProductHowStep {
  step: number;
  title: string;
  description: string;
}

/**
 * How it works section content
 */
export interface ProductHowContent {
  label: string;
  heading: string;
  steps: ProductHowStep[];
}

/**
 * CTA section content
 */
export interface ProductCtaContent {
  headline: string;
  subtitle: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

/**
 * Complete product page content structure
 */
export interface ProductPageContent {
  hero: ProductHeroContent;
  whatIs: ProductWhatIsContent;
  whoFor: ProductWhoForContent;
  why: ProductWhyContent;
  how: ProductHowContent;
  cta: ProductCtaContent;
}

/**
 * Product hero content
 */
export const PRODUCT_HERO_CONTENT: ProductHeroContent = {
  badge: "Beta",
  headline: "Koeo inference runtime",
  tagline: "If you know the OpenAI API, you already know Koeo.",
  subtitle: "A managed inference runtime that turns your models into reliable APIs. Same client libraries, just point to a different endpoint.",
  primaryCta: {
    text: "Join the Beta",
    href: "/beta",
  },
  secondaryCta: "See how it works",
};

/**
 * What Koeo is content
 */
export const PRODUCT_WHAT_IS_CONTENT: ProductWhatIsContent = {
  label: "What KOEO is",
  heading: "An inference-first runtime for AI applications",
  description: "Think of it as serverless, but only for model inference:",
  points: [
    "Send requests. Get responses. That's it.",
    "No VMs to provision, no drivers to install.",
    "Capacity scales with your traffic automatically.",
    "You stay focused on prompts and product.",
  ],
};

/**
 * Who it's for content
 */
export const PRODUCT_WHO_FOR_CONTENT: ProductWhoForContent = {
  label: "Who it's for",
  heading: "Built for teams shipping AI",
  subtitle: "If you already know how to call the OpenAI API, you are in the right place.",
  items: [
    {
      title: "AI Startups",
      description: "Ship features, not infrastructure. Stop spinning up GPU boxes for every new capability.",
      iconName: "rocket",
    },
    {
      title: "Product & Platform Teams",
      description: "Add AI to your product with a predictable API, not a sidecar VM you have to babysit.",
      iconName: "users",
    },
    {
      title: "ML Teams & Consultants",
      description: "Your model works. Now serve it to real users without building a deployment pipeline.",
      iconName: "flask",
    },
  ],
};

/**
 * Why Koeo content
 */
export const PRODUCT_WHY_CONTENT: ProductWhyContent = {
  label: "Why KOEO",
  heading: "Why teams use Koeo instead of raw GPUs",
  features: [
    {
      number: "01",
      title: "Runtime, not raw hardware",
      subtitle: "GPU clouds rent you machines. Koeo gives you inference as a service.",
      points: [
        "No VM setup or driver management",
        "No custom routing or queueing to build",
        "Built-in health checks and failover",
      ],
      footer: "We handle the infrastructure. You handle the product.",
    },
    {
      number: "02",
      title: "Resilient by default",
      subtitle: "The runtime monitors GPU health and routes around problems automatically.",
      points: [
        "Unhealthy nodes get bypassed instantly",
        "Load spikes don't take down your app",
        "Swap hardware or providers without code changes",
      ],
      footer: "Your users see consistent responses. You see a single endpoint.",
    },
    {
      number: "03",
      title: "Zero migration friction",
      subtitle: "Already using OpenAI? Change two lines and you're on Koeo.",
      points: [
        "Same client libraries you already use",
        "Same request and response shapes",
        "Run both in parallel while you evaluate",
      ],
      footer: "No SDK to learn. No multi-week migration. Just swap the base URL.",
    },
  ],
};

/**
 * How it works content
 */
export const PRODUCT_HOW_CONTENT: ProductHowContent = {
  label: "How it works",
  heading: "From signup to production in minutes",
  steps: [
    {
      step: 1,
      title: "Get an API key",
      description: "Sign up and generate a key in the console. Takes about 30 seconds.",
    },
    {
      step: 2,
      title: "Swap your base URL",
      description: "Point your existing OpenAI client to Koeo. Two lines of code.",
    },
    {
      step: 3,
      title: "Send requests",
      description: "The runtime handles authentication, routing, and failover. You just get responses.",
    },
    {
      step: 4,
      title: "Monitor in the console",
      description: "Track usage, latency, and errors. Know when something needs attention.",
    },
  ],
};

/**
 * CTA section content
 */
export const PRODUCT_CTA_CONTENT: ProductCtaContent = {
  headline: "Get your API key in 30 seconds",
  subtitle: "Join the beta and see how it feels. No commitment, no credit card required.",
  primaryCta: {
    text: "Join the Beta",
    href: "/beta",
  },
  secondaryCta: {
    text: "Become a Provider",
    href: "/providers",
  },
};

/**
 * Complete product page content
 */
export const PRODUCT_PAGE_CONTENT: ProductPageContent = {
  hero: PRODUCT_HERO_CONTENT,
  whatIs: PRODUCT_WHAT_IS_CONTENT,
  whoFor: PRODUCT_WHO_FOR_CONTENT,
  why: PRODUCT_WHY_CONTENT,
  how: PRODUCT_HOW_CONTENT,
  cta: PRODUCT_CTA_CONTENT,
};
