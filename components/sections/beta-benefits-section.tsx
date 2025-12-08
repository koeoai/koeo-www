"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { useContent } from "@/lib/i18n";
import type { BetaPageContent } from "@/content";

export interface BetaBenefitsSectionProps {
  className?: string;
}


const BetaBenefitsSection = React.forwardRef<HTMLElement, BetaBenefitsSectionProps>(
  ({ className }, ref) => {
    const content = useContent<BetaPageContent>("BETA_PAGE_CONTENT");

    return (
      <Section ref={ref} id="beta-benefits" background="gradient" className={className}>
        <Container>
          <SectionHeader
            heading={content.benefits.heading}
            variant="light"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {content.benefits.items.map((benefit, index) => (
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
