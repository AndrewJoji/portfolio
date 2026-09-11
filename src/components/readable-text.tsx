"use client";

import { useReader } from "@/components/reader-context";

export function ReadableText({
  blockIndex,
  fallback,
}: {
  blockIndex: number;
  fallback: string;
}) {
  const reader = useReader();
  const words = reader?.data?.blocks[blockIndex]?.words;

  if (!reader || !words || words.length === 0) {
    return <>{fallback}</>;
  }

  return (
    <>
      {words.map((w, i) => {
        const active = reader.currentTime >= w.start && reader.currentTime < w.end;
        return (
          <span
            key={i}
            onClick={() => reader.seek(w.start)}
            className={
              "cursor-pointer rounded-sm transition-colors " +
              (active ? "bg-accent/25" : "hover:bg-border/70")
            }
          >
            {w.word}{" "}
          </span>
        );
      })}
    </>
  );
}
