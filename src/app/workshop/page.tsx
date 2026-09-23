import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { workshopTools, type WorkshopStatus } from "@/lib/workshop";

export const metadata: Metadata = {
  title: "Workshop — Andrew Joji",
  description:
    "Small tools I'm building for my own life, from fishing to a wall-mounted task board.",
};

const statusLabel: Record<WorkshopStatus, string> = {
  idea: "Idea",
  building: "Building",
  live: "Live",
};

export default function WorkshopPage() {
  const categories = [...new Set(workshopTools.map((tool) => tool.category))];

  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <main className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/" className="text-sm font-medium text-accent">
          &larr; Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
          Workshop
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Small tools I&rsquo;m building for my own life &mdash; half lab,
          half workshop. Most are still ideas; they&rsquo;ll show up here
          as they get built.
        </p>

        {categories.map((category) => (
          <section key={category} className="mt-14">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">{category}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {workshopTools
                .filter((tool) => tool.category === category)
                .map((tool) => {
                  const card = (
                    <>
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          tool.status === "live"
                            ? "bg-accent text-accent-foreground"
                            : "bg-accent-soft text-accent"
                        }`}
                      >
                        {statusLabel[tool.status]}
                      </span>
                      <div className="mt-3 text-lg font-semibold tracking-tight">
                        {tool.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{tool.summary}</p>
                      {tool.features ? (
                        <ul className="mt-3 flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed text-muted marker:text-accent">
                          {tool.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  );
                  const className =
                    "rounded-2xl border border-border bg-card p-6 shadow-card";

                  return tool.href ? (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className={`${className} transition-shadow hover:shadow-card-hover`}
                    >
                      {card}
                    </Link>
                  ) : (
                    <div key={tool.slug} className={className}>
                      {card}
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
