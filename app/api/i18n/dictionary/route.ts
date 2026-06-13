import { NextResponse } from "next/server";
import { dictionary, isLocale, localeConfig } from "@/lib/i18n";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "fa";

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Unsupported locale" }, { status: 400 });
  }

  return NextResponse.json({
    locale,
    config: localeConfig[locale],
    dictionary: dictionary[locale]
  });
}
