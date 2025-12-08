"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { CareerForm } from "@/features/careers";
import { useContent } from "@/lib/i18n";
import type { CareersPageContent } from "@/content";

export default function CareersPage() {
  const content = useContent<CareersPageContent>("CAREERS_PAGE_CONTENT");

  return (
    <PageShell className="relative overflow-hidden">
        {/* Gradient Background with Neural Network - same as about page */}
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

              {/* Headline */}
              <h1 className="animate-fade-in-up mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                {content.hero.headline}{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  {content.hero.headlineAccent}
                </span>
              </h1>

              {/* Subtext */}
              <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                {content.hero.subtitle}
              </p>
            </div>
          </Container>
        </section>

        {/* Not Hiring Notice */}
        <section className="relative py-12">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-pink-light/30 bg-purple-deep/30 p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-white">{content.notice.title}</h2>
                    <p className="text-white/70">
                      {content.notice.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Form Section */}
        <section className="relative py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-3xl">
              {/* Header */}
              <div className="mb-12 text-center">
                <h2 className="bg-gradient-to-r from-white via-pink-light to-white bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {content.form.heading}
                </h2>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm">
                  <span className="text-lg">🔒</span>
                  {content.form.confidentialityNote}
                </div>
              </div>

              <CareerForm />
            </div>
          </Container>
        </section>
    </PageShell>
  );
}
