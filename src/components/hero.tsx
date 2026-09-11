import { ParallaxPortrait } from "@/components/parallax-portrait";
import { findImage } from "@/lib/site-image";

export function Hero() {
  const portrait = findImage("home", "portrait");

  return (
    <section className="grid grid-cols-1 gap-8 px-8 py-14 sm:px-20 sm:py-20 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <h1 className="font-serif text-4xl italic leading-[1.15] sm:text-6xl lg:text-7xl">
          Engineer, producer,
          <br />
          founder — in that
          <br />
          order, and every order.
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
          I build software with the same instinct I used to line-produce
          film sets and start a company: figure out what&rsquo;s broken,
          rally the people who can fix it, ship it on time.
        </p>
        <div className="mt-9 flex items-center gap-5">
          <a
            href="#work"
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background"
          >
            View the work
          </a>
          <a
            href="#contact"
            className="border-b border-accent text-sm font-semibold"
          >
            Get in touch &rarr;
          </a>
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="relative flex h-[340px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[oklch(85%_0.05_60)] to-[oklch(74%_0.08_42)] text-xs font-semibold tracking-wide text-background uppercase sm:h-[420px]">
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
