import Link from "next/link";
import { experience } from "@/lib/experience";

export function Experience() {
  return (
    <section className="px-8 py-16 sm:px-20 sm:py-24">
      <div className="mb-8 text-xs font-medium tracking-[0.12em] text-muted uppercase">
        Experience
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {experience.map((entry) => (
          <Link
            key={entry.slug}
            href={`/experience/${entry.slug}`}
            className="group flex flex-col justify-between rounded-2xl bg-card p-6 shadow-[0_10px_28px_-20px_oklch(35%_0.04_50_/_0.55)] transition-shadow hover:shadow-[0_14px_32px_-18px_oklch(35%_0.04_50_/_0.6)]"
          >
            <div>
              <div className="text-lg font-semibold group-hover:underline">
                {entry.title}
              </div>
              <div className="mt-2 text-sm text-muted">
                {entry.org} &middot; {entry.years}
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-accent">
              View role &rarr;
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
