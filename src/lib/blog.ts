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
  title: string;
  author: string;
  status: BookStatus;
  finished?: string;
  link?: string;
  take?: string;
  postSlug?: string;
};

export const posts: BlogPost[] = [];

export const books: Book[] = [
  {
    title: "Essentialism: The Disciplined Pursuit of Less",
    author: "Greg McKeown",
    status: "reading",
  },
  {
    title: "Good Talk: A Memoir in Conversations",
    author: "Mira Jacob",
    status: "finished",
    finished: "Aug 2026",
    link: "https://www.goodreads.com/book/show/34953002",
    take: "A graphic memoir told through conversations about race, family and belonging. What stayed with me: ideas about skin colour are taught, not innate, and you can watch a child pick them up in real time. And a mixed family can work well even when the people around it assume it can't.",
  },
];

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
