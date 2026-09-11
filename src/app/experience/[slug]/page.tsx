import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio-player";
import { MediaCarousel } from "@/components/media-carousel";
import { ReaderProvider } from "@/components/reader-context";
import { ReadableText } from "@/components/readable-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoryBody } from "@/components/story-body";
import { experience, getExperience } from "@/lib/experience";
import { getLocalMedia } from "@/lib/local-media";
import type { MediaItem } from "@/lib/media";
import { findAudio } from "@/lib/site-audio";

export function generateStaticParams() {
  return experience.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(props: PageProps<"/experience/[slug]">) {
  const { slug } = await props.params;
  const entry = getExperience(slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} — Andrew Joji`,
    description: `${entry.title} at ${entry.org}, ${entry.years}.`,
  };
}

export default async function ExperiencePage(
  props: PageProps<"/experience/[slug]">,
) {
  const { slug } = await props.params;
  const entry = getExperience(slug);

  if (!entry) {
    notFound();
  }

  const localMedia = getLocalMedia("experience", slug);
  const audio = findAudio(`experience/${slug}`);

  const content = (
    <>
      <SiteNav />
      <article className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/#work" className="text-sm font-medium text-accent">
          &larr; Back to home
        </Link>
        <h1 className="mt-6 font-serif text-4xl italic leading-tight sm:text-5xl">
          {entry.title}
        </h1>
        <div className="mt-3 text-muted">
          {entry.org} &middot; {entry.location} &middot; {entry.years}
        </div>

        {audio ? (
          <div className="mt-6">
            <AudioPlayer />
          </div>
        ) : null}

        {entry.story ? (
          <StoryBody story={entry.story} localMedia={localMedia} mediaLabel="More from this role" />
        ) : (
          <>
            <ul className="mt-10 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-muted">
              {entry.bullets.map((bullet, i) => (
                <li key={bullet}>
                  <ReadableText blockIndex={i} fallback={bullet} />
                </li>
              ))}
            </ul>
            <div className="mt-12 max-w-2xl">
              <div className="mb-3 text-xs font-medium tracking-[0.12em] text-muted uppercase">
                Media
              </div>
              <MediaCarousel
                media={
                  [
                    ...(entry.video?.youtubeId
                      ? [
                          {
                            type: "youtube" as const,
                            youtubeId: entry.video.youtubeId,
                            title: entry.video.title,
                            start: entry.video.start,
                          },
                        ]
                      : []),
                    ...localMedia,
                  ] satisfies MediaItem[]
                }
                emptyHint={`[Add photos or videos to public/experience/${slug}]`}
              />
            </div>
          </>
        )}
      </article>
      <SiteFooter />
    </>
  );

  return (
    <div className="flex flex-1 flex-col">
      {audio ? (
        <ReaderProvider src={audio} dataSrc={`/audio/experience/${slug}.json`}>
          {content}
        </ReaderProvider>
      ) : (
        content
      )}
    </div>
  );
}
