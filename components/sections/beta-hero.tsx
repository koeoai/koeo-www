"use client";

import * as React from "react";
import { InteractiveNetworkCanvas } from "@/components/ui/interactive-network-canvas";
import { BETA_HERO_CONTENT, BETA_CRITERIA } from "@/content";

export interface BetaHeroProps {
  className?: string;
}

const BetaHero = React.forwardRef<HTMLElement, BetaHeroProps>(
  ({ className }, ref) => {
    return (
      <section ref={ref} className={className}>
        <InteractiveNetworkCanvas mode="interactive" className="min-h-screen">
          <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
              {/* Eyebrow Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                {BETA_HERO_CONTENT.badge}
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {BETA_HERO_CONTENT.headline}{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  {BETA_HERO_CONTENT.headlineAccent}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mb-12 max-w-2xl text-lg text-text-light/80 sm:text-xl">
                {BETA_HERO_CONTENT.subtitle}
              </p>

              {/* Who we're looking for */}
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-8 text-2xl font-semibold text-white/90 sm:text-3xl">
                  Who we&apos;re looking for
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {BETA_CRITERIA.map((criterion, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                    >
                      {/* Animated gradient border on hover */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-primary via-magenta to-pink-light opacity-20" />
                      </div>

                      {/* Number badge */}
                      <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-lg font-bold text-white shadow-lg shadow-magenta/20">
                        {index + 1}
                      </div>

                      <h3 className="relative mb-2 text-left text-base font-semibold text-white">
                        {criterion.title}
                      </h3>
                      <p className="relative text-left text-sm leading-relaxed text-white/60">
                        {criterion.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Scroll indicator */}
                <div className="mt-12 flex flex-col items-center gap-2">
                  <p className="text-sm text-white/50">{BETA_HERO_CONTENT.scrollIndicator}</p>
                  <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
                    <div className="h-2 w-1 animate-bounce rounded-full bg-pink-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#7C3AED] to-transparent" />
        </InteractiveNetworkCanvas>
      </section>
    );
  }
);
BetaHero.displayName = "BetaHero";

export { BetaHero };
