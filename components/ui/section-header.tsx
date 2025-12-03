import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  heading: string;
  intro?: string;
  className?: string;
  variant?: "default" | "light";
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ heading, intro, className, variant = "default" }, ref) => {
    const isLight = variant === "light";

    return (
      <div ref={ref} className={cn("mb-16 text-center", className)}>
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
            isLight ? "text-white" : "text-text-primary"
          )}
        >
          {heading}
        </h2>
        {intro && (
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl",
              isLight ? "text-white/80" : "text-text-primary/70"
            )}
          >
            {intro}
          </p>
        )}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
