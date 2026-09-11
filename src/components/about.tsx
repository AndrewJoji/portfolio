import Link from "next/link";
import { ReadableText } from "@/components/readable-text";
import { TravelGlobeLoader } from "@/components/travel-globe-loader";
import { aboutText } from "@/lib/site-copy";

export function About() {
  return (
    <section
      id="about"
      className="border-t border-border px-8 py-16 sm:px-20 sm:py-24"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
            About
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="font-serif text-2xl italic leading-relaxed sm:text-3xl">
            <ReadableText blockIndex={1} fallback={aboutText} />
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
            Where I&rsquo;m from
          </div>
        </div>
        <div className="lg:col-span-8">
          <TravelGlobeLoader />
          <Link
            href="/about"
            className="mt-4 inline-block text-sm font-medium text-accent"
          >
            Read my story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
