"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { useContent } from "@/lib/i18n";
import type { BetaPageContent } from "@/content";

export interface BetaWhoSectionProps {
  className?: string;
}

const BetaWhoSection = React.forwardRef<HTMLElement, BetaWhoSectionProps>(
  ({ className }, ref) => {
    const content = useContent<BetaPageContent>("BETA_PAGE_CONTENT");

    return (
      <Section ref={ref} id="beta-who" background="default" className={className}>
        <Container>
          <SectionHeader heading={content.whoHeading} />

          <div className="mx-auto max-w-3xl">
            <ul className="space-y-6">
              {content.criteria.map((criterion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 rounded-xl border border-purple-primary/10 bg-white/80 p-6 backdrop-blur-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-text-primary">
                      {criterion.title}
                    </h3>
                    <p className="text-base leading-relaxed text-text-primary/70">
                      {criterion.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    );
  }
);
BetaWhoSection.displayName = "BetaWhoSection";

export { BetaWhoSection };
