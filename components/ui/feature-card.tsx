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
          "group relative rounded-2xl border border-purple-primary/10 bg-white/80 p-8 backdrop-blur-sm transition-all duration-300",
          "hover:-translate-y-1 hover:border-purple-primary/30 hover:shadow-xl hover:shadow-purple-primary/10",
          className
        )}
      >
        {/* Gradient border effect on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-primary/0 via-magenta/0 to-pink-light/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        {icon && (
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-primary to-magenta text-white shadow-lg shadow-purple-primary/25">
            {icon}
          </div>
        )}
        <h3 className="mb-3 text-xl font-bold text-text-primary">{title}</h3>
        <p className="text-base leading-relaxed text-text-primary/70">
          {description}
        </p>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
