"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { KoeoLogo } from "@/components/ui/KoeoLogo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Product", href: "/product" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 z-50 -translate-x-1/2",
        className
      )}
    >
      <nav className="flex h-14 items-center gap-8 rounded-full border border-white/10 bg-purple-deep/40 px-6 backdrop-blur-xl" aria-label="Main navigation">
        {/* Logo - optical alignment adjustment */}
        <Link href="/" aria-label="Koeo home" style={{ marginTop: "-4px" }}>
          <KoeoLogo size={26} showWordmark variant="white" />
        </Link>

        {/* Desktop Links */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hidden text-sm font-medium text-text-light/90 transition-colors hover:text-pink-light md:block"
          >
            {item.label}
          </Link>
        ))}

        <Button asChild className="hidden md:inline-flex">
          <Link href="/get-started">Get Started</Link>
        </Button>

        {/* Mobile Menu */}
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                  className="text-text-light hover:bg-white/10 hover:text-text-light"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-text-primary transition-colors hover:text-pink-light py-2"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4">
                    <Link href="/get-started" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </nav>
    </header>
  );
}
