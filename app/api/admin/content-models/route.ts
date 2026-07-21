import { NextResponse } from "next/server";
import { requireAdminPermission } from "@/lib/admin-auth";
import { getAdminContentModels } from "@/lib/admin-content-models";

export async function GET(request: Request) {
  const access = requireAdminPermission(request, "read_content");

  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json({
    source: "local-admin-content-model-contract",
    uploadRoots: {
      images: "/public/images/ai",
      audio: "/public/audio",
      library: "/public/library",
      futureStorage: ["S3", "Cloudflare R2", "Cloudinary"],
    },
    models: getAdminContentModels(),
  });
}
