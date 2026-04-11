# Spec Outil : Template PRD IA

Route : /outils/template-prd-ia
Cluster : PRD
Type : Générateur de prompt (même pattern que /tools/user-stories)
Capture email : oui (Loops, source = "template-prd-ia")

## Ce que fait l'outil

L'utilisateur répond à 7 questions courtes. L'outil génère un prompt expert calibré avec ses réponses. Il copie le prompt dans Claude ou ChatGPT et obtient un PRD structuré, prêt à partager à son équipe.

Pas d'appel API côté serveur. Pas de génération IA sur le site. Le prompt est assemblé côté client à partir des inputs.

## Flow utilisateur

1. L'utilisateur arrive (depuis un article blog, la home, ou Google)
2. Il remplit les 7 champs du formulaire
3. Il clique "Générer le prompt"
4. Le prompt apparait partiellement (les 3 premières sections visibles)
5. Pour voir le prompt complet : email capture (Loops)
6. Après email : prompt complet affiché + bouton "Copier"

Ce flow est identique au pack-discovery (3 gratuits, 7 après email) mais appliqué à un seul prompt avec preview partielle.

## Les 7 champs du formulaire

### Champ 1 : Nom de l'initiative
- Label : "Nom de l'initiative"
- Placeholder : "Ex: Refonte onboarding mobile"
- Type : text input
- Required : oui

### Champ 2 : Problème
- Label : "Quel problème utilisateur tu résous ?"
- Placeholder : "Ex: 62% des nouveaux utilisateurs abandonnent le onboarding avant l'étape 3"
- Type : textarea (3 lignes)
- Helper : "Sois précis. Ajoute des données si tu en as."
- Required : oui

### Champ 3 : Contexte produit
- Label : "Contexte produit"
- Placeholder : "Ex: App mobile B2C, 50k MAU, product-led growth"
- Type : text input
- Helper : "Type de produit, taille de la base, modèle de croissance."
- Required : oui

### Champ 4 : Hypothèse de solution
- Label : "Quelle solution tu envisages ?"
- Placeholder : "Ex: Réduire le onboarding de 5 étapes à 2 en supprimant la personnalisation"
- Type : textarea (3 lignes)
- Helper : "La direction, pas le détail. Si tu ne sais pas encore, écris 'à explorer'."
- Required : non

### Champ 5 : Métrique cible
- Label : "Quelle métrique tu veux bouger ?"
- Placeholder : "Ex: Taux de complétion onboarding, activation J+7"
- Type : text input
- Helper : "Le KPI principal que cette initiative doit impacter."
- Required : oui

### Champ 6 : Contraintes
- Label : "Contraintes connues"
- Placeholder : "Ex: Pas de refonte backend, doit être compatible iOS 15+, deadline fin Q2"
- Type : textarea (2 lignes)
- Helper : "Contraintes techniques, temporelles, business. Laisse vide si aucune."
- Required : non

### Champ 7 : OKR concerné
- Label : "OKR ou objectif trimestriel concerné"
- Placeholder : "Ex: O: Améliorer l'activation des nouveaux utilisateurs / KR: +15pts de complétion onboarding"
- Type : textarea (2 lignes)
- Helper : "Laisse vide si tu n'as pas d'OKRs formalisés."
- Required : non

## Le prompt généré

Le prompt est assemblé côté client en injectant les réponses dans un template fixe.

