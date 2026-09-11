export function Education() {
  return (
    <section className="border-t border-border px-8 py-16 sm:px-20 sm:py-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="text-xs font-medium tracking-[0.12em] text-muted uppercase">
            Education
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="text-lg font-semibold">
            University of British Columbia
          </div>
          <div className="mt-1 text-sm text-muted">
            Bachelor of Science, Computer Science with Co-op &middot; Vancouver,
            BC &middot; Sep 2020 &ndash; Nov 2025
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            16 months of co-op across two terms &mdash; 8 months with UBC
            Student Housing &amp; the UBC Bookstore, and 8 months running
            itsWorthIt Solutions as my own{" "}
            <a
              href="https://sciencecoop.ubc.ca/Entrepreneurial-Co-op"
              target="_blank"
              rel="noreferrer"
              className="text-accent"
            >
              entrepreneurship co-op
            </a>{" "}
            placement.
          </p>
        </div>
      </div>
    </section>
  );
}
