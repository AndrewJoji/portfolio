export function ContactCta() {
  return (
    <section
      id="contact"
      className="mx-8 mb-16 flex flex-col gap-8 rounded-[28px] bg-panel px-8 py-12 sm:mx-20 sm:mb-24 sm:flex-row sm:items-center sm:justify-between sm:px-14 sm:py-16"
    >
      <div className="max-w-lg font-serif text-3xl italic leading-snug sm:text-4xl">
        Let&rsquo;s build something worth shipping.
      </div>
      <div className="flex flex-col items-start gap-3 sm:items-end">
        <a
          href="mailto:andrewjoji71@gmail.com"
          className="text-lg font-semibold text-accent"
        >
          andrewjoji71@gmail.com
        </a>
        <div className="flex gap-5 text-sm">
          <a href="https://www.linkedin.com/in/andrewjoji">LinkedIn</a>
          <a href="tel:+16047217636">(604) 721-7636</a>
        </div>
      </div>
    </section>
  );
}
