export type StoryVideo = {
  title: string;
  youtubeId?: string;
  start?: number;
};

export type StoryDiagramId = "ebay-pipeline" | "ebay-funnel";

export type StorySection = {
  heading?: string;
  paragraphs: string[];
  video?: StoryVideo;
  diagram?: StoryDiagramId;
};
