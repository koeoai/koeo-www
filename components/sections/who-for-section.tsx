import * as React from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AudienceTile } from "@/components/ui/audience-tile";

const AUDIENCE_TILES = [
  {
    title: "SaaS teams adding AI features",
    description:
      "Ship chat, copilots and personalization without building GPU infrastructure from scratch.",
  },
  {
    title: "AI-native startups with growing bills",
    description:
      "Keep control of your models while optimizing cost and latency across multiple providers.",
  },
  {
    title: "Agencies and consultancies",
    description:
      "Run client workloads on a shared runtime without managing separate infrastructure for each project.",
  },
  {
    title: "Internal platform teams",
    description:
      "Offer a stable inference platform to product teams without becoming a full-time GPU ops team.",
  },
];

export interface WhoForSectionProps {
  className?: string;
}

export function WhoForSection({ className }: WhoForSectionProps) {
  return (
    <Section id="who-its-for" className={cn(className)}>
      <Container>
        <SectionHeader
          heading="Built for teams turning AI into real products"
          intro="For builders who care about shipping features, not managing GPUs."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE_TILES.map((tile) => (
            <AudienceTile
              key={tile.title}
              title={tile.title}
              description={tile.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
