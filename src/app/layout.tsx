import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Montserrat } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Brand type from design-system/tokens/fonts.css, self-hosted at build time.
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-montserrat" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-sans" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Custom props, 3D printing & UV printing`, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
    // Rendered from og/card.html. Give a new card a new filename so cached previews refresh.
    images: [{ url: "/og-v2.jpg", width: 1200, height: 630, alt: "Layer & Light Fabrication: Ideas, built layer by layer." }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og-v2.jpg"] },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" id="top" className={`${montserrat.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
