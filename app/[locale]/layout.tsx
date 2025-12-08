/**
 * Locale-aware Layout
 *
 * Wraps all pages within a locale segment with the LocaleProvider.
 * Updates HTML lang attribute based on the current locale.
 *
 * Requirements: 2.3
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { LocaleProvider, i18nConfig, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { seoConfig } from "@/lib/seo/config";
import { JsonLd, OrganizationSchema, WebSiteSchema } from "@/components/seo/json-ld";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: seoConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: seoConfig.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: seoConfig.twitterHandle,
    creator: seoConfig.twitterHandle,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization structured data for the homepage
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/brand/logo-gradient.png`,
  description: seoConfig.defaultDescription,
  sameAs: seoConfig.socialProfiles,
} satisfies OrganizationSchema;

// WebSite structured data with search action
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${seoConfig.siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
} satisfies WebSiteSchema;

/**
 * Generate static params for all supported locales
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale - show 404 for invalid locales
  if (!isValidLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  return (
    <html lang={validLocale}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LocaleProvider locale={validLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
