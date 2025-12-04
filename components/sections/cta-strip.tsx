"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";

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
        "relative overflow-hidden py-24 md:py-32",
        className
      )}
    >
      {/* Solid background - matches how-works end and footer */}
      <div className="absolute inset-0 bg-[#4C1D95]" />
      
      {/* Network background */}
      <NetworkBackground variant="dark" density="dense" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 px-8 text-lg shadow-lg shadow-purple-primary/30 transition-all hover:shadow-xl hover:shadow-magenta/30">
              <Link href={primaryCta.href}>{primaryCta.text}</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-14 border border-white/20 px-8 text-lg text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
