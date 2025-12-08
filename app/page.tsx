import { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { WhatIsSection } from "@/components/sections/what-is-section";
import { HowWorksSection } from "@/components/sections/how-works-section";

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
