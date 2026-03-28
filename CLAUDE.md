# Product Copilot — Context for Claude Code

## What this project is

productcopilot.fr is a digital product site selling AI prompts/workflows for Product Managers.
It is separate from julien-brionne.fr (consulting/fractional positioning). Same person (Julien Brionne), different brand.

Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Inter font.
Deployment target: Vercel (not yet deployed).

## Current state (2026-03-28)

- Site runs locally, not yet on Vercel.
- **Monetization model (pivot):** 10 prompts free (email gate lead magnet), Pack Système Discovery payant at 49 EUR (templates + guide + workflow). The Pack Système does not exist yet — the page is an announcement with email collection.
- Prompts live in `lib/pack-prompts.ts`. Fully rewritten 2026-03-28 to be systemic (strict input/output contracts between prompts, FRAME methodology embedded).
- Email gate: 3 prompts free, 7 gated behind email (Loops.so). Mailing list ID: `cmn8rfval9kam0iyu21xw72w6`.
- Payment: No checkout yet. Pack Système announced but not built.
- Analytics: Plausible (may not be configured yet).
- Loops email automation: 3 emails planned but not yet created.

## The 10 prompts (current titles)

1. L'Extracteur de Signaux (free)
2. Le Synthetiseur Multi-Interviews (free)
3. Le Challenger Strategique (free) — embeds FRAME methodology
4. Le Mapping d'Opportunites (gated)
5. Le Decideur (gated) — forces go/no-go with explicit trade-offs
6. L'Arbitre de Trade-offs (gated)
7. Le POP Builder (gated)
8. Le PRD Architect (gated)
9. Le Memo d'Alignement (gated)
10. La Revue 30 Jours (gated)

Prompt chain: 01 -> 02 -> 03 -> 04 -> 05 -> 06 (optional) -> 07 -> 08 -> 09 -> 10.
Each prompt has strict output format that feeds into the next.

## Routes

- `/` — Landing page.
- `/pack-discovery` — Interactive prompt explorer with email gate (lead magnet).
- `/pack-systeme-discovery` — Announcement page for Pack Système (49 EUR, not yet available). Collects emails with `pack-systeme-interest` source.
- `/pack-discovery-ia` — **Redirects** to `/pack-systeme-discovery` (302, non-permanent).
- `/mentions-legales` — Legal page.

## Key files

- `lib/pack-prompts.ts` — All 10 prompts (core product content). Types: PromptVariable, PromptItem.
- `app/page.tsx` — Landing page.
- `app/pack-systeme-discovery/page.tsx` — Pack Système announcement page.
- `app/pack-systeme-discovery/PackSystemeForm.tsx` — Email collection form (client component).
- `components/PackDiscovery.tsx` — Interactive prompt explorer with email gate.
- `components/FormulaireLoops.tsx` — Newsletter form.
- `app/api/loops/subscribe/route.ts` — Loops subscription endpoint.
- `app/api/subscribe-pack/route.ts` — Pack email gate subscription. Accepts optional `source` field: `"pack-discovery"` (default) or `"pack-systeme-interest"`.
- `app/api/pack-prompts/route.ts` — Returns gated prompts (checks x-pack-unlocked header).

## Known issues / pending work

1. Pack Système not built yet (page is announcement + email collection only).
2. Loops 3-email automation not configured.
3. Plausible analytics may not be installed.
4. No 404 page.
5. Vercel deployment not yet done.

## Architecture decisions

- localStorage stores client-side unlock state after email submission.
- API route checks `x-pack-unlocked` header to serve gated prompts.
- Email gate is soft (no server-side auth). Acceptable for free lead magnet.
- No user accounts. No dashboard.
- subscribe-pack API uses `source` field to distinguish pack-discovery unlocks from pack-systeme interest signups.

## Julien's methodology (embedded in prompts)

- FRAME: Focus, Risques, Alignement, Mesure, Experimentation.
- Core philosophy: forced clarity, explicit trade-offs, kill what doesn't work.
- POS (Product Operating System): FRAME + SOC + Clarity Map (consulting side, not directly in this product).

## Code conventions

- Variables, comments, function names: English.
- User-facing content: French.
- No semicolons in the prompts (they use backtick template literals).
