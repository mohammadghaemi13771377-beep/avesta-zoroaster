import { NextResponse } from "next/server";
import { defaultLocale, localeConfig, locales, localizedRoutes } from "@/lib/i18n";

export async function GET() {
  return NextResponse.json({
    defaultLocale,
    locales,
    localeConfig,
    localizedRoutes,
    strategy:
      "Localized entry pages for /fa and /en, lang query support for shared routes, and database translations for long-form content"
  });
}
