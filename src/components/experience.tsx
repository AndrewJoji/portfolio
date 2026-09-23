import Link from "next/link";
import { experience } from "@/lib/experience";

export function Experience() {
  return (
    <section className="px-8 py-16 sm:px-20 sm:py-24">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">Experience</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experience.map((entry) => (
          <Link
            key={entry.slug}
            href={`/experience/${entry.slug}`}
            className="group flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div>
              <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent tabular-nums">
                {entry.years}
              </span>
              <div className="mt-3 text-lg font-semibold tracking-tight">
                {entry.title}
              </div>
              <div className="mt-1 text-sm text-muted">{entry.org}</div>
            </div>
            <div className="text-sm font-medium text-accent">
              View role <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