```
Tu es un Product Manager senior avec 10 ans d'expérience en produit B2B et B2C. Tu rédiges des PRDs concis, orientés impact, qui tiennent sur une page.

CONTEXTE
Produit : {contexte_produit}
Initiative : {nom_initiative}
OKR concerné : {okr_concerne || "Non spécifié"}

CONSIGNE
Rédige un PRD structuré pour cette initiative en suivant exactement les 7 sections ci-dessous. Chaque section fait 2-3 phrases maximum. Le PRD complet doit tenir sur une page.

INPUTS UTILISATEUR
Problème identifié : {probleme}
Hypothèse de solution : {hypothese_solution || "À explorer — propose 2-3 directions possibles"}
Métrique cible : {metrique_cible}
Contraintes connues : {contraintes || "Aucune contrainte spécifiée"}

STRUCTURE DU PRD

1. PROBLÈME
Reformule le problème de manière précise et factuelle. Intègre les données fournies. Si les données sont insuffisantes, indique explicitement quelles données manquent pour valider le problème.

2. OPPORTUNITÉ
Explique pourquoi résoudre ce problème maintenant. Quel impact business attendu ? Quel coût de l'inaction ? Connecte au contexte produit fourni.

3. HYPOTHÈSE DE SOLUTION
Si une hypothèse est fournie : reformule-la clairement et explique le raisonnement.
Si "à explorer" : propose 2-3 directions possibles avec les avantages et inconvénients de chacune.

4. NON-GOALS
Liste 3-5 choses que cette initiative ne couvre PAS. Sois spécifique au contexte. Chaque non-goal doit prévenir un malentendu plausible.

5. SUCCESS METRICS
Définis un leading indicator (mesurable dès le lancement) et un lagging indicator (mesurable à 4-8 semaines). Pour chaque métrique, propose un seuil de succès réaliste basé sur la métrique cible fournie.

6. PLAN D'EXPÉRIMENTATION
Propose une méthode de validation (A/B test, feature flag, rollout progressif). Définis les conditions de go/no-go. Inclus une timeline réaliste.

7. DÉPENDANCES ET RISQUES
Liste les dépendances (équipes, systèmes, données). Identifie 2-3 risques (technique, UX, business) avec une mitigation pour chacun. Intègre les contraintes fournies.

RÈGLES DE SORTIE
- Le PRD tient sur une page. Si une section dépasse 3 phrases, coupe.
- Ne génère pas de contenu générique. Chaque phrase doit être spécifique au contexte fourni.
- Si une information manque pour être précis, signale-le explicitement plutôt que d'inventer.
- Termine par une section "QUESTIONS OUVERTES" : 3 questions que le PM devrait résoudre avant de lancer le dev.
```

## Preview partielle (avant email)

Avant la capture email, l'utilisateur voit les sections 1-3 du prompt (CONTEXTE + CONSIGNE + INPUTS). Les sections 4-7 (STRUCTURE DU PRD + RÈGLES DE SORTIE) sont floutées avec un overlay "Entre ton email pour voir le prompt complet".

Ce split est logique : les 3 premières sections montrent que le prompt est personnalisé avec ses inputs. Les 4 dernières sections contiennent la valeur (la structure PRD et les instructions de qualité).

## Logique technique

### Assemblage du prompt
Côté client. Le template est stocké dans un fichier `lib/prd-prompt-template.ts`. Les variables sont remplacées par les inputs utilisateur. Pas de requête serveur.

### Email capture
Même logique que pack-discovery :
- POST /api/subscribe-pack avec { email, source: "template-prd-ia" }
- Stockage unlock dans localStorage
- Si déjà unlocké : prompt complet affiché directement

### Copie
Bouton "Copier le prompt" qui copie le texte complet dans le clipboard. Feedback visuel "Copié".

## Page structure

```
[Nav]

[Hero]
  Titre : "Génère un PRD structuré en 5 minutes"
  Sous-titre : "Réponds à 7 questions. Récupère un prompt expert calibré avec ton contexte. Colle-le dans Claude ou ChatGPT."
  Badge : "Gratuit"

[Formulaire] (7 champs)
  Bouton : "Générer le prompt"

[Résultat] (affiché après clic)
  Preview partielle (sections 1-3 visibles)
  Sections 4-7 floutées
  [email-capture.tsx] source="template-prd-ia"
  Après unlock : prompt complet + bouton "Copier"

[Comment ça marche] (3 étapes, même pattern que user-stories)
  01. Décris ton initiative → 7 champs contextuels
  02. Copie le prompt généré → Calibré avec tes données
  03. Colle dans Claude ou ChatGPT → PRD structuré en 7 sections

[CTA Pack]
  "Tu veux le système complet ? Le Pack PRD + IA inclut 5 prompts, 3 templates et un workflow."
  Bouton → /packs/prd-ia (ou "Bientôt disponible" si pas encore live)

[Footer]
```

## SEO

- title : "Générateur de PRD IA gratuit — Product Copilot"
- description : "Réponds à 7 questions, récupère un prompt expert qui génère un PRD structuré. Gratuit."
- keywords : "template PRD IA", "générateur PRD", "PRD product manager template", "PRD gratuit"
- JSON-LD : SoftwareApplication schema

## Métriques Plausible

- prd_tool_generate : clic sur "Générer le prompt"
- prd_tool_email : email soumis
- prd_tool_copy : clic sur "Copier le prompt"
- prd_tool_pack_click : clic sur CTA pack