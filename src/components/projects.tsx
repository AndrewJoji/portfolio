import Image from "next/image";
import Link from "next/link";
import { getLocalMedia } from "@/lib/local-media";
import { findImage } from "@/lib/site-image";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="work" className="px-8 py-16 sm:px-20 sm:py-24">
      <div className="mb-8 text-xs font-medium tracking-[0.12em] text-muted uppercase">
        Selected work
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const firstLocalImage = getLocalMedia("projects", project.slug).find(
            (m) => m.type === "image",
          );
          const image = firstLocalImage?.src ?? findImage("projects", project.slug);

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-2xl bg-card shadow-[0_10px_28px_-20px_oklch(35%_0.04_50_/_0.55)] transition-shadow hover:shadow-[0_14px_32px_-18px_oklch(35%_0.04_50_/_0.6)]"
            >
              <div
                className="relative flex h-[190px] items-center justify-center text-sm text-foreground/70"
                style={image ? undefined : { background: project.tint }}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 90vw"
                    className="object-cover"
                  />
                ) : (
                  "[project image]"
                )}
              </div>
              <div className="p-6">
                <div className="text-lg font-semibold group-hover:underline">
                  {project.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {project.summary}
                </div>
                <div className="mt-3 text-xs text-muted">{project.tags}</div>
                <div className="mt-4 text-sm font-medium text-accent">
                  View project &rarr;
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
