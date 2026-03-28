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

CHAINAGE
- Input requis : une transcription brute d'entretien
- Output produit : une FICHE D'ANALYSE standardisee
- Ce qui utilise cet output : le prompt 02 (Synthetiseur Multi-Interviews)

CONTEXTE PRODUIT
Produit : [DESCRIPTION_PRODUIT]
Marche cible : [MARCHE_CIBLE]
Phase : [PHASE_PRODUIT]
Objectif du cycle de discovery : [OBJECTIF_DISCOVERY]

TRANSCRIPTION
[COLLER_LA_TRANSCRIPTION]

QUALITY GATE
Avant de produire la fiche, evalue la transcription :
- Si elle fait moins de 500 mots, signale que l'entretien est probablement trop court pour une extraction fiable.
- Si elle ne contient que des questions sans reponses detaillees, signale un probleme de qualite d'interview.
- Si le sujet de l'entretien ne correspond pas a l'objectif discovery, signale le decalage.
Dans tous les cas, produis la fiche mais ajoute un avertissement en tete.

CONSIGNES
Analyse cette transcription et produis une FICHE D'ANALYSE au format exact suivant. Ce format est obligatoire car les prompts suivants du systeme l'attendent.

---
FICHE D'ANALYSE — Entretien [NUMERO_OU_NOM]
Date : [DATE]
Qualite de la transcription : [BONNE / MOYENNE / FAIBLE]
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
- Si la transcription est trop courte ou de mauvaise qualite, dis-le explicitement plutot que d'inventer du contenu.
- Ne fabrique jamais de verbatims. Si tu ne trouves pas 5 citations percutantes, mets-en moins.`,
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

CHAINAGE
- Input requis : fiches d'analyse du prompt 01 (minimum 3, idealement 5+)
- Output produit : une SYNTHESE TRANSVERSALE avec hypotheses de problemes
- Ce qui utilise cet output : le prompt 03 (Challenger Strategique)

CONTEXTE PRODUIT
Produit : [DESCRIPTION_PRODUIT]
Objectif du cycle de discovery : [OBJECTIF_DISCOVERY]
Nombre d'entretiens : [NOMBRE]

FICHES D'ANALYSE
[COLLER_TOUTES_LES_FICHES_PROMPT_01]
(Separees par ---)

QUALITY GATE
- Si moins de 3 fiches sont fournies, signale que les patterns identifies seront speculatifs et marque chaque pattern avec [VALIDATION REQUISE].
- Si les fiches couvrent un seul profil utilisateur, signale le biais d'echantillon.
- Si les fiches proviennent de dates tres eloignees (6+ mois d'ecart), signale que le contexte a peut-etre change.

CONSIGNES
Produis une SYNTHESE TRANSVERSALE au format exact suivant :

---
SYNTHESE DISCOVERY — [NOM_DU_CYCLE]
Entretiens analyses : [NOMBRE]
Profils couverts : [liste]
Biais d'echantillon identifies : [oui/non + detail]
---

1. PATTERNS DOMINANTS (signal fort, present dans 3+ entretiens)
Pour chaque pattern :
- Enonce : formule le pattern en une phrase
- Frequence : dans combien d'entretiens ce pattern apparait (ex: 4/6)
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

Exemple de bonne hypothese : "Quand un e-commercant mid-market recoit plus de 20 retours/jour, il ne peut pas identifier les retours frauduleux parce que l'outil ne croise pas les historiques d'achat, ce qui provoque un taux de remboursement abusif estime a 8-12% du CA retours."
Exemple de mauvaise hypothese : "Les utilisateurs trouvent l'interface compliquee." (trop vague, pas de contexte, pas de consequence mesurable)

5. ANGLES MORTS
Ce que les entretiens n'ont PAS couvert. Profils manquants, cas d'usage non explores, biais de recrutement des participants. Sois explicite sur les limites de cette synthese.

---
FIN DE SYNTHESE
---

REGLES DE SORTIE
- Ne propose aucune solution. Ce prompt synthetise les problemes, pas les reponses.
- Distingue clairement ce qui est observe (donnees) de ce que tu inferes (hypotheses).
- Si les entretiens se contredisent sur un point, ne tranche pas. Expose la tension.
- Indique la frequence exacte pour chaque pattern (ex: "4 entretiens sur 6"). Les patterns sans frequence sont inutiles.`,
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

