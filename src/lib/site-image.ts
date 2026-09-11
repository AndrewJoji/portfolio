import { existsSync } from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

export function findImage(relativeDir: string, baseName: string): string | null {
  for (const ext of IMAGE_EXTENSIONS) {
    const filePath = path.join(
      process.cwd(),
      "public",
      relativeDir,
      `${baseName}${ext}`,
    );
    if (existsSync(filePath)) {
      return `/${relativeDir}/${baseName}${ext}`;
    }
  }
  return null;
}
