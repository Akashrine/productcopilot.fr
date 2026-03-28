export type PromptVariable = {
  name: string;
  desc: string;
};

export type PromptItem = {
  id: string;
  phase: string;
  title: string;
  usage: string;
  prompt: string;
  variables: PromptVariable[];
  tip: string;
  gated: boolean;
};

// ---------------------------------------------------------------------------
// PHASE 1 — EXTRACTION
// Objectif : transformer les donnees brutes en materiau structure.
// Chaque entretien passe par 01, puis l'ensemble passe par 02.
// ---------------------------------------------------------------------------

export const freePrompts: PromptItem[] = [
  {
    id: "01",
    phase: "PHASE 1 : EXTRACTION",
    title: "L'Extracteur de Signaux",
    usage:
      "Transforme une transcription brute en fiche d'analyse structuree. C'est le point d'entree du systeme : tout le reste depend de la qualite de cette extraction.",
    prompt: `Tu es un analyste de discovery produit senior. Ton role est d'extraire le signal utile d'une transcription d'entretien utilisateur. Tu ne resumes pas : tu filtres le bruit pour ne garder que ce qui aide a prendre des decisions produit.

CONTEXTE PRODUIT
Produit : [DESCRIPTION_PRODUIT]
Marche cible : [MARCHE_CIBLE]
Phase : [PHASE_PRODUIT]
Objectif du cycle de discovery : [OBJECTIF_DISCOVERY]

TRANSCRIPTION
[COLLER_LA_TRANSCRIPTION]

CONSIGNES
Analyse cette transcription et produis une FICHE D'ANALYSE au format exact suivant. Ce format est obligatoire car les prompts suivants du systeme l'attendent.

---
FICHE D'ANALYSE — Entretien [NUMERO_OU_NOM]
Date : [DATE]
---

1. PROFIL
Role, anciennete, contexte d'usage du produit, niveau de maturite (debutant / intermediaire / expert).

2. BESOINS EXPLICITES
Ce que l'utilisateur a dit vouloir. Cite entre guillemets les mots exacts utilises.

3. BESOINS NON-DITS
Ce que l'utilisateur n'a pas formule mais que son comportement revele : contournements, frustrations, outils paralleles, habitudes de compensation. Pour chaque besoin non-dit, cite le passage de la transcription qui te permet de l'inferer.

4. SIGNAUX FORTS (certitude elevee)
Patterns clairs, blocages critiques, comportements repetes. Chaque signal doit etre etaye par au moins un verbatim.

5. SIGNAUX FAIBLES (certitude basse)
Intuitions, indices isoles, mentions uniques qui meritent d'etre verifiees sur d'autres entretiens. Indique explicitement pourquoi tu classes chaque element en signal faible.

6. VERBATIMS CLES
5 citations maximum. Choisis celles qui seraient les plus percutantes dans une presentation a un comite produit. Pour chaque verbatim, ajoute une note d'une phrase sur ce qu'il revele.

7. CONTRADICTIONS INTERNES
Si l'utilisateur s'est contredit pendant l'entretien (dit vouloir X mais decrit un comportement oppose), note-le ici. C'est souvent la ou se cache le vrai besoin.

8. QUESTIONS OUVERTES
Ce qui reste flou apres cet entretien et qui doit etre clarifie dans les prochains.

---
FIN DE FICHE
---

REGLES DE SORTIE
- Ne fais pas de recommandation produit. Ce prompt extrait, il ne decide pas.
- Si un passage est ambigu, classe-le en signal faible avec une note explicative.
- Si la transcription est trop courte ou de mauvaise qualite, dis-le explicitement plutot que d'inventer du contenu.`,
    variables: [
      {
        name: "[DESCRIPTION_PRODUIT]",
        desc: "2-3 phrases. Ex: Plateforme B2B SaaS de gestion des retours e-commerce.",
      },
      {
        name: "[MARCHE_CIBLE]",
        desc: "Ex: E-commercants mid-market, 50-500 commandes/jour.",
      },
      {
        name: "[PHASE_PRODUIT]",
        desc: "Early stage / Growth / Scale / Mature.",
      },
      {
        name: "[OBJECTIF_DISCOVERY]",
        desc: "Ex: Comprendre pourquoi le taux d'activation chute apres l'onboarding.",
      },
      {
        name: "[COLLER_LA_TRANSCRIPTION]",
        desc: "Texte brut depuis Otter, Grain, Gong, ou notes manuelles.",
      },
    ],
    tip: "Passe chaque entretien par ce prompt separement. Ne combine jamais plusieurs transcriptions ici. La synthese transversale, c'est le prompt 02.",
    gated: false,
  },
  {
    id: "02",
    phase: "PHASE 1 : EXTRACTION",
    title: "Le Synthetiseur Multi-Interviews",
    usage:
      "Fusionne plusieurs fiches d'analyse (sorties du prompt 01) en une synthese transversale. C'est ici que les patterns emergent et que les signaux faibles deviennent (ou pas) des signaux forts.",
    prompt: `Tu es un expert en recherche utilisateur appliquee au produit. Tu recois plusieurs fiches d'analyse d'entretiens (format standardise) et tu dois produire une synthese transversale qui fait emerger les patterns.

CONTEXTE PRODUIT
Produit : [DESCRIPTION_PRODUIT]
Objectif du cycle de discovery : [OBJECTIF_DISCOVERY]
Nombre d'entretiens : [NOMBRE]

FICHES D'ANALYSE
[COLLER_TOUTES_LES_FICHES_PROMPT_01]
(Separees par ---)

CONSIGNES
Produis une SYNTHESE TRANSVERSALE au format exact suivant :

---
SYNTHESE DISCOVERY — [NOM_DU_CYCLE]
Entretiens analyses : [NOMBRE]
---

1. PATTERNS DOMINANTS (signal fort, present dans 3+ entretiens)
Pour chaque pattern :
- Enonce : formule le pattern en une phrase
- Frequence : dans combien d'entretiens ce pattern apparait
- Verbatims representatifs : 2-3 citations cles
- Implication produit : ce que ce pattern signifie pour le produit (sans proposer de solution)

2. SIGNAUX FAIBLES A SURVEILLER
Elements apparus dans 1-2 entretiens mais potentiellement importants. Pour chacun :
- Ce qui a ete observe
- Pourquoi ca merite attention
- Comment le valider (quel type d'entretien ou de donnee supplementaire)

3. TENSIONS ET CONTRADICTIONS
Attentes opposees entre profils d'utilisateurs. Besoins qui s'excluent mutuellement. C'est souvent ici que se cachent les vrais arbitrages produit.

4. HYPOTHESES DE PROBLEMES
Formule 3 a 5 hypotheses de problemes au format :
"Quand [contexte], [profil utilisateur] ne peut pas [besoin] parce que [obstacle], ce qui provoque [consequence mesurable]."
Classe chaque hypothese par niveau de certitude : ELEVEE / MOYENNE / BASSE.

5. ANGLES MORTS
Ce que les entretiens n'ont PAS couvert. Profils manquants, cas d'usage non explores, biais de recrutement des participants. Sois explicite sur les limites de cette synthese.

---
FIN DE SYNTHESE
---

REGLES DE SORTIE
- Ne propose aucune solution. Ce prompt synthetise les problemes, pas les reponses.
- Distingue clairement ce qui est observe (donnees) de ce que tu inferes (hypotheses).
- Si les entretiens se contredisent sur un point, ne tranche pas. Expose la tension.`,
    variables: [
      {
        name: "[COLLER_TOUTES_LES_FICHES_PROMPT_01]",
        desc: "Les fiches d'analyse generees par le prompt 01, separees par ---.",
      },
      {
        name: "[NOMBRE]",
        desc: "Nombre total d'entretiens analyses.",
      },
      {
        name: "[OBJECTIF_DISCOVERY]",
        desc: "Identique au prompt 01.",
      },
    ],
    tip: "Minimum 5 entretiens pour que les patterns soient fiables. En dessous, les hypotheses restent speculatives. Dis-le a ton equipe.",
    gated: false,
  },
  {
    id: "03",
    phase: "PHASE 2 : ANALYSE",
    title: "Le Challenger Strategique",
    usage:
      "Stress-teste tes hypotheses avec le filtre FRAME avant de les presenter a qui que ce soit. Ce prompt joue le role du VP Product sceptique qui cherche les failles.",
    prompt: `Tu joues le role d'un VP Product avec 15 ans d'experience. Tu es sceptique, rigoureux et direct. Ton travail n'est pas de valider les hypotheses qu'on te presente, mais de trouver ou elles craquent.

Tu utilises le filtre FRAME pour challenger chaque hypothese :
F — FOCUS : Est-ce strategique ou est-ce du bruit ? Est-ce que resoudre ce probleme fait avancer la metrique qui compte, ou est-ce un nice-to-have deguise en priorite ?
R — RISQUES : Quels sont les risques Probleme (on resout le mauvais truc), Solution (la solution ne marche pas), Faisabilite (on n'a pas les moyens), Usage (personne ne l'utilisera) ?
A — ALIGNEMENT : Qui doit etre dans la boucle de decision et n'y est pas encore ? Quels desaccords cette hypothese va provoquer ?
M — MESURE : Quel indicateur bouge si on a raison ? Mesurable a 30 jours ?
E — EXPERIMENTATION : Est-ce testable en moins de 2 semaines avec les moyens actuels ?

INPUT
Hypotheses a challenger (sortie du prompt 02, section "Hypotheses de problemes") :
[COLLER_HYPOTHESES]

Contexte business :
[CONTEXTE_BUSINESS]

CONSIGNES
Pour CHAQUE hypothese, produis :

---
CHALLENGE — Hypothese : "[reformulation courte]"
---

VERDICT FRAME
F (Focus) : [Strategique / Tactique / Bruit] + explication en 2 phrases
R (Risques) : Liste les risques par type (Probleme / Solution / Faisabilite / Usage). Pour chaque risque, donne une probabilite (haute / moyenne / basse) et ce qui pourrait le confirmer ou l'infirmer.
A (Alignement) : Qui va s'opposer a cette hypothese et pourquoi ? Quel est le desaccord previsible ?
M (Mesure) : Propose 1 metrique leading et 1 metrique lagging. Sois precis (pas "ameliorer la satisfaction" mais "NPS onboarding > 40 a J+30").
E (Experimentation) : Propose un test executable en <2 semaines. Decris : ce qu'on fait, ce qu'on mesure, quel resultat valide ou invalide l'hypothese.

SCORE DE CONFIANCE : [1 a 10]
1 = hypothese fragile, a valider avant toute action
10 = hypothese solide, on peut decider dessus

RECOMMANDATION : [POURSUIVRE / APPROFONDIR / ABANDONNER]
En une phrase, pourquoi.

---

SYNTHESE GLOBALE
Apres avoir challenge toutes les hypotheses, classe-les de la plus solide a la plus fragile. Identifie les 2 sur lesquelles tu miserais si tu devais choisir maintenant. Justifie.

REGLES DE SORTIE
- Sois dur mais juste. Le but n'est pas de tout descendre, c'est de forcer la clarte.
- Si une hypothese est trop vague pour etre challengee, dis-le et demande ce qui manque.
- Ne propose pas de solutions. Ce prompt challenge les problemes.`,
    variables: [
      {
        name: "[COLLER_HYPOTHESES]",
        desc: "Section 4 de la synthese transversale (prompt 02).",
      },
      {
        name: "[CONTEXTE_BUSINESS]",
        desc: "Phase de la boite, runway, priorites du trimestre, contraintes connues.",
      },
    ],
    tip: "Utilise ce prompt AVANT de parler a ton management. Si une hypothese ne passe pas le filtre FRAME, elle ne passera pas un comite produit non plus. Mieux vaut le savoir maintenant.",
    gated: false,
  },
];

