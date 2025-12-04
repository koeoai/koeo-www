"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";

const FEATURES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "One API to run any model across federated compute",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Automatic routing, failover and cost optimization",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Built-in observability without extra tooling",
  },
];

export interface WhatIsSectionProps {
  className?: string;
}

export function WhatIsSection({ className }: WhatIsSectionProps) {
  return (
    <section
      id="what-is-koeo"
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
    >
      {/* Gradient background - starts matching problem section end, transitions to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED] via-[#A78BFA] to-white" />
      
      {/* Network background */}
      <NetworkBackground variant="light" density="sparse" />

      <Container className="relative z-10">
        {/* Top: Eyebrow + Headline */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            AI inference, simplified
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Content */}
          <div>
            <h3 className="mb-6 text-2xl font-bold leading-tight text-text-primary md:text-3xl">
              KOEO is a unified runtime for distributed GPU inference
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-text-primary/70">
              Stop juggling providers, managing infrastructure, and guessing at
              costs. KOEO handles the complexity so you can focus on building.
            </p>

            {/* Feature List */}
            <ul className="mb-10 space-y-4">
              {FEATURES.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-white shadow-md">
                    {feature.icon}
                  </span>
                  <span className="text-base text-text-primary/80">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/beta">Join the Beta</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/whitepaper.pdf">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right: Animated Visual */}
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-primary/20 via-magenta/10 to-pink-light/20 blur-2xl animate-pulse-glow" />
            
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-purple-deep via-purple-primary/90 to-purple-deep p-8 shadow-2xl lg:aspect-[4/3]">
              {/* Animated GPU Fabric Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central KOEO node */}
                <div className="relative">
                  {/* Pulsing rings */}
                  <div className="absolute -inset-8 animate-ping rounded-full bg-purple-primary/20 [animation-duration:3s]" />
                  <div className="absolute -inset-4 animate-ping rounded-full bg-magenta/30 [animation-duration:2s]" />

                  {/* Center hub */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-primary to-magenta shadow-lg shadow-purple-primary/50">
                    <span className="text-lg font-bold text-white">KOEO</span>
                  </div>
                </div>
              </div>

              {/* Orbiting GPU nodes */}
              <div className="absolute inset-0">
                {/* Top GPU */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 animate-bounce [animation-duration:3s]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-primary/80 to-purple-deep border border-purple-primary/30">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 top-full h-12 w-px -translate-x-1/2 bg-gradient-to-b from-purple-primary/50 to-transparent" />
                </div>

                {/* Bottom Left GPU */}
                <div className="absolute bottom-12 left-12 animate-bounce [animation-delay:0.5s] [animation-duration:2.5s]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-magenta/80 to-purple-primary border border-magenta/30">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="absolute -right-8 top-1/2 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-magenta/50 to-transparent" />
                </div>

                {/* Bottom Right GPU */}
                <div className="absolute bottom-12 right-12 animate-bounce [animation-delay:1s] [animation-duration:2.8s]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-light/80 to-magenta border border-pink-light/30">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="absolute -left-8 top-1/2 h-px w-12 -translate-y-1/2 bg-gradient-to-l from-pink-light/50 to-transparent" />
                </div>

                {/* Right GPU */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 animate-bounce [animation-delay:1.5s] [animation-duration:3.2s]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-primary/80 to-magenta border border-purple-primary/30">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="absolute right-full top-1/2 h-px w-12 -translate-y-1/2 bg-gradient-to-l from-purple-primary/50 to-transparent" />
                </div>

                {/* Left GPU */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 animate-bounce [animation-delay:2s] [animation-duration:2.6s]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-magenta/80 to-pink-light border border-magenta/30">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div className="absolute left-full top-1/2 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-magenta/50 to-transparent" />
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-pink-light/60" />
                <div className="absolute right-1/3 top-1/3 h-1.5 w-1.5 animate-pulse rounded-full bg-purple-primary/60 [animation-delay:0.5s]" />
                <div className="absolute bottom-1/3 left-1/3 h-2 w-2 animate-pulse rounded-full bg-magenta/60 [animation-delay:1s]" />
                <div className="absolute bottom-1/4 right-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-pink-light/60 [animation-delay:1.5s]" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
