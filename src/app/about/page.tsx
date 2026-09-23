import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { travelLocations } from "@/lib/travel";

export const metadata: Metadata = {
  title: "My Story — Andrew Joji",
  description:
    "Born in South Africa, family from Kerala, raised between Saudi Arabia, Qatar, and now Vancouver, BC.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <article className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/#about" className="text-sm font-medium text-accent">
          &larr; Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-5xl">
          My story
        </h1>

        <div className="mt-10 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-muted">
          <p>
            I was born in South Africa, into a family from Kerala, in South
            India. My childhood moved with my family&rsquo;s work: Saudi
            Arabia from 2004 to 2010, then Qatar from 2010 to 2022 &mdash;
            most of my adolescence happened in Doha. In 2021 I moved to
            Vancouver, BC to study Computer Science at the University of
            British Columbia, and it&rsquo;s where I&rsquo;m based now.
          </p>
          <p>
            Moving between countries that often meant starting over &mdash;
            new schools, new friend groups, new ways of doing things. That
            constant resetting shaped how I see the world: I value diversity
            of thought and experience as a real asset, not just a nice idea
            &mdash; it&rsquo;s easier to get to a good answer when you&rsquo;ve
            seen a problem from more than one angle. I&rsquo;m a lifelong
            learner at heart, and I like getting into the inner workings of
            things &mdash; how a piece of technology actually works, why
            people behave the way they do, how a business actually makes
            money.
          </p>
          <p>
            I think that&rsquo;s part of where the range comes from: software
            engineering, line-producing film sets, founding a business,
            volunteer work. Different rooms, but the same instinct for
            figuring out what&rsquo;s actually going on and getting it done.
          </p>
        </div>

        <div className="mt-14 max-w-2xl">
          <div className="mb-4 text-xs font-medium tracking-[0.12em] text-muted uppercase">
            Timeline
          </div>
          <ul className="flex flex-col gap-4">
            {travelLocations.map((loc) => (
              <li key={loc.id} className="flex gap-4">
                <div className="w-40 shrink-0 text-sm text-muted">
                  {loc.years}
                </div>
                <div>
                  <div className="text-base font-semibold">{loc.label}</div>
                  <div className="mt-0.5 text-sm text-muted">
                    {loc.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
