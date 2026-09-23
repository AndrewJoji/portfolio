import type { StoryVideo } from "@/lib/story";

export function StoryVideoBand({ video }: { video: StoryVideo }) {
  return (
    <div className="my-10 max-w-5xl">
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-card shadow-card">
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
