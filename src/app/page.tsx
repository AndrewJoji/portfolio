import { About } from "@/components/about";
import { ContactCta } from "@/components/contact-cta";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <ContactCta />
      <SiteFooter />
    </div>
  );
}
