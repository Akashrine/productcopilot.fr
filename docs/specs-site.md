# Specs Site — Refonte productcopilot.fr

## Logique stratégique

Chaque page du site appartient à un cluster thématique et remplit un rôle dans le tunnel :

```
Article SEO (/blog/[slug])        → attire du trafic Google
    ↓ CTA en bas d'article
Outil gratuit (/outils/[slug])    → capture l'email (Loops)
    ↓ Séquence Loops (5-7 emails)
Pack payant (/packs/[slug])       → vend sur LemonSqueezy
    ↓ Email post-achat
Article d'un autre cluster        → réengage dans un autre tunnel
```

Les pages /outils et /packs sont des hubs qui agrègent tous les tunnels. La home est la vitrine globale.

## Fichiers à créer

```
app/
├── blog/
│   ├── page.tsx                    → Liste articles
│   └── [slug]/
│       └── page.tsx                → Article MDX
├── outils/
│   ├── page.tsx                    → Liste outils gratuits
│   └── [slug]/
│       └── page.tsx                → Landing outil + capture email
├── packs/
│   ├── page.tsx                    → Catalogue packs + bundles
│   └── [slug]/
│       └── page.tsx                → Page de vente pack
├── a-propos/
│   └── page.tsx                    → Bio + mission

components/
├── article-card.tsx                → Card article (titre, date, cluster badge, reading time)
├── tool-card.tsx                   → Card outil (titre, description, badge "Gratuit")
├── pack-card.tsx                   → Card pack (titre, prix, description)
├── bundle-card.tsx                 → Card bundle (titre, prix, packs inclus)
├── cta-tool.tsx                    → CTA vers outil gratuit (bas des articles)
├── email-capture.tsx               → Formulaire capture email générique
├── cluster-section.tsx             → Block cluster pour la home (nom, description, liens outil + pack)

content/
└── blog/
    ├── comment-ecrire-un-prd-en-2026.mdx
    ├── prd-et-ia-guide-pratique.mdx
    ├── template-prd-gratuit.mdx
    ├── prd-vs-prototype.mdx
    └── erreurs-prd-product-manager.mdx

lib/
├── mdx.ts                          → Helpers lecture MDX
├── clusters.ts                     → Config des clusters (metadata, liens, couleurs)
```

## Data model: clusters.ts

```typescript
export type Cluster = {
  id: string            // "discovery" | "prd" | "okrs" | "alignement"
  name: string          // "Discovery" | "PRD" | "OKRs" | "Alignement"
  description: string   // One-liner pour la home
  toolHref: string      // Lien vers l'outil gratuit
  toolTitle: string     // Nom de l'outil
  packHref: string      // Lien vers le pack payant
  packTitle: string     // Nom du pack
  packPrice: string     // "39 €" | "49 €" | "Bientôt"
  status: "live" | "coming"
}

export const clusters: Cluster[] = [
  {
    id: "discovery",
    name: "Discovery",
    description: "De l'interview au PRD en 40 min.",
    toolHref: "/pack-discovery",
    toolTitle: "10 prompts Discovery IA",
    packHref: "/pack-systeme-discovery",
    packTitle: "Pack Système Discovery",
    packPrice: "49 €",
    status: "live",
  },
  {
    id: "prd",
    name: "PRD",
    description: "Ecris des PRDs clairs en 10 min.",
    toolHref: "/outils/template-prd-ia",
    toolTitle: "Template PRD IA",
    packHref: "/packs/prd-ia",
    packTitle: "Pack PRD + IA",
    packPrice: "39 €",
    status: "coming", // change to "live" when ready
  },
  {
    id: "okrs",
    name: "OKRs",
    description: "Des OKRs qui mesurent l'impact.",
    toolHref: "/outils/generateur-okr",
    toolTitle: "Générateur OKR express",
    packHref: "/packs/okrs",
    packTitle: "Pack OKRs Produit",
    packPrice: "29 €",
    status: "coming",
  },
  {
    id: "alignement",
    name: "Alignement",
    description: "Aligne produit, tech et business.",
    toolHref: "/outils/clarity-map",
    toolTitle: "Clarity Map express",
    packHref: "/packs/alignement",
    packTitle: "Pack Alignement",
    packPrice: "39 €",
    status: "coming",
  },
]
```

## Data model: MDX frontmatter

```yaml
---
title: "Comment écrire un PRD en 2026"
description: "Le guide pour PMs qui veulent aller vite."
slug: "comment-ecrire-un-prd-en-2026"
date: "2026-04-11"
readingTime: "7 min"
cluster: "prd"
keywords: ["template PRD product manager", "écrire un PRD"]
relatedTool: "template-prd-ia"
relatedPack: "prd-ia"
---
```

Le champ `cluster` connecte l'article au bon tunnel. Il sert à :
- Afficher le badge cluster sur article-card
- Filtrer les articles par cluster sur /blog
- Trouver les articles liés (même cluster)
- Relier au bon outil et pack via clusters.ts

## Data model: outils et packs

Pour le MVP, pas de CMS. Les données outils et packs sont hardcodées dans des fichiers config :

