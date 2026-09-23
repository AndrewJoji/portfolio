import type { StoryProperty } from "@/lib/story";

export function StoryProperties({ properties }: { properties: StoryProperty[] }) {
  return (
    <div className="my-10 max-w-2xl overflow-x-auto rounded-2xl border border-border bg-panel p-6">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[13px] leading-relaxed">
        {properties.map(({ key, value }) => (
          <div className="contents" key={key}>
            <span className="text-accent">{key}</span>
            <span className="text-foreground">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
