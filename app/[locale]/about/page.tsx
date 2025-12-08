"use client";

import * as React from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { useContent } from "@/lib/i18n";
import type { AboutPageContent } from "@/content";

export default function AboutPage() {
  const content = useContent<AboutPageContent>("ABOUT_PAGE_CONTENT");

  return (
    <PageShell className="relative overflow-hidden">
        {/* Gradient Background with Neural Network - same as providers */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #2D1B4E 0%, #4C1D95 30%, #5B21B6 60%, #7C3AED 100%)"
            }}
          />
          <NetworkBackground variant="dark" density="normal" />
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                {content.hero.badge}
              </div>

              {/* Mission Statement - Big and Bold */}
              <h1 className="animate-fade-in-up mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                {content.hero.headline}{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  {content.hero.headlineAccent}
                </span>
                <br />
                to run real AI
                <br />
                in the real world.
              </h1>

              {/* Subtext */}
              <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                {content.hero.subtitle}
              </p>
            </div>
          </Container>
        </section>

        {/* Vision Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="animate-fade-in-up mb-6">
                <span className="text-sm font-medium uppercase tracking-widest text-pink-light">{content.vision.label}</span>
              </div>
              
              <h2 className="animate-fade-in-up mb-8 text-3xl font-bold text-white md:text-4xl lg:text-5xl" style={{ animationDelay: "100ms" }}>
                {content.vision.headline}{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  {content.vision.headlineAccent}
                </span>
              </h2>
              
              <div className="animate-fade-in-up space-y-6 text-lg leading-relaxed text-white/70" style={{ animationDelay: "200ms" }}>
                {content.vision.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <p className="text-xl font-medium text-white/90">
                  {content.vision.highlight}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Principles Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="mb-16 text-center">
              <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-pink-light">{content.principles.label}</span>
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {content.principles.heading}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.principles.items.map((principle, i) => (
                <div
                  key={principle.number}
                  className="animate-fade-in-up group relative"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-pink-light/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-light/30 group-hover:bg-white/[0.06]">
                    <span className="mb-4 block font-mono text-3xl font-light text-pink-light/40 transition-colors group-hover:text-pink-light/60">
                      {principle.number}
                    </span>
                    <h3 className="mb-3 text-lg font-semibold text-white">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="animate-fade-in-up mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {content.cta.headline}
              </h2>
              <p className="animate-fade-in-up mb-10 text-lg text-white/70" style={{ animationDelay: "100ms" }}>
                {content.cta.subtitle}
              </p>
              <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "200ms" }}>
                <a
                  href={content.cta.primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 py-4 text-base font-semibold text-white shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40"
                >
                  {content.cta.primaryCta.text}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href={content.cta.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                >
                  {content.cta.secondaryCta.text}
                </a>
              </div>
            </div>
          </Container>
        </section>
    </PageShell>
  );
}
