import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { recordAuditEvent } from "@/lib/audit-log";
import { getImportJobs, runBulkImport } from "@/lib/bulk-import";
import { bulkImportExample } from "@/lib/bulk-import-example";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "bulk_import");

  if (!access.ok) {
    return access.response;
  }

  const jobs = await getImportJobs();

  return NextResponse.json({
    ok: true,
    message: "قالب ورود دسته‌ای محتوا و رسانه آماده است.",
    example: bulkImportExample,
    count: jobs.length,
    jobs
  });
}

export async function POST(request: Request) {
  const access = requireAdminPermission(request, "bulk_import");

  if (!access.ok) {
    return access.response;
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "JSON معتبر نیست."
      },
      { status: 400 }
    );
  }

  const result = await runBulkImport(body);

  await recordAuditEvent({
    actor: access.session.displayName,
    role: access.session.role,
    action: "Run bulk import",
    target: typeof body?.name === "string" ? body.name : result.jobId ?? "Bulk import",
    area: "ورود دسته‌ای",
    severity: result.ok ? "info" : "warning",
    detail: result.ok ? "ورود دسته‌ای محتوا اجرا شد." : "ورود دسته‌ای با خطا یا اعتبارسنجی ناموفق پایان یافت.",
    metadata: {
      mode: body?.mode,
      jobId: result.jobId,
      imported: result.summary.total - (result.summary.failed ?? 0),
      failed: result.summary.failed ?? 0,
    },
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
