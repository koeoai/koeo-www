"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import type { StepItem } from "@/content";

export interface BetaStepsProps {
  stepsHeading: string;
  steps: StepItem[];
  cta: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
  className?: string;
}

export function BetaSteps({ stepsHeading, steps, cta, className }: BetaStepsProps) {
  return (
    <div className={cn("relative rounded-3xl border border-white/10 bg-white p-8 shadow-2xl md:p-12", className)}>
      {/* Card Header */}
      <h3 className="mb-10 text-2xl font-bold text-text-primary md:text-3xl">
        {stepsHeading}
      </h3>

      {/* Steps */}
      <div className="mb-10 space-y-8">
        {steps.map((step) => (
          <div key={step.stepNumber} className="group flex gap-6">
            {/* Step Number with gradient */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-base font-bold text-white shadow-lg shadow-purple-primary/30 transition-transform group-hover:scale-110">
              {step.stepNumber}
            </div>
            {/* Step Content */}
            <div>
              <h4 className="mb-1 text-lg font-bold text-text-primary">
                {step.title}
              </h4>
              <p className="text-base text-text-primary/70">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <LocaleLink href={cta.primary.href}>{cta.primary.text}</LocaleLink>
        </Button>
        <LocaleLink
          href={cta.secondary.href}
          className="inline-flex items-center gap-2 text-base font-medium text-text-primary transition-colors hover:text-purple-primary"
        >
          {cta.secondary.text}
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </LocaleLink>
      </div>
    </div>
  );
}
