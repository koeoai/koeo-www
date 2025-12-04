"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { KoeoLogo } from "@/components/ui/KoeoLogo";

const COLORS = [
  {
    name: "Primary Purple",
    hex: "#7C3AED",
    usage: "Main brand color, primary CTAs, links",
  },
  {
    name: "Deep Purple",
    hex: "#4C1D95",
    usage: "Dark accents, depth, footer backgrounds",
  },
  {
    name: "Magenta",
    hex: "#E02F87",
    usage: "Accents, energy, highlights, gradient endpoints",
  },
  {
    name: "Light Pink",
    hex: "#F472B6",
    usage: "Hover states, subtle backgrounds",
  },
  {
    name: "Primary Text",
    hex: "#0F172A",
    usage: "Headings, body text on light backgrounds",
  },
  {
    name: "Light Text",
    hex: "#E2E8F0",
    usage: "Text on dark backgrounds",
  },
];

const LOGOS = [
  { name: "Logo Gradient", file: "/brand/logo-gradient.svg", bg: "bg-white" },
  { name: "Logo Black", file: "/brand/logo-black.svg", bg: "bg-white" },
  { name: "Logo White", file: "/brand/logo-white.svg", bg: "bg-slate-900" },
];

const ICONS = [
  { name: "Icon Gradient", file: "/brand/icon-gradient.svg", bg: "bg-white" },
  { name: "Icon Black", file: "/brand/icon-black.svg", bg: "bg-white" },
  { name: "Icon White", file: "/brand/icon-white.svg", bg: "bg-slate-900" },
];

