import type { ExperienceVideo } from "@/lib/experience";

export function StoryVideoBand({ video }: { video: ExperienceVideo }) {
  return (
    <div className="my-10 max-w-5xl">
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-card shadow-[0_14px_32px_-18px_oklch(35%_0.04_50_/_0.6)]">
        {video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}${video.start ? `?start=${video.start}` : ""}`}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            [YouTube video link needed]
          </div>
        )}
      </div>
      <div className="mt-3 text-sm text-muted">{video.title}</div>
    </div>
  );
}
