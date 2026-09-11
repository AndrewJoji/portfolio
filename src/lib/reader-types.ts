export type WordTiming = { word: string; start: number; end: number };
export type ReaderBlock = { words: WordTiming[] };
export type ReaderData = { blocks: ReaderBlock[] };
