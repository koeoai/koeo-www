import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { NetworkBackground } from "@/components/ui/network-background";
import { BetaHero } from "@/components/sections/beta-hero";
import { BetaForm } from "@/features/beta-signup";

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
    <PageShell className="relative overflow-hidden">
      {/* Gradient Background with Neural Network - same as providers page */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #2D1B4E 0%, #4C1D95 30%, #5B21B6 60%, #7C3AED 100%)"
          }}
        />
        <NetworkBackground variant="dark" density="normal" />
      </div>

      <BetaHero />
      <BetaForm />
    </PageShell>
  );
}
