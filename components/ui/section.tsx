import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("py-16 md:py-24", {
  variants: {
    background: {
      default: "bg-background",
      gradient: "bg-gradient-to-br from-purple-primary/5 via-magenta/5 to-pink-light/10",
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
        {children}
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };
