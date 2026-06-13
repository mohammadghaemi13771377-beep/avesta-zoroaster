import { NextResponse } from "next/server";
import { getLocaleFromSearchParams, getVerseBySlugs } from "@/lib/avesta-repository";
import { getMediaAssetsForVerse } from "@/lib/media-repository";

type RouteContext = {
  params: {
    section: string;
    chapter: string;
    verse: string;
  };
};

export async function GET(request: Request, { params }: RouteContext) {
  const { searchParams } = new URL(request.url);
  const locale = getLocaleFromSearchParams({
    lang: searchParams.get("lang") ?? undefined
  });
  const verse = await getVerseBySlugs(params.section, params.chapter, params.verse, locale);
  const verseOrder = Number(params.verse.replace("verse-", ""));
  const media = Number.isNaN(verseOrder)
    ? []
    : await getMediaAssetsForVerse(params.section, params.chapter, verseOrder);

  if (!verse) {
    return NextResponse.json({ error: "Verse not found" }, { status: 404 });
  }

  return NextResponse.json({
    locale,
    verse,
    media
  });
}
