import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, FAQPageSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = generatePageMetadata({
  title: "Become a GPU Provider - Monetize Your Infrastructure | Koeo",
  description:
    "Join Koeo's federated GPU network. Contribute compute capacity and earn revenue while helping developers build AI products. Zero customer acquisition overhead.",
  keywords: [
    "GPU provider",
    "inference provider",
    "GPU monetization",
    "compute provider",
    "GPU network",
    "data center partnership",
    "GPU revenue",
    "distributed compute",
    "AI infrastructure partner",
  ],
  path: "/providers",
});

const faqPageSchema: FAQPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of GPUs do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We accept a wide range of NVIDIA GPUs, from consumer-grade cards like RTX 3090/4090 to data center GPUs like A100 and H100. The key requirement is reliable connectivity and availability.",
      },
    },
    {
      "@type": "Question",
      name: "How does payment work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You earn revenue based on the compute time your GPUs provide. We handle all billing with end customers and pay you monthly based on actual usage.",
      },
    },
    {
      "@type": "Question",
      name: "What are the technical requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll need a stable internet connection, compatible NVIDIA GPUs with up-to-date drivers, and the ability to run our lightweight agent software. We'll help you get set up.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I earn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Earnings depend on your GPU type, availability, and market demand. Data center GPUs typically earn more, but even consumer GPUs can generate meaningful revenue during peak demand.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Workloads run in isolated containers, and we never store customer data on provider hardware beyond the active session. We take security seriously.",
      },
    },
  ],
};

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={faqPageSchema} />
      {children}
    </>
  );
}
