import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export interface CTAStripProps {
  heading?: string;
  body?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  className?: string;
}

const DEFAULT_HEADING = "We're in closed beta and onboarding gradually";
const DEFAULT_BODY =
  "We're working closely with early teams to harden the platform before opening up. If you're building AI-powered products and want simpler infrastructure, we'd love to talk.";
const DEFAULT_PRIMARY_CTA = { text: "Apply for Private Beta", href: "/beta" };
const DEFAULT_SECONDARY_CTA = {
  text: "Talk to the team",
  href: "mailto:hello@koeo.ai",
};

export function CTAStrip({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
  className,
}: CTAStripProps) {
  return (
    <section
      id="cta"
      className={cn(
        "relative overflow-hidden bg-purple-deep py-24 md:py-32",
        className
      )}
    >
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-deep via-purple-primary/50 to-magenta/30" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-purple-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-magenta/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-light/10 blur-3xl" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 px-8 text-lg">
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-14 border border-white/20 px-8 text-lg text-white hover:bg-white/10"
            >
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
