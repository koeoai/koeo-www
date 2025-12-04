import * as React from "react";
import { cn } from "@/lib/utils";

export interface AudienceTileProps {
  title: string;
  description: string;
  className?: string;
}

const AudienceTile = React.forwardRef<HTMLDivElement, AudienceTileProps>(
  ({ title, description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-purple-primary/20 bg-white p-6 transition-all duration-300",
          "hover:-translate-y-1 hover:border-purple-primary/40 hover:shadow-lg hover:shadow-purple-primary/10",
          className
        )}
      >
        {/* Animated gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-primary/5 via-transparent to-magenta/5 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Accent line */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-primary to-magenta opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">
          <h3 className="mb-3 text-lg font-bold text-text-primary">{title}</h3>
          <p className="text-sm leading-relaxed text-text-primary/70">
            {description}
          </p>
        </div>
      </div>
    );
  }
);
AudienceTile.displayName = "AudienceTile";

export { AudienceTile };
