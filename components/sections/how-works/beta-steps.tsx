import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    stepNumber: 1,
    title: "Apply for access",
    description:
      "Tell us about your use case, current setup and constraints. We review applications to make sure the beta is a good fit for what you're building.",
  },
  {
    stepNumber: 2,
    title: "Onboarding & API keys",
    description:
      "If there's a fit, we'll onboard you, agree on initial limits and give you API keys, example requests and guidance for your first integration.",
  },
  {
    stepNumber: 3,
    title: "Integrate, then scale together",
    description:
      "Start routing real traffic through KOEO. We'll monitor reliability and performance with you, adjust routing policies and grow capacity as your usage increases.",
  },
];

export interface BetaStepsProps {
  className?: string;
}

export function BetaSteps({ className }: BetaStepsProps) {
  return (
    <div className={cn("relative rounded-3xl border border-white/10 bg-white p-8 shadow-2xl md:p-12", className)}>
      {/* Card Header */}
      <h3 className="mb-10 text-2xl font-bold text-text-primary md:text-3xl">
        How the <span className="bg-gradient-to-r from-purple-primary to-magenta bg-clip-text italic text-transparent">private beta</span> works
      </h3>

      {/* Steps */}
      <div className="mb-10 space-y-8">
        {STEPS.map((step) => (
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
          <Link href="/beta">Apply for Private Beta</Link>
        </Button>
        <Link
          href="mailto:hello@koeo.ai"
          className="inline-flex items-center gap-2 text-base font-medium text-text-primary transition-colors hover:text-purple-primary"
        >
          Talk to the team
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
  );
}
