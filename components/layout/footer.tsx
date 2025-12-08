"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { KoeoLogo } from "@/components/ui/KoeoLogo";
import {
  TwitterIcon,
  LinkedInIcon,
  DiscordIcon,
  RedditIcon,
  ExternalLinkIcon,
} from "@/components/ui/icons";
import { LocaleLink } from "@/components/ui/locale-link";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Join Beta", href: "/beta" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Suggest an Idea", href: "https://github.com/koeo-ai/feedback", external: true },
      { label: "Report a Bug", href: "https://github.com/koeo-ai/feedback/issues", external: true },
      { label: "Brandkit", href: "/brandkit" },
      { label: "Become a Provider", href: "/providers" },
    ],
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Twitter",
    href: "https://twitter.com/koeo_ai",
    icon: <TwitterIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/koeoai",
    icon: <LinkedInIcon />,
  },
  {
    label: "Discord",
    href: "https://discord.gg/koeo",
    icon: <DiscordIcon />,
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/r/koeo/",
    icon: <RedditIcon />,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <LocaleLink href="/" aria-label="Koeo home">
              <KoeoLogo size={32} showWordmark variant="white" />
            </LocaleLink>
            <p className="mt-4 text-sm text-text-light/80 max-w-xs">
              One runtime, any model, no infra headaches.
            </p>
          </div>

          {/* Link Groups */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-text-light/80 transition-colors hover:text-pink-light"
                      >
                        {link.label}
                        <ExternalLinkIcon />
                      </a>
                    ) : (
                      <LocaleLink
                        href={link.href}
                        className="text-sm text-text-light/80 transition-colors hover:text-pink-light"
                      >
                        {link.label}
                      </LocaleLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-text-light/80 transition-all hover:bg-white/10 hover:text-pink-light"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
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
