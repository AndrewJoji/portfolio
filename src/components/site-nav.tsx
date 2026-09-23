import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#work", label: "Work", hideOnMobile: true },
  { href: "/#about", label: "About", hideOnMobile: true },
  { href: "/workshop", label: "Workshop", hideOnMobile: false },
  { href: "/blog", label: "Blog", hideOnMobile: false },
];

export function SiteNav() {
  return (
    <div className="sticky top-0 z-40 px-3 pt-4 sm:px-10 sm:pt-5">
      <header className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-card/75 py-2 pr-2 pl-3 backdrop-blur-md sm:gap-3 sm:pl-5">
        <Link href="/" className="whitespace-nowrap font-semibold tracking-tight">
          Andrew Joji
        </Link>
        <nav className="flex items-center gap-0.5 text-sm text-muted sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-1.5 py-2 transition-colors sm:block sm:px-3 hover:text-foreground ${link.hideOnMobile ? "hidden" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/#contact"
            aria-label="Contact"
            className="flex h-9 items-center rounded-lg bg-foreground px-2.5 font-medium text-background sm:px-3.5"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sm:hidden">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span className="hidden sm:inline">Contact</span>
          </Link>
        </nav>
      </header>
    </div>
  );
}
