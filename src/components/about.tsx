import { ReadableText } from "@/components/readable-text";
import { aboutText } from "@/lib/site-copy";

export function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 gap-6 border-t border-border px-8 py-16 sm:px-20 sm:py-24 lg:grid-cols-12"
    >
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
    </section>
  );
}
