import { NextResponse } from "next/server";
import { profileSnapshot } from "@/lib/sample-content";

export async function GET() {
  return NextResponse.json({
    source: "local-sample-profile",
    nextSource: "User, Bookmark, ReadingProgress and ReadingPreference Prisma models",
    endpoints: {
      achievements: "/api/profile/achievements",
      bookmarks: "/api/profile/bookmarks",
      progress: "/api/profile/progress",
      settings: "/api/profile/settings"
    },
    profile: profileSnapshot
  });
}
