import type { ReactNode } from "react";

export function StoryQuoteBlock({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-10 max-w-2xl rounded-2xl border border-border border-l-4 border-l-accent bg-card shadow-card py-6 pr-8 pl-6">
      {label ? (
        <div className="mb-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          {label}
        </div>
      ) : null}
      <p className="text-xl leading-relaxed text-foreground">
        &ldquo;{children}&rdquo;
      </p>
    </div>
  );
}
