/**
 * SEO Configuration Module
 * Site-wide SEO constants and configuration
 */

export interface SeoConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  twitterHandle: string;
  socialProfiles: string[];
}

export const seoConfig: SeoConfig = {
  siteName: "Koeo",
  siteUrl: "https://koeo.ai",
  defaultTitle: "Koeo | One runtime, any model, no infra headaches",
  titleTemplate: "%s | Koeo",
  defaultDescription:
    "Run your AI models without managing GPUs. We take care of the GPU mess so you can focus on building.",
  defaultKeywords: [
    "GPU infrastructure",
    "AI inference",
    "machine learning",
    "inference fabric",
    "GPU orchestration",
    "distributed GPU",
    "distributed compute",
    "AI API",
    "model serving",
    "GPU cloud",
    "inference runtime",
    "AI deployment",
    "LLM hosting",
    "OpenAI alternative",
    "GPU marketplace",
    "serverless inference",
    "inference provider",
    "GPU provider",
    "AI infrastructure",
    "model deployment",
    "GPU as a service",
    "inference API",
    "ML inference",
    "inference-as-a-service",
    "neocloud",
  ],
  defaultOgImage: "/og-image.png",
  twitterHandle: "@koeo_ai",
  socialProfiles: [
    "https://twitter.com/koeo_ai",
    "https://linkedin.com/company/koeoai",
    "https://discord.gg/koeo",
    "https://github.com/koeoai",
    "https://www.reddit.com/r/koeo/",
  ],
};
