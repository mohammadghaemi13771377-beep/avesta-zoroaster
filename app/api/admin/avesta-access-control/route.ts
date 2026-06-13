import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { routeMap } from "@/lib/content";
import { getAvestaAccessPolicy } from "@/lib/avesta-access-control";

export function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  const policy = getAvestaAccessPolicy(routeMap);

  return NextResponse.json({
    source: "local-avesta-access-control",
    nextSource: "database-backed beta access groups, middleware policy and route-level feature flags",
    summary: {
      routes: policy.length,
      anonymousAllowed: policy.filter((item) => item.anonymous.allowed).length,
      readerAllowed: policy.filter((item) => item.reader.allowed).length,
      editorAllowed: policy.filter((item) => item.editor.allowed).length,
      adminAllowed: policy.filter((item) => item.admin.allowed).length,
    },
    policy,
  });
}
