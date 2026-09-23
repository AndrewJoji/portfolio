import Link from "next/link";
import { ReadableText } from "@/components/readable-text";
import { TravelGlobeLoader } from "@/components/travel-globe-loader";
import { aboutText } from "@/lib/site-copy";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-8 py-16 sm:px-20 sm:py-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
        </div>
        <div className="lg:col-span-8">
          <p className="text-2xl leading-relaxed tracking-tight text-balance sm:text-3xl sm:leading-snug">
            <ReadableText blockIndex={1} fallback={aboutText} />
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h3 className="text-lg font-semibold tracking-tight">
            Where I&rsquo;m from
          </h3>
        </div>
        <div className="lg:col-span-8">
          <div className="rounded-3xl border border-border bg-card p-4 shadow-card sm:p-6">
            <TravelGlobeLoader />
          </div>
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
