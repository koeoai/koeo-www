import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

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
      {/* Dark Top Section */}
      <div className="relative overflow-hidden bg-purple-deep pb-40 pt-24 md:pb-48 md:pt-32">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-deep via-purple-deep to-purple-primary/50" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-magenta/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-purple-primary/30 blur-3xl" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left: Headline */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Built by Developers,
                <br />
                <span className="text-pink-light">for Developers</span>
              </h2>
              <p className="mt-4 text-base text-white/60">
                Self-serve from day one
              </p>
            </div>

            {/* Right: Feature Columns */}
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
              {DEVELOPER_FEATURES.map((feature) => (
                <div key={feature.title}>
                  {/* Checkmark icon */}
                  <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-pink-light/50">
                    <svg
                      className="h-4 w-4 text-pink-light"
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
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-white/70">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.link.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-pink-light transition-colors hover:text-white"
                  >
                    {feature.link.text}
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
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* White Card Overlay */}
      <div className="relative z-20 -mt-24 pb-24 md:-mt-32 md:pb-32">
        <Container>
          <div className="rounded-3xl bg-white p-8 shadow-2xl md:p-12">
            {/* Card Header */}
            <h3 className="mb-10 text-2xl font-bold text-text-primary md:text-3xl">
              Get Started in <span className="italic">Minutes</span>
            </h3>

            {/* Steps */}
            <div className="mb-10 space-y-8">
              {STEPS.map((step) => (
                <div key={step.stepNumber} className="flex gap-6">
                  {/* Step Number */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-purple-primary/20 text-sm font-bold text-purple-primary">
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
