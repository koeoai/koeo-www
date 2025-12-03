import * as React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
}

const defaults = {
  headline: "Unify Your GPU Infrastructure",
  subheadline:
    "The runtime layer that brings fragmented GPUs together into one reliable inference fabric.",
  ctaText: "Start Building",
  ctaHref: "/get-started",
};

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      headline = defaults.headline,
      subheadline = defaults.subheadline,
      ctaText = defaults.ctaText,
      ctaHref = defaults.ctaHref,
    },
    ref
  ) => {
    return (
      <Section ref={ref} background="gradient">
        <Container className="text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              {headline}
            </h1>
            <p className="mt-6 text-lg text-text-primary/70 sm:text-xl">
              {subheadline}
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="transform transition-all duration-200 hover:scale-105 hover:opacity-90"
              >
                <a href={ctaHref}>{ctaText}</a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }
);
Hero.displayName = "Hero";

export { Hero };
