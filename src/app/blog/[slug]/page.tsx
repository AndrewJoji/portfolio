import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoryBody } from "@/components/story-body";
import { formatPostDate, getPost, posts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} — Andrew Joji`,
    description: post.summary,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <article className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/blog" className="text-sm font-medium text-accent">
          &larr; Back to blog
        </Link>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
          <time dateTime={post.date} className="tabular-nums">
            {formatPostDate(post.date)}
          </time>
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <StoryBody story={post.body} localMedia={[]} />
      </article>
      <SiteFooter />
    </div>
  );
}
