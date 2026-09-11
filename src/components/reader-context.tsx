"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ReaderData } from "@/lib/reader-types";

type ReaderContextValue = {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  playbackRate: number;
  data: ReaderData | null;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setRate: (rate: number) => void;
  skip: (deltaSeconds: number) => void;
};

const ReaderContext = createContext<ReaderContextValue | null>(null);

export function useReader() {
  return useContext(ReaderContext);
}

export function ReaderProvider({
  src,
  dataSrc,
  children,
}: {
  src: string;
  dataSrc: string;
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [data, setData] = useState<ReaderData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(dataSrc)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [dataSrc]);

  function play() {
    audioRef.current?.play();
  }
  function pause() {
    audioRef.current?.pause();
  }
  function toggle() {
    if (isPlaying) pause();
    else play();
  }
  function seek(time: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }
  function setRate(rate: number) {
    if (audioRef.current) audioRef.current.playbackRate = rate;
    setPlaybackRateState(rate);
  }
  function skip(deltaSeconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(
      Math.max(audio.currentTime + deltaSeconds, 0),
      audio.duration || Infinity,
    );
    seek(next);
  }

  return (
    <ReaderContext.Provider
      value={{
        currentTime,
        duration,
        isPlaying,
        playbackRate,
        data,
        play,
        pause,
        toggle,
        seek,
        setRate,
        skip,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </ReaderContext.Provider>
  );
}
