import { findImage } from "@/lib/site-image";
import type { StorySection } from "@/lib/story";

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  tags?: string[];
  body: StorySection[];
};

export type BookStatus = "reading" | "finished";

export type Book = {
  slug: string;
  title: string;
  author: string;
  status: BookStatus;
  category: string;
  isbn?: string;
  finished?: string;
  link?: string;
  take?: string;
  postSlug?: string;
};

export const posts: BlogPost[] = [];

export const books: Book[] = [
  {
    slug: "essentialism",
    title: "Essentialism: The Disciplined Pursuit of Less",
    author: "Greg McKeown",
    status: "reading",
    category: "Productivity",
    isbn: "9780804137386",
  },
  {
    slug: "good-talk",
    title: "Good Talk: A Memoir in Conversations",
    author: "Mira Jacob",
    status: "finished",
    category: "Graphic memoir",
    isbn: "9780399588952",
    finished: "Aug 2026",
    link: "https://www.goodreads.com/book/show/34953002",
    take: "A graphic memoir told through conversations about race, family and belonging. What stayed with me: ideas about skin colour are taught, not innate, and you can watch a child pick them up in real time. And a mixed family can work well even when the people around it assume it can't.",
  },
];

export function getBook(slug: string) {
  return books.find((book) => book.slug === slug);
}

// A file at public/blog/books/<slug>.<ext> wins; otherwise the visitor's
// browser loads the Open Library cover, which 404s (and falls back) if missing.
export function bookCoverSrc(book: Book) {
  return (
    findImage("blog/books", book.slug) ??
    (book.isbn ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false` : null)
  );
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
