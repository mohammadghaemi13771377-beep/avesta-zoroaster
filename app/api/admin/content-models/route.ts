import { NextResponse } from "next/server";
import { getAdminContentModels } from "@/lib/admin-content-models";

export async function GET() {
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
