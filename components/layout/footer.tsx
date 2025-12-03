import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { KoeoLogo } from "@/components/ui/KoeoLogo";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

const footerGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-purple-deep text-text-light",
        className
      )}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Koeo home">
              <KoeoLogo size={32} showWordmark variant="white" />
            </Link>
            <p className="mt-4 text-sm text-text-light/80 max-w-xs">
              The runtime layer that brings fragmented GPUs together into one reliable inference fabric.
            </p>
          </div>

          {/* Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-light/80 transition-colors hover:text-pink-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-text-light/60">
            © {currentYear} Koeo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
