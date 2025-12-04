import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const PROBLEM_CARDS = [
  {
    category: "COMPLEXITY",
    title: "Too many moving parts",
    description:
      "Model servers, schedulers, GPU pools and billing systems all need to be wired together. Each piece adds complexity and failure modes.",
    icon: (
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
    iconBg: "bg-purple-primary",
    categoryColor: "text-purple-primary",
  },
  {
    category: "PRODUCTIVITY",
    title: "Infrastructure steals focus",
    description:
      "Product teams lose time debugging nodes, quotas and cold starts instead of shipping features that matter to users.",
    icon: (
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
    iconBg: "bg-magenta",
    categoryColor: "text-magenta",
  },
  {
    category: "COST CONTROL",
    title: "Costs are unpredictable",
    description:
      "Fragmented GPU usage, spot instances and opaque pricing make it hard to forecast spend or optimize for efficiency.",
    icon: (
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
    iconBg: "bg-pink-light",
    categoryColor: "text-pink-light",
  },
];

export interface ProblemSectionProps {
  className?: string;
}

export function ProblemSection({ className }: ProblemSectionProps) {
  return (
    <section
      id="problem"
      className={cn("relative overflow-hidden bg-slate-50 py-24 md:py-32", className)}
    >
      <Container>
        {/* Eyebrow + Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-purple-primary">
            The Challenge
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            Why AI infrastructure feels harder than it should
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-primary/70">
            Running inference at scale means juggling providers, managing GPU
            availability, and stitching together tools that weren&apos;t designed to
            work together.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Icon */}
              <div
                className={cn(
                  "mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white",
                  card.iconBg
                )}
              >
                {card.icon}
              </div>

              {/* Category Label */}
              <span
                className={cn(
                  "mb-3 block text-xs font-bold uppercase tracking-widest",
                  card.categoryColor
                )}
              >
                {card.category}
              </span>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold text-text-primary">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-text-primary/70">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
