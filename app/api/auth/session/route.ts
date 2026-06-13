import { NextResponse } from "next/server";
import { getDemoSession } from "@/lib/auth";

export async function GET() {
  const session = getDemoSession();

  return NextResponse.json({
    authenticated: Boolean(session),
    session
  });
}
