const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
  console.error(
    "Missing ELEVENLABS_API_KEY. Copy .env.local.example to .env.local and fill it in.",
  );
  process.exit(1);
}

const res = await fetch("https://api.elevenlabs.io/v2/voices", {
  headers: { "xi-api-key": apiKey },
});

if (!res.ok) {
  console.error(`ElevenLabs API error: ${res.status} ${await res.text()}`);
  process.exit(1);
}

const data = await res.json();

for (const voice of data.voices) {
  console.log(
    `${voice.name}  ${voice.voice_id}  (${voice.labels?.gender ?? "?"}, ${voice.labels?.accent ?? "?"}, ${voice.labels?.description ?? voice.category})`,
  );
}
