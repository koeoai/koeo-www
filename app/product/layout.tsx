import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, SoftwareApplicationSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "Koeo Inference Runtime - Managed GPU API | Koeo",
  description:
    "A managed inference runtime that turns your models into reliable APIs. OpenAI-compatible, zero migration friction. Send requests, get responses, no GPU management.",
  keywords: [
    "inference runtime",
    "GPU API",
    "model serving",
    "OpenAI compatible",
    "inference provider",
    "managed GPU",
    "AI inference API",
    "serverless inference",
    "LLM hosting",
    "model deployment",
  ],
  path: "/product",
});

const softwareApplicationSchema: SoftwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Koeo Inference Runtime",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cloud-based",
  description:
    "A managed inference runtime that turns your AI models into reliable APIs. OpenAI-compatible with zero migration friction.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      {children}
    </>
  );
}
