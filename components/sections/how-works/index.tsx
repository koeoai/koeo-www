"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { DeveloperFeatures } from "./developer-features";
import { BetaSteps } from "./beta-steps";
import { useContent } from "@/lib/i18n";
import type { HowWorksSectionContent } from "@/content";

export interface HowWorksSectionProps {
  className?: string;
}

export function HowWorksSection({ className }: HowWorksSectionProps) {
  const content = useContent<HowWorksSectionContent>("HOW_WORKS_CONTENT");
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR fallback: IntersectionObserver unavailable
      setIsHeadingVisible(true);
      setIsCardVisible(true);
      return;
    }

    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
          headingObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardVisible(true);
          cardObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }
    if (cardRef.current) {
      cardObserver.observe(cardRef.current);
    }

    return () => {
      headingObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  // Split heading into words for animation
  const headingWords = content.heading.split(" ");
  const accentWords = content.headingAccent.split(" ");

  return (
    <section 
      id="how-it-works" 
      className={cn("relative overflow-hidden", className)}
    >
      {/* Single continuous gradient background for entire section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C4B5FD] via-[#7C3AED] via-40% to-[#4C1D95]" />
      
      {/* Dark Top Section */}
      <div className="relative overflow-hidden pb-40 pt-24 md:pb-48 md:pt-32">
        {/* Network background */}
        <NetworkBackground variant="light" density="sparse" className="opacity-50" />

        <Container className="relative z-10">
          <div ref={headingRef} className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left: Headline - Custom layout with word-by-word animation */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
                <span className="block">
                  {headingWords.map((word, index) => (
                    <span
                      key={index}
                      className={cn(
                        "inline-block transition-all duration-700 ease-out",
                        isHeadingVisible 
                          ? "opacity-100 translate-y-0 blur-0" 
                          : "opacity-0 translate-y-4 blur-[2px]"
                      )}
                      style={{
                        transitionDelay: isHeadingVisible ? `${index * 80}ms` : "0ms",
                      }}
                    >
                      {word}{index < headingWords.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </span>
                <span className="block">
                  {accentWords.map((word, index) => (
                    <span
                      key={index}
                      className={cn(
                        "inline-block bg-gradient-to-r from-purple-primary to-magenta bg-clip-text text-transparent transition-all duration-700 ease-out",
                        isHeadingVisible 
                          ? "opacity-100 translate-y-0 blur-0" 
                          : "opacity-0 translate-y-4 blur-[2px]"
                      )}
                      style={{
                        transitionDelay: isHeadingVisible ? `${(headingWords.length + index) * 80 + 100}ms` : "0ms",
                      }}
                    >
                      {word}{index < accentWords.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </span>
              </h2>
              <p className={cn(
                "mt-4 text-base text-text-primary/60 transition-all duration-700 ease-out",
                isHeadingVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isHeadingVisible ? `${(headingWords.length + accentWords.length) * 80 + 200}ms` : "0ms",
              }}
              >
                {content.subheading}
              </p>
            </div>

            {/* Right: Feature Columns */}
            <div className={cn(
              "lg:col-span-2 transition-all duration-700 ease-out",
              isHeadingVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-8"
            )}
            style={{ transitionDelay: isHeadingVisible ? "300ms" : "0ms" }}
            >
              <DeveloperFeatures features={content.developerFeatures} />
            </div>
          </div>
        </Container>
      </div>

      {/* White Card Overlay */}
      <div ref={cardRef} className="relative z-20 -mt-24 pb-24 md:-mt-32 md:pb-32">
        {/* Network background */}
        <NetworkBackground variant="dark" density="sparse" />
        
        <Container className="relative">
          {/* Card glow */}
          <div className={cn(
            "absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-primary/20 via-magenta/10 to-pink-light/20 blur-2xl transition-all duration-1000",
            isCardVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )} />
          
          <div className={cn(
            "transition-all duration-700 ease-out",
            isCardVisible 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-8 scale-98"
          )}>
            <BetaSteps 
              stepsHeading={content.stepsHeading}
              steps={content.steps}
              cta={content.cta}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}

// Re-export sub-components for direct access if needed
export { DeveloperFeatures } from "./developer-features";
export { BetaSteps } from "./beta-steps";
