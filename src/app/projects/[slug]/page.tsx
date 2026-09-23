import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio-player";
import { MediaCarousel } from "@/components/media-carousel";
import { ReaderProvider } from "@/components/reader-context";
import { ReadableText } from "@/components/readable-text";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoryBody } from "@/components/story-body";
import { getLocalMedia } from "@/lib/local-media";
import type { MediaItem } from "@/lib/media";
import { getProject, projects } from "@/lib/projects";
import { findAudio } from "@/lib/site-audio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Andrew Joji`,
    description: project.summary,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const localMedia = getLocalMedia("projects", slug);
  const audio = findAudio(`projects/${slug}`);

  const content = (
    <>
      <SiteNav />
      <article className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/#work" className="text-sm font-medium text-accent">
          &larr; Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-5xl">
          {project.title}
        </h1>
        <div className="mt-3 text-muted">
          {project.org} &middot; {project.years}
        </div>

        {audio ? (
          <div className="mt-6">
            <AudioPlayer />
          </div>
        ) : null}

        {project.relatedExperienceSlug ? (
          <div className="mt-6 max-w-2xl text-sm text-muted">
            Part of{" "}
            <Link
              href={`/experience/${project.relatedExperienceSlug}`}
              className="text-accent"
            >
              this role &rarr;
            </Link>
          </div>
        ) : null}

        {project.story ? (
          <StoryBody story={project.story} localMedia={localMedia} mediaLabel="More from this project" />
        ) : (
          <>
            <ul className="mt-10 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-muted">
              {project.bullets.map((bullet, i) => (
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
                    ...(project.video?.youtubeId
                      ? [
                          {
                            type: "youtube" as const,
                            youtubeId: project.video.youtubeId,
                            title: project.video.title,
                            start: project.video.start,
                          },
                        ]
                      : []),
                    ...localMedia,
                  ] satisfies MediaItem[]
                }
                emptyHint={`[Add photos or videos to public/projects/${slug}]`}
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
        <ReaderProvider src={audio} dataSrc={`/audio/projects/${slug}.json`}>
          {content}
        </ReaderProvider>
      ) : (
        content
      )}
    </div>
  );
}
