import { NextResponse } from "next/server";
import { getAvestaSections, getLocaleFromSearchParams } from "@/lib/avesta-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = getLocaleFromSearchParams({
    lang: searchParams.get("lang") ?? undefined
  });
  const sections = await getAvestaSections(locale);

  return NextResponse.json({
    locale,
    source: "Prisma when DATABASE_URL is available, sample content fallback otherwise",
    sections
  });
}
