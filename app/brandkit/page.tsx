"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

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
  { name: "Logo Gradient", svg: "/brand/logo-gradient.svg", png: "/brand/logo-gradient.png", bg: "bg-white" },
  { name: "Logo Black", svg: "/brand/logo-black.svg", png: "/brand/logo-black.png", bg: "bg-white" },
  { name: "Logo White", svg: "/brand/logo-white.svg", png: "/brand/logo-white.png", bg: "bg-slate-900" },
  { name: "Logo on Gradient", svg: "/brand/logo-white.svg", png: "/brand/logo-on-gradient.png", bg: "", useGradientBg: true },
];

const ICON_VARIANTS = [
  {
    name: "Icon Gradient",
    baseName: "icon-gradient",
    svg: "/brand/icon-gradient.svg",
    bg: "bg-white",
  },
  {
    name: "Icon Black",
    baseName: "icon-black",
    svg: "/brand/icon-black.svg",
    bg: "bg-white",
  },
  {
    name: "Icon White",
    baseName: "icon-white",
    svg: "/brand/icon-white.svg",
    bg: "bg-slate-900",
  },
  {
    name: "Icon on Gradient",
    baseName: "icon-on-gradient",
    svg: "/brand/icon-on-gradient.svg",
    bg: "bg-slate-100",
  },
];

const ICON_SIZES = [
  { key: "favicon", label: "Favicon", size: "16×16" },
  { key: "small", label: "Small", size: "32×32" },
  { key: "medium", label: "Medium", size: "128×128" },
  { key: "large", label: "Large", size: "512×512" },
];

const BANNER_SIZES = [
  {
    name: "Wide",
    description: "YouTube, LinkedIn cover, website headers",
    dimensions: "1500×500",
    baseName: "banner-wide",
    aspectRatio: "3/1",
  },
  {
    name: "Social",
    description: "Twitter/X header, Open Graph images",
    dimensions: "1200×630",
    baseName: "banner-social",
    aspectRatio: "1200/630",
  },
  {
    name: "Square",
    description: "Instagram, profile backgrounds",
    dimensions: "1200×1200",
    baseName: "banner-square",
    aspectRatio: "1/1",
  },
];

