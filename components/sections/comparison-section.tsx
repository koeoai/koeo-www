"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { useContent } from "@/lib/i18n";
import type { ComparisonBlockContent, ComparisonRow } from "@/content";

export interface ComparisonSectionProps {
  className?: string;
}

// Mapping of competitor index to the Koeo benefit they highlight
// GPU clouds (0) → "No infra to manage" (index 1)
// Hosted APIs (1) → "Your models" (index 2)
// Single vendor (2) → "Built-in failover" (index 3)
const COMPETITOR_TO_BENEFIT_MAP: Record<number, number> = {
  0: 1, // GPU clouds → No infra to manage
  1: 2, // Hosted APIs → Your models
  2: 3, // Single vendor → Built-in failover
};

// Icon for GPU clouds - server/hardware icon
function GpuCloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}

// Icon for Hosted APIs - cloud/API icon
function HostedApiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  );
}

// Icon for Single vendor - building/company icon
function SingleVendorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}



// Animated Koeo logo with assembling pieces
function AnimatedKoeoLogo({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative">
      {/* Outer glow rings */}
      <div className={cn(
        "absolute -inset-3 rounded-full transition-all duration-700",
        isActive 
          ? "bg-gradient-to-br from-white/40 via-pink-light/30 to-magenta/30 blur-xl scale-100 opacity-100" 
          : "scale-50 opacity-0"
      )} />
      <div className={cn(
        "absolute -inset-1.5 rounded-full transition-all duration-500 delay-100",
        isActive 
          ? "bg-white/30 blur-lg scale-100 opacity-100" 
          : "scale-50 opacity-0"
      )} />
      
      <svg
        width={32}
        height={32}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        aria-hidden="true"
      >
        {/* Left piece - slides in from left */}
        <path
          d="M35.093 81.065 L34.259 80.880 L30.463 78.472 L29.722 78.287 L27.685 76.898 L8.611 66.157 L8.287 65.926 L8.194 64.815 L8.194 35.000 L34.444 19.583 L35.000 19.583 L37.315 20.880 L61.435 34.722 L61.435 35.093 L60.926 35.417 L35.046 50.370 L35.093 81.065 Z"
          fill="white"
          className={cn(
            "transition-all duration-500 origin-center",
            isActive 
              ? "opacity-100 translate-x-0 scale-100" 
              : "opacity-90 -translate-x-3 scale-95"
          )}
          style={{ transitionDelay: isActive ? "0ms" : "0ms" }}
        />
        {/* Top piece - slides in from top */}
        <path
          d="M65.185 63.287 L64.861 63.241 L64.676 32.593 L38.194 17.315 L38.333 16.991 L45.185 12.917 L48.148 11.435 L58.333 5.231 L59.074 5.046 L64.537 1.806 L65.463 1.991 L70.556 4.861 L74.352 7.269 L75.093 7.454 L87.778 14.954 L90.741 16.435 L91.528 17.222 L91.528 47.870 L65.185 63.287 Z"
          fill="white"
          className={cn(
            "transition-all duration-500 origin-center",
            isActive 
              ? "opacity-100 translate-y-0 translate-x-0 scale-100" 
              : "opacity-90 -translate-y-3 translate-x-2 scale-95"
          )}
          style={{ transitionDelay: isActive ? "100ms" : "0ms" }}
        />
        {/* Bottom piece - slides in from bottom */}
        <path
          d="M65.185 98.194 L38.380 82.870 L38.333 52.083 L39.167 52.269 L65.093 67.176 L82.685 56.713 L83.426 56.528 L84.259 55.787 L85.000 55.602 L91.019 51.898 L91.528 51.852 L91.620 82.778 L65.185 98.194 Z"
          fill="white"
          className={cn(
            "transition-all duration-500 origin-center",
            isActive 
              ? "opacity-100 translate-y-0 translate-x-0 scale-100" 
              : "opacity-90 translate-y-3 translate-x-2 scale-95"
          )}
          style={{ transitionDelay: isActive ? "200ms" : "0ms" }}
        />
      </svg>
    </div>
  );
}

// Competitor icon - clean design
function CompetitorIcon({ name, isAnimated, isHovered }: { name: string; isAnimated: boolean; isHovered: boolean }) {
  const iconClassName = cn(
    "transition-all duration-300",
    isHovered
      ? "text-white/80"
      : isAnimated ? "text-white/40" : "text-white/70"
  );

  // Render the appropriate icon based on name
  const lowerName = name.toLowerCase();
  const isGpuCloud = lowerName.includes("gpu") || lowerName.includes("cloud");
  const isHostedApi = lowerName.includes("hosted") || lowerName.includes("api");
  
  return (
    <div className={cn(
      "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300",
      isHovered
        ? "bg-white/15 border-white/30 scale-110"
        : isAnimated 
          ? "bg-white/5 border-white/10" 
          : "bg-white/10 border-white/20"
    )}>
      {isGpuCloud ? (
        <GpuCloudIcon className={iconClassName} />
      ) : isHostedApi ? (
        <HostedApiIcon className={iconClassName} />
      ) : (
        <SingleVendorIcon className={iconClassName} />
      )}
    </div>
  );
}

// Koeo description with highlightable segments
function KoeoDescription({ highlightedBenefit, isKoeoHovered }: { highlightedBenefit: number | null; isKoeoHovered: boolean }) {
  // Split the description into segments that can be highlighted
  // "No infra to manage. Your models. Built-in failover."
  const segments = [
    { text: "No infra to manage.", benefitIndex: 1 },
    { text: " Your models.", benefitIndex: 2 },
    { text: " Built-in failover.", benefitIndex: 3 },
  ];

  return (
    <span className="text-sm transition-all duration-300">
      {segments.map((segment, idx) => {
        const isHighlighted = highlightedBenefit === segment.benefitIndex || isKoeoHovered;
        return (
          <span
            key={idx}
            className={cn(
              "transition-all duration-300",
              isHighlighted
                ? "text-white font-medium"
                : "text-white/60"
            )}
          >
            {segment.text}
          </span>
        );
      })}
    </span>
  );
}

