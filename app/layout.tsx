import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PrivacyConsentBanner } from "@/components/privacy-consent-banner";
import { absoluteUrl, languageAlternates, organizationJsonLd, seoKeywords, siteConfig, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  alternates: {
    canonical: absoluteUrl("/"),
    languages: languageAlternates
  },
  openGraph: {
    title: siteConfig.name,
    description: "جهان دیجیتال سینمایی برای اوستا، زرتشت و خرد ایران باستان.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{const p=location.pathname;const en=p==='/en'||p.startsWith('/en/');document.documentElement.lang=en?'en':'fa';document.documentElement.dir=en?'ltr':'rtl';}catch(e){}})();"
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <Header />
        {children}
        <Footer />
        <PrivacyConsentBanner />
      </body>
    </html>
  );
}
