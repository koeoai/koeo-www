import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { BETA_PAGE_CONTENT } from "@/content";

export interface BetaBenefitsSectionProps {
  className?: string;
}


const BetaBenefitsSection = React.forwardRef<HTMLElement, BetaBenefitsSectionProps>(
  ({ className }, ref) => {
    return (
      <Section ref={ref} id="beta-benefits" background="gradient" className={className}>
        <Container>
          <SectionHeader
            heading={BETA_PAGE_CONTENT.benefits.heading}
            variant="light"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {BETA_PAGE_CONTENT.benefits.items.map((benefit, index) => (
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
