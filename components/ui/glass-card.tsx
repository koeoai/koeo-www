import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * GlassCard component provides a frosted glass card styling with animated border effects.
 * Used for form sections and content grouping with a modern glass morphism aesthetic.
 */
export function GlassCard({
  title,
  description,
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10",
        className
      )}
    >
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-purple-primary/20 via-magenta/20 to-pink-light/20" />
      </div>
      <div className="relative">
        <div className="mb-6 border-b border-white/10 pb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-white/60">{description}</p>
          )}
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}
