import { readdirSync } from "node:fs";
import path from "node:path";
import type { MediaItem } from "@/lib/media";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);

function toLabel(filename: string) {
  const withoutExt = filename.replace(/\.[^.]+$/, "");
  const withoutOrderPrefix = withoutExt.replace(/^\d+[-_]?/, "");
  const spaced = withoutOrderPrefix.replace(/[-_]+/g, " ").trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : "";
}

export function getLocalMedia(slug: string): MediaItem[] {
  const dir = path.join(process.cwd(), "public", "experience", slug);

  let files: string[];
  try {
    files = readdirSync(dir);
  } catch {
    return [];
  }

  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const ext = path.extname(file).toLowerCase();
      const src = `/experience/${slug}/${file}`;
      const alt = toLabel(file);
      return IMAGE_EXTENSIONS.has(ext)
        ? ({ type: "image", src, alt } as const)
        : ({ type: "video", src, alt } as const);
    });
}
