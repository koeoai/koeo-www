"use client";

import { cn } from "@/lib/utils";
import { NetworkBackgroundSVG } from "@/components/ui/network-background-svg";

interface NetworkBackgroundProps {
  className?: string;
  variant?: "dark" | "light";
  density?: "sparse" | "normal" | "dense";
  animated?: boolean;
}

export function NetworkBackground({
  className,
  variant = "dark",
  density = "normal",
}: NetworkBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <NetworkBackgroundSVG
        variant={variant}
        density={density}
        className="h-full w-full"
      />
    </div>
  );
}
