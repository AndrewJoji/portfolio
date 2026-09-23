import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#work", label: "Work", hideOnMobile: true },
  { href: "/#about", label: "About", hideOnMobile: true },
  { href: "/workshop", label: "Workshop", hideOnMobile: false },
];

export function SiteNav() {
  return (
    <div className="sticky top-0 z-40 px-4 pt-4 sm:px-10 sm:pt-5">
      <header className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/75 py-2 pr-2 pl-4 backdrop-blur-md sm:pl-5">
        <Link href="/" className="whitespace-nowrap font-semibold tracking-tight">
          Andrew Joji
        </Link>
        <nav className="flex items-center gap-0.5 text-sm text-muted sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-2 py-2 transition-colors sm:block sm:px-3 hover:text-foreground ${link.hideOnMobile ? "hidden" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/#contact"
            className="rounded-lg bg-foreground px-3.5 py-2 font-medium text-background"
          >
            Contact
          </Link>
        </nav>
      </header>
    </div>
  );
}
