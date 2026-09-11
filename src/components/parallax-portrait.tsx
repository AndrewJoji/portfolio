"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SCALE = 1.35;
const ORIGIN = "50% 50%";
const PARALLAX_FACTOR = 0.15;

export function ParallaxPortrait({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      const img = imgRef.current;
      if (!img) return;
      // Scaling creates a fixed overflow margin around the container; clamp
      // the on-screen shift to that margin so the image never pulls away
      // from the container edge and exposes blank space behind it. Since
      // translateY is applied inside the already-scaled coordinate space
      // (transform functions compose left-to-right), it moves SCALE times
      // further on screen than the value itself -- divide back down so the
      // clamp and the real pixel movement agree.
      const maxRealOffset = ((SCALE - 1) / 2) * img.offsetHeight;
      const realOffset = Math.min(window.scrollY * PARALLAX_FACTOR, maxRealOffset);
      const translateY = realOffset / SCALE;
      img.style.transform = `scale(${SCALE}) translateY(${translateY}px)`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 40vw, 90vw"
      className="object-cover"
      style={{ transformOrigin: ORIGIN }}
      priority
    />
  );
}