function ColorSwatch({ color, index }: { color: typeof COLORS[0]; index: number }) {
  const [copied, setCopied] = React.useState(false);

  const copyHex = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={copyHex}
        className="relative mb-4 h-28 w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-light focus:ring-offset-2 focus:ring-offset-purple-deep"
        style={{ backgroundColor: color.hex }}
        aria-label={`Copy ${color.hex}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {copied ? (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-semibold text-white backdrop-blur-sm">
            ✓ Copied!
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white/0 transition-all group-hover:text-white/90">
            Click to copy
          </span>
        )}
      </button>
      <h4 className="font-semibold text-white">{color.name}</h4>
      <p className="font-mono text-sm text-pink-light">{color.hex}</p>
      <p className="mt-1 text-xs text-white/60">{color.usage}</p>
    </div>
  );
}

function AssetCard({ name, file, bg, index }: { name: string; file: string; bg: string; index: number }) {
  return (
    <div 
      className="group animate-fade-in-up overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`flex h-36 items-center justify-center ${bg} transition-transform duration-300 group-hover:scale-105`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={file} alt={name} className="h-14 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="flex items-center justify-between p-5">
        <span className="text-sm font-medium text-white">{name}</span>
        <a
          href={file}
          download
          className="rounded-full bg-gradient-to-r from-purple-primary to-magenta px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-magenta/20 transition-all duration-300 hover:scale-105 hover:shadow-magenta/40"
        >
          Download
        </a>
      </div>
    </div>
  );
}


function SectionHeader({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <div 
      className="animate-fade-in-up mb-10"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      <p className="max-w-2xl text-lg text-white/70">{description}</p>
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex-1 overflow-hidden">
        {/* Gradient Background */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, #2D1B4E 0%, #4C1D95 30%, #5B21B6 60%, #7C3AED 100%)"
            }}
          />
          {/* Animated gradient orbs */}
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-magenta/20 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-80 w-80 animate-pulse rounded-full bg-purple-primary/30 blur-3xl" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/2 h-72 w-72 animate-pulse rounded-full bg-pink-light/20 blur-3xl" style={{ animationDelay: "2s" }} />
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32">
          <Container>
            <div className="text-center">
              {/* Animated Logo */}
              <div className="mb-8 flex justify-center">
                <div className="animate-float">
                  <KoeoLogo size={64} variant="white" />
                </div>
              </div>
              
              {/* Badge */}
              <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                Official Brand Assets
              </div>

              <h1 className="animate-fade-in-up mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                Brand{" "}
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  Kit
                </span>
              </h1>
              <p className="animate-fade-in-up mx-auto max-w-2xl text-xl text-white/70" style={{ animationDelay: "200ms" }}>
                Everything you need to represent Koeo consistently across all platforms and materials.
              </p>
            </div>
          </Container>
        </section>

        {/* Logos Section */}
        <section className="relative py-16">
          <Container>
            <SectionHeader 
              title="Logos" 
              description="Full logo with wordmark. Use on marketing materials, presentations, and partnerships."
              index={0}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LOGOS.map((logo, i) => (
                <AssetCard key={logo.name} {...logo} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* Icons Section */}
        <section className="relative py-16">
          <Container>
            <SectionHeader 
              title="Icons" 
              description="Icon-only mark. Use for favicons, app icons, and small spaces."
              index={1}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ICONS.map((icon, i) => (
                <AssetCard key={icon.name} {...icon} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* Colors Section */}
        <section className="relative py-16">
          <Container>
            <SectionHeader 
              title="Color Palette" 
              description="Official Koeo colors. Click any swatch to copy the hex value."
              index={2}
            />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {COLORS.map((color, i) => (
                <ColorSwatch key={color.hex} color={color} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* Gradient Section */}
        <section className="relative py-16">
          <Container>
            <SectionHeader 
              title="Primary Gradient" 
              description="The signature Koeo gradient used for CTAs and accent elements."
              index={3}
            />
            <div className="animate-fade-in-up overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm" style={{ animationDelay: "150ms" }}>
              <div className="relative h-40 overflow-hidden bg-gradient-to-r from-purple-primary to-magenta">
                {/* Animated shine effect */}
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              <div className="bg-white/5 p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-white">CSS</h4>
                    <code className="block rounded-xl bg-purple-deep/50 p-4 text-sm text-pink-light">
                      background: linear-gradient(135deg, #7C3AED, #E02F87);
                    </code>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-white">Tailwind</h4>
                    <code className="block rounded-xl bg-purple-deep/50 p-4 text-sm text-pink-light">
                      bg-gradient-to-br from-[#7C3AED] to-[#E02F87]
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>


        {/* Typography Section */}
        <section className="relative py-16">
          <Container>
            <SectionHeader 
              title="Typography" 
              description="Font families and weights used across Koeo."
              index={4}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="animate-fade-in-up group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10">
                <h3 className="mb-6 text-lg font-semibold text-pink-light">Primary Font</h3>
                <p className="mb-4 text-5xl font-bold text-white transition-transform duration-300 group-hover:scale-105">Inter</p>
                <p className="mb-6 text-white/60">Used for all body text, headings, and UI elements.</p>
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <p className="font-normal text-white/80">Regular (400) — Body text</p>
                  <p className="font-medium text-white/80">Medium (500) — Navigation, emphasis</p>
                  <p className="font-semibold text-white/80">Semi-Bold (600) — Subheadings, buttons</p>
                  <p className="font-bold text-white/80">Bold (700) — Main headings</p>
                </div>
              </div>
              <div className="animate-fade-in-up group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10" style={{ animationDelay: "100ms" }}>
                <h3 className="mb-6 text-lg font-semibold text-pink-light">Logo Font</h3>
                <p className="mb-4 text-5xl font-black text-white transition-transform duration-300 group-hover:scale-105" style={{ fontFamily: "Outfit, system-ui, sans-serif" }}>Outfit</p>
                <p className="mb-6 text-white/60">Used exclusively for the Koeo wordmark.</p>
                <div className="space-y-3 border-t border-white/10 pt-6">
                  <p className="text-white/80">Weight: <span className="font-semibold text-pink-light">900 (Black)</span></p>
                  <p className="text-white/80">Letter-spacing: <span className="font-semibold text-pink-light">-0.03em</span></p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Usage Guidelines */}
        <section className="relative py-16 pb-24">
          <Container>
            <SectionHeader 
              title="Usage Guidelines" 
              description="Best practices for using Koeo brand assets."
              index={5}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="animate-fade-in-up group overflow-hidden rounded-3xl border border-green-500/30 bg-green-500/10 p-8 backdrop-blur-sm transition-all duration-300 hover:border-green-400/50 hover:bg-green-500/15">
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-green-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Do
                </h3>
                <ul className="space-y-3 text-green-100/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                    Use the gradient logo on light backgrounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                    Use the white logo on dark or colored backgrounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                    Maintain clear space around the logo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                    Use official colors from the palette
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                    Keep the logo proportions intact
                  </li>
                </ul>
              </div>
              <div className="animate-fade-in-up group overflow-hidden rounded-3xl border border-red-500/30 bg-red-500/10 p-8 backdrop-blur-sm transition-all duration-300 hover:border-red-400/50 hover:bg-red-500/15" style={{ animationDelay: "100ms" }}>
                <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-red-400">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  Don&apos;t
                </h3>
                <ul className="space-y-3 text-red-100/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                    Stretch or distort the logo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                    Change the logo colors outside the palette
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                    Add effects like shadows or outlines
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                    Place the logo on busy backgrounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                    Rotate or flip the logo
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
