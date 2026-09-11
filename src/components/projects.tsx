import Image from "next/image";
import { findImage } from "@/lib/site-image";

const projects = [
  {
    slug: "wholesale-pricing-platform",
    title: "Wholesale Pricing Platform",
    description:
      "Consolidated supplier data into one searchable platform with real-time currency conversion and competitive offer detection.",
    tags: "Next.js · Prisma · PostgreSQL",
    tint: "oklch(86% 0.06 130)",
  },
  {
    slug: "health-safety-system-prototype",
    title: "Health & Safety System Prototype",
    description:
      "Led an 8-person Agile team to ship a full-stack GCP prototype with a generative AI chatbot that cut query response time 25%.",
    tags: "PwC · GCP · Vertex AI",
    tint: "oklch(82% 0.07 42)",
  },
  {
    slug: "independent-feature-film",
    title: "Independent Feature Film",
    description:
      "Managing a $12,000 production budget and 10+ vendor and location contracts for a 20-person cast and crew.",
    tags: "Line Producing · Film",
    tint: "oklch(86% 0.06 130)",
  },
];

export function Projects() {
  return (
    <section id="work" className="px-8 py-16 sm:px-20 sm:py-24">
      <div className="mb-8 text-xs font-medium tracking-[0.12em] text-muted uppercase">
        Selected work
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const image = findImage("projects", project.slug);

          return (
            <div
              key={project.slug}
              className="overflow-hidden rounded-2xl bg-card shadow-[0_10px_28px_-20px_oklch(35%_0.04_50_/_0.55)]"
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
                <div className="text-lg font-semibold">{project.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </div>
                <div className="mt-3 text-xs text-muted">{project.tags}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
