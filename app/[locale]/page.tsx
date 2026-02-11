import { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

// Lazy load below-fold section components for better initial page load
// Requirements: 16.1, 16.2
const WhatIsSection = dynamic(
  () => import("@/components/sections/what-is").then((mod) => ({ default: mod.WhatIsSection })),
  {
    loading: () => <SectionSkeleton variant="gradient" />,
    ssr: true, // Keep SSR for SEO
  }
);

const ComparisonSection = dynamic(
  () => import("@/components/sections/comparison-section").then((mod) => ({ default: mod.ComparisonSection })),
  {
    loading: () => <SectionSkeleton variant="light" />,
    ssr: true, // Keep SSR for SEO
  }
);

const HowWorksSection = dynamic(
  () => import("@/components/sections/how-works").then((mod) => ({ default: mod.HowWorksSection })),
  {
    loading: () => <SectionSkeleton variant="howworks" />,
    ssr: true, // Keep SSR for SEO
  }
);

export const metadata: Metadata = {
  title: "Koeo | AI Inference Fabric",
  description:
    "Serverless AI inference with an OpenAI compatible API. One endpoint for your models with built-in routing, health checks, and usage tracking.",
  openGraph: {
    title: "Koeo | AI Inference Fabric",
    description:
      "Serverless AI inference with an OpenAI compatible API. One endpoint for your models with built-in routing, health checks, and usage tracking.",
    url: "https://koeo.ai",
    siteName: "Koeo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koeo | AI Inference Fabric",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koeo | AI Inference Fabric",
    description:
      "Serverless AI inference with an OpenAI compatible API. One endpoint for your models with built-in routing, health checks, and usage tracking.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <WhatIsSection />
      <ComparisonSection />
      <ProblemSection />
      <HowWorksSection />
    </PageShell>
  );
}
