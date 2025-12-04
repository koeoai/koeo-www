import * as React from "react";
import { cn } from "@/lib/utils";

export interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  className?: string;
}

const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
  ({ stepNumber, title, description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex gap-6 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300",
          "hover:border-white/40 hover:bg-white/15",
          className
        )}
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-pink-light/0 via-white/0 to-pink-light/0 opacity-0 blur transition-opacity duration-300 group-hover:opacity-20" />

        {/* Step number with glow */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-light to-white opacity-50 blur-lg" />
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-pink-light/80 text-2xl font-bold text-purple-deep shadow-lg">
            {stepNumber}
          </div>
        </div>

        <div className="relative">
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="text-base leading-relaxed text-white/80">
            {description}
          </p>
        </div>
      </div>
    );
  }
);
StepCard.displayName = "StepCard";

export { StepCard };
