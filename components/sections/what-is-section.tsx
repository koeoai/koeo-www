import * as React from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

const FEATURE_CARDS = [
  {
    title: "One API instead of many",
    description:
      "Use familiar OpenAI-style endpoints. Swap providers, models or regions without changing your code.",
  },
  {
    title: "Federated GPU fabric",
    description:
      "Mix marketplace, prosumer and datacenter GPUs into a single pool. KOEO handles scheduling, failover and cost optimization.",
  },
  {
    title: "Built-in reliability and visibility",
    description:
      "Automatic health checks, retries and metrics. Know what's running, where, and how much it costs—without extra tooling.",
  },
];

export interface WhatIsSectionProps {
  className?: string;
}

export function WhatIsSection({ className }: WhatIsSectionProps) {
  return (
    <Section id="what-is-koeo" background="gradient" className={cn(className)}>
      <Container>
        <SectionHeader
          heading="KOEO is a runtime layer for AI inference"
          intro="Integrate once, then let KOEO route requests to the best available GPU—across clouds, regions and hardware tiers."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
