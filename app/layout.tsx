import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PrivacyConsentBanner } from "@/components/privacy-consent-banner";
import { absoluteUrl, seoKeywords, siteConfig } from "@/lib/seo";

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
    languages: {
      fa: absoluteUrl("/fa"),
      en: absoluteUrl("/en")
    }
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
        <Header />
        {children}
        <Footer />
        <PrivacyConsentBanner />
      </body>
    </html>
  );
}
