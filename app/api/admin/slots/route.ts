import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { contentSlots } from "@/lib/content-slots";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "manage_media");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    ok: true,
    message: "فهرست جایگاه‌های آماده برای پر کردن محتوا و رسانه.",
    slots: contentSlots
  });
}
