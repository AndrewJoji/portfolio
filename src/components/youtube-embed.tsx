export function YoutubeEmbed({
  youtubeId,
  title,
}: {
  youtubeId?: string;
  title: string;
}) {
  if (!youtubeId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-card text-sm text-muted">
        [YouTube video link needed]
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-2xl">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
