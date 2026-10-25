import { Approach } from "@/components/Approach";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Statement } from "@/components/Statement";
import { Work } from "@/components/Work";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/og.png`,
};

export default function Home() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-light-50 focus:px-5 focus:py-3 focus:text-black">
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Capabilities />
        <Work />
        <Approach />
        <Contact />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
