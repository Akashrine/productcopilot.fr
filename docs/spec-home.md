# Spec : Home refondée `/`

## Rôle

La home actuelle vend le Pack Discovery. La nouvelle home est une vitrine du catalogue complet. Elle montre en 30 secondes ce que Product Copilot propose : des outils gratuits, des packs payants, et un blog. Chaque section pousse le visiteur vers un tunnel de cluster.

## Cible

Un PM IC francophone qui arrive depuis Google, LinkedIn, ou un lien direct. Il ne connait pas Product Copilot. Il cherche un outil concret. Il doit comprendre l'offre en un scroll.

## Structure

### 1. Hero

```
[Titre]
Des outils PM concrets. Testés. Augmentés par l'IA.

[Sous-titre]
Templates, prompts et workflows pour les Product Managers qui construisent.

[2 CTAs côte à côte]
[Voir les outils gratuits] → /outils     (bouton principal)
[Lire le blog] → /blog                    (bouton secondaire)
```

Pas de testimonials dans le hero. Pas de vidéo. Pas d'animation. Titre + sous-titre + 2 boutons. Le visiteur comprend ce que c'est en 3 secondes.

### 2. Section "Systèmes par thématique"

Titre de section : "Un système par problème PM"
Sous-titre : "Chaque thématique combine des articles, un outil gratuit et un pack complet."

4 blocks (un par cluster). Chaque block = une card avec :

```
[Nom du cluster]        Ex: "Discovery"
[Description 1 ligne]   Ex: "De l'interview au PRD en 40 min."
[Lien outil gratuit]    "10 prompts Discovery IA → Gratuit"
[Lien pack payant]      "Pack Système Discovery → 49 €"
```

Si le cluster a status = "coming" : le lien pack affiche "Bientôt" avec un style muted. Le lien outil reste cliquable si l'outil existe.

Ordre des clusters : Discovery (live), PRD (en cours), OKRs (coming), Alignement (coming).

Composant : cluster-section.tsx, alimenté par clusters.ts.

### 3. Section "Outils gratuits"

Titre de section : "Outils gratuits"
Sous-titre : "Des générateurs IA spécialisés. Pas de compte. Pas de carte bleue."

Grille de tool-cards (3-4 items). Données depuis lib/tools.ts.

Chaque card :
```
[Titre]           "Template PRD IA"
[Description]     "7 questions, un PRD structuré en 5 min."
[Badge]           "Gratuit"
[Lien]            → /outils/template-prd-ia
```

Outils affichés (dans l'ordre) :
1. 10 prompts Discovery IA → /pack-discovery
2. Template PRD IA → /outils/template-prd-ia
3. Générateur de User Stories → /tools/user-stories
4. (futurs outils ajoutés automatiquement depuis tools.ts)

Lien en bas de section : "Voir tous les outils →" → /outils

### 4. Section "Packs"

Titre de section : "Packs"
Sous-titre : "Des kits complets pour structurer ton travail de PM. Achat unique."

Grille de pack-cards (2-3 items). Données depuis lib/packs.ts.

Chaque card :
```
[Titre]           "Pack Système Discovery"
[Description]     "Les prompts + templates Notion + workflow + cas réel annoté."
[Prix]            "49 €"
[Badge]           (rien si live, "Bientôt" si coming)
[Lien]            → /pack-systeme-discovery
```

Packs affichés (dans l'ordre) :
1. Pack Système Discovery (49 €) → /pack-systeme-discovery
2. Pack PRD + IA (39 €) → /packs/prd-ia (ou "Bientôt")
3. (futurs packs ajoutés automatiquement)

Pas de bundles sur la home. Les bundles sont sur /packs.

Lien en bas : "Voir tous les packs →" → /packs

### 5. Section "Articles récents"

Titre de section : "Articles"
Sous-titre : "Guides pratiques, méthodes testées, zéro bullshit."

3 derniers articles (article-card.tsx). Données depuis lib/mdx.ts getAllArticles().slice(0, 3).

Chaque card :
```
[Cluster badge]   "PRD"
[Titre]           "Comment écrire un PRD en 2026"
[Description]     "Le guide pour PMs qui veulent aller vite."
[Date]            "11 avril 2026"
[Reading time]    "7 min"
[Lien]            → /blog/comment-ecrire-un-prd-en-2026
```

Lien en bas : "Voir tous les articles →" → /blog

### 6. Section newsletter

```
[Titre]
Un outil PM gratuit chaque mois. Pas de spam.

[FormulaireLoops.tsx] (composant existant, réutilisé tel quel)
```

### 7. Section bio (courte)

```
[Photo ou initiales]   JB
[Texte]
Julien Brionne. Product Leader depuis 2012.
Heetch, Waalaxy, Back Market.

[Lien]  → /a-propos
```

Pas de long paragraphe. 2 lignes max. Le détail est sur /a-propos.

### 8. Footer

Footer existant. Ajouter les liens :
- Blog → /blog
- Outils → /outils
- Packs → /packs
- A propos → /a-propos

## Ce qu'on retire de la home actuelle

- Le hero centré Pack Discovery (remplacé par hero catalogue)
- Les 3 témoignages clients (les garder sur /pack-discovery, pas sur la home)
- La section "Tu n'as pas un problème d'outil" (spécifique au Pack Discovery)
- La section "Un système, pas une collection de prompts" (spécifique au Pack Discovery)
- Les stats "40 min / +80% / 0 rework" (spécifiques au Pack Discovery)
- La grille des 10 prompts (reste sur /pack-discovery)

Tout ce contenu reste accessible via /pack-discovery. Il n'est pas supprimé, il est déplacé de la vitrine.

## Ce qu'on garde de la home actuelle

- Le design system (typo, couleurs, spacing, dark nav)
- Le composant FormulaireLoops.tsx
- Le footer (structure + mentions légales)
- La bio Julien (raccourcie)

## Design guidelines

- Même design system que le site actuel
- Pas de hero avec image ou illustration. Texte seul.
- Cards avec border subtile, hover state, pas de shadow lourde
- Les badges cluster utilisent des couleurs distinctes mais sobres (ex: text-blue-600 bg-blue-50 pour PRD, text-green-600 bg-green-50 pour Discovery)
- Les badges "Gratuit" et prix sont visibles sans cliquer
- Les badges "Bientôt" sont muted (text-gray-400)
- Mobile first. Les grilles passent en une colonne sur mobile.
- Espacement généreux entre les sections. Pas d'effet compressé.

## SEO

- title : "Product Copilot — Outils IA pour Product Managers"
- description : "Templates, prompts et workflows pour les PMs qui construisent. Outils gratuits, packs thématiques, articles pratiques."
- OG image : statique (og-default.png)
- JSON-LD : Organization schema

## Métriques Plausible

- home_cta_outils : clic sur "Voir les outils gratuits"
- home_cta_blog : clic sur "Lire le blog"
- home_cluster_click : clic sur un lien cluster (event property : cluster_id)
- home_tool_click : clic sur une tool-card
- home_pack_click : clic sur une pack-card
- home_article_click : clic sur une article-card
- home_newsletter : soumission formulaire newsletter