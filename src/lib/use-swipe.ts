import { useRef, type TouchEvent } from "react";

const MIN_DISTANCE = 40;

export function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd(e: TouchEvent) {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      // Ignore short taps and mostly-vertical drags so page scrolling still works.
      if (Math.abs(dx) < MIN_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;
      if (dx > 0) onPrev();
      else onNext();
    },
  };
}
