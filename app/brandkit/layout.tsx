import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Brand Kit - Koeo Logo & Assets | Koeo",
  description:
    "Official Koeo brand assets including logos, icons, colors, and typography guidelines. Download SVG and PNG files for marketing and partnership materials.",
  keywords: ["Koeo brand", "Koeo logo", "brand assets", "logo download"],
  path: "/brandkit",
  noIndex: true,
});

export default function BrandkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
