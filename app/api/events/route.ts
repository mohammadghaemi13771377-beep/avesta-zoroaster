import { NextResponse } from "next/server";
import { collectClientEvent, getCollectedEvents, getEventCollectorSummary } from "@/lib/event-collector";

export async function POST(request: Request) {
  let body: unknown = null;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const event = collectClientEvent(body);

  return NextResponse.json(
    {
      ok: event.accepted,
      event,
      summary: getEventCollectorSummary(),
    },
    { status: event.accepted ? 202 : 422 }
  );
}

export function GET() {
  return NextResponse.json({
    source: "local-first-party-event-collector",
    summary: getEventCollectorSummary(),
    events: getCollectedEvents().slice(0, 50),
  });
}
