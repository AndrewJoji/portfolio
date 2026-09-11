import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { experience } from "../src/lib/experience.ts";
import { projects } from "../src/lib/projects.ts";
import { aboutText, heroTagline } from "../src/lib/site-copy.ts";
import { alignmentToBlocks, type CharAlignment } from "./lib/alignment.mts";

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;

if (!apiKey) {
  console.error(
    "Missing ELEVENLABS_API_KEY. Copy .env.local.example to .env.local and fill it in.",
  );
  process.exit(1);
}

if (!voiceId) {
  console.error(
    "Missing ELEVENLABS_VOICE_ID. Run `npm run voices` to list your available voices, then add ELEVENLABS_VOICE_ID=<id> to .env.local.",
  );
  process.exit(1);
}

type Page = { key: string; blockTexts: string[] };

// Titles/headings are intentionally excluded from spoken + highlighted
// blocks: they use manual line breaks or mixed styling that don't map
// cleanly onto word-span rendering. Reading starts at the first bullet
// or paragraph instead.
function experienceBlocks(entry: (typeof experience)[number]): string[] {
  if (entry.story) {
    return entry.story.flatMap((section) =>
      section.heading ? [section.heading, ...section.paragraphs] : section.paragraphs,
    );
  }
  return entry.bullets;
}

const pages: Page[] = [
  { key: "home", blockTexts: [heroTagline, aboutText] },
  ...experience.map((entry) => ({
    key: `experience/${entry.slug}`,
    blockTexts: experienceBlocks(entry),
  })),
  ...projects.map((project) => ({
    key: `projects/${project.slug}`,
    blockTexts: project.bullets,
  })),
];

async function generate(page: Page) {
  const fullText = page.blockTexts.join(" ");

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: fullText,
        model_id: "eleven_turbo_v2_5",
        output_format: "mp3_44100_128",
      }),
    },
  );

  if (!res.ok) {
    throw new Error(
      `ElevenLabs API error for ${page.key}: ${res.status} ${await res.text()}`,
    );
  }

  const json = (await res.json()) as {
    audio_base64: string;
    alignment: CharAlignment;
  };

  const audioBuffer = Buffer.from(json.audio_base64, "base64");
  const mp3Path = `public/audio/${page.key}.mp3`;
  const jsonPath = `public/audio/${page.key}.json`;

  mkdirSync(path.dirname(mp3Path), { recursive: true });
  writeFileSync(mp3Path, audioBuffer);

  const blocks = alignmentToBlocks(page.blockTexts, json.alignment);
  writeFileSync(jsonPath, JSON.stringify({ blocks }));

  console.log(
    `wrote ${mp3Path} (${audioBuffer.length} bytes), ${jsonPath} (${blocks.reduce((n, b) => n + b.words.length, 0)} words)`,
  );
}

for (const page of pages) {
  await generate(page);
}
