"use client";

import { cn } from "@/lib/utils";
import { InteractiveNetworkCanvas } from "@/components/ui/interactive-network-canvas";

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
  animated = true,
}: NetworkBackgroundProps) {
  // Map variant to opacity for light mode
  const isLight = variant === "light";
  
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <InteractiveNetworkCanvas
        mode="traveling-lights"
        density={density}
        showBackground={false}
        className={cn(
          "h-full w-full",
          isLight && "opacity-60",
          !animated && "hidden"
        )}
      />
    </div>
  );
}
