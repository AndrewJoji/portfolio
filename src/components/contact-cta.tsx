export function ContactCta() {
  return (
    <section
      id="contact"
      className="mx-8 mb-16 flex flex-col gap-8 rounded-[28px] bg-panel px-8 py-12 sm:mx-20 sm:mb-24 sm:flex-row sm:items-center sm:justify-between sm:px-14 sm:py-16"
    >
      <div className="max-w-lg font-serif text-3xl italic leading-snug sm:text-4xl">
        Let&rsquo;s build something worth shipping.
      </div>
      <div className="flex flex-col items-start gap-4 sm:items-end">
        <a
          href="mailto:andrewjoji71@gmail.com"
          className="text-lg font-semibold text-accent"
        >
          andrewjoji71@gmail.com
        </a>
        <a href="tel:+16047217636" className="text-sm">
          (604) 721-7636
        </a>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/andrewjoji"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
          </a>
          <a
            href="https://github.com/AndrewJoji"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.5v-1.75c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.29 9.29 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.95.68 1.92v2.85c0 .28.18.61.69.5A9.98 9.98 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
