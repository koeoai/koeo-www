"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  heading: string;
  intro?: string;
  className?: string;
  variant?: "default" | "light";
  animate?: boolean;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ heading, intro, className, variant = "default", animate = true }, ref) => {
    const isLight = variant === "light";
    const [isVisible, setIsVisible] = useState(!animate);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!animate) return;
      
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
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [animate]);

    // Split heading into words for staggered animation
    const words = heading.split(" ");

    return (
      <div 
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }} 
        className={cn("mb-16 text-center", className)}
      >
        <h2
          className={cn(
            "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
            isLight ? "text-white" : "text-text-primary"
          )}
        >
          {animate ? (
            words.map((word, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block transition-all duration-700 ease-out",
                  isVisible 
                    ? "opacity-100 translate-y-0 blur-0" 
                    : "opacity-0 translate-y-4 blur-[2px]"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 80}ms` : "0ms",
                }}
              >
                {word}{index < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))
          ) : (
            heading
          )}
        </h2>
        {intro && (
          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl transition-all duration-700 ease-out",
              isLight ? "text-white/80" : "text-text-primary/70",
              animate && (isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4")
            )}
            style={{
              transitionDelay: animate && isVisible ? `${words.length * 80 + 200}ms` : "0ms",
            }}
          >
            {intro}
          </p>
        )}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
