import * as React from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { StepCard } from "@/components/ui/step-card";

const STEPS = [
  {
    stepNumber: 1,
    title: "Point your client at KOEO",
    description:
      "Swap your existing OpenAI client or HTTP calls to use the KOEO endpoint. No SDK changes required.",
  },
  {
    stepNumber: 2,
    title: "Choose or bring your model",
    description:
      "Use pre-configured open models or register your own fine-tuned weights. KOEO handles deployment.",
  },
  {
    stepNumber: 3,
    title: "KOEO runs, routes and observes",
    description:
      "Requests are scheduled across the federated GPU fabric. You get logs, metrics and cost breakdowns automatically.",
  },
];

export interface HowWorksSectionProps {
  className?: string;
}

export function HowWorksSection({ className }: HowWorksSectionProps) {
  return (
    <Section id="how-it-works" background="gradient" className={cn(className)}>
      <Container>
        <SectionHeader
          heading="How KOEO fits into your stack"
          intro="Keep your existing clients and workflows. KOEO slots in as your inference backend."
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {STEPS.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
