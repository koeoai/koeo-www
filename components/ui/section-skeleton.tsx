import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

export interface SectionSkeletonProps {
  className?: string;
  variant?: "light" | "dark" | "gradient";
}

/**
 * Loading skeleton for section components.
 * Provides visual consistency during lazy loading.
 */
export function SectionSkeleton({ className, variant = "light" }: SectionSkeletonProps) {
  const bgClass = {
    light: "bg-white",
    dark: "bg-purple-deep",
    gradient: "bg-gradient-to-b from-purple-primary via-purple-primary/60 to-white",
  }[variant];

  return (
    <Section className={cn("py-24 md:py-32", bgClass, className)}>
      <Container>
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mx-auto mb-4 h-8 w-48 rounded-lg bg-gray-200/50" />
            <div className="mx-auto h-4 w-64 rounded bg-gray-200/30" />
          </div>

          {/* Content skeleton - two column layout */}
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left column */}
            <div className="space-y-4">
              <div className="h-6 w-3/4 rounded bg-gray-200/50" />
              <div className="h-4 w-full rounded bg-gray-200/30" />
              <div className="h-4 w-5/6 rounded bg-gray-200/30" />
              <div className="h-4 w-4/5 rounded bg-gray-200/30" />
              <div className="mt-8 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-gray-200/50" />
                    <div className="h-4 w-48 rounded bg-gray-200/30" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - diagram placeholder */}
            <div className="flex items-center justify-center">
              <div className="h-64 w-full rounded-2xl bg-gray-200/30" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
