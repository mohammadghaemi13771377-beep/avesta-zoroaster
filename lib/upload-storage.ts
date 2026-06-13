import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export type UploadKind = "image" | "audio" | "pdf" | "video";

type UploadConfig = {
  directory: string;
  publicPath: string;
  extensions: string[];
  mimePrefixes: string[];
  maxBytes: number;
};

const uploadConfig: Record<UploadKind, UploadConfig> = {
  image: {
    directory: "public/images/ai",
    publicPath: "/images/ai",
    extensions: [".jpg", ".jpeg", ".png", ".webp"],
    mimePrefixes: ["image/"],
    maxBytes: 12 * 1024 * 1024
  },
  audio: {
    directory: "public/audio",
    publicPath: "/audio",
    extensions: [".mp3", ".wav", ".m4a", ".ogg"],
    mimePrefixes: ["audio/"],
    maxBytes: 50 * 1024 * 1024
  },
  pdf: {
    directory: "public/library",
    publicPath: "/library",
    extensions: [".pdf"],
    mimePrefixes: ["application/pdf"],
    maxBytes: 40 * 1024 * 1024
  },
  video: {
    directory: "public/video",
    publicPath: "/video",
    extensions: [".mp4", ".webm", ".mov"],
    mimePrefixes: ["video/"],
    maxBytes: 200 * 1024 * 1024
  }
};

export const uploadKinds = Object.keys(uploadConfig) as UploadKind[];

export async function saveUploadedFile(file: File, kind: UploadKind, preferredName?: string) {
  const config = uploadConfig[kind];
  const originalName = file.name || "upload";
  const extension = path.extname(originalName).toLowerCase();

  if (!config.extensions.includes(extension)) {
    throw new Error(`Unsupported file extension for ${kind}. Allowed: ${config.extensions.join(", ")}`);
  }

  const isMimeAllowed = config.mimePrefixes.some((prefix) =>
    prefix.endsWith("/") ? file.type.startsWith(prefix) : file.type === prefix
  );

  if (file.type && !isMimeAllowed) {
    throw new Error(`Unsupported MIME type for ${kind}: ${file.type}`);
  }

  if (file.size > config.maxBytes) {
    throw new Error(`File is too large for ${kind}.`);
  }

  const safeBaseName = slugify(preferredName || path.basename(originalName, extension)) || randomUUID();
  const fileName = `${safeBaseName}-${randomUUID().slice(0, 8)}${extension}`;
  const targetDirectory = path.join(process.cwd(), config.directory);
  const targetPath = path.join(targetDirectory, fileName);
  const publicUrl = `${config.publicPath}/${fileName}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await mkdir(targetDirectory, { recursive: true });
  await writeFile(targetPath, bytes);

  return {
    fileName,
    originalName,
    kind,
    mimeType: file.type,
    size: file.size,
    publicUrl,
    targetPath
  };
}

export function isUploadKind(value: string | null): value is UploadKind {
  return Boolean(value && uploadKinds.includes(value as UploadKind));
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
