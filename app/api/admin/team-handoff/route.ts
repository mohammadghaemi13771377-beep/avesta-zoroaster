import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getTeamHandoffSummary, teamHandoffItems } from "@/lib/team-handoff";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-team-handoff",
    masterDoc: "docs/team-delivery-master.md",
    downloads: ["avesta-zoroaster-source.zip", "avesta-zoroaster-full-code.txt"],
    summary: getTeamHandoffSummary(),
    teams: teamHandoffItems,
  });
}
