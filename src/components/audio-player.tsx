"use client";

import { InfoTooltip } from "@/components/info-tooltip";
import { useReader } from "@/components/reader-context";

const RATES = [0.75, 1, 1.25, 1.5, 2];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
      <path d="M6 4.5v15l13-7.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor">
      <rect x="6" y="4.5" width="4" height="15" />
      <rect x="14" y="4.5" width="4" height="15" />
    </svg>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const reader = useReader();

  if (!reader) return null;

  function cycleRate() {
    const i = RATES.indexOf(reader!.playbackRate);
    reader!.setRate(RATES[(i + 1) % RATES.length]);
  }

  return (
    <div className="flex max-w-md flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => reader.skip(-10)}
        aria-label="Back 10 seconds"
        className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted"
      >
        &minus;10s
      </button>

      <button
        type="button"
        onClick={reader.toggle}
        aria-label={reader.isPlaying ? "Pause reading" : "Read this page aloud"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
      >
        {reader.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button
        type="button"
        onClick={() => reader.skip(10)}
        aria-label="Forward 10 seconds"
        className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted"
      >
        +10s
      </button>

      <input
        type="range"
        min={0}
        max={reader.duration || 0}
        step={0.1}
        value={reader.currentTime}
        onChange={(e) => reader.seek(Number(e.target.value))}
        aria-label="Seek"
        className="h-1.5 min-w-[80px] flex-1 cursor-pointer appearance-none rounded-full bg-border accent-accent"
      />

      <span className="shrink-0 text-xs tabular-nums text-muted">
        {formatTime(reader.currentTime)} / {formatTime(reader.duration)}
      </span>

      <button
        type="button"
        onClick={cycleRate}
        aria-label="Playback speed"
        className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted"
      >
        {reader.playbackRate}x
      </button>

      <InfoTooltip>
        This is an accessibility feature powered by the ElevenLabs API,
        read in a voice cloned from a short recording of mine.
      </InfoTooltip>
    </div>
  );
}
