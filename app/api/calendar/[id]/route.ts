import { NextResponse } from "next/server";
import { getSacredCalendarEvent } from "@/lib/sacred-calendar";

type RouteContext = {
  params: {
    id: string;
  };
};

export function GET(_request: Request, { params }: RouteContext) {
  const event = getSacredCalendarEvent(params.id);

  if (!event) {
    return NextResponse.json({ error: "Calendar event not found" }, { status: 404 });
  }

  return NextResponse.json({
    source: "local-sacred-calendar-event",
    nextSource: "CMS event detail, seasonal campaigns and shop collection pages",
    event,
  });
}
