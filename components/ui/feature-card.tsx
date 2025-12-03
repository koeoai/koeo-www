import * as React from "react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ title, description, icon, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-purple-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
      >
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-primary/10 to-magenta/10 text-purple-primary">
            {icon}
          </div>
        )}
        <h3 className="mb-2 text-xl font-semibold text-text-primary">{title}</h3>
        <p className="text-base text-text-primary/70">{description}</p>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
