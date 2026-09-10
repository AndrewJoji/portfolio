@AGENTS.md

# Project Standards — andrewjoji.com Portfolio

## Stack
- Next.js (App Router), TypeScript in strict mode, Tailwind CSS v4.
- Deployed to Vercel via native GitHub integration (push to `main` = production deploy, PRs get preview deploys).
- Package manager: npm.

## Conventions
- Prefer server components; only add `"use client"` where interactivity actually requires it.
- Use the `@/*` import alias (maps to `src/*`) instead of relative `../../` chains.
- Style with Tailwind utility classes; avoid introducing a separate CSS-in-JS or component library unless a specific need arises.
- Keep components small and colocated under `src/components/`; page routes live under `src/app/`.
- No unnecessary comments — code should read clearly from naming. Only comment non-obvious "why".
- Do not add abstractions, config options, or dependencies beyond what the current task needs.

## Before committing
- `npm run lint`
- `npm run typecheck`
- `npm run build`

All three also run in CI on every PR (see `.github/workflows/ci.yml`) and must pass before merge.

## Content notes
- Resume/experience facts (dates, figures, employers) are the source of truth in the user's master resume — do not invent or alter factual details about work history, metrics, or project descriptions.
- Site copy should stay consistent with the positioning: cross-disciplinary background (CS + film line producer + founder + volunteer work) framed as range and adaptability.