```typescript
// lib/tools.ts
export const tools = [
  {
    slug: "pack-discovery",
    title: "10 prompts Discovery IA",
    description: "Transforme tes interviews en PRD en 40 min.",
    href: "/pack-discovery",  // route existante
    cluster: "discovery",
    isExternal: true,         // pointe vers une route existante, pas /outils/[slug]
  },
  {
    slug: "user-stories",
    title: "Générateur de User Stories",
    description: "Feature en entrée, user stories structurées en sortie.",
    href: "/tools/user-stories",
    cluster: null,            // standalone, pas lié à un cluster
    isExternal: true,
  },
  {
    slug: "template-prd-ia",
    title: "Template PRD IA",
    description: "7 questions, un PRD structuré en 5 min.",
    href: "/outils/template-prd-ia",
    cluster: "prd",
    isExternal: false,        // page à créer dans /outils/[slug]
  },
  // ... futurs outils
]

// lib/packs.ts
export const packs = [
  {
    slug: "pack-discovery",
    title: "Pack Discovery (gratuit)",
    description: "10 prompts chaînés, de l'interview au PRD.",
    price: "Gratuit",
    href: "/pack-discovery",
    cluster: "discovery",
    isExternal: true,
  },
  {
    slug: "systeme-discovery",
    title: "Pack Système Discovery",
    description: "Les prompts + templates Notion + workflow + cas réel annoté.",
    price: "49 €",
    href: "/pack-systeme-discovery",
    cluster: "discovery",
    isExternal: true,
  },
  {
    slug: "prd-ia",
    title: "Pack PRD + IA",
    description: "5 prompts + 3 templates + workflow + guide.",
    price: "39 €",
    href: "/packs/prd-ia",
    cluster: "prd",
    isExternal: false,
    status: "coming",
  },
  // ... futurs packs
]

export const bundles = [
  {
    slug: "pm-toolkit",
    title: "Bundle PM Toolkit",
    description: "PRD + Discovery + OKRs.",
    price: "89 €",
    includes: ["prd-ia", "systeme-discovery", "okrs"],
    status: "coming",
  },
  {
    slug: "product-ops",
    title: "Bundle Product Ops",
    description: "Les 4 packs.",
    price: "99 €",
    includes: ["prd-ia", "systeme-discovery", "okrs", "alignement"],
    status: "coming",
  },
]
```

## Pages détaillées

### Home `/`

```
[Hero]
  Titre + sous-titre + 2 CTAs (Outils | Blog)

[Clusters] (4 blocks via cluster-section.tsx)
  Pour chaque cluster:
    Nom | Description | Lien outil gratuit | Lien pack payant
    Si status = "coming" : badge "Bientôt" sur le pack

[Outils gratuits] (grille via tool-card.tsx)
  Tous les tools de lib/tools.ts

[Articles récents] (3 derniers via article-card.tsx)
  getAllArticles().slice(0, 3)

[Newsletter] (FormulaireLoops.tsx existant)

[Footer] (existant, ajouter liens Blog, Outils, Packs)
```

### Blog `/blog`

```
[Titre] "Blog"
[Filtres cluster] (optionnel MVP) : Tous | Discovery | PRD | OKRs | Alignement
[Liste articles] (article-card.tsx)
  getAllArticles(), triés par date desc
  Chaque card affiche : titre, description, date, readingTime, cluster badge
```

### Article `/blog/[slug]`

```
[Titre H1]
[Metadata] date + readingTime + cluster badge
[Corps MDX]
[CTA outil] cta-tool.tsx → cluster.toolHref
[Articles liés] 2-3 articles du même cluster
```

### Outils `/outils`

```
[Titre] "Outils gratuits"
[Sous-titre] "Des outils IA pour chaque étape du product management."
[Grille] tool-card.tsx pour chaque tool de lib/tools.ts
  - Les tools avec isExternal=true pointent vers leur route existante
  - Les tools avec isExternal=false pointent vers /outils/[slug]
```

### Outil `/outils/[slug]`

```
[Hero] titre + description
[email-capture.tsx] POST /api/subscribe-pack avec source = slug
[Ce que tu reçois] liste contenu
[Aperçu] screenshot ou extrait
[CTA pack] lien vers le pack payant du même cluster
```

### Packs `/packs`

```
[Titre] "Packs"
[Grille packs] pack-card.tsx pour chaque pack de lib/packs.ts
  - Si isExternal=true → lien vers route existante
  - Si isExternal=false → lien vers /packs/[slug]
  - Si status="coming" → badge "Bientôt"
[Section Bundles] bundle-card.tsx
```

### Pack `/packs/[slug]`

```
[Hero] titre + prix + CTA LemonSqueezy
[Ce que tu obtiens] liste détaillée
[Pour qui] profil PM cible
[Aperçu] screenshots
[FAQ] 3-4 questions
[CTA final] bouton LemonSqueezy
```

## Composants

### email-capture.tsx (Client Component)
Réutilise l'API existante /api/subscribe-pack.
```typescript
Props: { source: string; buttonText?: string; placeholder?: string }
// POST /api/subscribe-pack avec { email, source }
// States: idle → loading → success | error
```

### cluster-section.tsx (Server Component)
```typescript
Props: { cluster: Cluster }
// Affiche: nom, description, lien outil, lien pack
// Badge "Bientôt" si status = "coming"
```

### article-card.tsx, tool-card.tsx, pack-card.tsx, bundle-card.tsx
Server Components. Props typés depuis les data models ci-dessus.

### cta-tool.tsx (Server Component)
```typescript
Props: { cluster: string }
// Lookup dans clusters.ts pour afficher le bon outil
// "Tu veux aller plus loin ? [toolTitle] — Gratuit"
```

## Navigation

Actuel : Prompts | Outils | Pack Système
Nouveau : Blog | Outils | Packs

## SEO

Chaque page :
- title unique (max 60 chars) : `{page.title} — Product Copilot`
- meta description unique (max 155 chars)
- Open Graph tags
- Canonical URL
- JSON-LD (Article pour blog, Product pour packs)

Sitemap dynamique : pages statiques + slugs MDX + routes existantes.

## API Routes

Aucune nouvelle route. Tout passe par /api/subscribe-pack (champ `source` pour distinguer l'origine).

## Ce qu'on ne casse pas

Toutes les routes et fichiers existants listés dans CLAUDE.md section "Key existing files".