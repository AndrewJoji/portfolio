import type { Metadata } from "next";
import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { bookCoverSrc, books, formatPostDate, sortedPosts, type BookStatus } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Andrew Joji",
  description: "Things I find interesting, and the books I'm reading.",
};

const statusLabel: Record<BookStatus, string> = {
  reading: "Reading now",
  finished: "Finished",
};

export default function BlogPage() {
  const posts = sortedPosts();
  const shelf = [...books].sort((a, b) => Number(b.status === "reading") - Number(a.status === "reading"));

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
            <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {shelf.map((book) => (
                <li key={book.slug}>
                  <Link href={`/blog/books/${book.slug}`} className="group flex flex-col items-center gap-2">
                    <div className="mb-1 w-full transition-transform duration-200 group-hover:-translate-y-1">
                      <BookCover
                        src={bookCoverSrc(book)}
                        title={book.title}
                        author={book.author}
                        sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                      />
                    </div>
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
                      {book.category}
                    </span>
                    <span className="text-xs text-muted">{statusLabel[book.status]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
