import { NextResponse } from "next/server";
import { getWisdomCapsule } from "@/lib/wisdom-capsule";

export function GET() {
  return NextResponse.json({
    source: "local-wisdom-capsule",
    capsule: getWisdomCapsule(),
    nextSource: "Personalized micro-learning, push reminders and social campaign scheduler",
  });
}
