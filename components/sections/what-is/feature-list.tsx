import { cn } from "@/lib/utils";
import type { FeatureItem } from "@/content";

// Check icon SVG component
const CheckIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export interface FeatureListProps {
  features: FeatureItem[];
  className?: string;
}

export function FeatureList({ features, className }: FeatureListProps) {
  return (
    <ul className={cn("space-y-4", className)}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-white shadow-md">
            <CheckIcon />
          </span>
          <span className="text-base text-text-primary/80">
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
