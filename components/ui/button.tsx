import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-primary to-magenta text-white hover:opacity-90",
        secondary:
          "border border-purple-primary text-purple-primary hover:bg-purple-primary/10",
        ghost: "hover:bg-purple-primary/10 text-purple-primary",
        outline:
          "border border-purple-primary/20 bg-background hover:bg-purple-primary/5 text-purple-primary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
