"use client";

import * as React from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { PartnerForm } from "@/features/partner-signup";
import { useContent } from "@/lib/i18n";
import type { ProvidersPageContent } from "@/content";

// Icons for provider types
const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  dataCenter: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  ),
  cloud: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  infrastructure: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
};

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
}

function FaqItem({ question, answer, index }: FaqItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="animate-fade-in-up rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-pink-light transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <p className="px-6 text-white/60">{answer}</p>
      </div>
    </div>
  );
}

export default function ProvidersPage() {
  const content = useContent<ProvidersPageContent>("PROVIDERS_PAGE_CONTENT");

  return (
    <PageShell className="relative overflow-hidden">
        {/* Gradient Background with Neural Network */}
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
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                {content.hero.badge}
              </div>

              <h1 className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "100ms" }}>
                {content.hero.headline}{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  {content.hero.headlineAccent}
                </span>
              </h1>
              
              <p className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                {content.hero.subtitle}
              </p>

              <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "300ms" }}>
                <button
                  onClick={() => document.getElementById("provider-cta-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 py-4 text-base font-semibold text-white shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40"
                >
                  {content.hero.primaryCta}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                >
                  {content.hero.secondaryCta}
                </button>
              </div>
            </div>
          </Container>
        </section>


        {/* Benefits Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="animate-fade-in-up mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-light">{content.sections.benefits.label}</p>
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {content.sections.benefits.heading}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {content.benefits.map((benefit, i) => (
                <div
                  key={benefit.title}
                  className="animate-fade-in-up group relative"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Gradient border effect on hover */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
                    <span className="mb-6 block font-mono text-4xl font-light text-white/20">{benefit.number}</span>
                    <h3 className="mb-4 text-xl font-semibold text-white">{benefit.title}</h3>
                    <p className="text-base leading-relaxed text-white/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Provider Types Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="animate-fade-in-up mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-light">{content.sections.types.label}</p>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {content.sections.types.heading}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-white/60">
                {content.sections.types.subtitle}
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
              {content.providerTypes.map((type, i) => (
                <div
                  key={type.title}
                  className="animate-fade-in-up group relative bg-purple-deep/50 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
                  style={{ animationDelay: `${(i + 3) * 100}ms` }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-colors group-hover:border-pink-light/30 group-hover:text-pink-light">
                      {PROVIDER_ICONS[type.iconName]}
                    </div>
                    <span className="font-mono text-sm text-white/30">{type.number}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{type.title}</h3>
                  <p className="text-base leading-relaxed text-white/60">{type.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="relative py-16">
          <Container>
            <h2 className="animate-fade-in-up mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              {content.sections.faq.heading}
            </h2>
            <p className="animate-fade-in-up mx-auto mb-12 max-w-2xl text-center text-lg text-white/60" style={{ animationDelay: "50ms" }}>
              {content.sections.faq.subtitle}
            </p>
            <div className="mx-auto max-w-3xl space-y-4">
              {content.faq.map((item, i) => (
                <FaqItem key={i} question={item.question} answer={item.answer} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Form Section */}
        <PartnerForm />
    </PageShell>
  );
}
