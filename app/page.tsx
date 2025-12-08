import { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

// Lazy load below-fold section components for better initial page load
// Requirements: 16.1, 16.2
const WhatIsSection = dynamic(
  () => import("@/components/sections/what-is-section").then((mod) => ({ default: mod.WhatIsSection })),
  {
    loading: () => <SectionSkeleton variant="gradient" />,
    ssr: true, // Keep SSR for SEO
  }
);

const HowWorksSection = dynamic(
  () => import("@/components/sections/how-works-section").then((mod) => ({ default: mod.HowWorksSection })),
  {
    loading: () => <SectionSkeleton variant="light" />,
    ssr: true, // Keep SSR for SEO
  }
);

export const metadata: Metadata = {
  title: "Koeo - Unify Your GPU Infrastructure",
  description:
    "The runtime layer that brings fragmented GPUs together into one reliable inference fabric. Build faster, scale smarter with Koeo.",
  openGraph: {
    title: "Koeo - Unify Your GPU Infrastructure",
    description:
      "The runtime layer that brings fragmented GPUs together into one reliable inference fabric.",
    url: "https://koeo.ai",
    siteName: "Koeo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koeo - Unify Your GPU Infrastructure",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koeo - Unify Your GPU Infrastructure",
    description:
      "The runtime layer that brings fragmented GPUs together into one reliable inference fabric.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <ProblemSection />
      <WhatIsSection />
      <HowWorksSection />
    </PageShell>
  );
}
