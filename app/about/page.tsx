"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";

const PRINCIPLES = [
  {
    number: "01",
    title: "Start with the customer's problem",
    description: "We begin with a real person trying to ship a real feature. If it doesn't clearly help a customer, it's not a priority.",
  },
  {
    number: "02",
    title: "Own the outcome",
    description: "We treat customer workloads like our own. When something goes wrong, we dig in, fix it, and learn from it.",
  },
  {
    number: "03",
    title: "Reliability is the product",
    description: "Features attract people. Reliability keeps them. We design for failure so your users barely notice when it happens.",
  },
  {
    number: "04",
    title: "Simplicity wins",
    description: "Complexity is a tax. We keep it low with clear APIs, boring architecture, and obvious defaults.",
  },
  {
    number: "05",
    title: "Learn from production",
    description: "The best feedback comes from real workloads, not slide decks. We ship, observe, adjust, and repeat.",
  },
  {
    number: "06",
    title: "Talk straight",
    description: "We're honest about limits, tradeoffs, and pricing. No buzzword fog, just clear language.",
  },
  {
    number: "07",
    title: "Build for the long game",
    description: "We want Koeo to be infrastructure teams rely on for years. Shortcuts that damage trust aren't worth it.",
  },
  {
    number: "08",
    title: "Move fast, carefully",
    description: "Speed matters. We bias toward action, but anything touching reliability or security gets extra care.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 overflow-hidden">
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
                About Koeo
              </div>

              {/* Mission Statement - Big and Bold */}
              <h1 className="animate-fade-in-up mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                Make it{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  effortless
                </span>
                <br />
                to run real AI
                <br />
                in the real world.
              </h1>

              {/* Subtext */}
              <p className="animate-fade-in-up mx-auto max-w-2xl text-lg text-white/70 sm:text-xl" style={{ animationDelay: "200ms" }}>
                We started Koeo after seeing too many teams stuck between a cool demo and a reliable product. Our mission is to take the painful parts of AI infrastructure off your plate so you can focus on your customers, not your clusters.
              </p>
            </div>
          </Container>
        </section>

        {/* Vision Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="animate-fade-in-up mb-6">
                <span className="text-sm font-medium uppercase tracking-widest text-pink-light">Our Vision</span>
              </div>
              
              <h2 className="animate-fade-in-up mb-8 text-3xl font-bold text-white md:text-4xl lg:text-5xl" style={{ animationDelay: "100ms" }}>
                Become the quiet runtime behind the{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  best AI products
                </span>
              </h2>
              
              <div className="animate-fade-in-up space-y-6 text-lg leading-relaxed text-white/70" style={{ animationDelay: "200ms" }}>
                <p>
                  We believe every serious AI team should be able to own its models without having to rebuild GPU infrastructure from scratch.
                </p>
                <p>
                  Capacity may come from many places, but it should feel like one trusted fabric: fast, reliable, and fair.
                </p>
                <p className="text-xl font-medium text-white/90">
                  If we do our job right, Koeo fades into the background and your product is what people talk about.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Principles Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="mb-16 text-center">
              <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-pink-light">How We Work</span>
              <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Our principles
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PRINCIPLES.map((principle, i) => (
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
                Ready to build with us?
              </h2>
              <p className="animate-fade-in-up mb-10 text-lg text-white/70" style={{ animationDelay: "100ms" }}>
                Whether you&apos;re a developer looking for compute or a provider with GPU capacity, we&apos;d love to hear from you.
              </p>
              <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "200ms" }}>
                <a
                  href="/beta"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 py-4 text-base font-semibold text-white shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40"
                >
                  Apply for beta
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="/providers"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                >
                  Become a provider
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
