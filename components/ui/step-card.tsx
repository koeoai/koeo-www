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
          "flex gap-4 rounded-xl border border-purple-primary/10 bg-white p-6 shadow-sm",
          className
        )}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta text-lg font-bold text-white">
          {stepNumber}
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-primary/70">{description}</p>
        </div>
      </div>
    );
  }
);
StepCard.displayName = "StepCard";

export { StepCard };
