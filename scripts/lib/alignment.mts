import type { ReaderBlock } from "../../src/lib/reader-types.ts";

export type CharAlignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

/**
 * Splits ElevenLabs' character-level alignment into per-block word timings.
 * `blocks` are the exact texts sent to the API, joined with a single space
 * between each (the same separator used to build the full request text) --
 * this function re-derives each block's character range from that same
 * join logic so the mapping always matches what was actually sent.
 */
export function alignmentToBlocks(
  blockTexts: string[],
  alignment: CharAlignment,
): ReaderBlock[] {
  const { characters, character_start_times_seconds, character_end_times_seconds } =
    alignment;

  // Recompute each block's [start, end) character range in the joined text.
  const ranges: { start: number; end: number }[] = [];
  let cursor = 0;
  for (const text of blockTexts) {
    const start = cursor;
    const end = start + text.length;
    ranges.push({ start, end });
    cursor = end + 1; // +1 for the joining space
  }

  const blocks: ReaderBlock[] = blockTexts.map(() => ({ words: [] }));

  let wordStartIndex: number | null = null;
  let wordChars = "";

  function flushWord(endIndexExclusive: number) {
    if (wordStartIndex === null || wordChars.trim() === "") {
      wordStartIndex = null;
      wordChars = "";
      return;
    }
    const start = character_start_times_seconds[wordStartIndex];
    const end = character_end_times_seconds[endIndexExclusive - 1];
    // Assign to whichever block's range contains the word's first character.
    const blockIndex = ranges.findIndex(
      (r) => wordStartIndex! >= r.start && wordStartIndex! < r.end,
    );
    if (blockIndex !== -1) {
      blocks[blockIndex].words.push({ word: wordChars, start, end });
    }
    wordStartIndex = null;
    wordChars = "";
  }

  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i];
    if (/\s/.test(ch)) {
      flushWord(i);
    } else {
      if (wordStartIndex === null) wordStartIndex = i;
      wordChars += ch;
    }
  }
  flushWord(characters.length);

  return blocks;
}
