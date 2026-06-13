import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import {
  editorialCommandTasks,
  editorialTasks,
  getEditorialCommandSummary,
  getEditorialSummary,
} from "@/lib/editorial-workflow";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_avesta");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-editorial-workflow",
    nextSource: "CMS editorial workflow, review assignments and publishing approvals",
    summary: getEditorialSummary(editorialTasks),
    commandSummary: getEditorialCommandSummary(editorialCommandTasks),
    tasks: editorialTasks,
    commandTasks: editorialCommandTasks
  });
}
