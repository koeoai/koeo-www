"use client";

import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { useContent, useLocale } from "@/lib/i18n";
import type { ExtendedHeroContent } from "@/content/types";

/**
 * Break Behavior Section - "When things break, Koeo keeps you running"
 * 
 * Displays the resilience story as three visual cards, giving the content
 * room to breathe instead of cramming it into the hero.
 */
export function BreakBehaviorSection() {
  const { locale } = useLocale();
  const content = useContent<ExtendedHeroContent>("HERO_CONTENT");
  const breakBehavior = content.breakBehavior;

  if (!breakBehavior) return null;

  // Icons for each card (failover, traffic, visibility)
  const icons = [
    // Auto Failover icon
    <svg key="failover" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>,
    // Traffic Spikes icon
    <svg key="traffic" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>,
    // Visibility/Dashboard icon
    <svg key="visibility" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
    </svg>,
  ];

  // Card titles by locale
  const cardTitlesByLocale: Record<string, string[]> = {
    en: ["Auto Failover", "Traffic Spikes", "Full Visibility"],
    fr: ["Failover auto", "Pics de trafic", "Visibilité complète"],
  };

  const titles = cardTitlesByLocale[locale] || cardTitlesByLocale.en;

  return (
    <section
      id="break-behavior"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#C4B5FD] to-[#7C3AED]"
    >
      {/* Network background */}
      <NetworkBackground variant="dark" density="sparse" />

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {breakBehavior.label}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {breakBehavior.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30"
            >
              <div className="mb-4 text-pink-light">
                {icons[index]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {titles[index]}
              </h3>
              <p className="text-sm text-white/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {breakBehavior.comingSoon && (
          <p className="mt-8 text-center text-sm text-white/70 italic">
            {breakBehavior.comingSoon}
          </p>
        )}
      </Container>
    </section>
  );
}