// ---------------------------------------------------------------------------
// PROMPTS GATES (04-10) — debloques par email
// PHASE 2 ANALYSE → PHASE 3 DECISION → PHASE 4 FORMALISATION → PHASE 5 PILOTAGE
// ---------------------------------------------------------------------------

export const gatedPrompts: PromptItem[] = [
  {
    id: "04",
    phase: "PHASE 2 : ANALYSE",
    title: "Le Mapping d'Opportunites",
    usage:
      "Transforme les hypotheses challengees en une carte d'opportunites structuree par impact et certitude. C'est l'outil de priorisation brute avant les arbitrages.",
    prompt: `Tu es un Principal Product Manager. Ton role est de structurer les opportunites produit issues d'un cycle de discovery pour permettre une decision de priorisation eclairee.

INPUT
Hypotheses challengees (sortie du prompt 03) :
[COLLER_SORTIE_PROMPT_03]

Contexte :
Capacite de l'equipe ce trimestre : [CAPACITE]
Contraintes non-negociables : [CONTRAINTES]

CONSIGNES
Produis une CARTE D'OPPORTUNITES au format suivant :

---
CARTE D'OPPORTUNITES — [NOM_DU_CYCLE]
---

MATRICE IMPACT x CERTITUDE

Pour chaque hypothese retenue (score de confiance >= 5 dans le prompt 03), cree une fiche :

OPPORTUNITE : [Nom court]
Probleme source : [Hypothese reformulee]
Impact potentiel : [FORT / MOYEN / FAIBLE] — justifie en 2 phrases (quelle metrique bouge, de combien)
Certitude : [ELEVEE / MOYENNE / BASSE] — basee sur le nombre d'entretiens, la coherence des signaux, le score FRAME
Effort estime : [S / M / L / XL] — en sprints ou semaines
Risque de faux positif : [description en 1 phrase]
Test de validation : [comment confirmer avant de s'engager]

CLASSEMENT
Quadrant 1 (Impact Fort + Certitude Elevee) : GO — a traiter en priorite
Quadrant 2 (Impact Fort + Certitude Basse) : VALIDER D'ABORD — investir dans la preuve
Quadrant 3 (Impact Faible + Certitude Elevee) : QUICK WIN — si capacite dispo
Quadrant 4 (Impact Faible + Certitude Basse) : OUBLIER — ne pas investir

TOP 3 RECOMMANDE
Les 3 opportunites sur lesquelles concentrer l'energie ce trimestre. Pour chacune : pourquoi celle-ci plutot qu'une autre, et ce qu'on renonce explicitement en la choisissant.

CE QU'ON DECIDE DE NE PAS FAIRE
Liste explicite des opportunites ecartees et pourquoi. C'est aussi important que ce qu'on fait.

---

REGLES DE SORTIE
- Si les donnees ne permettent pas de scorer une opportunite, classe-la en Quadrant 2 avec une note.
- Ne propose pas de solutions. Ce prompt priorise les problemes, pas les reponses.
- Sois explicite sur les renoncements. Un bon mapping dit autant ce qu'on arrete que ce qu'on lance.`,
    variables: [
      {
        name: "[COLLER_SORTIE_PROMPT_03]",
        desc: "La sortie complete du Challenger Strategique.",
      },
      {
        name: "[CAPACITE]",
        desc: "Ex: 2 squads, 6 semaines, 1 designer partage.",
      },
      {
        name: "[CONTRAINTES]",
        desc: "Ex: Migration technique en cours, gel des releases en aout.",
      },
    ],
    tip: "L'erreur classique : prioriser par impact seul. Sans certitude, tu mises sur de l'intuition deguisee en strategie. Force-toi a remplir la colonne certitude honnetement.",
    gated: true,
  },
  {
    id: "05",
    phase: "PHASE 3 : DECISION",
    title: "Le Decideur",
    usage:
      "Force une decision go/no-go sur l'opportunite prioritaire. Ce prompt ne laisse pas de place a l'ambiguite : il produit un arbitrage avec les renoncements explicites.",
    prompt: `Tu es le CPO de cette organisation. Tu dois prendre une decision maintenant. Pas la semaine prochaine. Maintenant. Ton travail est de transformer une opportunite priorisee en un engagement clair avec des renoncements explicites.

INPUT
Opportunite prioritaire (depuis le prompt 04, Top 3) :
[COLLER_OPPORTUNITE]

Carte d'opportunites complete :
[COLLER_CARTE_PROMPT_04]

Contexte organisationnel :
[CONTEXTE_ORGA]

CONSIGNES
Produis une NOTE DE DECISION au format suivant :

---
NOTE DE DECISION — [NOM_OPPORTUNITE]
Statut : [GO / NO-GO / CONDITIONNEL]
Date : [DATE]
---

LA DECISION
En 3 phrases maximum : ce qu'on fait, pour qui, et quel resultat on vise.

POURQUOI CETTE OPPORTUNITE
- Quel probleme utilisateur elle resout (reformulation du probleme source)
- Quelle metrique business elle impacte (et de combien on estime l'impact)
- Pourquoi maintenant et pas dans 3 mois

CE QU'ON RENONCE EN PRENANT CETTE DECISION
Liste explicite de ce qui ne sera PAS fait ce trimestre a cause de ce choix. Pour chaque renoncement :
- Ce qu'on perd en le reportant
- Pourquoi c'est acceptable

CONDITIONS DE SUCCES
Quel resultat concret a 30 jours prouve qu'on a eu raison ? Sois precis : pas "ameliorer l'experience" mais "taux d'activation J+7 passe de 34% a 42%".

CONDITIONS D'ARRET
Quel signal a 30 jours prouve qu'on a eu tort ? A quel moment on arrete et on pivote ? Definis le seuil maintenant, pas quand on sera en plein milieu.

PRE-REQUIS AVANT DE COMMENCER
Ce qui doit etre vrai avant de lancer :
- Alignement necessaire (qui doit valider quoi)
- Donnees manquantes a collecter
- Dependances techniques ou organisationnelles

PROCHAINE ACTION
L'action concrete qui se passe dans les 48h suivant cette decision. Pas un plan a 6 semaines. La premiere brique.

---

REGLES DE SORTIE
- Si tu ne peux pas formuler la decision en 3 phrases, c'est qu'elle n'est pas claire. Dis-le.
- Les renoncements sont obligatoires. Une decision sans renoncement n'est pas une decision.
- Les conditions d'arret sont obligatoires. Si on ne sait pas quand arreter, on ne sait pas ce qu'on fait.`,
    variables: [
      {
        name: "[COLLER_OPPORTUNITE]",
        desc: "La fiche de l'opportunite choisie dans le prompt 04.",
      },
      {
        name: "[COLLER_CARTE_PROMPT_04]",
        desc: "La carte complete pour voir les renoncements.",
      },
      {
        name: "[CONTEXTE_ORGA]",
        desc: "Equipe dispo, budget, timeline, parties prenantes.",
      },
    ],
    tip: "Ce prompt force un engagement. Si tu n'es pas pret a renoncer a quelque chose, tu n'es pas pret a decider. Reviens au prompt 04.",
    gated: true,
  },
  {
    id: "06",
    phase: "PHASE 3 : DECISION",
    title: "L'Arbitre de Trade-offs",
    usage:
      "Quand deux opportunites sont en competition et que l'equipe n'arrive pas a trancher. Ce prompt structure l'arbitrage pour rendre les couts de chaque option visibles.",
    prompt: `Tu es un conseiller strategique produit. On te presente deux options concurrentes et l'equipe n'arrive pas a trancher. Ton role n'est pas de choisir a leur place, mais de rendre les couts et les renoncements de chaque option tellement visibles que la decision devient evidente.

INPUT
Option A : [DESCRIPTION_OPTION_A]
Option B : [DESCRIPTION_OPTION_B]
Contexte : [CONTEXTE_DECISION]
Qui pousse pour A : [PARTIES_PRENANTES_A]
Qui pousse pour B : [PARTIES_PRENANTES_B]

CONSIGNES
Produis une GRILLE D'ARBITRAGE :

---
ARBITRAGE — [OPTION_A] vs [OPTION_B]
---

REFORMULATION DU VRAI DESACCORD
Souvent, le desaccord apparent (feature A vs feature B) cache un desaccord plus profond (court terme vs long terme, croissance vs retention, un segment vs un autre). Identifie le vrai desaccord en 2-3 phrases.

ANALYSE COMPAREE

| Critere | Option A | Option B |
|---------|----------|----------|
| Probleme resolu | | |
| Metrique impactee | | |
| Impact estime | | |
| Certitude | | |
| Effort | | |
| Ce qu'on perd en choisissant l'autre | | |
| Reversibilite (facile a defaire ?) | | |
| Alignement equipe | | |

LE COUT DE CHAQUE OPTION
Pour chaque option, reponds :
- Ce qu'on gagne
- Ce qu'on perd
- Ce qu'on ne voit pas encore (l'angle mort)

LE COUT DE NE PAS CHOISIR
Qu'est-ce qui se passe si on repousse la decision de 4 semaines ? C'est souvent le scenario le plus couteux et le moins visible.

RECOMMANDATION
Si tu devais trancher maintenant, tu choisirais [A / B]. En une phrase, pourquoi. Puis en une phrase, pourquoi tu pourrais avoir tort.

---

REGLES DE SORTIE
- Ne propose pas de compromis (faire un peu des deux). Les compromis sont presque toujours la pire option car ils ne resolvent aucun probleme completement.
- Sois explicite sur l'asymetrie : si une option est reversible et l'autre non, ca change tout.`,
    variables: [
      {
        name: "[DESCRIPTION_OPTION_A]",
        desc: "Opportunite A avec son contexte (depuis le prompt 04).",
      },
      {
        name: "[DESCRIPTION_OPTION_B]",
        desc: "Opportunite B avec son contexte.",
      },
      {
        name: "[CONTEXTE_DECISION]",
        desc: "Pourquoi ces deux options sont en competition.",
      },
    ],
    tip: "La plupart des blocages de priorisation ne sont pas des problemes de donnees. Ce sont des desaccords non-dits entre personnes. Ce prompt les met sur la table.",
    gated: true,
  },
  {
    id: "07",
    phase: "PHASE 4 : FORMALISATION",
    title: "Le POP Builder",
    usage:
      "Genere un Product One Pager (POP) a partir de la note de decision. Le POP est le document qui circule en comite : une page, une decision, zero ambiguite.",
    prompt: `Tu es Head of Product. Redige un Product One Pager (POP) a partir des elements de decision du cycle de discovery. Le POP est le document qui force un go/no-go en comite. Il tient sur une page. Il n'explique pas : il tranche.

INPUT
Note de decision (sortie du prompt 05) :
[COLLER_NOTE_DECISION]

Insights cles (sortie du prompt 02) :
[COLLER_INSIGHTS]

CONSIGNES
Produis un POP au format suivant. Le document final ne doit pas depasser 600 mots.

---
PRODUCT ONE PAGER — [NOM_INITIATIVE]
Owner : [NOM]
Date : [DATE]
Statut : PROPOSITION (en attente de validation)
---

PROBLEME
En 3 phrases : quel probleme utilisateur on resout, pour qui, et pourquoi c'est critique maintenant. Inclus un verbatim terrain percutant.

SOLUTION PROPOSEE
En 3-5 phrases : ce qu'on construit. Pas le comment technique, le quoi fonctionnel. Ce que l'utilisateur pourra faire qu'il ne pouvait pas faire avant.

SCOPE V1
CE QUI EST INCLUS :
- [fonctionnalite 1]
- [fonctionnalite 2]
- [fonctionnalite 3]

CE QUI EST EXPLICITEMENT EXCLU (et pourquoi) :
- [exclusion 1] — [raison]
- [exclusion 2] — [raison]

METRIQUES DE SUCCES
Leading (30 jours) : [metrique + cible]
Lagging (90 jours) : [metrique + cible]
Condition d'arret : [seuil en dessous duquel on pivote]

RISQUES
| Risque | Probabilite | Impact | Mitigation |
|--------|------------|--------|------------|
| | | | |

TIMELINE ESTIMEE
[Duree totale, jalons cles]

DECISION ATTENDUE
Ce qu'on demande au comite : [GO / NO-GO / GO CONDITIONNEL]
Date limite de decision : [DATE]
Ce qui se passe si on ne decide pas : [consequence explicite]

---

REGLES DE SORTIE
- 600 mots maximum. Si c'est plus long, c'est que le scope n'est pas clair.
- Le POP ne convainc pas, il pose un arbitrage. Le comite doit pouvoir dire oui ou non, pas "on en reparle".
- Les exclusions de scope sont aussi importantes que les inclusions.`,
    variables: [
      {
        name: "[COLLER_NOTE_DECISION]",
        desc: "La sortie du prompt 05 (Le Decideur).",
      },
      {
        name: "[COLLER_INSIGHTS]",
        desc: "La synthese transversale du prompt 02 (pour les verbatims).",
      },
    ],
    tip: "Si ton POP fait plus d'une page, c'est que tu n'as pas encore assez clarifie. Reviens au prompt 05 et affine la decision avant de formaliser.",
    gated: true,
  },
  {
    id: "08",
    phase: "PHASE 4 : FORMALISATION",
    title: "Le PRD Architect",
    usage:
      "Produit un draft de PRD complet a partir du POP valide. C'est le document de travail pour l'equipe produit-tech-design. Structure, pas inspire.",
    prompt: `Tu es Product Lead. Redige un PRD v1 actionnable a partir d'un POP valide. Le PRD est un document de travail interne. Il doit reduire les ambiguites pour l'equipe d'execution, pas les deplacer.

INPUT
POP valide (sortie du prompt 07) :
[COLLER_POP]

Synthese discovery (sortie du prompt 02) :
[COLLER_SYNTHESE]

Contraintes techniques et business :
[CONTRAINTES]

CONSIGNES
Produis un PRD v1 au format suivant :

---
PRD — [NOM_INITIATIVE] v1
Owner : [NOM]
Date : [DATE]
Statut : DRAFT
---

1. CONTEXTE
Pourquoi on fait ca. Resume du probleme, de l'opportunite, des donnees discovery qui soutiennent la decision. 5-8 phrases max. Inclus 2-3 verbatims du prompt 02.

2. OBJECTIF
Quel changement mesurable on vise. Formule : "Permettre a [profil] de [action] pour [resultat business mesurable]."

3. UTILISATEURS CIBLES
Profils, contextes d'usage, niveau de maturite. Ce que ces utilisateurs font aujourd'hui (le workaround actuel). Ce qui change pour eux.

4. USER STORIES
Format : "En tant que [profil], je veux [action] pour [benefice]."
Classe par priorite : MUST / SHOULD / COULD.
Les MUST doivent etre coherents avec le scope v1 du POP.

5. CONTRAINTES NON-FONCTIONNELLES
Performance, securite, accessibilite, conformite, compatibilite. Sois specifique : pas "performant" mais "temps de chargement < 2s sur 3G".

6. CE QUI EST HORS SCOPE
Reprise des exclusions du POP + nouvelles exclusions techniques. Pour chaque exclusion, une phrase sur pourquoi et quand ca pourrait revenir.

7. METRIQUES
Leading (30 jours) : [metrique + cible + methode de mesure]
Lagging (90 jours) : [metrique + cible + methode de mesure]
Condition d'arret : identique au POP.

8. PLAN DE ROLLOUT
Phase 1 : [scope + audience + duree]
Phase 2 : [scope + audience + duree]
Criteres de passage de phase 1 a phase 2.

9. RISQUES ET MITIGATIONS
| Risque | Type (Tech/Produit/Business) | Probabilite | Impact | Mitigation | Owner |
|--------|---|---|---|---|---|

10. QUESTIONS OUVERTES
Ce qui n'est pas encore tranche et qui doit l'etre avant le dev. Pour chaque question : qui doit repondre, deadline.

---

REGLES DE SORTIE
- Le PRD est un outil de coordination, pas un document de conviction. Si l'equipe a besoin de comprendre "pourquoi", renvoie-les au POP.
- Chaque user story MUST doit etre testable. Si tu ne peux pas decrire le critere d'acceptation, la story n'est pas prete.
- Les questions ouvertes sont normales en v1. Mieux vaut les lister que les ignorer.`,
    variables: [
      {
        name: "[COLLER_POP]",
        desc: "Le POP valide (sortie du prompt 07).",
      },
      {
        name: "[COLLER_SYNTHESE]",
        desc: "La synthese transversale (prompt 02).",
      },
      {
        name: "[CONTRAINTES]",
        desc: "Stack technique, capacite equipe, deadlines, reglementaire.",
      },
    ],
    tip: "Un bon PRD rend les ingenieurs autonomes sur les choix d'implementation. Si l'equipe revient te poser des questions toutes les heures, le PRD n'est pas assez precis.",
    gated: true,
  },
  {
    id: "09",
    phase: "PHASE 5 : ALIGNEMENT",
    title: "Le Memo d'Alignement",
    usage:
      "Prepare la communication aux stakeholders. Ce prompt anticipe les objections par fonction (tech, sales, exec) et propose les concessions avant qu'on te les demande.",
    prompt: `Tu es PM senior. Tu dois obtenir l'alignement de parties prenantes aux interets divergents sur une initiative produit. Ton memo doit anticiper les objections avant qu'elles arrivent en reunion.

INPUT
POP (sortie du prompt 07) :
[COLLER_POP]

PRD v1 (sortie du prompt 08) :
[COLLER_PRD]

Parties prenantes :
[LISTE_STAKEHOLDERS]

Points de tension connus :
[TENSIONS]

CONSIGNES
Produis un MEMO D'ALIGNEMENT au format suivant :

---
MEMO D'ALIGNEMENT — [NOM_INITIATIVE]
Pour : [destinataires]
De : [PM owner]
Date : [DATE]
Decision attendue avant le : [DATE_LIMITE]
---

RESUME EXECUTIF (5 phrases max)
Quoi, pourquoi, pour qui, quel impact, quelle timeline.

CARTE DES OBJECTIONS PREVISIBLES

Pour chaque fonction (Engineering, Sales/CS, Direction, Design, Ops) :
- Objection probable : [ce qu'ils vont dire]
- Raison sous-jacente : [ce qu'ils pensent vraiment]
- Reponse preparee : [ton argument, appuye sur des donnees discovery]
- Concession acceptable : [ce que tu peux lacher sans compromettre l'initiative]

POINTS NON-NEGOCIABLES
2-3 elements sur lesquels tu ne cederas pas. Pour chacun : pourquoi c'est non-negociable (donnees a l'appui).

POINTS NEGOCIABLES
2-3 elements ou tu es flexible. Pour chacun : les conditions sous lesquelles tu acceptes un changement.

FORMAT DE LA DECISION
Ce que tu demandes : [GO / NO-GO / GO avec conditions]
Comment la decision sera prise : [vote, consensus, decision du sponsor]
Ce qui se passe si on ne decide pas a la date limite : [consequence]

PROCHAINES ETAPES POST-ALIGNEMENT
Si GO : les 3 actions des 5 prochains jours.
Si NO-GO : ce qui change dans la roadmap.

---

REGLES DE SORTIE
- Ne sois pas diplomatique au point d'etre flou. L'alignement ne vient pas du consensus, il vient de la clarte sur qui decide quoi.
- Anticipe au moins une objection par fonction. Si tu n'en trouves pas, c'est que tu ne connais pas assez tes stakeholders.
- Les concessions doivent etre preparees a l'avance. En reunion, il est trop tard pour negocier lucidement.`,
    variables: [
      {
        name: "[COLLER_POP]",
        desc: "Le POP valide (sortie du prompt 07).",
      },
      {
        name: "[COLLER_PRD]",
        desc: "Le PRD v1 (sortie du prompt 08).",
      },
      {
        name: "[LISTE_STAKEHOLDERS]",
        desc: "Noms + roles + ce qui les preoccupe.",
      },
      {
        name: "[TENSIONS]",
        desc: "Desaccords connus, historique, sujets sensibles.",
      },
    ],
    tip: "Envoie ce memo 48h avant la reunion d'alignement. Les gens qui decouvrent un sujet en reunion reagissent mal. Ceux qui ont eu le temps de digerer reagissent mieux.",
    gated: true,
  },
  {
    id: "10",
    phase: "PHASE 5 : PILOTAGE",
    title: "La Revue 30 Jours",
    usage:
      "Boucle d'apprentissage post-lancement. Ce prompt transforme les donnees des 30 premiers jours en une decision : scaler, iterer ou arreter. Pas de zone grise.",
    prompt: `Tu es le PM owner de cette initiative. 30 jours se sont ecoules depuis le lancement. Ton role est de produire une revue factuelle qui mene a une decision claire : scaler, iterer ou arreter. Pas de "ca va dans le bon sens". Des faits et une decision.

INPUT
Conditions de succes definies au lancement (depuis le POP, prompt 07) :
[CONDITIONS_SUCCES]

Conditions d'arret definies au lancement :
[CONDITIONS_ARRET]

Donnees des 30 premiers jours :
[METRIQUES_REELLES]

Retours utilisateurs / terrain :
[RETOURS_TERRAIN]

Incidents / problemes rencontres :
[INCIDENTS]

CONSIGNES
Produis une REVUE 30 JOURS au format suivant :

---
REVUE 30 JOURS — [NOM_INITIATIVE]
Date : [DATE]
Statut : [VERT / ORANGE / ROUGE]
---

1. VERDICT
En 3 phrases : ou on en est par rapport aux conditions de succes. On est en avance, dans les clous ou en retard. Sois factuel.

2. METRIQUES vs OBJECTIFS
| Metrique | Objectif | Resultat reel | Ecart | Verdict |
|----------|----------|---------------|-------|---------|
| [leading] | | | | [ATTEINT / PARTIEL / RATE] |
| [lagging] | | | | [ATTEINT / PARTIEL / RATE] |

3. CE QUI A FONCTIONNE
Les elements positifs, appuyes par des donnees ou des retours terrain. Pas de celebration gratuite : chaque point positif doit etre lie a un resultat mesurable.

4. CE QUI N'A PAS FONCTIONNE
Les problemes rencontres. Pour chacun :
- Description factuelle
- Cause racine (pas le symptome)
- Impact sur les metriques
- Ce qu'on ferait differemment

5. SURPRISES
Ce qu'on n'avait pas anticipe (en positif ou en negatif). Usage inattendu, segment non prevu, friction non identifiee en discovery.

6. DECISION
[SCALER] — Les conditions de succes sont atteintes. On investit plus. Voici les prochaines etapes.
[ITERER] — Les resultats sont partiels. On ajuste. Voici ce qu'on change et la prochaine revue dans [X] jours.
[ARRETER] — Les conditions d'arret sont atteintes. On coupe. Voici comment on desalloue les ressources et ce qu'on apprend pour la suite.

Pour chaque decision, liste les 3 actions concretes des 5 prochains jours.

7. LECONS POUR LE PROCHAIN CYCLE
Ce que ce cycle de discovery-to-delivery nous apprend sur notre facon de travailler. 2-3 lecons max, formulees en regles applicables ("la prochaine fois, on fera X au lieu de Y parce que Z").

---

REGLES DE SORTIE
- Compare TOUJOURS aux conditions definies au lancement. Pas a ce qu'on "sent". Si les conditions d'arret sont atteintes, recommande l'arret meme si l'equipe est attachee au projet.
- La decision est obligatoire. "On continue a observer" n'est pas une decision.
- Les lecons doivent etre actionnables. Pas de "mieux communiquer". Plutot : "envoyer le memo d'alignement 72h avant la reunion au lieu de 24h".`,
    variables: [
      {
        name: "[CONDITIONS_SUCCES]",
        desc: "Depuis le POP (prompt 07) ou la note de decision (prompt 05).",
      },
      {
        name: "[CONDITIONS_ARRET]",
        desc: "Les seuils definis avant le lancement.",
      },
      {
        name: "[METRIQUES_REELLES]",
        desc: "Donnees analytics, dashboards, resultats des 30 premiers jours.",
      },
      {
        name: "[RETOURS_TERRAIN]",
        desc: "Tickets support, interviews post-lancement, NPS, verbatims.",
      },
      {
        name: "[INCIDENTS]",
        desc: "Bugs critiques, problemes de performance, escalations.",
      },
    ],
    tip: "Le vrai avantage competitif d'une equipe produit n'est pas la qualite de ses idees. C'est la vitesse a laquelle elle apprend de ses erreurs. Cette revue est le mecanisme qui force l'apprentissage.",
    gated: true,
  },
];

export const promptNavItems = [...freePrompts, ...gatedPrompts].map((p) => ({
  id: p.id,
  phase: p.phase,
  title: p.title,
  usage: p.usage,
  gated: p.gated,
}));
