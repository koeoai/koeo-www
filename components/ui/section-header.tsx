import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  heading: string;
  intro?: string;
  className?: string;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ heading, intro, className }, ref) => {
    return (
      <div ref={ref} className={cn("mb-12 text-center", className)}>
        <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
          {heading}
        </h2>
        {intro && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-primary/70">
            {intro}
          </p>
        )}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
