import type { Metadata } from "next";
import { LocalizationHubBoard } from "@/components/admin/localization-hub-board";
import { getLocalizationItems } from "@/lib/localization-hub";

export const metadata: Metadata = {
  title: "Localization Hub | AVESTA-ZOROASTER Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLocalizationPage() {
  return <LocalizationHubBoard items={getLocalizationItems()} />;
}
