import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { recordAuditEvent } from "@/lib/audit-log";
import { isUploadKind, saveUploadedFile, uploadKinds } from "@/lib/upload-storage";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_media");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    ok: true,
    kinds: uploadKinds,
    fields: {
      file: "File field, required",
      kind: "image | audio | pdf | video",
      name: "Optional preferred file name without extension"
    }
  });
}

export async function POST(request: Request) {
  const access = requireAdminPermission(request, "manage_media");

  if (!access.ok) {
    return access.response;
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind");
  const preferredName = formData.get("name");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "فایل ارسال نشده است." }, { status: 400 });
  }

  if (typeof kind !== "string" || !isUploadKind(kind)) {
    return NextResponse.json({ ok: false, message: "نوع آپلود معتبر نیست.", kinds: uploadKinds }, { status: 400 });
  }

  try {
    const result = await saveUploadedFile(file, kind, typeof preferredName === "string" ? preferredName : undefined);

    await recordAuditEvent({
      actor: access.session.displayName,
      role: access.session.role,
      action: "Upload media asset",
      target: result.publicUrl,
      area: "رسانه",
      severity: "info",
      detail: "یک فایل رسانه‌ای از پنل ادمین بارگذاری شد.",
      metadata: {
        kind,
        size: file.size,
        name: file.name,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "فایل با موفقیت آپلود شد.",
      assetUrl: result.publicUrl,
      file: result
    });
  } catch (error) {
    await recordAuditEvent({
      actor: access.session.displayName,
      role: access.session.role,
      action: "Upload media failed",
      target: typeof preferredName === "string" ? preferredName : "Media upload",
      area: "رسانه",
      severity: "warning",
      detail: error instanceof Error ? error.message : "Upload failed.",
      metadata: {
        kind,
        name: file.name,
      },
    });

    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Upload failed."
      },
      { status: 400 }
    );
  }
}
