const roles = [
  {
    title: "Software Developer Extern",
    org: "PricewaterhouseCoopers",
    years: "Jan 2024 – Apr 2024",
  },
  {
    title: "Line Producer",
    org: "Independent Feature Film",
    years: "Apr 2026 – Present",
  },
  { title: "Founder & Operator", org: "itsWorthIt", years: "Mar 2024 – Present" },
  {
    title: "Tech Volunteer",
    org: "Education without Borders",
    years: "May 2026 – Present",
  },
];

export function Experience() {
  return (
    <section className="px-8 py-16 sm:px-20 sm:py-24">
      <div className="mb-8 text-xs font-medium tracking-[0.12em] text-muted uppercase">
        Experience
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((role) => (
          <div
            key={role.title}
            className="rounded-2xl bg-card p-6 shadow-[0_10px_28px_-20px_oklch(35%_0.04_50_/_0.55)]"
          >
            <div className="text-lg font-semibold">{role.title}</div>
            <div className="mt-2 text-sm text-muted">
              {role.org} &middot; {role.years}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
