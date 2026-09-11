import type { ReactNode } from "react";

export function StoryQuoteBlock({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-10 max-w-2xl rounded-2xl border-l-4 border-accent bg-panel py-6 pr-8 pl-6">
      {label ? (
        <div className="mb-2 text-xs font-medium tracking-[0.12em] text-muted uppercase">
          {label}
        </div>
      ) : null}
      <p className="font-serif text-xl leading-relaxed italic text-foreground">
        &ldquo;{children}&rdquo;
      </p>
    </div>
  );
}
