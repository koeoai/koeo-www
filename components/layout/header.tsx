"use client";

import * as React from "react";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { KoeoLogo } from "@/components/ui/KoeoLogo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LocaleLink } from "@/components/ui/locale-link";

interface NavItem {
  label: string;
  href: string;
}

interface DropdownItem {
  label: string;
  items: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Product", href: "/product" },
];

const COMPANY_DROPDOWN: DropdownItem = {
  label: "Company",
  items: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
};

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [companyOpen, setCompanyOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 z-50 -translate-x-1/2",
        className
      )}
    >
      <nav className="flex h-14 items-center gap-8 rounded-full border border-white/10 bg-purple-deep/40 px-6 backdrop-blur-xl" aria-label="Main navigation">
        {/* Logo - optical alignment adjustment */}
        <LocaleLink href="/" aria-label="Koeo home" style={{ marginTop: "-4px" }}>
          <KoeoLogo size={26} showWordmark variant="white" />
        </LocaleLink>

        {/* Desktop Links */}
        {NAV_ITEMS.map((item) => (
          <LocaleLink
            key={item.href}
            href={item.href}
            className="hidden text-sm font-medium text-text-light/90 transition-colors hover:text-pink-light md:block"
          >
            {item.label}
          </LocaleLink>
        ))}

        {/* Company Dropdown - Desktop */}
        <div 
          className="relative hidden md:block"
          onMouseEnter={() => setCompanyOpen(true)}
          onMouseLeave={() => setCompanyOpen(false)}
        >
          <button
            className="flex items-center gap-1 text-sm font-medium text-text-light/90 transition-colors hover:text-pink-light"
            aria-expanded={companyOpen}
            aria-haspopup="true"
          >
            {COMPANY_DROPDOWN.label}
            <ChevronDown className={cn("h-4 w-4 transition-transform", companyOpen && "rotate-180")} />
          </button>
          
          {companyOpen && (
            <div className="absolute left-1/2 top-full pt-2 -translate-x-1/2">
              <div className="min-w-[140px] rounded-xl border border-white/10 bg-purple-deep/90 p-2 backdrop-blur-xl shadow-lg">
                {COMPANY_DROPDOWN.items.map((item) => (
                  <LocaleLink
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-text-light/90 transition-colors hover:bg-white/10 hover:text-pink-light"
                  >
                    {item.label}
                  </LocaleLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher - Desktop */}
        <LanguageSwitcher className="hidden md:flex" />

        <Button asChild className="hidden md:inline-flex">
          <LocaleLink href="/beta">Join Beta</LocaleLink>
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
                  {NAV_ITEMS.map((item) => (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-text-primary transition-colors hover:text-pink-light py-2"
                    >
                      {item.label}
                    </LocaleLink>
                  ))}
                  {/* Company section - Mobile */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm font-medium text-text-primary/60 mb-2">{COMPANY_DROPDOWN.label}</p>
                    {COMPANY_DROPDOWN.items.map((item) => (
                      <LocaleLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-medium text-text-primary transition-colors hover:text-pink-light py-2 pl-2"
                      >
                        {item.label}
                      </LocaleLink>
                    ))}
                  </div>
                  <Button asChild className="mt-4">
                    <LocaleLink href="/beta" onClick={() => setIsOpen(false)}>
                      Join Beta
                    </LocaleLink>
                  </Button>
                  {/* Language Switcher - Mobile */}
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <p className="text-sm font-medium text-text-primary/60 mb-2">Language</p>
                    <LanguageSwitcher variant="mobile" showIcon={false} />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </nav>
    </header>
  );
}
