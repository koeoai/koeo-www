import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative py-20 md:py-32 overflow-hidden", {
  variants: {
    background: {
      default: "bg-slate-50",
      gradient:
        "bg-gradient-to-br from-purple-deep via-purple-primary/90 to-magenta/80 text-white",
      dark: "bg-purple-deep text-text-light",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ background, className }))}
        {...props}
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237C3AED' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient orbs for visual interest */}
        {background === "default" && (
          <>
            <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-purple-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-magenta/5 blur-3xl" />
          </>
        )}
        {background === "gradient" && (
          <>
            <div className="pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-pink-light/20 blur-3xl" />
          </>
        )}
        <div className="relative z-10">{children}</div>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };
