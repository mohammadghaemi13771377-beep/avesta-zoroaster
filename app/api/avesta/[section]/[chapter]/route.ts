import { NextResponse } from "next/server";
import {
  getAvestaSection,
  getLocaleFromSearchParams,
  getSectionChapters,
  getVerseBySlugs
} from "@/lib/avesta-repository";
import { getAvestaChapterGuide } from "@/lib/avesta-chapter-guides";
import { getAvestaChapterProfile } from "@/lib/avesta-chapter-profiles";

type RouteContext = {
  params: {
    section: string;
    chapter: string;
  };
};

export async function GET(request: Request, { params }: RouteContext) {
  const { searchParams } = new URL(request.url);
  const locale = getLocaleFromSearchParams({
    lang: searchParams.get("lang") ?? undefined
  });
  const section = await getAvestaSection(params.section, locale);
  const chapters = await getSectionChapters(params.section, locale);
  const chapter = chapters.find((item) => item.slug === params.chapter);

  if (!section || !chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  const firstVerseSlug = chapter.verses[0]?.slug ?? "verse-1";
  const sampleVerse = await getVerseBySlugs(params.section, params.chapter, firstVerseSlug, locale);
  const visualGuide = getAvestaChapterGuide(params.section, params.chapter) ?? null;
  const profile = getAvestaChapterProfile(params.section, params.chapter) ?? null;

  return NextResponse.json({
    locale,
    section,
    chapter,
    visualGuide,
    profile,
    sampleVerse
  });
}