CHAINAGE
- Input requis : hypotheses de problemes du prompt 02 (section 4)
- Output produit : hypotheses challengees avec score de confiance et recommandation
- Ce qui utilise cet output : le prompt 04 (Mapping d'Opportunites)

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

QUALITY GATE
- Si les hypotheses ne suivent pas le format "Quand [contexte], [profil] ne peut pas [besoin]...", reformule-les d'abord avant de les challenger.
- Si le contexte business est absent ou trop vague, signale les dimensions FRAME que tu ne peux pas evaluer correctement.

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

ANTI-PATTERNS A EVITER
Signale si tu detectes un de ces biais dans les hypotheses :
- Biais de confirmation : l'hypothese reformule une conviction existante plutot qu'une decouverte
- Solution deguisee : l'hypothese contient deja la solution ("les users ont besoin d'un dashboard")
- Faux consensus : tout le monde est d'accord trop facilement (souvent signe qu'on n'a pas assez creuse)

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

CHAINAGE
- Input requis : sortie du prompt 03 (hypotheses challengees avec scores FRAME)
- Output produit : une CARTE D'OPPORTUNITES avec classement par quadrant et Top 3
- Ce qui utilise cet output : le prompt 05 (Le Decideur) ou le prompt 06 (L'Arbitre de Trade-offs) si deux options sont en competition

INPUT
Hypotheses challengees (sortie du prompt 03) :
[COLLER_SORTIE_PROMPT_03]

Contexte :
Capacite de l'equipe ce trimestre : [CAPACITE]
Contraintes non-negociables : [CONTRAINTES]
Metrique North Star de l'equipe : [NORTH_STAR]

QUALITY GATE
- Ignore les hypotheses notees ABANDONNER dans le prompt 03 (sauf si le PM les reintroduit explicitement avec justification).
- Si moins de 3 hypotheses sont notees POURSUIVRE ou APPROFONDIR, signale que le pool d'opportunites est insuffisant pour une priorisation robuste. Recommande de relancer un cycle discovery supplementaire.
- Si la capacite equipe n'est pas fournie, produis le mapping sans la colonne Effort et signale que la priorisation est incomplete.

CONSIGNES
Produis une CARTE D'OPPORTUNITES au format suivant :

---
CARTE D'OPPORTUNITES — [NOM_DU_CYCLE]
North Star : [NORTH_STAR]
Capacite disponible : [CAPACITE]
---

MATRICE IMPACT x CERTITUDE

Pour chaque hypothese retenue (score de confiance >= 5 dans le prompt 03), cree une fiche :

OPPORTUNITE : [Nom court — max 5 mots]
Hypothese source : [reformulation depuis le prompt 03]
Score FRAME : [rappel du score du prompt 03]

Impact potentiel : [FORT / MOYEN / FAIBLE]
Justification impact : quelle metrique bouge, estimation chiffree si possible. Ex: "Activation J+7 de 34% a 42% = +1200 users actifs/mois" plutot que "ameliore l'activation".

Certitude : [ELEVEE / MOYENNE / BASSE]
Justification certitude : nombre d'entretiens qui soutiennent, coherence des signaux, resultats d'experimentation si existants.

Effort estime : [S (<2 sem) / M (2-4 sem) / L (4-8 sem) / XL (>8 sem)]
Ce qui rend l'effort incertain : dependances tech, design a inventer, besoin de donnees manquantes.

Risque de faux positif : [description en 1 phrase — comment ce signal pourrait etre trompeur]
Test de validation pre-engagement : [comment confirmer avant d'investir un sprint entier]

CLASSEMENT PAR QUADRANT

Quadrant 1 (Impact Fort + Certitude Elevee) : GO — a traiter en priorite
Quadrant 2 (Impact Fort + Certitude Basse) : VALIDER D'ABORD — investir dans la preuve avant l'execution
Quadrant 3 (Impact Faible + Certitude Elevee) : QUICK WIN — si et seulement si capacite residuelle
Quadrant 4 (Impact Faible + Certitude Basse) : PARKING LOT — ne pas investir ce trimestre

TOP 3 RECOMMANDE
Les 3 opportunites sur lesquelles concentrer l'energie. Pour chacune :
- Pourquoi celle-ci plutot qu'une autre
- Ce qu'on renonce explicitement en la choisissant (l'opportunite qu'on ne fera pas)
- Le premier test a lancer avant de s'engager completement

CE QU'ON DECIDE DE NE PAS FAIRE
Liste explicite des opportunites ecartees avec pour chaque :
- Raison de l'ecart
- Condition sous laquelle elle pourrait revenir (ex: "si la retention Q2 passe sous 60%")
- Owner de la veille sur cette condition

DONNEES MANQUANTES
Ce qui rendrait cette carte plus fiable si on l'avait : donnees quantitatives, entretiens supplementaires, benchmarks concurrents. Pour chaque element manquant, estime si c'est bloquant ou simplement utile.

---

REGLES DE SORTIE
- Si les donnees ne permettent pas de scorer une opportunite, classe-la en Quadrant 2 avec une note sur ce qu'il faudrait pour la valider.
- Ne propose pas de solutions. Ce prompt priorise les problemes, pas les reponses.
- Sois explicite sur les renoncements. Un bon mapping dit autant ce qu'on arrete que ce qu'on lance.
- Ne gonfle pas les impacts pour rendre la carte plus "excitante". Si l'impact est incertain, dis-le.`,
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
      {
        name: "[NORTH_STAR]",
        desc: "La metrique principale de l'equipe. Ex: Weekly Active Users, MRR, Activation J+7.",
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

CHAINAGE
- Input requis : le Top 3 du prompt 04 (Carte d'Opportunites)
- Output produit : une NOTE DE DECISION avec conditions de succes et d'arret
- Ce qui utilise cet output : le prompt 07 (POP Builder)

INPUT
Opportunite prioritaire (depuis le prompt 04, Top 3) :
[COLLER_OPPORTUNITE]

Carte d'opportunites complete :
[COLLER_CARTE_PROMPT_04]

Contexte organisationnel :
[CONTEXTE_ORGA]

QUALITY GATE
- Si l'opportunite est en Quadrant 2 (Impact Fort + Certitude Basse), ne produis PAS une note GO. Produis une note CONDITIONNEL avec les etapes de validation requises avant engagement.
- Si le contexte organisationnel est vide, signale que la decision sera deconnectee de la realite et risque de ne pas survivre au premier comite.
- Si les conditions d'arret definies precedemment sont absentes, impose-les : une decision sans sortie de secours n'est pas une decision, c'est un pari aveugle.

CONSIGNES
Produis une NOTE DE DECISION au format suivant :

---
NOTE DE DECISION — [NOM_OPPORTUNITE]
Statut : [GO / NO-GO / CONDITIONNEL]
Date : [DATE]
Owner : [NOM]
---

LA DECISION
En 3 phrases maximum : ce qu'on fait, pour qui, et quel resultat on vise. Si tu ne peux pas le dire en 3 phrases, la decision n'est pas assez claire.

POURQUOI CETTE OPPORTUNITE
- Quel probleme utilisateur elle resout (reformulation du probleme source avec verbatim terrain)
- Quelle metrique business elle impacte (et estimation chiffree de l'impact)
- Pourquoi maintenant et pas dans 3 mois (le cout de l'attente)
- Ce que les donnees discovery nous disent : [rappel du score FRAME, nombre d'entretiens qui soutiennent]

CE QU'ON RENONCE EN PRENANT CETTE DECISION
Liste explicite de ce qui ne sera PAS fait ce trimestre a cause de ce choix. Pour chaque renoncement :
- Ce qu'on perd en le reportant (en termes business concrets, pas abstraits)
- Pourquoi c'est acceptable aujourd'hui
- Le signal qui indiquerait qu'on a eu tort de reporter

CONDITIONS DE SUCCES (mesurables a J+30)
Metrique leading : [ex: "taux d'activation onboarding passe de 34% a 42%"]
Metrique lagging : [ex: "retention M2 passe de 28% a 35%"]
Signal qualitatif : [ex: "reduction de 50% des tickets support lies a l'onboarding"]

CONDITIONS D'ARRET (non-negociables)
Quel signal a J+30 prouve qu'on a eu tort ? Definis le seuil MAINTENANT.
Exemple : "Si le taux d'activation n'a pas bouge de plus de 3 points a J+30, on arrete et on realloue."
Ce n'est pas une suggestion. C'est un engagement.

SCENARIO NO-GO
Si on decide de ne PAS faire cette opportunite :
- Quel est le statu quo et son cout sur les 3 prochains mois ?
- Quelle alternative est la plus credible ?
- Ce qu'on fait de la capacite liberee

PRE-REQUIS AVANT DE COMMENCER
Ce qui doit etre vrai avant de lancer :
- Alignement necessaire : [qui doit valider quoi, deadline]
- Donnees manquantes : [a collecter avant le premier sprint]
- Dependances : [techniques, organisationnelles, contractuelles]
- Capacite confirmee : [l'equipe est-elle reellement disponible ?]

PROCHAINE ACTION
L'action concrete qui se passe dans les 48h suivant cette decision. Pas un plan a 6 semaines. La premiere brique, avec un owner et une deadline.

---

REGLES DE SORTIE
- Si tu ne peux pas formuler la decision en 3 phrases, c'est qu'elle n'est pas claire. Dis-le.
- Les renoncements sont obligatoires. Une decision sans renoncement n'est pas une decision.
- Les conditions d'arret sont obligatoires. Si on ne sait pas quand arreter, on ne sait pas ce qu'on fait.
- Ne confonds pas optimisme et conviction. "Ca va marcher parce qu'on y croit" n'est pas un argument.`,
    variables: [
      {
        name: "[COLLER_OPPORTUNITE]",
        desc: "La fiche de l'opportunite choisie dans le Top 3 du prompt 04.",
      },
      {
        name: "[COLLER_CARTE_PROMPT_04]",
        desc: "La carte complete pour voir les renoncements et le contexte global.",
      },
      {
        name: "[CONTEXTE_ORGA]",
        desc: "Equipe dispo, budget, timeline, parties prenantes cles, contraintes politiques.",
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
      "Quand deux opportunites sont en competition et que l'equipe n'arrive pas a trancher. Ce prompt structure l'arbitrage pour rendre les couts de chaque option visibles. Optionnel — a utiliser uniquement si le prompt 05 n'a pas suffi a trancher.",
    prompt: `Tu es un conseiller strategique produit. On te presente deux options concurrentes et l'equipe n'arrive pas a trancher. Ton role n'est pas de choisir a leur place, mais de rendre les couts et les renoncements de chaque option tellement visibles que la decision devient evidente.

CHAINAGE
- Input requis : deux opportunites du prompt 04 (Carte d'Opportunites)
- Output produit : une GRILLE D'ARBITRAGE avec recommandation
- Ce qui utilise cet output : le prompt 05 (Le Decideur) — repasse le gagnant dans le prompt 05 pour formaliser la decision
- Quand utiliser ce prompt : UNIQUEMENT quand deux options sont en competition reelle. Si une option domine clairement, passe directement au prompt 05.

INPUT
Option A : [DESCRIPTION_OPTION_A]
Option B : [DESCRIPTION_OPTION_B]
Contexte : [CONTEXTE_DECISION]
Qui pousse pour A : [PARTIES_PRENANTES_A] — et pourquoi (leur interet reel, pas leur argument affiche)
Qui pousse pour B : [PARTIES_PRENANTES_B] — et pourquoi

QUALITY GATE
- Si les deux options ne sont pas au meme niveau de maturite (l'une a des donnees discovery, l'autre est une intuition), signale l'asymetrie et recommande de completer les donnees avant d'arbitrer.
- Si le "qui pousse" est vide, signale que le desaccord est probablement un symptome d'un probleme d'alignement plus profond.

CONSIGNES
Produis une GRILLE D'ARBITRAGE :

---
ARBITRAGE — [OPTION_A] vs [OPTION_B]
Contexte de la decision : [resume en 1 phrase]
Date limite de decision : [DATE] (si pas fournie, recommande une deadline)
---

REFORMULATION DU VRAI DESACCORD
Souvent, le desaccord apparent (feature A vs feature B) cache un desaccord plus profond (court terme vs long terme, croissance vs retention, un segment vs un autre). Identifie le vrai desaccord en 2-3 phrases.

Exemples de desaccords profonds courants :
- "Revenue a court terme vs valeur utilisateur long terme"
- "Servir le segment existant vs ouvrir un nouveau segment"
- "Reduire la dette technique vs livrer plus vite"

ANALYSE COMPAREE

| Critere | Option A | Option B |
|---------|----------|----------|
| Probleme resolu | | |
| Profil utilisateur impacte | | |
| Metrique impactee | | |
| Impact estime (chiffre) | | |
| Certitude (nb entretiens, donnees) | | |
| Effort (taille) | | |
| Ce qu'on perd en choisissant l'autre | | |
| Reversibilite (facile a defaire ?) | | |
| Alignement equipe (qui est pour/contre) | | |
| Coherence avec la North Star | | |

LE COUT DE CHAQUE OPTION
Pour chaque option, reponds a ces 3 questions :
- Ce qu'on gagne : [benefice concret et mesurable]
- Ce qu'on perd : [renoncement explicite]
- L'angle mort : [ce qu'on ne voit pas encore mais qui pourrait changer la donne]

LE COUT DE NE PAS CHOISIR
Qu'est-ce qui se passe si on repousse la decision de 4 semaines ?
- Impact sur la roadmap
- Impact sur l'equipe (motivation, paralysie)
- Impact business (opportunite perdue, concurrent qui avance)
C'est souvent le scenario le plus couteux et le moins visible.

RECOMMANDATION
Si tu devais trancher maintenant, tu choisirais [A / B].
En une phrase : pourquoi.
En une phrase : pourquoi tu pourrais avoir tort.
En une phrase : quel signal dans les 2 prochaines semaines confirmerait ou infirmerait ton choix.

---

REGLES DE SORTIE
- Ne propose pas de compromis (faire un peu des deux). Les compromis sont presque toujours la pire option car ils ne resolvent aucun probleme completement.
- Sois explicite sur l'asymetrie : si une option est reversible et l'autre non, ca change tout.
- Si les donnees sont insuffisantes pour trancher, ne tranche pas. Recommande le test le plus rapide pour obtenir la donnee manquante.
- Nomme les personnes. "L'equipe tech est contre" ne veut rien dire. "Le CTO pense que X parce que Y" est utilisable.`,
    variables: [
      {
        name: "[DESCRIPTION_OPTION_A]",
        desc: "Fiche de l'opportunite A depuis le prompt 04, avec score FRAME.",
      },
      {
        name: "[DESCRIPTION_OPTION_B]",
        desc: "Fiche de l'opportunite B depuis le prompt 04, avec score FRAME.",
      },
      {
        name: "[CONTEXTE_DECISION]",
        desc: "Pourquoi ces deux options sont en competition. Historique du debat, tentatives precedentes.",
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

CHAINAGE
- Input requis : note de decision du prompt 05 + synthese du prompt 02
- Output produit : un POP (max 600 mots) pret a circuler en comite
- Ce qui utilise cet output : le prompt 08 (PRD Architect) une fois le POP valide

INPUT
Note de decision (sortie du prompt 05) :
[COLLER_NOTE_DECISION]

Insights cles (sortie du prompt 02) :
[COLLER_INSIGHTS]

QUALITY GATE
- Si la note de decision est CONDITIONNEL, le POP doit le refleter : statut "PROPOSITION CONDITIONNELLE" et section additionnelle "Conditions de validation avant engagement".
- Si les conditions de succes ou d'arret sont absentes de la note de decision, refuse de produire le POP et renvoie au prompt 05.
- Si les insights du prompt 02 ne contiennent aucun verbatim, signale que le POP sera moins convaincant.

CONSIGNES
Produis un POP au format suivant. Le document final ne doit pas depasser 600 mots. Chaque mot compte.

---
PRODUCT ONE PAGER — [NOM_INITIATIVE]
Owner : [NOM]
Date : [DATE]
Statut : PROPOSITION (en attente de validation)
---

PROBLEME
En 3 phrases : quel probleme utilisateur on resout, pour qui, et pourquoi c'est critique maintenant. Inclus un verbatim terrain percutant (depuis le prompt 02). Le probleme doit etre formule du point de vue de l'utilisateur, pas de l'entreprise.

Bon exemple : "Les e-commercants mid-market perdent 3h/jour a trier manuellement les retours frauduleux. 'Je passe plus de temps a verifier les retours qu'a vendre' (Entretien #4). Sans action, le taux de remboursement abusif continuera de rogner 8-12% du CA retours."
Mauvais exemple : "Nous devons ameliorer notre fonctionnalite de gestion des retours pour rester competitifs."

SOLUTION PROPOSEE
En 3-5 phrases : ce qu'on construit. Pas le comment technique, le quoi fonctionnel. Ce que l'utilisateur pourra faire qu'il ne pouvait pas faire avant.

SCOPE V1
CE QUI EST INCLUS :
- [fonctionnalite 1] — en quoi ca repond au probleme
- [fonctionnalite 2] — en quoi ca repond au probleme
- [fonctionnalite 3] — en quoi ca repond au probleme

CE QUI EST EXPLICITEMENT EXCLU (et pourquoi) :
- [exclusion 1] — [raison + quand ca pourrait revenir]
- [exclusion 2] — [raison + quand ca pourrait revenir]

METRIQUES DE SUCCES
Leading (30 jours) : [metrique + cible chiffree + methode de mesure]
Lagging (90 jours) : [metrique + cible chiffree + methode de mesure]
Condition d'arret : [seuil precis en dessous duquel on pivote — repris du prompt 05]

RISQUES
| Risque | Probabilite | Impact | Mitigation | Owner |
|--------|------------|--------|------------|-------|
| | | | | |
(3 risques max. Les plus impactants.)

TIMELINE ESTIMEE
[Duree totale, jalons cles, date de premiere mise en production]

DECISION ATTENDUE
Ce qu'on demande au comite : [GO / NO-GO / GO CONDITIONNEL]
Date limite de decision : [DATE]
Ce qui se passe si on ne decide pas : [consequence explicite — ex: "le slot dev est realloue a l'equipe X le 15 avril"]

---

REGLES DE SORTIE
- 600 mots maximum. Si c'est plus long, c'est que le scope n'est pas clair.
- Le POP ne convainc pas, il pose un arbitrage. Le comite doit pouvoir dire oui ou non, pas "on en reparle".
- Les exclusions de scope sont aussi importantes que les inclusions. Un scope sans exclusion est un scope non maitrise.
- Chaque metrique doit avoir une methode de mesure. "Ameliorer le NPS" sans dire comment on le mesure est inutile.`,
    variables: [
      {
        name: "[COLLER_NOTE_DECISION]",
        desc: "La sortie du prompt 05 (Le Decideur).",
      },
      {
        name: "[COLLER_INSIGHTS]",
        desc: "La synthese transversale du prompt 02 (pour les verbatims et le contexte terrain).",
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

CHAINAGE
- Input requis : POP valide du prompt 07 + synthese discovery du prompt 02
- Output produit : un PRD v1 complet, pret pour une session de kick-off technique
- Ce qui utilise cet output : le prompt 09 (Memo d'Alignement) et, plus tard, le prompt 10 (Revue 30 Jours)

INPUT
POP valide (sortie du prompt 07) :
[COLLER_POP]

Synthese discovery (sortie du prompt 02) :
[COLLER_SYNTHESE]

Contraintes techniques et business :
[CONTRAINTES]

QUALITY GATE
- Si le POP n'est pas marque comme valide (statut GO ou GO CONDITIONNEL), signale que le PRD est premature. Un PRD sans POP valide est un effort gaspille.
- Si les contraintes techniques sont absentes, signale que les sections Non-Fonctionnelles et Risques seront incompletes. Recommande d'impliquer un Tech Lead avant de finaliser.

CONSIGNES
Produis un PRD v1 au format suivant :

---
PRD — [NOM_INITIATIVE] v1
Owner : [NOM]
Date : [DATE]
Statut : DRAFT — a revoir avec Tech Lead et Design Lead
Source : POP [NOM] du [DATE]
---

1. CONTEXTE
Pourquoi on fait ca. Resume du probleme, de l'opportunite, des donnees discovery qui soutiennent la decision. 5-8 phrases max. Inclus 2-3 verbatims du prompt 02.
Lien vers le POP source : [reference]
Lien vers la synthese discovery : [reference]

2. OBJECTIF
Quel changement mesurable on vise. Formule : "Permettre a [profil] de [action] pour [resultat business mesurable]."
Reprise des conditions de succes du POP.

3. UTILISATEURS CIBLES
Pour chaque profil :
- Qui : [role, contexte, frequence d'usage]
- Ce qu'il fait aujourd'hui : [le workaround actuel, avec verbatim si disponible]
- Ce qui change pour lui : [la transformation apportee par cette initiative]
- Ce qu'il ne fera PAS avec cette V1 : [gerer les attentes]

4. USER STORIES
Format : "En tant que [profil], je veux [action] pour [benefice]."
Classe par priorite : MUST / SHOULD / COULD.

Pour chaque MUST :
- Critere d'acceptation : "L'histoire est validee quand [condition testable]"
- Cas limite : au moins 1 edge case par story MUST

Les MUST doivent etre coherents avec le scope V1 du POP. Si une story MUST ne correspond pas a une inclusion du POP, signale l'incoherence.

5. CONTRAINTES NON-FONCTIONNELLES
Sois specifique — chaque contrainte doit etre verifiable :
- Performance : [ex: "temps de chargement < 2s sur 3G, P95"]
- Securite : [ex: "donnees chiffrees au repos, AES-256"]
- Accessibilite : [ex: "WCAG 2.1 AA sur les flux principaux"]
- Compatibilite : [ex: "Chrome, Safari, Firefox derniere version + N-1, iOS 16+"]
- Conformite : [ex: "RGPD — pas de donnees personnelles dans les logs"]
Pas "performant" ou "securise" — ce ne sont pas des specs, ce sont des voeux.

6. CE QUI EST HORS SCOPE
Reprise des exclusions du POP + nouvelles exclusions techniques. Pour chaque exclusion :
- Pourquoi c'est exclu de la V1
- Quand ca pourrait revenir (trigger ou condition)
- Risque si on l'oublie trop longtemps

7. METRIQUES
Leading (30 jours) : [metrique + cible + methode de mesure + outil]
Lagging (90 jours) : [metrique + cible + methode de mesure + outil]
Condition d'arret : identique au POP.
Instrumentation requise : [quels events tracker, quels dashboards creer AVANT le lancement]

8. PLAN DE ROLLOUT
Phase 1 : [scope + audience + duree + criteres de succes pour passer a la phase 2]
Phase 2 : [scope + audience + duree]
Rollback plan : [comment revenir en arriere si Phase 1 est un echec]

9. RISQUES ET MITIGATIONS
| Risque | Type (Tech/Produit/Business) | Probabilite | Impact | Mitigation | Owner | Deadline mitigation |
|--------|---|---|---|---|---|---|

10. QUESTIONS OUVERTES
Ce qui n'est pas encore tranche et qui doit l'etre avant le dev. Pour chaque question :
- Question : [formulation precise]
- Qui doit repondre : [nom + role]
- Deadline : [date]
- Consequence si pas resolu : [ce qui est bloque]

---

REGLES DE SORTIE
- Le PRD est un outil de coordination, pas un document de conviction. Si l'equipe a besoin de comprendre "pourquoi", renvoie-les au POP.
- Chaque user story MUST doit etre testable. Si tu ne peux pas decrire le critere d'acceptation, la story n'est pas prete.
- Les questions ouvertes sont normales en V1. Mieux vaut les lister que les ignorer.
- Ne detaille pas l'implementation technique. Le PRD decrit le QUOI et le POURQUOI, pas le COMMENT.`,
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
        desc: "Stack technique, capacite equipe, deadlines, contraintes reglementaires, dette technique connue.",
      },
    ],
    tip: "Un bon PRD rend les ingenieurs autonomes sur les choix d'implementation. Si l'equipe revient te poser des questions toutes les heures, le PRD n'est pas assez precis. Fais-le relire par un Tech Lead avant le kick-off.",
    gated: true,
  },
  {
    id: "09",
    phase: "PHASE 5 : ALIGNEMENT",
    title: "Le Memo d'Alignement",
    usage:
      "Prepare la communication aux stakeholders. Ce prompt anticipe les objections par fonction (tech, sales, exec) et propose les concessions avant qu'on te les demande.",
    prompt: `Tu es PM senior. Tu dois obtenir l'alignement de parties prenantes aux interets divergents sur une initiative produit. Ton memo doit anticiper les objections avant qu'elles arrivent en reunion.

CHAINAGE
- Input requis : POP valide (prompt 07) + PRD v1 (prompt 08)
- Output produit : un MEMO D'ALIGNEMENT pret a envoyer 48-72h avant la reunion
- Ce qui utilise cet output : la reunion d'alignement (hors systeme), puis le prompt 10 (Revue 30 Jours) pour mesurer si l'alignement a tenu

INPUT
POP (sortie du prompt 07) :
[COLLER_POP]

PRD v1 (sortie du prompt 08) :
[COLLER_PRD]

Parties prenantes :
[LISTE_STAKEHOLDERS]

Points de tension connus :
[TENSIONS]

QUALITY GATE
- Si la liste des stakeholders ne contient pas au moins 3 fonctions differentes (ex: tech + business + ops), signale que l'alignement sera partiel et qu'il faudra un second round.
- Si aucun point de tension n'est fourni, signale que soit les tensions n'ont pas ete identifiees (dangereux), soit il n'y en a reellement pas (rare). Recommande d'en chercher.
- Si le POP et le PRD ne sont pas coherents (ex: metriques differentes), signale l'incoherence avant de produire le memo.

CONSIGNES
Produis un MEMO D'ALIGNEMENT au format suivant :

---
MEMO D'ALIGNEMENT — [NOM_INITIATIVE]
Pour : [destinataires — noms et roles]
De : [PM owner]
Date : [DATE]
Decision attendue avant le : [DATE_LIMITE]
Temps de lecture estime : 5 minutes
---

RESUME EXECUTIF (5 phrases max)
Quoi, pourquoi, pour qui, quel impact, quelle timeline. Un dirigeant qui ne lit que cette section doit avoir compris l'essentiel.

CONTEXTE EN 30 SECONDES
Rappel du probleme, des donnees discovery cles (nombre d'entretiens, patterns dominants, score FRAME). Pas de details — renvoie au POP pour les curieux.

CARTE DES OBJECTIONS PREVISIBLES

Pour chaque fonction cle :

[ENGINEERING]
- Objection probable : [ce qu'ils vont dire, en utilisant leur vocabulaire]
- Raison sous-jacente : [ce qu'ils pensent vraiment — souvent lie a la dette technique, la charge, ou le realisme du planning]
- Reponse preparee : [ton argument, appuye sur des donnees discovery ou des contraintes deja prises en compte dans le PRD]
- Concession acceptable : [ce que tu peux lacher sans compromettre l'initiative]

[SALES / CS]
- Objection probable : [generalement lie aux demandes clients ou au pipeline]
- Raison sous-jacente : [peur de perdre un deal, pression du management commercial]
- Reponse preparee : [...]
- Concession acceptable : [...]

[DIRECTION / EXEC]
- Objection probable : [generalement lie au ROI, au timing, ou a l'alignement strategie]
- Raison sous-jacente : [vision divergente, pression board, meconnaissance du terrain]
- Reponse preparee : [...]
- Concession acceptable : [...]

[DESIGN] (si applicable)
- Objection probable : [generalement lie a l'UX, au scope, ou a la qualite]
- Raison sous-jacente : [...]
- Reponse preparee : [...]
- Concession acceptable : [...]

POINTS NON-NEGOCIABLES
2-3 elements sur lesquels tu ne cederas pas. Pour chacun :
- Pourquoi c'est non-negociable (donnees terrain a l'appui)
- Ce qui se passe si on le compromet (consequence concrete)

POINTS NEGOCIABLES
2-3 elements ou tu es flexible. Pour chacun :
- Les conditions sous lesquelles tu acceptes un changement
- L'impact de ce changement sur la timeline et les metriques

FORMAT DE LA DECISION
Ce que tu demandes : [GO / NO-GO / GO avec conditions]
Comment la decision sera prise : [vote, consensus, decision du sponsor — sois explicite]
Ce qui se passe si on ne decide pas a la date limite : [consequence — ex: "le slot dev est perdu pour Q2"]
Ce qui se passe si la decision est NO-GO : [prochaines etapes alternatives]

PROCHAINES ETAPES POST-ALIGNEMENT
Si GO : les 3 actions concretes des 5 prochains jours, chacune avec un owner et une deadline.
Si NO-GO : ce qui change dans la roadmap et comment on communique.

---

REGLES DE SORTIE
- Ne sois pas diplomatique au point d'etre flou. L'alignement ne vient pas du consensus, il vient de la clarte sur qui decide quoi.
- Anticipe au moins une objection par fonction. Si tu n'en trouves pas, c'est que tu ne connais pas assez tes stakeholders.
- Les concessions doivent etre preparees a l'avance. En reunion, il est trop tard pour negocier lucidement.
- N'utilise jamais "on" sans preciser qui. "On va s'en occuper" est une phrase qui tue l'alignement. "Marie (Tech Lead) prend en charge avant le 15/04" fonctionne.`,
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
        desc: "Noms + roles + ce qui les preoccupe. Ex: 'Thomas (CTO) — inquiet sur la charge equipe backend ce trimestre'.",
      },
      {
        name: "[TENSIONS]",
        desc: "Desaccords connus, historique de decisions similaires, sujets sensibles dans l'orga.",
      },
    ],
    tip: "Envoie ce memo 48-72h avant la reunion d'alignement. Les gens qui decouvrent un sujet en reunion reagissent mal. Ceux qui ont eu le temps de digerer reagissent mieux. Pas 24h — c'est trop court. Pas 1 semaine — c'est trop long, ils oublient.",
    gated: true,
  },
  {
    id: "10",
    phase: "PHASE 5 : PILOTAGE",
    title: "La Revue 30 Jours",
    usage:
      "Boucle d'apprentissage post-lancement. Ce prompt transforme les donnees des 30 premiers jours en une decision : scaler, iterer ou arreter. Pas de zone grise.",
    prompt: `Tu es le PM owner de cette initiative. 30 jours se sont ecoules depuis le lancement. Ton role est de produire une revue factuelle qui mene a une decision claire : scaler, iterer ou arreter. Pas de "ca va dans le bon sens". Des faits et une decision.

CHAINAGE
- Input requis : conditions de succes/arret du POP (prompt 07) + donnees reelles des 30 premiers jours
- Output produit : une REVUE 30 JOURS avec decision et lecons
- Ce qui utilise cet output : la boucle se ferme ici. Les lecons alimentent le prochain cycle discovery (retour au prompt 01). C'est ce qui transforme une serie de prompts en un systeme.

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

QUALITY GATE
- Si les conditions de succes/arret ne sont pas fournies, refuse de produire la revue. Sans baseline, toute analyse est de la rationalisation post-hoc.
- Si les metriques reelles sont incompletes (ex: pas de donnees d'usage), signale les trous et base l'analyse uniquement sur ce qui est mesure. Ne fabrique pas de chiffres.
- Si moins de 30 jours se sont ecoules, signale que la revue est prematuree et que les metriques lagging ne sont probablement pas encore significatives.

CONSIGNES
Produis une REVUE 30 JOURS au format suivant :

---
REVUE 30 JOURS — [NOM_INITIATIVE]
Date : [DATE]
Statut global : [VERT / ORANGE / ROUGE]
Decision : [SCALER / ITERER / ARRETER] (annonce la decision des le debut — pas de suspense)
---

1. VERDICT
En 3 phrases : ou on en est par rapport aux conditions de succes. On est en avance, dans les clous ou en retard. Base chaque affirmation sur un chiffre.

2. METRIQUES vs OBJECTIFS
| Metrique | Objectif (POP) | Resultat reel | Ecart | Verdict |
|----------|----------------|---------------|-------|---------|
| [leading] | | | [+X% ou -X%] | [ATTEINT / PARTIEL / RATE] |
| [lagging] | | | [+X% ou -X%] | [ATTEINT / PARTIEL / RATE] |
| [condition d'arret] | | | | [DECLENCHEE / NON] |

Si la condition d'arret est declenchee, la recommandation DOIT etre ARRETER sauf justification exceptionnelle documentee.

3. CE QUI A FONCTIONNE
Les elements positifs, chacun lie a un resultat mesurable ou un retour terrain cite. Pas de celebration gratuite.
Pour chaque point : [fait observe] → [impact mesure] → [ce qu'on en deduit pour la suite]

4. CE QUI N'A PAS FONCTIONNE
Pour chaque probleme :
- Description factuelle : [ce qui s'est passe]
- Cause racine : [pas le symptome — la vraie raison. Utilise les "5 pourquoi" si necessaire]
- Impact sur les metriques : [chiffre]
- Ce qu'on ferait differemment : [action concrete, pas un voeu pieux]

Exemple de bonne cause racine : "L'onboarding suppose que l'utilisateur a deja configure son catalogue, mais 60% arrivent sans catalogue (source : event tracking). On a optimise un flux que la majorite ne voit pas."
Exemple de mauvaise cause racine : "Les utilisateurs n'ont pas compris la feature." (symptome, pas cause)

5. SURPRISES
Ce qu'on n'avait pas anticipe (en positif ou en negatif) :
- Usages inattendus : [qui utilise la feature autrement que prevu ?]
- Segments non prevus : [un profil inattendu qui adopte ?]
- Frictions non identifiees en discovery : [quoi ? pourquoi on les a ratees ?]

6. DECISION
[SCALER] — Les conditions de succes sont atteintes ou depassees.
→ Ce qu'on fait : [elargir l'audience, augmenter l'investissement, accelerer Phase 2]
→ Ce dont on a besoin : [ressources, budget, alignement]
→ 3 actions des 5 prochains jours, chacune avec owner et deadline.

[ITERER] — Les resultats sont partiels. Le signal est la, l'execution doit s'ajuster.
→ Ce qu'on change : [liste precise des ajustements]
→ Ce qu'on ne change pas : [ce qui fonctionne et qu'on protege]
→ Prochaine revue dans : [X jours]
→ Nouvelle condition d'arret (si differente) : [seuil]
→ 3 actions des 5 prochains jours, chacune avec owner et deadline.

[ARRETER] — Les conditions d'arret sont atteintes. On coupe.
→ Comment on desalloue : [qui fait quoi pour fermer proprement]
→ Ce qu'on communique : [aux stakeholders, aux utilisateurs impactes]
→ Ce qu'on recupere : [donnees, apprentissages, composants reutilisables]
→ 3 actions des 5 prochains jours, chacune avec owner et deadline.

7. LECONS POUR LE PROCHAIN CYCLE
2-3 lecons max, formulees en regles applicables :
Format : "La prochaine fois, on fera [X] au lieu de [Y] parce que [Z]."

Exemple de bonne lecon : "La prochaine fois, on fera 3 entretiens post-lancement a J+14 au lieu de se baser uniquement sur les metriques, parce que les donnees quanti n'expliquent pas le pourquoi des chutes d'usage."
Exemple de mauvaise lecon : "On devrait mieux communiquer." (pas actionnable)

BOUCLE SYSTEME
Si la decision est ITERER, les apprentissages de cette revue doivent alimenter un mini-cycle discovery (retour aux prompts 01-03 avec les nouvelles questions). Liste les 2-3 questions que le prochain cycle doit explorer.

---

REGLES DE SORTIE
- Compare TOUJOURS aux conditions definies au lancement. Pas a ce qu'on "sent". Si les conditions d'arret sont atteintes, recommande l'arret meme si l'equipe est attachee au projet.
- La decision est obligatoire. "On continue a observer" n'est pas une decision.
- Les lecons doivent etre actionnables. Pas de "mieux communiquer". Plutot : "envoyer le memo d'alignement 72h avant la reunion au lieu de 24h".
- Ce prompt ferme la boucle. Si les lecons ne remontent pas dans le prochain cycle discovery, le systeme ne fonctionne pas.`,
    variables: [
      {
        name: "[CONDITIONS_SUCCES]",
        desc: "Depuis le POP (prompt 07) : metriques leading, lagging, et cibles chiffrees.",
      },
      {
        name: "[CONDITIONS_ARRET]",
        desc: "Les seuils definis avant le lancement. Ex: 'Si activation < 37% a J+30, on arrete'.",
      },
      {
        name: "[METRIQUES_REELLES]",
        desc: "Donnees analytics, dashboards, resultats des 30 premiers jours. Colle les chiffres bruts.",
      },
      {
        name: "[RETOURS_TERRAIN]",
        desc: "Tickets support, interviews post-lancement, NPS, verbatims utilisateurs.",
      },
      {
        name: "[INCIDENTS]",
        desc: "Bugs critiques, degradations de performance, escalations client, incidents ops.",
      },
    ],
    tip: "Le vrai avantage competitif d'une equipe produit n'est pas la qualite de ses idees. C'est la vitesse a laquelle elle apprend de ses erreurs. Cette revue est le mecanisme qui force l'apprentissage. Si tu ne la fais pas, le systeme est casse.",
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
