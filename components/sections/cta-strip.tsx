import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
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
    <Section id="cta" background="dark" className={cn(className)}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-text-light md:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-light/80">
            {body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-text-light hover:bg-white/10">
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
