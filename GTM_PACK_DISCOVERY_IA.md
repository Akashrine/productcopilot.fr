# Strategie GTM - Pack Discovery IA

Version: v1  
Date: 2026-03-26  
Owner propose: Julien Brionne (Product Copilot)

---

## Resume Executif

- **Quoi :** lancement du **Pack Discovery IA** (produit digital one-shot a 49 EUR) avec page de vente dediee et checkout LemonSqueezy.
- **Pour qui :** PM IC et Lead PM experimentes qui font du discovery regulier, utilisent deja un LLM, mais improvisent encore leurs workflows.
- **Objectif :** convertir la traction newsletter en revenus initiaux et preuves de valeur via un premier produit premium.
- **Date de lancement cible :** 15 mai 2026 (a ajuster).
- **Le succes a 90 jours ressemble a :** 150 ventes, >= 7 350 EUR de CA brut, taux de conversion page produit >= 2.5%, et >= 20 retours qualis actionnables pour v2.

---

## Contexte Produit (base actuelle)

### 1) Que lance-t-on ?
- **Nouveau produit digital payant**: Pack Discovery IA.
- Format actuel: PDF + prompts structures + assets pratiques (positionnement annonce: 10 prompts, page premium mentionne 12 assets).
- Distribution: page de vente dediee (`/pack-discovery-ia`) + checkout LemonSqueezy.
- Pourquoi maintenant: base d'audience deja en cours via landing + newsletter Loops, timing ideal pour monetaire la demande.

