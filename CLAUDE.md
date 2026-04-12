# Product Copilot — Context for Claude Code

## What this project is

productcopilot.fr is a digital product site for Product Managers ICs francophones.
It sells AI-augmented tools, templates, and workflow packs. No consulting. No calls. Async only.
Separate from julien-brionne.fr (consulting). Same person (Julien Brionne), different brand.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, Inter font. Deployed on Vercel.

## Business model

100% digital products. No subscriptions. One-time purchases on LemonSqueezy.

Three levels:
1. Outils gratuits (lead magnets) : free tools on the site, email capture via Loops.so
2. Packs thématiques (29-49 EUR) : prompt + template + workflow collections per topic
3. Bundles (79-99 EUR) : multiple packs combined

## Strategic logic: cluster-based SEO funnels

The site runs on thematic clusters. Each cluster is a self-contained acquisition funnel:

```
5+ articles SEO (blog)
    → 1 outil gratuit (lead magnet, email capture)
        → 1 séquence Loops (5-7 emails)
            → 1 pack payant (LemonSqueezy checkout)
```

Everything on the site connects to a cluster. Articles feed tools. Tools feed packs. Packs prove the articles.

### Cluster map

| Cluster     | Articles SEO         | Outil gratuit           | Pack payant                    | Status     |
|-------------|----------------------|-------------------------|--------------------------------|------------|
| Discovery   | 5 articles (to write)| Pack Discovery prompts  | Pack Système Discovery (49 EUR)| LIVE       |
| PRD         | 5 articles (written) | Template PRD IA         | Pack Vibe Coding for PMs (29 EUR) | LIVE    |
| OKRs        | 5 articles (to write)| Générateur OKR express  | Pack OKRs (29 EUR)             | BACKLOG    |
| Alignement  | 5 articles (to write)| Clarity Map express     | Pack Alignement (39 EUR)       | BACKLOG    |

### Bundles (cross-cluster)
- Bundle "PM Toolkit" (89 EUR) : PRD + Discovery + OKRs
- Bundle "Product Ops" (99 EUR) : all 4 packs

### Standalone tools (not cluster-specific)
- Générateur de User Stories (/tools/user-stories) — exists, no email capture yet

## Site architecture (aligned with strategy)

### Routes

```
/                              → Home: vitrine des 4 thématiques
/blog                          → All articles, filterable by cluster
/blog/[slug]                   → Article SEO (MDX) → CTA vers outil gratuit du cluster
/outils                        → All free tools
/outils/[slug]                 → Tool landing page + email capture → leads to pack
/packs                         → All paid packs + bundles
/packs/[slug]                  → Pack sales page → CTA LemonSqueezy
/a-propos                      → Bio Julien + mission

# Existing routes (keep as-is, integrate into /outils and /packs listings)
/pack-discovery                → Discovery cluster free tool (KEEP)
/pack-systeme-discovery        → Discovery cluster paid pack (KEEP)
/tools/user-stories            → Standalone tool (KEEP)
/mentions-legales              → Legal (KEEP)
```

### Home `/` — the catalog view

Not a pitch for one product. A vitrine for the whole system.

1. Hero: "Des outils PM concrets. Testés. Augmentés par l'IA." + 2 CTAs
2. Section par cluster (4 blocks):
   - Each block: cluster name + 1-line description + link to tool + link to pack
   - Discovery: "De l'interview au PRD en 40 min" → /pack-discovery | /pack-systeme-discovery
   - PRD: "Ecris des PRDs clairs en 10 min" → /outils/template-prd-ia | /packs/prd-ia
   - OKRs: "Des OKRs qui mesurent l'impact" → /outils/generateur-okr | /packs/okrs (coming soon)
   - Alignement: "Aligne produit, tech et business" → /outils/clarity-map | /packs/alignement (coming soon)
3. Section "Articles récents": 3 latest articles
4. Section newsletter: FormulaireLoops.tsx
5. Footer with all nav links

### Blog `/blog`

- All articles listed, most recent first
- Each article tagged with its cluster (discovery, prd, okrs, alignement)
- Optional: filter by cluster
- Each article-card shows: title, description, date, reading time, cluster badge

### Article `/blog/[slug]`

- MDX with frontmatter including cluster tag
- Bottom CTA: card pointing to the cluster's free tool (relatedTool)
- Sidebar or bottom: 2-3 related articles from the same cluster
- SEO: title, description, OG, JSON-LD Article

### Outils `/outils`

- Grid of all free tools
- Includes existing tools with links to their current routes:
  - Pack Discovery prompts → /pack-discovery
  - Générateur User Stories → /tools/user-stories
- Includes new tools on /outils/[slug]:
  - Template PRD IA → /outils/template-prd-ia
  - Générateur OKR → /outils/generateur-okr (backlog)
  - Clarity Map express → /outils/clarity-map (backlog)

### Packs `/packs`

- Grid of all paid packs + bundles
- Includes existing packs with links:
  - Pack Système Discovery (49 EUR) → /pack-systeme-discovery
