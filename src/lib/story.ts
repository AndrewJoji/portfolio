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

export type StoryLink = { label: string; href: string };

export type DataSnapshotSchemaRow = { field: string; quickFlips: string; catrp: string };

export type DataSnapshotStatRow = {
  source: string;
  skus: string;
  categories: string;
  date: string;
};

export type DataSnapshotPriceRow = {
  item: string;
  platform: string;
  qfPrice: string;
  catrpPrice: string;
  delta: string;
};

export type StoryDataSnapshot = {
  heading: string;
  intro?: string;
  schemaComparison: DataSnapshotSchemaRow[];
  stats: DataSnapshotStatRow[];
  priceComparison: DataSnapshotPriceRow[];
  priceNote: string;
  insight: string;
  coverageGap: string;
};

export type StorySection = {
  heading?: string;
  paragraphs: string[];
  video?: StoryVideo;
  diagram?: StoryDiagramId;
  images?: MediaItem[];
  imagesAspectRatio?: string;
  quote?: StoryQuote;
  properties?: StoryProperty[];
  link?: StoryLink;
  dataSnapshot?: StoryDataSnapshot;
};

export function firstStoryDiagram(story?: StorySection[]): StoryDiagramId | undefined {
  return story?.find((section) => section.diagram)?.diagram;
}
