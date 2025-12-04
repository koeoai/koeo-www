"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";

const DEVELOPER_FEATURES = [
  {
    title: "OpenAI-Compatible API",
    description:
      "Use familiar endpoints and SDKs. Drop in KOEO as your inference backend with zero code changes to your application.",
    link: { text: "View API Docs", href: "/docs/api" },
  },
  {
    title: "Self-Serve Dashboard",
    description:
      "Monitor usage, manage models, and control costs from a single dashboard. No sales calls required to get started.",
    link: { text: "Try the Dashboard", href: "/beta" },
  },
];

const STEPS = [
  {
    stepNumber: 1,
    title: "Sign Up & Get Your API Key",
    description:
      "Create an account and get your API key in seconds. No credit card required to start.",
  },
  {
    stepNumber: 2,
    title: "Point Your Client at KOEO",
    description:
      "Swap your base URL to KOEO's endpoint. Works with any OpenAI-compatible SDK or HTTP client.",
  },
  {
    stepNumber: 3,
    title: "Deploy & Scale",
    description:
      "Run inference instantly across our federated GPU fabric. Pay only for what you use.",
  },
];

export interface HowWorksSectionProps {
  className?: string;
}

export function HowWorksSection({ className }: HowWorksSectionProps) {
  return (
    <section id="how-it-works" className={cn("relative", className)}>
      {/* Single continuous gradient background for entire section */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C4B5FD] via-30% to-[#4C1D95]" />
      
      {/* Dark Top Section */}
      <div className="relative overflow-hidden pb-40 pt-24 md:pb-48 md:pt-32">
        {/* Network background */}
        <NetworkBackground variant="light" density="sparse" className="opacity-50" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left: Headline */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
                Built by Developers,
                <br />
                <span className="bg-gradient-to-r from-purple-primary to-magenta bg-clip-text text-transparent">for Developers</span>
              </h2>
              <p className="mt-4 text-base text-text-primary/60">
                Self-serve from day one
              </p>
            </div>

            {/* Right: Feature Columns */}
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
              {DEVELOPER_FEATURES.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="group relative rounded-2xl border border-purple-primary/10 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-primary/30 hover:bg-white/80 hover:shadow-lg"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-primary/10 to-magenta/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative">
                    {/* Checkmark icon */}
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta shadow-md">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-text-primary/70">
                      {feature.description}
                    </p>
                    <Link
                      href={feature.link.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-primary transition-colors hover:text-magenta"
                    >
                      {feature.link.text}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* White Card Overlay */}
      <div className="relative z-20 -mt-24 pb-24 md:-mt-32 md:pb-32">
        {/* Network background */}
        <NetworkBackground variant="dark" density="sparse" />
        
        <Container className="relative">
          {/* Card glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-primary/20 via-magenta/10 to-pink-light/20 blur-2xl" />
          
          <div className="relative rounded-3xl border border-white/10 bg-white p-8 shadow-2xl md:p-12">
            {/* Card Header */}
            <h3 className="mb-10 text-2xl font-bold text-text-primary md:text-3xl">
              Get Started in <span className="bg-gradient-to-r from-purple-primary to-magenta bg-clip-text italic text-transparent">Minutes</span>
            </h3>

            {/* Steps */}
            <div className="mb-10 space-y-8">
              {STEPS.map((step, index) => (
                <div key={step.stepNumber} className="group flex gap-6">
                  {/* Step Number with gradient */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-base font-bold text-white shadow-lg shadow-purple-primary/30 transition-transform group-hover:scale-110">
                    {step.stepNumber}
                  </div>
                  {/* Step Content */}
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-text-primary">
                      {step.title}
                    </h4>
                    <p className="text-base text-text-primary/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/beta">Start Building</Link>
              </Button>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 text-base font-medium text-text-primary transition-colors hover:text-purple-primary"
              >
                Docs
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
