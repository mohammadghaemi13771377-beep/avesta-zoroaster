import type { AdminContentPayload } from "@/lib/admin-content";
import type { MediaAssetPayload } from "@/lib/media-repository";

export type BulkImportPayload = {
  dryRun?: boolean;
  name?: string;
  content?: AdminContentPayload[];
  media?: MediaAssetPayload[];
};

export type BulkImportResult = {
  ok: boolean;
  mode: "dry-run" | "import";
  summary: {
    content: number;
    media: number;
    total: number;
    failed?: number;
  };
  content: unknown[];
  media: unknown[];
};
