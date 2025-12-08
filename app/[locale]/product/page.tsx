"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";
import { Button } from "@/components/ui/button";
import { RequestFlowAnimation } from "@/components/ui/request-flow-animation";
import {
  ServerRackAnimation,
  FailoverAnimation,
  CodeMigrationAnimation,
} from "@/components/ui/why-koeo-animations";
import Link from "next/link";
import { PRODUCT_PAGE_CONTENT } from "@/content";

// Code snippet animation
function CodeSnippetAnimation() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a2e] font-mono text-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400/60" />
        <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
        <div className="h-3 w-3 rounded-full bg-green-400/60" />
        <span className="ml-4 text-xs text-white/40">index.ts</span>
      </div>
      <div className="p-4 text-xs leading-relaxed sm:text-sm">
        <div className="text-white/40">{"// Same OpenAI client, different endpoint"}</div>
        <div className="mt-2">
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-300">client</span>{" "}
          <span className="text-white/60">=</span>{" "}
          <span className="text-purple-400">new</span>{" "}
          <span className="text-yellow-300">OpenAI</span>
          <span className="text-white/60">{"({"}</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-300">apiKey</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-green-300">{'"koeo_***"'}</span>
          <span className="text-white/60">,</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-300">baseURL</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-green-300">{'"https://api.koeo.ai/v1"'}</span>
          <span className="text-white/60">,</span>
        </div>
        <div className="text-white/60">{"});"}</div>
        <div className="mt-4">
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-300">response</span>{" "}
          <span className="text-white/60">=</span>{" "}
          <span className="text-purple-400">await</span>{" "}
          <span className="text-blue-300">client</span>
          <span className="text-white/60">.</span>
          <span className="text-yellow-300">chat</span>
          <span className="text-white/60">.</span>
          <span className="text-yellow-300">completions</span>
          <span className="text-white/60">.</span>
          <span className="text-yellow-300">create</span>
          <span className="text-white/60">{"({"}</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-300">model</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-green-300">{'"koeo/your-model"'}</span>
          <span className="text-white/60">,</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-300">messages</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-white/60">{"[{ "}</span>
          <span className="text-blue-300">role</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-green-300">{'"user"'}</span>
          <span className="text-white/60">,</span>{" "}
          <span className="text-blue-300">content</span>
          <span className="text-white/60">:</span>{" "}
          <span className="text-green-300">{'"Hello"'}</span>
          <span className="text-white/60">{" }],"}</span>
        </div>
        <div className="text-white/60">{"});"}</div>
      </div>
      {/* Shimmer effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
}

// Console dashboard preview
function ConsoleDashboardAnimation() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a2e]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="text-sm font-medium text-white/70">Koeo Console</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">All systems operational</span>
        </div>
      </div>
      {/* Dashboard content */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Metric cards */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/40">Requests/min</div>
          <div className="mt-1 text-xl font-bold text-white">2,847</div>
          <div className="mt-1 text-xs text-green-400">↑ 12%</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/40">Avg Latency</div>
          <div className="mt-1 text-xl font-bold text-white">142ms</div>
          <div className="mt-1 text-xs text-green-400">↓ 8%</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/40">GPU Nodes</div>
          <div className="mt-1 text-xl font-bold text-white">24</div>
          <div className="mt-1 text-xs text-pink-light">Online</div>
        </div>
      </div>
      {/* Mini chart */}
      <div className="px-4 pb-4">
        <div className="h-16 rounded-lg border border-white/10 bg-white/5 p-2">
          <svg className="h-full w-full" viewBox="0 0 200 40">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 Q20,25 40,28 T80,20 T120,25 T160,15 T200,18"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2"
            />
            <path
              d="M0,30 Q20,25 40,28 T80,20 T120,25 T160,15 T200,18 L200,40 L0,40 Z"
              fill="url(#chartGradient)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}


// Icon components for who it's for section
const WHO_FOR_ICONS: Record<string, React.ReactNode> = {
  rocket: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  users: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  flask: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
};


export default function ProductPage() {
  return (
    <PageShell className="relative overflow-hidden">
        {/* Gradient Background with Neural Network */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #2D1B4E 0%, #4C1D95 30%, #5B21B6 60%, #7C3AED 100%)"
            }}
          />
          <NetworkBackground variant="dark" density="normal" />
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                {PRODUCT_PAGE_CONTENT.hero.badge}
              </div>

              <h1 className="animate-fade-in-up mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl" style={{ animationDelay: "100ms" }}>
                <span className="bg-gradient-to-r from-white via-pink-light to-white bg-clip-text text-transparent">
                  {PRODUCT_PAGE_CONTENT.hero.headline}
                </span>
              </h1>
              
              <p className="animate-fade-in-up mx-auto mb-4 max-w-3xl text-xl font-medium text-white/90 sm:text-2xl" style={{ animationDelay: "200ms" }}>
                {PRODUCT_PAGE_CONTENT.hero.tagline}
              </p>
              
              <p className="animate-fade-in-up mx-auto mb-10 max-w-2xl text-lg text-white/60" style={{ animationDelay: "300ms" }}>
                {PRODUCT_PAGE_CONTENT.hero.subtitle}
              </p>

              <div className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "400ms" }}>
                <Link href={PRODUCT_PAGE_CONTENT.hero.primaryCta.href}>
                  <Button size="lg" className="shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40">
                    {PRODUCT_PAGE_CONTENT.hero.primaryCta.text}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
                <button
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
                >
                  {PRODUCT_PAGE_CONTENT.hero.secondaryCta}
                </button>
              </div>
            </div>
          </Container>
        </section>

        {/* What KOEO Is Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="animate-fade-in-up">
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-light">{PRODUCT_PAGE_CONTENT.whatIs.label}</p>
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                  {PRODUCT_PAGE_CONTENT.whatIs.heading}
                </h2>
                <p className="mb-6 text-lg text-white/60">
                  {PRODUCT_PAGE_CONTENT.whatIs.description}
                </p>
                <ul className="space-y-3">
                  {PRODUCT_PAGE_CONTENT.whatIs.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/80 text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-fade-in-up flex items-center" style={{ animationDelay: "200ms" }}>
                <RequestFlowAnimation />
              </div>
            </div>
          </Container>
        </section>

        {/* Who It's For Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="animate-fade-in-up mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-light">{PRODUCT_PAGE_CONTENT.whoFor.label}</p>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {PRODUCT_PAGE_CONTENT.whoFor.heading}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-white/60">
                {PRODUCT_PAGE_CONTENT.whoFor.subtitle}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {PRODUCT_PAGE_CONTENT.whoFor.items.map((item, i) => (
                <div
                  key={item.title}
                  className="animate-fade-in-up group relative flex"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 text-white/70 transition-colors group-hover:border-pink-light/30 group-hover:text-pink-light">
                      {WHO_FOR_ICONS[item.iconName]}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="flex-1 text-base leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>


        {/* Why KOEO Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="animate-fade-in-up mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-light">{PRODUCT_PAGE_CONTENT.why.label}</p>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {PRODUCT_PAGE_CONTENT.why.heading}
              </h2>
            </div>
            
            {/* Feature 1: Runtime - Content Left, Visual Right */}
            <div className="animate-fade-in-up mb-16 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-4 inline-block font-mono text-sm text-pink-light">{PRODUCT_PAGE_CONTENT.why.features[0].number}</span>
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{PRODUCT_PAGE_CONTENT.why.features[0].title}</h3>
                <p className="mb-6 text-lg text-white/60">
                  {PRODUCT_PAGE_CONTENT.why.features[0].subtitle}
                </p>
                <ul className="space-y-3">
                  {PRODUCT_PAGE_CONTENT.why.features[0].points.map((point, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/70">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Server Rack Animation */}
              <div className="relative flex items-center justify-center">
                <ServerRackAnimation />
              </div>
            </div>

            {/* Feature 2: Resilient - Visual Left, Content Right */}
            <div className="animate-fade-in-up mb-16 grid items-center gap-12 lg:grid-cols-2" style={{ animationDelay: "100ms" }}>
              {/* Failover Animation */}
              <div className="relative flex items-center justify-center lg:order-1">
                <FailoverAnimation />
              </div>
              <div className="lg:order-2">
                <span className="mb-4 inline-block font-mono text-sm text-pink-light">{PRODUCT_PAGE_CONTENT.why.features[1].number}</span>
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{PRODUCT_PAGE_CONTENT.why.features[1].title}</h3>
                <p className="mb-6 text-lg text-white/60">
                  {PRODUCT_PAGE_CONTENT.why.features[1].subtitle}
                </p>
                <ul className="space-y-3">
                  {PRODUCT_PAGE_CONTENT.why.features[1].points.map((point, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/70">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3: Migration - Content Left, Visual Right */}
            <div className="animate-fade-in-up grid items-center gap-12 lg:grid-cols-2" style={{ animationDelay: "200ms" }}>
              <div>
                <span className="mb-4 inline-block font-mono text-sm text-pink-light">{PRODUCT_PAGE_CONTENT.why.features[2].number}</span>
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{PRODUCT_PAGE_CONTENT.why.features[2].title}</h3>
                <p className="mb-6 text-lg text-white/60">
                  {PRODUCT_PAGE_CONTENT.why.features[2].subtitle}
                </p>
                <ul className="space-y-3">
                  {PRODUCT_PAGE_CONTENT.why.features[2].points.map((point, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/70">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Code Diff Animation */}
              <div className="relative flex items-center justify-center">
                <CodeMigrationAnimation />
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative py-20 md:py-28">
          <Container>
            <div className="animate-fade-in-up mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-pink-light">{PRODUCT_PAGE_CONTENT.how.label}</p>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {PRODUCT_PAGE_CONTENT.how.heading}
              </h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                {PRODUCT_PAGE_CONTENT.how.steps.map((item, i) => (
                  <div
                    key={item.step}
                    className="animate-fade-in-up group relative flex gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-light to-white opacity-30 blur-lg" />
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta text-xl font-bold text-white shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="animate-fade-in-up space-y-6" style={{ animationDelay: "200ms" }}>
                <CodeSnippetAnimation />
                <ConsoleDashboardAnimation />
              </div>
            </div>
          </Container>
        </section>


        {/* CTA Section */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {PRODUCT_PAGE_CONTENT.cta.headline}
              </h2>
              <p className="mb-10 text-lg text-white/60">
                {PRODUCT_PAGE_CONTENT.cta.subtitle}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href={PRODUCT_PAGE_CONTENT.cta.primaryCta.href}>
                  <Button size="lg" className="shadow-lg shadow-magenta/25 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40">
                    {PRODUCT_PAGE_CONTENT.cta.primaryCta.text}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href={PRODUCT_PAGE_CONTENT.cta.secondaryCta.href}>
                  <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    {PRODUCT_PAGE_CONTENT.cta.secondaryCta.text}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
    </PageShell>
  );
}
