import * as React from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  rootClassName?: string;
}

export function PageShell({ children, className, rootClassName }: PageShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", rootClassName)}>
      <Header />
      <main className={cn("flex-1", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
