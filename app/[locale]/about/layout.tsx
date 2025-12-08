import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/config";
import { JsonLd, OrganizationSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us - Our Mission & Principles | Koeo",
  description:
    "Learn about Koeo's mission to make AI infrastructure effortless. We build reliable GPU orchestration so teams can focus on shipping AI products, not managing clusters.",
  keywords: [
    "Koeo mission",
    "AI infrastructure company",
    "GPU orchestration",
    "Koeo team",
    "AI startup",
    "inference runtime company",
    "distributed compute",
    "model serving platform",
  ],
  path: "/about",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/brand/logo-gradient.png`,
  description:
    "Koeo makes it effortless to run real AI in the real world. We take the painful parts of AI infrastructure off your plate so you can focus on your customers, not your clusters.",
  sameAs: seoConfig.socialProfiles,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@koeo.ai",
  },
} satisfies OrganizationSchema;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      {children}
    </>
  );
}
