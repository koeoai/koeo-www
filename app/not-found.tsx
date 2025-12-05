import Link from "next/link";
import { InteractiveNetworkCanvas } from "@/components/ui/interactive-network-canvas";

export default function NotFound() {
  return (
    <InteractiveNetworkCanvas mode="lost-node" className="min-h-screen">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-light/30 bg-purple-deep/50 px-4 py-1.5 text-sm text-pink-light backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
            </span>
            404 · Node unreachable
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            This node isn&apos;t on the grid
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-4 max-w-lg text-lg text-text-light/80 sm:text-xl">
            The page you&apos;re looking for isn&apos;t part of this cluster anymore.
          </p>

          {/* Helper line */}
          <p className="mx-auto mb-10 max-w-md text-base text-text-light/60">
            Let&apos;s route you back to where the compute is actually happening.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-primary to-magenta px-8 font-semibold text-white transition-all hover:scale-105 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              Back to Home
            </Link>
            <Link
              href="/beta"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-light focus-visible:ring-offset-2"
            >
              Join the Beta
            </Link>
          </div>

          {/* Status line */}
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-text-light/50">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-magenta" />
            Connection status:{" "}
            <span className="inline-flex items-center gap-1 text-magenta">
              retrying route
              <span className="inline-flex">
                <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
              </span>
            </span>
          </p>
        </div>
      </div>
    </InteractiveNetworkCanvas>
  );
}
