import { saveAdminContent } from "@/lib/admin-content";
import { saveMediaAsset } from "@/lib/media-repository";
import type { BulkImportPayload, BulkImportResult } from "@/lib/bulk-import-types";

export async function runBulkImport(payload: BulkImportPayload): Promise<BulkImportResult & { jobId?: string }> {
  const content = Array.isArray(payload.content) ? payload.content : [];
  const media = Array.isArray(payload.media) ? payload.media : [];
  const contentResults = [];
  const mediaResults = [];

  if (payload.dryRun) {
    const result: BulkImportResult = {
      ok: true,
      mode: "dry-run",
      summary: {
        content: content.length,
        media: media.length,
        total: content.length + media.length
      },
      content: content.map((item, index) => ({
        index,
        ok: true,
        mode: "dry-run",
        received: item
      })),
      media: media.map((item, index) => ({
        index,
        ok: true,
        mode: "dry-run",
        received: item
      }))
    };

    const jobId = await recordImportJob(payload, result);

    return {
      ...result,
      jobId
    };
  }

  for (const [index, item] of content.entries()) {
    const result = await saveAdminContent(item);
    contentResults.push({ index, ...result });
  }

  for (const [index, item] of media.entries()) {
    const result = await saveMediaAsset(item);
    mediaResults.push({ index, ...result });
  }

  const failed =
    contentResults.filter((result) => !result.ok).length + mediaResults.filter((result) => !result.ok).length;
  const result: BulkImportResult = {
    ok: failed === 0,
    mode: "import",
    summary: {
      content: content.length,
      media: media.length,
      total: content.length + media.length,
      failed
    },
    content: contentResults,
    media: mediaResults
  };

  const jobId = await recordImportJob(payload, result);

  return {
    ...result,
    jobId
  };
}

async function recordImportJob(payload: BulkImportPayload, result: BulkImportResult) {
  const prisma = await getPrisma();

  if (!prisma) {
    return undefined;
  }

  try {
    const payloadSnapshot = JSON.parse(JSON.stringify(payload));
    const resultSnapshot = JSON.parse(JSON.stringify(result));
    const job = await prisma.importJob.create({
      data: {
        name: payload.name ?? "Bulk import",
        mode: result.mode,
        status: result.ok ? "SUCCESS" : "FAILED",
        contentCount: result.summary.content,
        mediaCount: result.summary.media,
        failedCount: result.summary.failed ?? 0,
        payload: payloadSnapshot,
        result: resultSnapshot
      }
    });

    return job.id;
  } catch {
    return undefined;
  }
}

export async function getImportJobs() {
  const prisma = await getPrisma();

  if (!prisma) {
    return [];
  }

  try {
    return prisma.importJob.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        mode: true,
        status: true,
        contentCount: true,
        mediaCount: true,
        failedCount: true,
        createdAt: true
      }
    });
  } catch {
    return [];
  }
}

export async function getImportJob(id: string) {
  const prisma = await getPrisma();

  if (!prisma) {
    return null;
  }

  try {
    return prisma.importJob.findUnique({
      where: { id }
    });
  } catch {
    return null;
  }
}

async function getPrisma() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return prisma;
  } catch {
    return null;
  }
}
