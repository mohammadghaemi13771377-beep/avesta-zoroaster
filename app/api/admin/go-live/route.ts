import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getGoLiveGates, getGoLiveSummary } from "@/lib/go-live";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const gates = getGoLiveGates();

  return NextResponse.json({
    source: "local-go-live-command",
    domain: "avesta-zoroaster.com",
    summary: getGoLiveSummary(gates),
    gates,
    nextSource: "CI build status, deployment provider, DNS checks, uptime monitor and production environment variables",
  });
}
