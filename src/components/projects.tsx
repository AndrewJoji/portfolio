import Image from "next/image";
import Link from "next/link";
import { StoryDiagramSvg } from "@/components/story-diagram";
import { getLocalMedia } from "@/lib/local-media";
import { findImage } from "@/lib/site-image";
import { projects } from "@/lib/projects";
import { firstStoryDiagram } from "@/lib/story";

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 px-8 py-16 sm:px-20 sm:py-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
        <span className="text-sm text-muted">Software, business, film</span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const firstLocalImage = getLocalMedia("projects", project.slug).find(
            (m) => m.type === "image",
          );
          const image = firstLocalImage?.src ?? findImage("projects", project.slug);
          const diagram = image ? undefined : firstStoryDiagram(project.story);

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div
                className="relative flex h-[190px] items-center justify-center overflow-hidden rounded-xl text-sm text-foreground/70"
                style={image || diagram ? undefined : { background: project.tint }}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : diagram ? (
                  <div className="flex h-full w-full items-center justify-center bg-panel px-8 py-6">
                    <StoryDiagramSvg id={diagram} />
                  </div>
                ) : (
                  "[project image]"
                )}
              </div>
              <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
                <div className="text-lg font-semibold tracking-tight">
                  {project.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {project.summary}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.split(" · ").map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5 text-sm font-medium text-accent">
                  View project <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
