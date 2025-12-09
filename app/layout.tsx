/**
 * Root Layout
 *
 * This is a minimal root layout that serves as a pass-through.
 * The actual layout with locale support is in app/[locale]/layout.tsx.
 *
 * This layout exists to satisfy Next.js requirements for a root layout
 * while delegating all actual rendering to the locale-specific layout.
 */

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
