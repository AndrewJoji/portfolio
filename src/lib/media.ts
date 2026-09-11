export type MediaItem =
  | { type: "youtube"; youtubeId: string; title: string }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };
