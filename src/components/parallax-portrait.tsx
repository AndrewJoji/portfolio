"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SCALE = 1.15;
const ORIGIN = "50% 50%";
const PARALLAX_FACTOR = 0.15;

export function ParallaxPortrait({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;

    function update() {
      if (imgRef.current) {
        const offset = window.scrollY * PARALLAX_FACTOR;
        imgRef.current.style.transform = `scale(${SCALE}) translateY(${offset}px)`;
      }
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
    return () => window.removeEventListener("scroll", onScroll);
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
