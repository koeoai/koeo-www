import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BetaHero } from "@/components/sections/beta-hero";
import { BetaForm } from "@/components/sections/beta-form";

export const metadata: Metadata = {
  title: "Apply for Private Beta | KOEO",
  description:
    "Join the KOEO private beta and get early access to our unified runtime for distributed GPU inference. We're onboarding teams gradually.",
  openGraph: {
    title: "Apply for Private Beta | KOEO",
    description:
      "Join the KOEO private beta and get early access to our unified runtime for distributed GPU inference.",
    url: "https://koeo.ai/beta",
    siteName: "Koeo",
    type: "website",
  },
};

export default function BetaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#7C3AED]">
      <Header />
      <main className="flex-1">
        <BetaHero />
        <BetaForm />
      </main>
      <Footer />
    </div>
  );
}
