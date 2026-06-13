import { NextResponse } from "next/server";
import { buildSearchDocuments, searchIndexes } from "@/lib/search";

export async function POST() {
  const documents = buildSearchDocuments();

  return NextResponse.json({
    ok: true,
    mode: "dry-run",
    message: "در نسخه واقعی، این endpoint داده‌های Prisma را به Meilisearch sync می‌کند.",
    indexCount: searchIndexes.length,
    documentCount: documents.length,
    indexes: searchIndexes.map((index) => index.uid)
  });
}
