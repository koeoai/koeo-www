import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "One API to run your supported models across our federated GPU fabric",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Automatic routing, health checks and basic cost controls across different GPU tiers",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: "Built-in usage and latency metrics, with deeper observability in active development",
  },
];

export interface FeatureListProps {
  className?: string;
}

export function FeatureList({ className }: FeatureListProps) {
  return (
    <ul className={cn("space-y-4", className)}>
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
  );
}
