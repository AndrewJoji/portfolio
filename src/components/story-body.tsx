import { MediaCarousel } from "@/components/media-carousel";
import { MediaGrid } from "@/components/media-grid";
import { ReadableText } from "@/components/readable-text";
import { StoryDataSnapshotBlock } from "@/components/story-data-snapshot";
import { StoryDiagram } from "@/components/story-diagram";
import { StoryProperties } from "@/components/story-properties";
import { StoryQuoteBlock } from "@/components/story-quote";
import { StoryVideoBand } from "@/components/story-video-band";
import type { StorySection } from "@/lib/story";
import type { MediaItem } from "@/lib/media";

// Block indices must match the flattening order in scripts/generate-audio.mts
// exactly: per section, heading (if present), then paragraphs, then quote text.
function blockIndices(story: StorySection[]) {
  let next = 0;
  return story.map((section) => ({
    headingIndex: section.heading !== undefined ? next++ : undefined,
    paragraphIndices: section.paragraphs.map(() => next++),
    quoteIndex: section.quote !== undefined ? next++ : undefined,
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
  const inlineSrcs = new Set(
    story.flatMap((section) => [
      ...(section.images ?? []).flatMap((m) => (m.type === "youtube" ? [] : [m.src])),
      ...(section.gallery ?? []).map((m) => m.src),
    ]),
  );
  const remainingMedia = localMedia.filter(
    (m) => m.type === "youtube" || !inlineSrcs.has(m.src),
  );

  return (
    <>
      {story.map((section, i) => (
        <div key={i}>
          {section.heading ? (
            <h2 className="mt-14 max-w-2xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
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
          {section.link ? (
            <a
              href={section.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent"
            >
              {section.link.label} &rarr;
            </a>
          ) : null}
          {section.quote ? (
            <StoryQuoteBlock label={section.quote.label}>
              <ReadableText
                blockIndex={sectionBlocks[i].quoteIndex!}
                fallback={section.quote.text}
              />
            </StoryQuoteBlock>
          ) : null}
          {section.images && section.images.length > 0 ? (
            <div className="my-10 max-w-2xl">
              <MediaCarousel
                media={section.images}
                aspectRatio={section.imagesAspectRatio}
                objectFit={section.imagesAspectRatio ? "contain" : "cover"}
              />
            </div>
          ) : null}
          {section.properties ? <StoryProperties properties={section.properties} /> : null}
          {section.gallery ? (
            <MediaGrid heading={section.galleryHeading} media={section.gallery} />
          ) : null}
          {section.dataSnapshot ? <StoryDataSnapshotBlock data={section.dataSnapshot} /> : null}
          {section.video ? <StoryVideoBand video={section.video} /> : null}
          {section.diagram ? <StoryDiagram id={section.diagram} /> : null}
        </div>
      ))}

      {remainingMedia.length > 0 ? (
        <div className="mt-4 max-w-2xl">
          <div className="mb-3 text-xs font-medium tracking-[0.12em] text-muted uppercase">
            {mediaLabel}
          </div>
          <MediaCarousel media={remainingMedia} />
        </div>
      ) : null}
    </>
  );
}
