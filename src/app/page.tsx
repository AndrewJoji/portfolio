import { About } from "@/components/about";
import { ContactCta } from "@/components/contact-cta";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { ReaderProvider } from "@/components/reader-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { findAudio } from "@/lib/site-audio";

export default function Home() {
  const audio = findAudio("home");

  const content = (
    <>
      <SiteNav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ContactCta />
      <SiteFooter />
    </>
  );

  return (
    <div className="flex flex-1 flex-col">
      {audio ? (
        <ReaderProvider src={audio} dataSrc="/audio/home.json">
          {content}
        </ReaderProvider>
      ) : (
        content
      )}
    </div>
  );
}
