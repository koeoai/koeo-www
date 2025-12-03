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
          "rounded-xl border border-purple-primary/10 bg-gradient-to-br from-purple-primary/5 to-magenta/5 p-6",
          className
        )}
      >
        <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-primary/70">{description}</p>
      </div>
    );
  }
);
AudienceTile.displayName = "AudienceTile";

export { AudienceTile };
