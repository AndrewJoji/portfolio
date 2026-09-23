"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/story";

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export function MediaGrid({ heading, media }: { heading?: string; media: GalleryItem[] }) {
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const item of media) {
      if (!seen.includes(item.category)) seen.push(item.category);
    }
    return seen;
  }, [media]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = activeCategory ? media.filter((m) => m.category === activeCategory) : media;

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, filtered.length]);

  if (media.length === 0) return null;

  const current = openIndex === null ? null : filtered[openIndex];

  function selectCategory(category: string | null) {
    setActiveCategory(category);
    setOpenIndex(null);
  }

  return (
    <div className="my-10 max-w-3xl">
      {heading ? (
        <div className="mb-3 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          {heading}
        </div>
      ) : null}

      {categories.length > 1 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectCategory(null)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === null
                ? "bg-accent text-accent-foreground"
                : "border border-border bg-card text-muted hover:text-foreground"
            }`}
          >
            All ({media.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-card text-muted hover:text-foreground"
              }`}
            >
              {category} ({media.filter((m) => m.category === category).length})
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {filtered.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-card"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground shadow"
          >
            <Icon path="M6 6l12 12M18 6L6 18" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
            }}
            aria-label="Previous"
            className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground shadow sm:left-6"
          >
            <Icon path="M15 18l-6-6 6-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length));
            }}
            aria-label="Next"
            className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground shadow sm:right-6"
          >
            <Icon path="M9 6l6 6-6 6" />
          </button>

          <div
            className="relative h-[75vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="mt-4 max-w-2xl text-center text-sm text-muted">
            <span className="text-accent">{current.category}</span> &middot; {current.alt}
          </div>
        </div>
      ) : null}
    </div>
  );
}