### 2) Pour qui ?
- PM IC (2-8 ans d'xp), Lead PM, parfois Head of Product hands-on.
- Cibles prioritaires:
  - startups/scale-ups B2B SaaS et B2C digital product.
  - equipes produits de 3 a 30 PMs.
- Geographies prioritaires:
  - France/Belgique/Suisse francophone (phase 1).

### 3) Probleme resolu
- Discovery trop artisanal, lent, disperse.
- Prompts one-shot non reproductibles, faible qualite des outputs.
- Temps excessif passe en synthese et redaction plutot qu'en decision strategique.

### 4) Objectif business
- Monetiser rapidement un actif expert, valider willingness-to-pay et fit de positionnement.
- Objectif principal 12 mois (proposition):
  - 30k-60k EUR de CA cumule sur produit solo digital + upsell futur.

### 5) Comment c'est vendu
- Modele actuel: **self-serve** (page de vente + checkout LemonSqueezy).
- Moteur de demande principal: contenu + newsletter + reseaux.

### 6) Paysage concurrentiel
- Directs: creators "prompts PM", packs Notion/IA.
- Indirects: formations Product Discovery, templates gratuits, consultants discovery.
- Substituts: bricolage interne, ChatGPT "au feeling", no-code docs.

### Contraintes connues
- Equipe reduite (solopreneur + potentiels contributeurs ponctuels).
- Budget probablement contraint (a cadrer).
- Besoin de coherence entre promesse et contenu livre (10 prompts vs 12 assets a harmoniser avant GA).

---

## PHASE 1 - Fondations GTM

### Raisonnement
Sans ICP precis et message tranche, on obtient du trafic curieux mais peu de conversion.  
L'objectif est d'optimiser la pertinence (pour les bons clients) avant d'optimiser le volume.

### 1.1 ICP

#### Criteres firmographiques

| Critere | ICP |
|---|---|
| Taille entreprise | 20 a 500 employes (sweet spot 50-200) |
| Secteur | SaaS B2B, fintech, HR tech, marketplaces, apps consumer avec equipe produit |
| Geographie | FR en priorite (extension EU ensuite) |

#### Criteres comportementaux

| Critere | ICP |
|---|---|
| Solution actuelle | ChatGPT/Claude ad hoc + Notion/Docs + tableurs |
| Intensite douleur | Importante a critique (perte de temps recurente + faible reproductibilite) |
| Processus d'achat | Decideur individuel (PM/Lead), cycle court (0-14 jours), faible friction budgetaire |

#### Criteres de qualification

| Type | Attributs |
|---|---|
| Indispensable | Fait du discovery mensuel, utilise deja un LLM, veut industrialiser |
| Souhaitable | Equipe cross-fonctionnelle, pression delivery forte, besoin de clarté exec |
| Disqualifiant | Debutant PM complet, pas de discovery, attente "IA remplace mon jugement" |

#### Synthese ICP
- **ICP primaire :** PM/Lead PM (2+ ans), en startup/scale-up digitale, ayant une pratique discovery active et un besoin immediat de systematisation IA.
- **ICP secondaire :** Head of Product hands-on qui cherche un framework reutilisable pour son equipe.
- **Explicitement pas pour :** juniors en apprentissage fondamental discovery, profils non-product, personnes cherchant une formation longue theorique.

### 1.2 Positionnement

| Element | Positionnement |
|---|---|
| Pour | PM experimentes et Leads PM |
| Qui | ont un discovery lent, peu structure et difficile a transformer en decisions |
| Notre produit | fournit un workflow IA de bout en bout (interview -> synthese -> priorisation -> PRD) |
| Contrairement a | prompts generiques, templates one-shot, formations trop abstraites |
| Nous | livrons des sequences de prompts interconnectes, testees sur cas reels, directement actionnables |

#### Messages cles
- **Pitch 15 mots :** "Le workflow IA qui transforme ton discovery artisanal en decisions produit exploitables en moins d'une heure."
- **Pitch 30 secondes :**  
  "Tu fais deja du discovery, mais tu perds des heures a synthétiser et prioriser.  
  Le Pack Discovery IA te donne des scripts structures qui chainent les etapes critiques: extraction de signaux, synthese multi-interviews, challenge des hypotheses, mapping d'opportunites et PRD v1.  
  Resultat: plus de clarte, moins de bruit, des decisions defendables."
- **Piliers :**
  1. Resultat concret (temps gagne)
  2. Rigueur methodologique (sequence, contexte cumulatif)
  3. Qualite des decisions (moins de biais, meilleur arbitrage)
  4. Applicabilite immediate (copier-coller + variables adaptables)

#### Test positionnement
- "C'est pour moi ?" -> **Oui** pour PMs experimentes, **Non** explicite pour debutants.
- Differenciateur defendable -> **Partiellement**, a renforcer via:
  - preuve de cas reel,
  - captures avant/apres,
  - retours clients.
- Copiable demain ? -> **Oui partiellement** (prompts copiables), donc moat a construire via:
  - distribution/audience,
  - iteration rapide,
  - versioning et support ecosysteme.

### 1.3 Objectifs mesurables

- **Metrique principale:** ventes du Pack Discovery IA.
  - Baseline: 0
  - Cible 90j: 150 ventes
  - Echeance: J+90 apres lancement GA

#### Metriques secondaires

| Metrique | Baseline | Cible | Echeance |
|---|---:|---:|---|
| Taux conv page produit -> achat | 0% | >= 2.5% | J+90 |
| CA brut cumule | 0 EUR | >= 7 350 EUR | J+90 |
| Taux opt-in waitlist -> achat | 0% | >= 8% | J+90 |

#### Contre-metriques
- Taux de desabonnement newsletter: ne doit pas depasser 1.5% par campagne.
- Taux de refund LemonSqueezy: ne doit pas depasser 5%.

---

## PHASE 2 - Choix strategiques

### Raisonnement
Le contexte solopreneur impose de concentrer l'energie sur peu de paris forts.  
L'objectif n'est pas de "faire du bruit", mais de convertir une audience qualifiee en revenus repetables.

### 2.1 Approche de lancement

| Approche | Description | Quand l'utiliser | Risque principal |
|---|---|---|---|
| Big Bang | Gros lancement simultane | Marque forte + PR solide | Flop public |
| Deploiement progressif | Cohortes + iteration | Validation message/prix | Momentum plus lent |
| Stealth -> Public | Beta puis ouverture | Besoin de preuve | Temps de reaction concurrente |
| Croissance continue | Pas de "jour J" | Feature incrementale | Faible urgence |

- **Choix recommande :** **Stealth -> Grand public** (sur 4 a 6 semaines)
- **Justification :**
  1. Permet d'aligner promesse/realite via beta buyers.
  2. Produit de connaissance: feedback qualis critique avant scale.
  3. Limite le risque de mismatch copy/prix/format.
  4. Facilite creation de preuves sociales avant amplification.

### 2.2 Pricing & Packaging

| Element | Detail |
|---|---|
| Modele | Paiement unique |
| Prix | 49 EUR (phase lancement) |
| Packaging | 1 offre coeur + bonus early-bird temporel |

- Positionnement prix: **accessible premium** (faible friction individuelle).
- Lancement:
  - Option A: 49 EUR "founding batch" pendant 2-3 semaines, puis 69 EUR.
  - Option B: 49 EUR permanent, upsell futur (v2 templates + videos) a 99 EUR.

#### Willingness-to-pay (hypothese)
- Seuil psychologique initial: 79 EUR sans preuve forte.
- Valeur percue: economie de 6-8h/cycle -> ROI tres defendable des la 1ere utilisation.

### 2.3 Strategie de canaux

| Type | Canaux | Priorite |
|---|---|---|
| Organique | Newsletter, LinkedIn perso, SEO long-tail | Haute |
| Payant | Retargeting léger post-lancement | Moyenne |
| Vente directe | DM warm sur audience existante | Moyenne |
| RP/Influence | Creators Product FR | Basse/Moyenne |

- **Canal principal:** newsletter + LinkedIn (owned distribution).
- **Pourquoi:** cout faible, autorite deja installee, cycle court, meilleure conversion sur audience pre-qualifiee.

#### Parcours d'achat cible
1. Decouverte (post/carrousel/newsletter)
2. Visite page produit
3. Evaluation (preuve + FAQ + objection handling)
4. Achat LemonSqueezy
5. Delivery + onboarding
6. Feedback + referral

---

## PHASE 3 - Plan d'execution (90 jours)

### Raisonnement
Le vrai GTM commence apres la mise en ligne.  
On doit iterer copy/offre/proof toutes les semaines avec une boucle de feedback rapide.

### Pre-lancement (S-6 a S-1)

#### Preparation interne
- [ ] Harmoniser promesse "10 prompts" vs "12 assets" (une seule verite produit)
- [ ] Finaliser contenu pack (qualite, lisibilite, exemples)
- [ ] Definir politique refund/licence
- [ ] Documenter FAQ support
- [ ] Instrumentation analytique minimale (page view, click CTA, checkout started, purchase)

#### Preparation externe
- [ ] Recruter 10-20 beta readers (newsletter + LinkedIn)
- [ ] Collecter 5-8 retours qualis exploitables
- [ ] Obtenir 3-5 testimonials textuels
- [ ] Preparer sequence email de lancement (J-3 / J / J+2 / J+7)
- [ ] Preparer 4 contenus LinkedIn (problem, solution, case, offer)

#### Assets
- [ ] Page produit v1 live
- [ ] Page FAQ complete
- [ ] Pack final PDF export propre
- [ ] Emails de vente prets
- [ ] Checklist onboarding post-achat

### Semaine de lancement

| Jour | Actions |
|---|---|
| J-1 | Test checkout, QA liens, proofread final, warm-up audience |
| Jour J | Newsletter annonce, post LinkedIn long form, CTA vers page produit, ouverture offre |
| J+1 a J+7 | Repost angle objection, snippets clients, FAQ updates, optimisations copy |

#### Checklist Jour J
- [ ] Checkout live et teste
- [ ] Tracking evenements actif
- [ ] Newsletter envoyee
- [ ] 1 post LinkedIn publie + 2 declinaisons planifiees
- [ ] Support inbox ouverte (SLA <24h)
- [ ] Dashboard daily mis en place

### Post-lancement

| Periode | Focus | Criteres de succes |
|---|---|---|
| 0-30 jours | Conversion + proof points | >= 40 ventes, >= 3 testimonials, CVR >= 2% |
| 31-60 jours | Optimisation canal/message/prix | +50 ventes, CVR >= 2.5%, refund < 5% |
| 61-90 jours | Scale ou pivot | +60 ventes, decision v2 (go/no-go) |

---

## PHASE 4 - Gestion des risques

### Raisonnement
Le mode d'echec principal d'un solo launch est la sous-conversion silencieuse.  
Il faut des seuils d'alerte explicites et des reactions pre-planifiees.

### Top 5 risques

| # | Risque | Probabilite | Impact | Plan d'attenuation | Responsable |
|---|---|---|---|---|---|
| 1 | Conversion faible page produit | Moyenne | Eleve | Iteration hero/offer/FAQ toutes les 72h + interviews visiteurs | Founder |
| 2 | Mismatch promesse/contenu | Moyenne | Eleve | QA contenu + beta read + versioning clair | Founder |
| 3 | Faible volume top-of-funnel | Elevee | Moyen | Cadence contenu fixe (2 posts/sem + 1 newsletter/2 semaines) | Founder |
| 4 | Concurrence copycat | Moyenne | Moyen | Differenciation par cas reels + updates frequentes du pack | Founder |
| 5 | Charge support post-achat | Faible/Moyenne | Moyen | FAQ solide + templates reponses + office hours mensuelles | Founder |

### Contingence modes d'echec

| Mode d'echec | Signal d'alerte | Plan de reaction |
|---|---|---|
| Demande initiale faible | < 20 ventes a J+14 | Repositionner headline + offre limitee + sequence email relance |
| Probleme technique checkout | erreurs paiement > 3 incidents/jour | Pause traffic, comm transparente, test QA, hotfix immediat |
| Reaction concurrentielle | offre similaire publiee | Renforcer preuves d'usage + bonus diff + tempo contenu |
| Positionnement confus | CVR page < 1.5% sur 1k sessions | 5 interviews qualis, 2 variantes page, nouveau framing ICP |
| Burnout execution solo | cadence non tenue 2 semaines | Reduire scope, concentrer sur 1 canal, automatiser sequence email |

---

## PHASE 5 - Equipe & planning

### Raisonnement
Meme en solo, il faut clarifier les "roles mentaux" pour garder une execution disciplinée.

### Equipe de lancement (version solo)

| Role | Responsable | Perimetre |
|---|---|---|
| Lead lancement | Julien | Arbitrages, priorites, KPI hebdo |
| Produit | Julien | Qualite du pack, roadmap v2 |
| Marketing | Julien | Distribution, contenu, conversion |
| Sales | Julien | DM warm, objections, closing self-serve |
| Support/CS | Julien | Inbox, FAQ, retours clients |

### Planning (propose)

| Jalon | Date | Responsable | Statut |
|---|---|---|---|
| Kick-off GTM | 01/04/2026 | Julien | on track |
| Cohorte beta | 08/04/2026 | Julien | a lancer |
| Finalisation assets | 30/04/2026 | Julien | a lancer |
| Lancement GA | 15/05/2026 | Julien | a lancer |
| Revue 30 jours | 15/06/2026 | Julien | a lancer |
| Revue 90 jours | 15/08/2026 | Julien | a lancer |

### Cadence de suivi

| Frequence | Format | Participants |
|---|---|---|
| Quotidien (semaine lancement) | Revue KPI 15 min | Julien |
| Hebdomadaire | Revue GTM 45 min | Julien |
| Mensuel | Revue strategique 90 min | Julien (+ advisor si dispo) |

---

## One-Pager Stakeholders

### Le plan
- Lancer un produit digital one-shot (49 EUR) convertissant l'audience newsletter en CA.
- Cibler strictement PMs experimentes avec douleur discovery forte.
- Executer une strategie owned-media (newsletter + LinkedIn) + iteration hebdo.

### Le pari
- L'audience actuelle a une douleur monetisable immediate.
- Une offre concrete "workflow complet" convertira mieux qu'une offre educative generaliste.
- La rapidite d'iteration sur message/offre battra les concurrents copycat.

### La demande
- Validation du positionnement final (10 prompts vs 12 assets).
- Validation pricing lancement (49 EUR vs 69 EUR post-lancement).
- Aide ponctuelle design/copy (si disponible) pour accelerer tests.

### Les risques assumes
- Risque de conversion initiale faible si message trop abstrait.
- Risque de charge solo elevee en post-lancement.
- Risque de dilution si on tente trop de canaux trop tot.

---

## Decisions immediates a prendre (cette semaine)

1. **Verite produit unique :** "10 prompts" ou "12 assets" (choisir et figer).
2. **Pricing lancement :** 49 EUR fixe vs offre temporelle.
3. **Objectif 90 jours final :** confirmer seuil de succes (100, 150 ou 200 ventes).
4. **Instrumentation minimale :**
   - `page_view_pack`
   - `click_buy_pack`
   - `checkout_started`
   - `purchase_completed`
5. **Plan contenu 30 jours :** 8 posts LinkedIn + 3 emails.

