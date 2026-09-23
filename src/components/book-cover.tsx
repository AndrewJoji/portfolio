"use client";

import { useState } from "react";
import Image from "next/image";

export function BookCover({
  src,
  title,
  author,
  sizes,
}: {
  src: string | null;
  title: string;
  author: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br from-[var(--portrait-from)] to-[var(--portrait-to)] shadow-card">
      {src && !failed ? (
        <Image
          src={src}
          alt={`${title} by ${author}`}
          fill
          sizes={sizes}
          unoptimized
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full flex-col justify-between p-3 sm:p-4">
          <div className="text-sm leading-snug font-semibold tracking-tight text-balance">
            {title}
          </div>
          <div className="text-xs text-muted">{author}</div>
        </div>
      )}
    </div>
  );
}
