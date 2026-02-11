"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";
import { FeatureList } from "./feature-list";
import { ArchitectureDiagram } from "./architecture-diagram";
import { useContent } from "@/lib/i18n";
import { LocaleLink } from "@/components/ui/locale-link";
import type { WhatIsSectionContent } from "@/content";

export interface WhatIsSectionProps {
  className?: string;
}

export function WhatIsSection({ className }: WhatIsSectionProps) {
  const content = useContent<WhatIsSectionContent>("WHAT_IS_CONTENT");
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="what-is-koeo"
      className={cn("relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD]", className)}
    >
      {/* Network background */}
      <NetworkBackground variant="light" density="sparse" />

      <Container className="relative z-10">
        <SectionHeader heading={content.heading} />

        {/* Split Layout */}
        <div ref={contentRef} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Content */}
          <div className={cn(
            "transition-all duration-700 ease-out",
            isVisible 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 -translate-x-8"
          )}>
            <h3 className="mb-6 text-2xl font-bold leading-tight text-text-primary md:text-3xl">
              {content.subheading}
            </h3>
            <p className={cn(
              "mb-8 text-lg leading-relaxed text-text-primary/70 transition-all duration-700 ease-out",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
            >
              {content.description}
            </p>

            {/* Feature List */}
            <div className={cn(
              "transition-all duration-700 ease-out",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              <FeatureList features={content.features} className="mb-10" />
            </div>

            {/* CTAs */}
            <div className={cn(
              "flex flex-wrap gap-4 transition-all duration-700 ease-out",
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
            >
              <Button asChild size="lg">
                <LocaleLink href={content.cta.href}>{content.cta.text}</LocaleLink>
              </Button>
            </div>
          </div>

          {/* Right: Technical Architecture Visualization */}
          <div className={cn(
            "transition-all duration-1000 ease-out",
            isVisible 
              ? "opacity-100 translate-x-0 scale-100" 
              : "opacity-0 translate-x-8 scale-95"
          )}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            <ArchitectureDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}

// Re-export sub-components for direct access if needed
export { FeatureList } from "./feature-list";
export { ArchitectureDiagram } from "./architecture-diagram";
