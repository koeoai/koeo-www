"use client";

import { useState, useRef, useCallback } from "react";
import { NeuralConductorHero } from "@/components/ui/neural-conductor-hero";
import { useContent } from "@/lib/i18n";
import { LocaleLink } from "@/components/ui/locale-link";
import type { HeroContent } from "@/content";

interface NeuralNetworkCanvasProps {
  className?: string;
}

export function NeuralNetworkCanvas({ className }: NeuralNetworkCanvasProps) {
  const content = useContent<HeroContent>("HERO_CONTENT");
  const [harmony, setHarmony] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || !accentRef.current) return;
    
    const accentRect = accentRef.current.getBoundingClientRect();
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Check if mouse is directly over the accent text
    const isOverText = 
      mouseX >= accentRect.left &&
      mouseX <= accentRect.right &&
      mouseY >= accentRect.top &&
      mouseY <= accentRect.bottom;
    
    if (isOverText) {
      // Directly hovering the text = perfect network
      setHarmony(1);
      return;
    }
    
    // Calculate distance from the text bounding box edges
    const distX = mouseX < accentRect.left 
      ? accentRect.left - mouseX 
      : mouseX > accentRect.right 
        ? mouseX - accentRect.right 
        : 0;
    const distY = mouseY < accentRect.top 
      ? accentRect.top - mouseY 
      : mouseY > accentRect.bottom 
        ? mouseY - accentRect.bottom 
        : 0;
    const dist = Math.sqrt(distX * distX + distY * distY);
    
    // Gradient effect around the text (300px radius)
    const maxDist = 300;
    const newHarmony = Math.max(0, 1 - dist / maxDist);
    
    setHarmony(newHarmony);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHarmony(0)}
    >
      {/* Neural Conductor Background */}
      <NeuralConductorHero harmony={harmony} className="absolute inset-0 z-0 !h-full" />
      
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow Badge */}
          <div className="pointer-events-none mb-6 inline-flex items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
            </span>
            {content.badge}
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.headline}{" "}
            <span 
              ref={accentRef}
              className="inline-block bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent transition-all duration-300"
              style={{
                filter: harmony > 0.3 ? `drop-shadow(0 0 ${20 * harmony}px rgba(236, 72, 153, ${harmony * 0.8}))` : 'none',
                transform: harmony > 0.5 ? `scale(${1 + harmony * 0.02})` : 'scale(1)',
              }}
            >
              {content.headlineAccent}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-light/80 sm:text-xl">
            {content.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <LocaleLink
              href={content.cta.primary.href}
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 font-semibold text-white transition-all hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              {content.cta.primary.text}
            </LocaleLink>
            <LocaleLink
              href={content.cta.secondary.href}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              {content.cta.secondary.text}
            </LocaleLink>
          </div>

          {/* Microcopy */}
          <p className="pointer-events-none mt-6 text-sm text-text-light/60">
            {content.microcopy}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade - seamless transition to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#7C3AED] to-transparent" />
    </div>
  );
}
