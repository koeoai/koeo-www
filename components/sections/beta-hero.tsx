"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { useContent } from "@/lib/i18n";
import type { BetaPageContent } from "@/content";

export interface BetaHeroProps {
  className?: string;
}

const BetaHero = React.forwardRef<HTMLElement, BetaHeroProps>(
  ({ className }, ref) => {
    const content = useContent<BetaPageContent>("BETA_PAGE_CONTENT");

    return (
      <section ref={ref} className={className}>
        {/* Hero Content */}
        <div className="relative py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              {/* Eyebrow Badge */}
              <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                {content.hero.badge}
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                {content.hero.headline}{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  {content.hero.headlineAccent}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="animate-fade-in-up mx-auto mb-12 max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                {content.hero.subtitle}
              </p>

              {/* Who we're looking for */}
              <div className="mx-auto max-w-3xl">
                <h2 className="animate-fade-in-up mb-8 text-2xl font-semibold text-white/90 sm:text-3xl" style={{ animationDelay: "300ms" }}>
                  {content.whoHeading}
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {content.criteria.map((criterion, index) => (
                    <div
                      key={index}
                      className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/[0.06]"
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-pink-light/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
                <div className="animate-fade-in-up mt-12 flex flex-col items-center gap-2" style={{ animationDelay: "700ms" }}>
                  <p className="text-sm text-white/50">{content.hero.scrollIndicator}</p>
                  <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
                    <div className="h-2 w-1 animate-bounce rounded-full bg-pink-light" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }
);
BetaHero.displayName = "BetaHero";

export { BetaHero };
