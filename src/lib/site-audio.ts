import { existsSync } from "node:fs";
import path from "node:path";

export function findAudio(relPath: string): string | null {
  const filePath = path.join(
    process.cwd(),
    "public",
    "audio",
    `${relPath}.mp3`,
  );
  return existsSync(filePath) ? `/audio/${relPath}.mp3` : null;
}
