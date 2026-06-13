import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-home";
import { dictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dictionary.en.homeSeoTitle,
  description: dictionary.en.homeSeoDescription,
  alternates: {
    canonical: "/en",
    languages: {
      fa: "/fa",
      en: "/en"
    }
  }
};

export default function EnglishHomePage() {
  return <LocalizedHome locale="en" />;
}