export function ComparisonSection({ className }: ComparisonSectionProps) {
  const content = useContent<ComparisonBlockContent>("COMPARISON_CONTENT");
  const [animationStage, setAnimationStage] = useState(-1);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Determine which Koeo benefit to highlight based on hovered competitor
  const highlightedBenefit = hoveredRow !== null && hoveredRow < 3 
    ? COMPETITOR_TO_BENEFIT_MAP[hoveredRow] 
    : null;
  
  // Check if Koeo row is hovered (index 3)
  const isKoeoHovered = hoveredRow === 3;

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setAnimationStage(content.rows.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let stage = 0;
          const interval = setInterval(() => {
            setAnimationStage(stage);
            stage++;
            if (stage > content.rows.length) {
              clearInterval(interval);
            }
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [content.rows.length]);

  return (
    <section
      id="comparison"
      className={cn("relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#C4B5FD] to-[#7C3AED]", className)}
    >
      <Container className="relative z-10">
        <SectionHeader
          heading={content.heading}
          intro={content.intro}
        />

        {/* Comparison grid */}
        <div ref={sectionRef} className="mx-auto max-w-3xl">
          <div className="grid gap-3">
            {content.rows.map((row: ComparisonRow, index: number) => {
              const isKoeo = row.isKoeo === true;
              const isAnimated = animationStage >= index;
              const isKoeoActive = isKoeo && animationStage >= content.rows.length - 1;
              const isThisRowHovered = hoveredRow === index;
              const isAnyCompetitorHovered = hoveredRow !== null && hoveredRow < 3;
              
              return (
                <div
                  key={row.name}
                  data-testid={isKoeo ? "koeo-row" : "comparison-row"}
                  className={cn(
                    "relative rounded-xl p-4 md:p-5 transition-all duration-300 cursor-pointer",
                    isKoeo
                      ? cn(
                          "border",
                          isKoeoActive || isKoeoHovered || isAnyCompetitorHovered
                            ? "bg-gradient-to-r from-purple-primary/20 via-magenta/15 to-pink-light/15 border-pink-light/40 shadow-lg shadow-magenta/20" 
                            : "bg-white/5 border-white/10"
                        )
                      : cn(
                          "border border-white/10 bg-white/5 backdrop-blur-sm",
                          isThisRowHovered && "bg-white/10 border-white/20 -translate-y-0.5"
                        ),
                    animationStage < 0 && "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: animationStage < 0 ? `${index * 80}ms` : "0ms",
                  }}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Strikethrough line for non-Koeo rows */}
                  {!isKoeo && (
                    <div 
                      className={cn(
                        "absolute left-14 right-6 top-1/2 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent transition-all duration-300 -translate-y-1/2 origin-left",
                        isAnimated && !isThisRowHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                      )}
                    />
                  )}

                  <div className={cn(
                    "relative flex items-center gap-4 transition-all duration-300",
                    !isKoeo && isAnimated && !isThisRowHovered && "opacity-60"
                  )}>
                    {/* Icon area */}
                    <div className="flex-shrink-0">
                      {isKoeo ? (
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300",
                          isKoeoActive || isKoeoHovered || isAnyCompetitorHovered
                            ? "bg-gradient-to-br from-purple-primary to-magenta shadow-lg shadow-magenta/30" 
                            : "bg-white/10 border border-white/20"
                        )}>
                          <AnimatedKoeoLogo isActive={isKoeoHovered || isAnyCompetitorHovered} />
                        </div>
                      ) : (
                        <CompetitorIcon 
                          name={row.name} 
                          isAnimated={isAnimated} 
                          isHovered={isThisRowHovered}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "text-base md:text-lg font-semibold transition-all duration-300",
                          isKoeo 
                            ? isKoeoActive || isKoeoHovered || isAnyCompetitorHovered
                              ? "text-white"
                              : "text-white/70"
                            : isThisRowHovered
                              ? "text-white"
                              : isAnimated 
                                ? "text-white/50" 
                                : "text-white"
                        )}
                      >
                        {row.name}
                      </h3>
                      {isKoeo ? (
                        <KoeoDescription 
                          highlightedBenefit={highlightedBenefit} 
                          isKoeoHovered={isKoeoHovered}
                        />
                      ) : (
                        <p
                          className={cn(
                            "text-sm transition-all duration-300",
                            isThisRowHovered
                              ? "text-white/80"
                              : isAnimated 
                                ? "text-white/40" 
                                : "text-white/60"
                          )}
                        >
                          {row.description}
                        </p>
                      )}
                    </div>

                    {/* Status indicator on the right */}
                    <div className="flex-shrink-0">
                      {isKoeo ? (
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                          isKoeoActive || isKoeoHovered || isAnyCompetitorHovered
                            ? "bg-gradient-to-br from-purple-primary to-magenta scale-100 opacity-100" 
                            : "scale-0 opacity-0"
                        )}
                        >
                          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="text-white">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                          isThisRowHovered
                            ? "bg-red-500/30 scale-110"
                            : isAnimated 
                              ? "bg-red-500/15 scale-100 opacity-100" 
                              : "scale-0 opacity-0"
                        )}
                        >
                          <svg 
                            width={14} 
                            height={14} 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth={2.5} 
                            className={cn(
                              "transition-all duration-300",
                              isThisRowHovered ? "text-red-400" : "text-red-400/80"
                            )}
                          >
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
