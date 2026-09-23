import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCover } from "@/components/book-cover";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { bookCoverSrc, books, getBook } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/books/[slug]">) {
  const { slug } = await props.params;
  const book = getBook(slug);

  if (!book) {
    return {};
  }

  return {
    title: `${book.title} — Andrew Joji`,
    description: `${book.title} by ${book.author}, on Andrew Joji's bookshelf.`,
  };
}

export default async function BookPage(props: PageProps<"/blog/books/[slug]">) {
  const { slug } = await props.params;
  const book = getBook(slug);

  if (!book) {
    notFound();
  }

  const status =
    book.status === "reading"
      ? "Currently reading"
      : `Finished${book.finished ? ` · ${book.finished}` : ""}`;

  return (
    <div className="flex flex-1 flex-col">
      <SiteNav />
      <article className="flex-1 px-8 py-10 sm:px-20 sm:py-14">
        <Link href="/blog" className="text-sm font-medium text-accent">
          &larr; Back to blog
        </Link>
        <div className="mt-8 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-[200px_1fr] sm:gap-10">
          <div className="w-40 sm:w-full">
            <BookCover
              src={bookCoverSrc(book)}
              title={book.title}
              author={book.author}
              sizes="(min-width: 640px) 200px, 160px"
            />
          </div>
          <div>
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              {book.category}
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-4xl">
              {book.title}
            </h1>
            <div className="mt-2 text-lg text-muted">{book.author}</div>
            <div className="mt-4 text-sm text-muted">{status}</div>

            {book.take ? (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">{book.take}</p>
            ) : (
              <p className="mt-6 max-w-2xl text-muted">Thoughts coming once I&rsquo;ve finished it.</p>
            )}

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              {book.postSlug ? (
                <Link href={`/blog/${book.postSlug}`} className="text-accent">
                  Read my notes &rarr;
                </Link>
              ) : null}
              {book.link ? (
                <a href={book.link} target="_blank" rel="noreferrer" className="text-accent">
                  View on Goodreads &rarr;
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
