import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { WhatIsSection } from "@/components/sections/what-is-section";
import { HowWorksSection } from "@/components/sections/how-works-section";
import { CTAStrip } from "@/components/sections/cta-strip";

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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <WhatIsSection />
        <HowWorksSection />
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}
