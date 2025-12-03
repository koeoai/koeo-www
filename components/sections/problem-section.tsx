import * as React from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

const PROBLEM_CARDS = [
  {
    title: "Too many moving parts",
    description:
      "Model servers, schedulers, GPU pools and billing systems all need to be wired together. Each piece adds complexity and failure modes.",
  },
  {
    title: "Infrastructure steals focus",
    description:
      "Product teams lose time debugging nodes, quotas and cold starts instead of shipping features that matter to users.",
  },
  {
    title: "Costs are unpredictable",
    description:
      "Fragmented GPU usage, spot instances and opaque pricing make it hard to forecast spend or optimize for efficiency.",
  },
];

export interface ProblemSectionProps {
  className?: string;
}

export function ProblemSection({ className }: ProblemSectionProps) {
  return (
    <Section id="problem" className={cn(className)}>
      <Container>
        <SectionHeader
          heading="Why AI infrastructure feels harder than it should"
          intro="Running inference at scale means juggling providers, managing GPU availability, and stitching together tools that weren't designed to work together."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PROBLEM_CARDS.map((card) => (
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
