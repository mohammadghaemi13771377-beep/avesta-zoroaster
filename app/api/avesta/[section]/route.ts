import { NextResponse } from "next/server";
import {
  getAvestaSection,
  getLocaleFromSearchParams,
  getSectionChapters,
  getSectionSampleVerse
} from "@/lib/avesta-repository";

type RouteContext = {
  params: {
    section: string;
  };
};

export async function GET(request: Request, { params }: RouteContext) {
  const { searchParams } = new URL(request.url);
  const locale = getLocaleFromSearchParams({
    lang: searchParams.get("lang") ?? undefined
  });
  const section = await getAvestaSection(params.section, locale);

  if (!section) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  const chapters = await getSectionChapters(params.section, locale);
  const sampleVerse = await getSectionSampleVerse(params.section, locale);

  return NextResponse.json({
    locale,
    section,
    chapters,
    sampleVerse
  });
}
