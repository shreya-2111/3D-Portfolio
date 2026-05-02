import PortfolioPage from "@/components/portfolio/PortfolioPage";
import { portfolioData } from "@/data/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sumit-tirmare.vercel.app";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.hero.name,
    jobTitle: portfolioData.hero.title,
    description: portfolioData.hero.tagline,
    email: portfolioData.contact.email,
    telephone: portfolioData.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad, Gujarat",
      addressCountry: "IN",
    },
    url: siteUrl,
    sameAs: portfolioData.socials.map((item) => item.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioPage />
    </>
  );
}
