import type { Metadata } from "next";
import { LocalizedHome } from "@/components/localized-home";
import { dictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: dictionary.fa.homeSeoTitle,
  description: dictionary.fa.homeSeoDescription,
  alternates: {
    canonical: "/fa",
    languages: {
      fa: "/fa",
      en: "/en"
    }
  }
};

export default function PersianHomePage() {
  return <LocalizedHome locale="fa" />;
}
