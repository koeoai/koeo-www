import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Koeo - Unify Your GPU Infrastructure",
    template: "%s | Koeo",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description:
    "The runtime layer that brings fragmented GPUs together into one reliable inference fabric. Build faster, scale smarter with Koeo.",
  keywords: [
    "GPU infrastructure",
    "AI inference",
    "machine learning",
    "inference fabric",
    "GPU orchestration",
  ],
  authors: [{ name: "Koeo" }],
  creator: "Koeo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://koeo.ai",
    siteName: "Koeo",
    title: "Koeo - Unify Your GPU Infrastructure",
    description:
      "The runtime layer that brings fragmented GPUs together into one reliable inference fabric.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Koeo - Unify Your GPU Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koeo - Unify Your GPU Infrastructure",
    description:
      "The runtime layer that brings fragmented GPUs together into one reliable inference fabric.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
