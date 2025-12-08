import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
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
    <PageShell rootClassName="bg-[#7C3AED]">
      <BetaHero />
      <BetaForm />
    </PageShell>
  );
}
