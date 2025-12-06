import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { seoConfig } from "@/lib/seo/config";
import { JsonLd, OrganizationSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "Careers at Koeo - Build AI Infrastructure | Koeo",
  description:
    "Join Koeo and build the future of AI infrastructure. We're looking for talented people passionate about GPU orchestration, distributed systems, and making AI accessible.",
  keywords: [
    "Koeo careers",
    "AI infrastructure jobs",
    "GPU startup jobs",
    "distributed systems jobs",
    "AI startup careers",
    "machine learning jobs",
    "infrastructure engineer",
    "remote AI jobs",
  ],
  path: "/careers",
});

const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  logo: `${seoConfig.siteUrl}/brand/logo-gradient.png`,
  description:
    "Koeo is building the future of AI infrastructure. We make it effortless to run real AI in the real world.",
  sameAs: seoConfig.socialProfiles,
};

export default function CareersLayout({
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
