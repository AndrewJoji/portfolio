import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { experience } from "../src/lib/experience.ts";
import { projects } from "../src/lib/projects.ts";
import { aboutText, heroHeadline, heroTagline } from "../src/lib/site-copy.ts";

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

type Track = { outPath: string; text: string };

function experienceText(entry: (typeof experience)[number]): string {
  if (entry.story) {
    return entry.story
      .map((section) => {
        const heading = section.heading ? `${section.heading}. ` : "";
        return heading + section.paragraphs.join(" ");
      })
      .join(" ");
  }
  return entry.bullets.join(" ");
}

const tracks: Track[] = [
  {
    outPath: "public/audio/home.mp3",
    text: [heroHeadline, heroTagline, aboutText].join(" "),
  },
  ...experience.map((entry) => ({
    outPath: `public/audio/experience/${entry.slug}.mp3`,
    text: `${entry.title}, ${entry.org}. ${experienceText(entry)}`,
  })),
  ...projects.map((project) => ({
    outPath: `public/audio/projects/${project.slug}.mp3`,
    text: `${project.title}, ${project.org}. ${project.bullets.join(" ")}`,
  })),
];

async function generate(track: Track) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: track.text,
        model_id: "eleven_turbo_v2_5",
      }),
    },
  );

  if (!res.ok) {
    throw new Error(
      `ElevenLabs API error for ${track.outPath}: ${res.status} ${await res.text()}`,
    );
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  mkdirSync(path.dirname(track.outPath), { recursive: true });
  writeFileSync(track.outPath, buffer);
  console.log(`wrote ${track.outPath} (${buffer.length} bytes)`);
}

for (const track of tracks) {
  await generate(track);
}
