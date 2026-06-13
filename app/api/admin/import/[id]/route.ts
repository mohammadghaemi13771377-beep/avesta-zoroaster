import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getImportJob } from "@/lib/bulk-import";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: RouteContext) {
  const access = requireAdminPermission(request, "bulk_import");

  if (!access.ok) {
    return access.response;
  }

  const job = await getImportJob(params.id);

  if (!job) {
    return NextResponse.json(
      {
        ok: false,
        message: "Import job پیدا نشد."
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    job
  });
}
