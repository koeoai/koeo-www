"use client";

import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { NetworkBackground } from "@/components/ui/network-background";
import { useContent } from "@/lib/i18n";
import type { ProblemSectionContent } from "@/content";

// Icon mapping for problem cards
const ICON_MAP: Record<string, React.ReactNode> = {
  "grid-2x2": (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  ),
  clock: (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  "dollar-sign": (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

export interface ProblemSectionProps {
  className?: string;
}

export function ProblemSection({ className }: ProblemSectionProps) {
  const content = useContent<ProblemSectionContent>("PROBLEM_CONTENT");

  return (
    <Section
      id="problem"
      className={cn("py-24 md:py-32 !bg-[#7C3AED]", className)}
    >
      {/* Network background */}
      <NetworkBackground variant="dark" density="normal" />

      <Container className="relative z-10">
        <SectionHeader
          heading={content.heading}
          intro={content.intro}
          variant="light"
        />

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {content.cards.map((card) => (
            <div
              key={card.title}
              className="group relative h-full"
            >
              {/* Card glow effect - consistent for all cards */}
              <div className="absolute -inset-1 rounded-2xl bg-purple-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Card */}
              <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-light/30 hover:bg-white/10">
                {/* Icon with consistent gradient */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-primary to-magenta text-white shadow-lg">
                  {ICON_MAP[card.icon]}
                </div>

                {/* Category Label */}
                <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-pink-light">
                  {card.category}
                </span>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-white">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-base leading-relaxed text-white/70">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
