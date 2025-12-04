import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

export interface BetaBenefitsSectionProps {
  className?: string;
}

const BENEFITS = [
  {
    title: "Early access to the runtime",
    description:
      "Use KOEO's unified inference layer before general availability and shape the product roadmap.",
  },
  {
    title: "Direct line to the team",
    description:
      "Get priority support and direct access to our engineering team for questions and feedback.",
  },
  {
    title: "Founding partner pricing",
    description:
      "Lock in special pricing as a founding partner that carries forward after the beta.",
  },
  {
    title: "Migration support",
    description:
      "We'll help you integrate KOEO into your stack and migrate from your current setup.",
  },
];


const BetaBenefitsSection = React.forwardRef<HTMLElement, BetaBenefitsSectionProps>(
  ({ className }, ref) => {
    return (
      <Section ref={ref} id="beta-benefits" background="gradient" className={className}>
        <Container>
          <SectionHeader
            heading="What you get as a beta partner"
            variant="light"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <FeatureCard
                key={index}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </Container>
      </Section>
    );
  }
);
BetaBenefitsSection.displayName = "BetaBenefitsSection";

export { BetaBenefitsSection };
