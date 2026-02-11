"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "fade" 
  | "scale" 
  | "blur"
  | "slide-up"
  | "gradient-reveal";

export interface ScrollAnimateProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animationStyles: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade": {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  "scale": {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "blur": {
    initial: "opacity-0 blur-sm",
    animate: "opacity-100 blur-0",
  },
  "slide-up": {
    initial: "opacity-0 translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  "gradient-reveal": {
    initial: "opacity-0 translate-y-4 [&_.gradient-text]:bg-clip-text [&_.gradient-text]:text-transparent [&_.gradient-text]:bg-gradient-to-r [&_.gradient-text]:from-white [&_.gradient-text]:to-white",
    animate: "opacity-100 translate-y-0 [&_.gradient-text]:from-purple-primary [&_.gradient-text]:via-magenta [&_.gradient-text]:to-pink-light",
  },
};

export function ScrollAnimate({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  className,
  once = true,
}: ScrollAnimateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR fallback: IntersectionObserver unavailable
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? styles.animate : styles.initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Staggered animation for lists/grids
export interface ScrollAnimateGroupProps {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  itemClassName?: string;
}

export function ScrollAnimateGroup({
  children,
  animation = "fade-up",
  staggerDelay = 100,
  duration = 700,
  threshold = 0.1,
  className,
  itemClassName,
}: ScrollAnimateGroupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR fallback: IntersectionObserver unavailable
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const styles = animationStyles[animation];

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all ease-out",
            isVisible ? styles.animate : styles.initial,
            itemClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Animated text that reveals word by word or character by character
export interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "words" | "chars";
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  gradient?: boolean;
}

export function AnimatedText({
  text,
  as: Component = "p",
  mode = "words",
  staggerDelay = 50,
  duration = 500,
  threshold = 0.1,
  className,
  gradient = false,
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR fallback: IntersectionObserver unavailable
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const items = mode === "words" ? text.split(" ") : text.split("");
  const separator = mode === "words" ? " " : "";

  return (
    <Component ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>} className={cn("inline", className)}>
      {items.map((item, index) => (
        <span
          key={index}
          className={cn(
            "inline-block transition-all ease-out",
            isVisible 
              ? "opacity-100 translate-y-0 blur-0" 
              : "opacity-0 translate-y-2 blur-[2px]",
            gradient && isVisible && "bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent"
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
          }}
        >
          {item}{separator}
        </span>
      ))}
    </Component>
  );
}
