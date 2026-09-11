import { MediaCarousel } from "@/components/media-carousel";
import { ReadableText } from "@/components/readable-text";
import { StoryDiagram } from "@/components/story-diagram";
import { StoryVideoBand } from "@/components/story-video-band";
import type { StorySection } from "@/lib/story";
import type { MediaItem } from "@/lib/media";

// Block indices must match the flattening order in scripts/generate-audio.mts
// exactly: per section, heading (if present) then paragraphs, sections in order.
function blockIndices(story: StorySection[]) {
  let next = 0;
  return story.map((section) => ({
    headingIndex: section.heading !== undefined ? next++ : undefined,
    paragraphIndices: section.paragraphs.map(() => next++),
  }));
}

export function StoryBody({
  story,
  localMedia,
  mediaLabel = "More from this role",
}: {
  story: StorySection[];
  localMedia: MediaItem[];
  mediaLabel?: string;
}) {
  const sectionBlocks = blockIndices(story);

  return (
    <>
      {story.map((section, i) => (
        <div key={i}>
          {section.heading ? (
            <h2 className="mt-14 max-w-2xl font-serif text-2xl italic leading-snug sm:text-3xl">
              <ReadableText
                blockIndex={sectionBlocks[i].headingIndex!}
                fallback={section.heading}
              />
            </h2>
          ) : null}
          <div className="mt-6 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-muted">
            {section.paragraphs.map((paragraph, j) => (
              <p key={j}>
                <ReadableText
                  blockIndex={sectionBlocks[i].paragraphIndices[j]}
                  fallback={paragraph}
                />
              </p>
            ))}
          </div>
          {section.video ? <StoryVideoBand video={section.video} /> : null}
          {section.diagram ? <StoryDiagram id={section.diagram} /> : null}
        </div>
      ))}

      {localMedia.length > 0 ? (
        <div className="mt-4 max-w-2xl">
          <div className="mb-3 text-xs font-medium tracking-[0.12em] text-muted uppercase">
            {mediaLabel}
          </div>
          <MediaCarousel media={localMedia} />
        </div>
      ) : null}
    </>
  );
}