const BANNER_VARIANTS = [
  { key: "logo", label: "Logo", description: "Centered logo" },
  { key: "plain", label: "Plain", description: "No logo" },
  { key: "mantra", label: "Mantra", description: "With tagline" },
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

function AssetCard({ name, svg, png, bg, index, useGradientBg }: { name: string; svg: string; png: string; bg: string; index: number; useGradientBg?: boolean }) {
  return (
    <div 
      className="group animate-fade-in-up overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div 
        className={`flex h-36 items-center justify-center ${useGradientBg ? "" : bg} transition-transform duration-300 group-hover:scale-105`}
        style={useGradientBg ? { background: "linear-gradient(135deg, #7C3AED, #E02F87)" } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={svg} alt={name} className="h-14 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-5">
        <span className="mb-3 block text-sm font-medium text-white">{name}</span>
        <div className="flex gap-2">
          <a
            href={svg}
            download
            className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-center text-xs text-white/80 transition-all hover:bg-gradient-to-r hover:from-purple-primary hover:to-magenta hover:text-white"
          >
            SVG
          </a>
          <a
            href={png}
            download
            className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-center text-xs text-white/80 transition-all hover:bg-gradient-to-r hover:from-purple-primary hover:to-magenta hover:text-white"
          >
            PNG
          </a>
        </div>
      </div>
    </div>
  );
}

function IconCard({ icon, index }: { icon: typeof ICON_VARIANTS[0]; index: number }) {
  return (
    <div 
      className="group animate-fade-in-up overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-pink-light/30 hover:bg-white/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`flex h-36 items-center justify-center ${icon.bg} transition-transform duration-300 group-hover:scale-105`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon.svg} alt={icon.name} className="h-14 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-5">
        <span className="mb-3 block text-sm font-medium text-white">{icon.name}</span>
        <div className="mb-2">
          <span className="mb-2 block text-xs text-white/50">SVG (scalable)</span>
          <a
            href={icon.svg}
            download
            className="block w-full rounded-lg bg-white/5 px-3 py-2 text-center text-xs text-white/80 transition-all hover:bg-gradient-to-r hover:from-purple-primary hover:to-magenta hover:text-white"
          >
            Download SVG
          </a>
        </div>
        <div>
          <span className="mb-2 block text-xs text-white/50">PNG (by size)</span>
          <div className="grid grid-cols-2 gap-2">
            {ICON_SIZES.map((size) => (
              <a
                key={size.key}
                href={`/brand/${icon.baseName}-${size.key}.png`}
                download
                className="flex items-center justify-center gap-1 rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white/80 transition-all hover:bg-gradient-to-r hover:from-purple-primary hover:to-magenta hover:text-white"
              >
                <span className="font-medium">{size.label}</span>
                <span className="text-white/50">{size.size}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function BannerSizeCard({ size, index }: { size: typeof BANNER_SIZES[0]; index: number }) {
  const [selectedVariant, setSelectedVariant] = React.useState("logo");
  const currentSvg = `/brand/${size.baseName}-${selectedVariant}.svg`;
  const currentPng = `/brand/${size.baseName}-${selectedVariant}.png`;

  return (
    <div 
      className="animate-fade-in-up overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div 
        className="relative overflow-hidden bg-purple-deep/30"
        style={{ aspectRatio: size.aspectRatio }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={currentSvg} 
          alt={`${size.name} Banner - ${selectedVariant}`} 
          className="h-full w-full object-cover" 
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-white">{size.name} Banner</span>
          <span className="text-xs text-white/50">{size.dimensions}</span>
        </div>
        <p className="mb-4 text-xs text-white/60">{size.description}</p>
        
        <div className="mb-4">
          <span className="mb-2 block text-xs text-white/50">Variant</span>
          <div className="flex gap-2">
            {BANNER_VARIANTS.map((variant) => (
              <button
                key={variant.key}
                onClick={() => setSelectedVariant(variant.key)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs transition-all ${
                  selectedVariant === variant.key
                    ? "bg-gradient-to-r from-purple-primary to-magenta text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <a
            href={currentSvg}
            download
            className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-center text-xs text-white/80 transition-all hover:bg-gradient-to-r hover:from-purple-primary hover:to-magenta hover:text-white"
          >
            SVG
          </a>
          <a
            href={currentPng}
            download
            className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-center text-xs text-white/80 transition-all hover:bg-gradient-to-r hover:from-purple-primary hover:to-magenta hover:text-white"
          >
            PNG
          </a>
        </div>
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
      <p className="text-lg text-white/70 whitespace-nowrap">{description}</p>
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
              {/* Badge */}
              <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-light opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-light" />
                </span>
                Official brand assets
              </div>

              <h1 className="animate-fade-in-up mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl" style={{ animationDelay: "100ms" }}>
                Brand
                <span className="bg-gradient-to-r from-purple-primary via-magenta to-pink-light bg-clip-text text-transparent">
                  kit
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
              description="Icon-only mark. Use for favicons, app icons, profile pictures, and social media platforms."
              index={1}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ICON_VARIANTS.map((icon, i) => (
                <IconCard key={icon.name} icon={icon} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* Banners Section */}
        <section className="relative py-16">
          <Container>
            <SectionHeader 
              title="Banners" 
              description="Neural network-themed banners for social media, headers, and marketing materials."
              index={2}
            />
            <div className="space-y-6">
              {BANNER_SIZES.map((size, i) => (
                <BannerSizeCard key={size.name} size={size} index={i} />
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
              index={3}
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
              index={4}
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
        <section className="relative py-16 pb-24">
          <Container>
            <SectionHeader 
              title="Typography" 
              description="Font families and weights used across Koeo."
              index={5}
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


      </main>
      <Footer />
    </div>
  );
}
