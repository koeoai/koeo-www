"use client";

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";
import { FeatureList } from "./feature-list";
import { ArchitectureDiagram } from "./architecture-diagram";
import { useContent } from "@/lib/i18n";
import { LocaleLink } from "@/components/ui/locale-link";
import type { WhatIsSectionContent } from "@/content";

export interface WhatIsSectionProps {
  className?: string;
}

export function WhatIsSection({ className }: WhatIsSectionProps) {
  const content = useContent<WhatIsSectionContent>("WHAT_IS_CONTENT");

  return (
    <Section
      id="what-is-koeo"
      className={cn("py-24 md:py-32 !bg-gradient-to-b from-[#7C3AED] via-[#A78BFA] to-white", className)}
    >
      {/* Network background */}
      <NetworkBackground variant="light" density="sparse" />

      <Container className="relative z-10">
        <SectionHeader heading={content.heading} />

        {/* Split Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Content */}
          <div>
            <h3 className="mb-6 text-2xl font-bold leading-tight text-text-primary md:text-3xl">
              {content.subheading}
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-text-primary/70">
              {content.description}
            </p>

            {/* Feature List */}
            <FeatureList features={content.features} className="mb-10" />

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <LocaleLink href={content.cta.href}>{content.cta.text}</LocaleLink>
              </Button>
            </div>
          </div>

          {/* Right: Technical Architecture Visualization */}
          <ArchitectureDiagram />
        </div>
      </Container>
    </Section>
  );
}

// Re-export sub-components for direct access if needed
export { FeatureList } from "./feature-list";
export { ArchitectureDiagram } from "./architecture-diagram";
