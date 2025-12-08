import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BETA_PAGE_CONTENT, BETA_CRITERIA } from "@/content";

export interface BetaWhoSectionProps {
  className?: string;
}

const INTRO_TEXT =
  "We're looking for teams who are serious about building AI-powered products and want a better way to run inference.";

const BetaWhoSection = React.forwardRef<HTMLElement, BetaWhoSectionProps>(
  ({ className }, ref) => {
    return (
      <Section ref={ref} id="beta-who" background="default" className={className}>
        <Container>
          <SectionHeader heading={BETA_PAGE_CONTENT.whoHeading} intro={INTRO_TEXT} />

          <div className="mx-auto max-w-3xl">
            <ul className="space-y-6">
              {BETA_CRITERIA.map((criterion, index) => (
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
