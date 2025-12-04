"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { KoeoLogo } from "@/components/ui/KoeoLogo";

const BENEFITS = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Monetize idle GPUs",
    description: "Turn unused compute into revenue. Get paid for capacity you're not using.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Zero customer acquisition",
    description: "We bring the workloads. You provide the compute. No sales or marketing needed.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Simple integration",
    description: "Lightweight agent connects your hardware to our fabric. We handle the rest.",
  },
];

const PROVIDER_TYPES = [
  {
    title: "Data Centers",
    description: "Large-scale GPU clusters looking for consistent utilization",
    icon: "🏢",
  },
  {
    title: "Cloud Providers",
    description: "Regional providers wanting to expand their reach",
    icon: "☁️",
  },
  {
    title: "Community Partners",
    description: "Individuals or small teams with spare GPU capacity",
    icon: "🤝",
  },
];

export default function ProvidersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 overflow-hidden">
        {/* Gradient Background */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #2D1B4E 0%, #4C1D95 30%, #5B21B6 60%, #7C3AED 100%)"
            }}
          />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-magenta/20 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-80 w-80 animate-pulse rounded-full bg-purple-primary/30 blur-3xl" style={{ animationDelay: "1s" }} />
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="animate-float">
                  <KoeoLogo size={48} variant="white" showWordmark={false} />
                </div>
              </div>
              
              <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                Now accepting partners
              </div>

              <h1 className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "100ms" }}>
                Become a{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  GPU Provider
                </span>
              </h1>
              
              <p className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                Join our federated GPU network. Contribute compute capacity and earn revenue while helping developers build AI products.
              </p>

              <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "300ms" }}>
                <a
                  href="mailto:partners@koeo.ai?subject=GPU Provider Interest"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 py-4 text-base font-semibold text-white shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40"
                >
                  Get in touch
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="mailto:hello@koeo.ai"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                >
                  Ask a question
                </a>
              </div>
            </div>
          </Container>
        </section>


        {/* Benefits Section */}
        <section className="relative py-16">
          <Container>
            <h2 className="animate-fade-in-up mb-12 text-center text-3xl font-bold text-white md:text-4xl">
              Why partner with Koeo?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {BENEFITS.map((benefit, i) => (
                <div
                  key={benefit.title}
                  className="animate-fade-in-up group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-primary to-magenta text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-white/60">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Provider Types Section */}
        <section className="relative py-16">
          <Container>
            <h2 className="animate-fade-in-up mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Who we&apos;re looking for
            </h2>
            <p className="animate-fade-in-up mx-auto mb-12 max-w-2xl text-center text-lg text-white/60" style={{ animationDelay: "50ms" }}>
              Whether you have a rack of GPUs or a single machine, we&apos;d love to hear from you.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {PROVIDER_TYPES.map((type, i) => (
                <div
                  key={type.title}
                  className="animate-fade-in-up group rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                  style={{ animationDelay: `${(i + 3) * 100}ms` }}
                >
                  <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                    {type.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{type.title}</h3>
                  <p className="text-white/60">{type.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 pb-24">
          <Container>
            <div className="animate-fade-in-up mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Ready to join the network?
              </h2>
              <p className="mb-8 text-white/60">
                We&apos;re building something new and looking for partners who want to shape the future of GPU infrastructure together.
              </p>
              <a
                href="mailto:partners@koeo.ai?subject=GPU Provider Interest"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 py-4 text-base font-semibold text-white shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40"
              >
                Contact us at partners@koeo.ai
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
