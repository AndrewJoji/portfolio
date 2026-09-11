"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TravelGlobe = dynamic(
  () => import("@/components/travel-globe").then((m) => m.TravelGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-3xl bg-card text-sm text-muted">
        Loading globe…
      </div>
    ),
  },
);

export function TravelGlobeLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref}>
      {visible ? <TravelGlobe /> : <div className="h-[420px] rounded-3xl bg-card" />}
    </div>
  );
}
