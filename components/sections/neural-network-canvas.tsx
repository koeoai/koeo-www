"use client";

import * as React from "react";
import { InteractiveNetworkCanvas } from "@/components/ui/interactive-network-canvas";
import { useContent } from "@/lib/i18n";
import { LocaleLink } from "@/components/ui/locale-link";
import type { HeroContent } from "@/content";

interface NeuralNetworkCanvasProps {
  className?: string;
}

export function NeuralNetworkCanvas({ className }: NeuralNetworkCanvasProps) {
  const content = useContent<HeroContent>("HERO_CONTENT");

  return (
    <InteractiveNetworkCanvas mode="interactive" className={`min-h-screen ${className ?? ""}`}>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
            </span>
            {content.badge}
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.headline}{" "}
            <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
              {content.headlineAccent}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-light/80 sm:text-xl">
            {content.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LocaleLink
              href={content.cta.primary.href}
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 font-semibold text-white transition-all hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              {content.cta.primary.text}
            </LocaleLink>
            <LocaleLink
              href={content.cta.secondary.href}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              {content.cta.secondary.text}
            </LocaleLink>
          </div>

          {/* Microcopy */}
          <p className="mt-6 text-sm text-text-light/60">
            {content.microcopy}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#7C3AED] to-transparent" />
    </InteractiveNetworkCanvas>
  );
}
