import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

export interface BetaExpectationsSectionProps {
  className?: string;
}

const EXPECTATIONS = [
  {
    title: "Staged onboarding",
    description:
      "We'll start with a short call to understand your use case, then help you integrate step by step.",
  },
  {
    title: "Regular check-ins",
    description:
      "Expect brief weekly or bi-weekly syncs to gather feedback and address any issues quickly.",
  },
  {
    title: "Evolving platform",
    description:
      "The product will change based on your feedback. We'll keep you informed of updates and new features.",
  },
];


const INTRO_TEXT =
  "Here's what the beta experience looks like so you know what to expect.";

const BetaExpectationsSection = React.forwardRef<
  HTMLElement,
  BetaExpectationsSectionProps
>(({ className }, ref) => {
  return (
    <Section ref={ref} id="beta-expectations" background="default" className={className}>
      <Container>
        <SectionHeader heading="What to expect during the beta" intro={INTRO_TEXT} />

        <div className="mx-auto max-w-3xl">
          <ul className="space-y-6">
            {EXPECTATIONS.map((expectation, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-xl border border-purple-primary/10 bg-white/80 p-6 backdrop-blur-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-text-primary">
                    {expectation.title}
                  </h3>
                  <p className="text-base leading-relaxed text-text-primary/70">
                    {expectation.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
});
BetaExpectationsSection.displayName = "BetaExpectationsSection";

export { BetaExpectationsSection };
