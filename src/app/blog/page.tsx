import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { books, formatPostDate, sortedPosts, type BookStatus } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Andrew Joji",
  description: "Things I find interesting, and the books I'm reading.",
};

const shelves: { status: BookStatus; label: string }[] = [
  { status: "reading", label: "Currently reading" },
  { status: "finished", label: "Finished" },
];

export default function BlogPage() {
  const posts = sortedPosts();

  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <main className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/" className="text-sm font-medium text-accent">
          &larr; Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Things I find interesting, and the books I&rsquo;m reading.
        </p>

        <section className="mt-14 max-w-3xl">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight">Posts</h2>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted">
              First posts coming soon.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    <time dateTime={post.date} className="tabular-nums">
                      {formatPostDate(post.date)}
                    </time>
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">{post.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{post.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-16 max-w-3xl">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight">Bookshelf</h2>
          {books.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-sm text-muted">
              Books coming soon.
            </div>
          ) : (
            shelves.map(({ status, label }) => {
              const shelf = books.filter((book) => book.status === status);
              if (shelf.length === 0) return null;
              return (
                <div key={status} className="mb-8">
                  <h3 className="mb-3 text-sm font-medium text-muted">{label}</h3>
                  <ul className="divide-y divide-border rounded-2xl border border-border bg-card shadow-card">
                    {shelf.map((book) => (
                      <li key={book.title} className="flex flex-col gap-1 px-6 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <div>
                            <span className="font-semibold tracking-tight">
                              {book.link ? (
                                <a href={book.link} target="_blank" rel="noreferrer" className="hover:text-accent">
                                  {book.title}
                                </a>
                              ) : (
                                book.title
                              )}
                            </span>
                            <span className="text-muted"> &middot; {book.author}</span>
                          </div>
                          {book.finished ? (
                            <span className="text-xs text-muted tabular-nums">{book.finished}</span>
                          ) : null}
                        </div>
                        {book.take ? (
                          <p className="text-sm leading-relaxed text-muted">{book.take}</p>
                        ) : null}
                        {book.postSlug ? (
                          <Link href={`/blog/${book.postSlug}`} className="text-sm font-medium text-accent">
                            Read my notes &rarr;
                          </Link>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
