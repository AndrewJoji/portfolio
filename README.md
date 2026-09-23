# andrewjoji.com

Personal portfolio for Andrew Joji — software engineer, founder, and film line producer. The site is built to show range: CS work, a business I run, film production, and volunteer work, each told as a short story rather than a list of bullets.

**Live:** [andrewjoji.com](https://andrewjoji.com)

## Features

### Read-aloud in my own voice
Every page with long-form writing has an audio player that reads the page aloud in a voice cloned from a short recording of mine (via the ElevenLabs API).

- **Word-by-word highlighting** follows the narration, so you can read along.
- **Click any word** to jump the audio to that point.
- Skip ±10s, scrub, and change speed (0.75×–2×).

**Why:** this is an accessibility feature first. Some people are low-vision, some have dyslexia, and some just take things in better by listening. A portfolio is mostly reading, and I wanted it to work for those visitors too. Using my own voice instead of a stock one keeps it personal, since it's still me telling the story. Highlighting the words as they're read helps people follow along and find their place again, which plain audio doesn't do.

The audio and word timings are **pre-generated** by a local script and committed as static files (`public/audio/**.mp3` + `.json`). The live site makes no text-to-speech API calls and holds no API keys, and playback is instant.

### Night mode
A toggle in the nav switches between light and dark themes. The site follows your system setting until you choose one, and then remembers your choice. A small inline script applies the theme before the first paint, so the page never flashes the wrong theme on load.

### Travel globe
A 3D globe (`react-globe.gl` + three.js) traces where I've lived, from South Africa to Kerala, Saudi Arabia, Qatar, and Vancouver, with animated arcs along the route. It spins slowly on its own so every stop comes into view, and a numbered legend below lists each place. It isn't draggable or zoomable, so it's something to watch rather than operate, and it never grabs the page's scroll or touch gestures. It stops spinning for visitors who have reduced motion turned on, and it only loads when it scrolls into view to keep the first page load light.

### Story pages for roles and projects
Each experience and project has its own page built from structured content in `src/lib/`. A story can mix:
- narrative sections, pull quotes, and key/value "properties" blocks
- SVG architecture diagrams (theme-aware, redrawn in code rather than exported as images)
- real data snapshots (e.g. the schema and price comparison from the wholesale pricing pipeline)
- embedded YouTube videos, photo carousels, and a categorized photo gallery with a full-screen lightbox (e.g. film behind-the-scenes)

Carousels and the lightbox can be browsed with the on-screen arrows or by swiping on touch screens. The lightbox also supports the ← / → keys and Esc, and the page behind it stays put while it's open.

### Workshop
A `/workshop` page for small tools I'm building for my own life, grouped by area. Right now that's fishing (a setup visualizer, salmon species ID, and a regulations quiz) plus a wall-mounted iPad task board. Each tool is one entry in `src/lib/workshop.ts` with a status of idea, building or live. Adding an `href` turns its card into a link once the tool exists.

### Drop-in media
Photos and videos placed in `public/projects/<slug>/` or `public/experience/<slug>/` are picked up automatically at build time. A numeric filename prefix (e.g. `01-`) sets the order, and the rest of the filename becomes the caption.

## Design

The site uses a clean, product-style look: an off-white (or near-black in dark mode) background, rounded cards with soft shadows, pill tags, an indigo accent, and a faint indigo-to-sky glow behind the hero. It's set in **Geist** and **Geist Mono**.

**Why:** the goal is for software, business, and film work to sit side by side without one style favoring any of them. The product-style look reads as polished and modern, and it matches the founder side. The neutral base lets photos from film sets and screenshots of dashboards both look at home.

All colors are CSS variables in `src/app/globals.css`, exposed to Tailwind as `bg-card`, `text-muted`, `text-accent`, etc. Dark mode redefines those same variables under `[data-theme="dark"]`, so components are written once and work in both themes.

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React 19, TypeScript (strict)
- Tailwind CSS v4
- `react-globe.gl` / three.js for the globe
- ElevenLabs (offline, via scripts) for narration
- Deployed on Vercel

## Development

```bash
npm install
npm run dev          # http://localhost:3000
```

Before committing (these also run in CI on every PR):

```bash
npm run lint
npm run typecheck
npm run build
```

### Regenerating narration

Only needed after changing page copy that's read aloud (hero tagline, about text, or role/project stories).

```bash
cp .env.local.example .env.local   # add ELEVENLABS_API_KEY
npm run voices                     # list voices, then set ELEVENLABS_VOICE_ID
npm run generate-audio             # writes public/audio/**.mp3 + .json
```

## Branching and deploys

- Feature branches come off `staging` and go back into it through a PR. Merging deploys to the persistent staging URL.
- Once a change is verified on staging, a promotion PR from `staging` into `main` deploys it to production at andrewjoji.com.
- Every other branch or PR gets its own Vercel preview URL.