- Includes new packs on /packs/[slug]:
  - Pack PRD + IA (39 EUR) → /packs/prd-ia
  - Pack OKRs (29 EUR) → /packs/okrs (backlog)
  - Pack Alignement (39 EUR) → /packs/alignement (backlog)
- Bundles section at bottom:
  - Bundle PM Toolkit (89 EUR)
  - Bundle Product Ops (99 EUR)

## Current state of the repo

### Key existing files (do not break)
- `lib/pack-prompts.ts` — All 10 discovery prompts
- `lib/blog.ts` — Blog utilities: getAllPosts(), getPostBySlug(), getAllSlugs()
- `lib/prd-prompt-template.ts` — PRD prompt builder (buildPRDPrompt, PROMPT_SPLIT_MARKER)
- `app/page.tsx` — Current landing page (to refactor into catalog view)
- `app/blog/page.tsx` — Blog listing page (live)
- `app/blog/[slug]/page.tsx` — Blog article page with MDXRemote (live)
- `app/outils/template-prd-ia/page.tsx` — PRD generator tool (live)
- `components/PRDGenerator.tsx` — 7-field form, partial preview, email gate, copy
- `components/TrackLink.tsx` — Next.js Link wrapper with Plausible event tracking
- `lib/clusters.ts` — 4 cluster definitions (id, name, tool, pack, badge)
- `lib/tools.ts` — tool catalog data
- `lib/packs.ts` — pack catalog data (pack-systeme-discovery + vibe-coding-pm)
- `app/packs/vibe-coding-pm/page.tsx` — Pack Vibe Coding for PMs sales page (live, 29 EUR)
- `content/blog/` — 5 MDX articles (PRD cluster), with frontmatter
- `app/pack-discovery/` — Discovery prompt explorer
- `app/pack-systeme-discovery/` — Pack Système announcement + PackSystemeForm.tsx
- `app/tools/user-stories/` — User stories generator
- `components/PackDiscovery.tsx` — Interactive prompt explorer with email gate
- `components/FormulaireLoops.tsx` — Newsletter form
- `app/api/subscribe-pack/route.ts` — Email capture API (accepts `source` field)
- `app/api/pack-prompts/route.ts` — Returns gated prompts
- `app/api/loops/subscribe/route.ts` — Loops subscription

### Architecture decisions (existing)
- localStorage stores client-side unlock state after email submission
- API checks `x-pack-unlocked` header for gated prompts
- Email gate is soft (no server-side auth)
- subscribe-pack API uses `source` field to distinguish origins
- Loops mailing list ID: `cmn8rfval9kam0iyu21xw72w6`

## Content available

### Written and live
- 5 articles cluster PRD — published in `content/blog/` (accessible via /blog)
- 10 discovery prompts — live on /pack-discovery

### To write
- 5 articles cluster Discovery
- 5 articles cluster OKRs
- 5 articles cluster Alignement
- Pack PRD + IA content (sales page + product files)

## Execution priority

### Phase 1: Blog + PRD cluster (in progress)
1. ✅ Setup MDX blog system (content/blog/, lib/blog.ts, app/blog/, app/blog/[slug]/)
2. ✅ Publish 5 PRD articles (live at /blog)
3. ✅ Update sitemap (includes /blog + 5 article URLs)
4. ✅ Add Blog to nav + footer on home
5. ✅ Build /outils/template-prd-ia (lead magnet, email capture → source: "template-prd-ia")
6. ✅ Refactor home to catalog view (clusters, tools, packs, articles, newsletter, bio)
7. ✅ Update nav: Blog | Outils | Packs
8. Create /outils listing page (include existing tools)
9. Create /packs listing page (include existing packs)

### Phase 2: PRD pack + optimization
10. ✅ Build /packs/vibe-coding-pm sales page (Pack Vibe Coding for PMs, 29 EUR, live)
11. ✅ LemonSqueezy product created (link: https://productcopilot.lemonsqueezy.com/checkout/buy/81d43207-7c71-422f-904c-54daf2cc439b)
12. Build Loops sequence for PRD cluster (tag: prd-cluster) — 7 emails sur 18 jours, spec dans docs/
13. Add email capture to /tools/user-stories
14. Write 5 Discovery cluster articles

### Phase 3: Scale
15. Build OKRs cluster (articles + tool + pack)
16. Build Alignement cluster (articles + tool + pack)
17. Create bundles
18. Google Ads on best-converting tool pages

## Julien's methodology (embedded in products)

- FRAME: Focus, Risques, Alignement, Mesure, Experimentation
- POP: Product One Page (problem, opportunity, hypothesis, metrics, experimentation, dependencies, OKR link)
- SOC: Strategy, Operations, Communication
- Clarity Map: diagnostic produit & organisation
- TARS: Targeted, Adopted, Retained, Satisfied

## Code conventions

- Variables, comments, function names: English
- User-facing content: French
- App Router, Server Components by default
- Tailwind CSS, MDX for blog
- SEO metadata on every page
- Performance target: 95+ Lighthouse
- Reuse existing API routes and components when possible

## Tone

Expert talking to a peer. Tutoiement. Short sentences. No marketing jargon. No AI hype. No emojis in articles. Utilitarian: "here's the tool, here's how to use it, here's the result."