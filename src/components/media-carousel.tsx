"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/lib/media";

function Chevron({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6";
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

function captionFor(item: MediaItem) {
  return item.type === "youtube" ? item.title : item.alt;
}

export function MediaCarousel({
  media,
  emptyHint,
}: {
  media: MediaItem[];
  emptyHint?: string;
}) {
  const [index, setIndex] = useState(0);

  if (media.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-card text-sm text-muted">
        {emptyHint ?? "[Add photos or videos]"}
      </div>
    );
  }

  const current = media[index];
  const goPrev = () => setIndex((i) => (i - 1 + media.length) % media.length);
  const goNext = () => setIndex((i) => (i + 1) % media.length);
  const caption = captionFor(current);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-card">
        {current.type === "youtube" ? (
          <iframe
            src={`https://www.youtube.com/embed/${current.youtubeId}${current.start ? `?start=${current.start}` : ""}`}
            title={current.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : current.type === "video" ? (
          <video
            key={current.src}
            src={current.src}
            controls
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 672px) 672px, 100vw"
            className="object-cover"
          />
        )}

        {media.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow"
            >
              <Chevron direction="right" />
            </button>
          </>
        ) : null}
      </div>

      {media.length > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {media.map((item, i) => (
            <button
              key={item.type === "youtube" ? item.youtubeId : item.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      ) : null}

      {caption ? (
        <div className="mt-3 text-sm text-muted">{caption}</div>
      ) : null}
    </div>
  );
}
