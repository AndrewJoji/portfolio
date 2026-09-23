import Link from "next/link";
import { AudioPlayer } from "@/components/audio-player";
import { ParallaxPortrait } from "@/components/parallax-portrait";
import { ReadableText } from "@/components/readable-text";
import { findImage } from "@/lib/site-image";
import { heroTagline } from "@/lib/site-copy";

export function Hero() {
  const portrait = findImage("home", "portrait");

  return (
    <section className="relative isolate grid grid-cols-1 gap-10 px-8 py-14 sm:px-20 sm:py-20 lg:grid-cols-12 lg:items-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[560px] w-full max-w-4xl bg-[radial-gradient(closest-side,var(--glow-1),transparent_70%),radial-gradient(closest-side_at_70%_60%,var(--glow-2),transparent_70%)]"
      />
      <div className="lg:col-span-7">
        <Link
          href="/projects/ebay-listing-assistant"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
            Now
          </span>
          Building the eBay Listing Assistant
        </Link>
        <h1 className="mt-6 text-4xl leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
          Engineer, producer, founder —{" "}
          <span className="bg-gradient-to-r from-accent to-sky-500 bg-clip-text text-transparent dark:to-sky-400">
            in that order, and every order.
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          <ReadableText blockIndex={0} fallback={heroTagline} />
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accent-foreground shadow-[0_8px_24px_-8px_var(--accent)]"
          >
            View the work
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium"
          >
            Get in touch
          </a>
        </div>
        <div className="mt-6">
          <AudioPlayer />
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[var(--portrait-from)] to-[var(--portrait-to)] text-xs font-medium text-muted shadow-card sm:h-[420px]">
          {portrait ? (
            <ParallaxPortrait src={portrait} alt="Andrew Joji" />
          ) : (
            "[portrait photo]"
          )}
        </div>
      </div>
    </section>
  );
}
