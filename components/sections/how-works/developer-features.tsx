import Link from "next/link";
import { cn } from "@/lib/utils";

const DEVELOPER_FEATURES = [
  {
    title: "OpenAI-compatible API",
    description:
      "Once you're onboarded to the beta, you'll get OpenAI-style endpoints you can plug into existing clients and SDKs. In most cases you just update the base URL and auth, and keep the rest of your code the same.",
    link: { text: "View API Docs", href: "/docs/api" },
  },
  {
    title: "Early-access dashboard",
    description:
      "Beta users get access to an evolving dashboard to monitor usage, latency and error rates, and to manage keys and models. We're iterating quickly here, and your feedback directly shapes what we build next.",
    link: { text: "Request Dashboard Access", href: "/beta" },
  },
];

export interface DeveloperFeaturesProps {
  className?: string;
}

export function DeveloperFeatures({ className }: DeveloperFeaturesProps) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 lg:col-span-2", className)}>
      {DEVELOPER_FEATURES.map((feature) => (
        <div
          key={feature.title}
          className="group relative rounded-2xl border border-purple-primary/10 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-primary/30 hover:bg-white/80 hover:shadow-lg"
        >
          {/* Glow effect on hover */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-primary/10 to-magenta/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative">
            {/* Checkmark icon */}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-primary to-magenta shadow-md">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-bold text-text-primary">
              {feature.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-text-primary/70">
              {feature.description}
            </p>
            <Link
              href={feature.link.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-purple-primary transition-colors hover:text-magenta"
            >
              {feature.link.text}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
