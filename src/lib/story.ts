import type { MediaItem } from "@/lib/media";

export type StoryVideo = {
  title: string;
  youtubeId?: string;
  start?: number;
};

export type StoryDiagramId = "ebay-pipeline" | "ebay-funnel" | "listing-pipeline";

export type StoryQuote = {
  label?: string;
  text: string;
};

export type StoryProperty = { key: string; value: string };

export type StorySection = {
  heading?: string;
  paragraphs: string[];
  video?: StoryVideo;
  diagram?: StoryDiagramId;
  images?: MediaItem[];
  imagesAspectRatio?: string;
  quote?: StoryQuote;
  properties?: StoryProperty[];
};
