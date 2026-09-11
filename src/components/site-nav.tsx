const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="flex items-center justify-between px-5 py-6 sm:px-20 sm:py-8">
      <a href="#" className="font-serif italic text-lg sm:text-xl">
        Andrew Joji
      </a>
      <nav className="flex gap-4 text-xs font-medium sm:gap-10 sm:text-sm">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
