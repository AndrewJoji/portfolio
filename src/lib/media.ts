export type MediaItem =
  | { type: "youtube"; youtubeId: string; title: string; start?: number }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };
