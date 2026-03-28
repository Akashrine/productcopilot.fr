import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Le Pack Discovery IA — Product Copilot",
  description:
    "Le workflow complet pour arrêter d'improviser ton discovery et commencer à le piloter. 10 prompts structurés, accès immédiat, paiement unique.",
  alternates: {
    canonical: "https://productcopilot.fr/pack-discovery-ia",
  },
  openGraph: {
    title: "Le Pack Discovery IA — Product Copilot",
    description:
      "10 prompts structurés pour passer de la première interview au PRD. Conçu pour PMs expérimentés.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/pack-discovery-ia",
  },
};

const faqItems = [
  {
    q: "Ça marche avec ChatGPT ou seulement avec Claude ?",
    a: "Avec les deux. Les prompts sont optimisés pour Claude (Sonnet ou Opus) mais fonctionnent avec GPT-4o.",
  },
  {
    q: "J'ai besoin de quel contexte pour utiliser les prompts ?",
    a: "Tes transcriptions d'interviews (texte brut ou exporté depuis Otter, Grain, Gong) et quelques lignes de contexte sur ton produit et ton marché. C'est tout.",
  },
  {
    q: "Je peux partager le pack avec mon équipe ?",
    a: "La licence est individuelle. Si tu veux une licence équipe, écris-moi.",
  },
  {
    q: "Qu'est-ce que je reçois exactement après le paiement ?",
    a: "Un accès immédiat au pack complet : 10 prompts structurés en PDF, prêts à copier-coller dans Claude ou ChatGPT. Chaque prompt inclut le contexte d'usage, les variables à compléter, un format de sortie Markdown (Notion / Docs) et des garde-fous anti-hallucination. Tu reçois aussi les mises à jour futures du pack par email.",
  },
];

const checkoutUrl =
  process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL || "https://productcopilot.lemonsqueezy.com";

export default function PackDiscoveryIAPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <section className="px-5 sm:px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#A3A3A3] hover:text-[#E8FF8B] transition-colors"
        >
          ← Retour
        </Link>
      </section>

      <section className="px-5 sm:px-6 pb-16 max-w-5xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#E8FF8B]/10 text-[#E8FF8B] rounded text-[10px] font-bold uppercase tracking-widest mb-6">
          Pack Discovery IA • 49€
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
          Le Pack Discovery IA
        </h1>
        <p className="text-xl text-[#A3A3A3] max-w-3xl leading-relaxed">
          Le workflow complet pour arrêter d&apos;improviser ton discovery et commencer à le piloter.
        </p>
        <p className="mt-6">
          <a
            href="#prix"
            className="text-sm font-semibold text-[#E8FF8B] hover:opacity-90 underline underline-offset-4 decoration-[#E8FF8B]/40"
          >
            49€ — Paiement unique → Accéder au pack
          </a>
        </p>
      </section>

      <section className="px-5 sm:px-6 py-12 border-y border-white/5 bg-[#141414]">
        <div className="max-w-5xl mx-auto space-y-6 text-[#D4D4D4] leading-relaxed">
          <p>
            Tu utilises l&apos;IA depuis des mois. Mais ton discovery ressemble encore à ça : des
            notes d&apos;interviews éparpillées dans trois outils. Une synthèse rédigée à la main
            un dimanche soir. Un backlog d&apos;opportunités qui reflète surtout ce dont tu te
            souviens, pas ce que tes utilisateurs ont vraiment dit.
          </p>
          <p>
            Le problème n&apos;est pas l&apos;IA. C&apos;est que tu l&apos;utilises comme un moteur
            de recherche, pas comme un copilote de discovery.
          </p>
          <p className="text-[#F5F5F5] font-semibold">Ce pack change ça.</p>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 max-w-5xl mx-auto space-y-14">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Ce que c&apos;est</h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            Le Pack Discovery IA est un ensemble de 10 prompts structurés qui couvrent
            l&apos;intégralité d&apos;un cycle de discovery — de la première interview jusqu&apos;au
            PRD.
          </p>
          <p className="text-[#A3A3A3] leading-relaxed">
            Pas des prompts génériques. Des séquences conçues pour se nourrir les unes les autres,
            avec le contexte métier et les contraintes réelles d&apos;un PM senior.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ce qu&apos;il y a dedans</h2>
          <div className="space-y-5">
            <p>
              <strong>Script 1 — L&apos;Extracteur de Signaux</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Tu lui donnes une transcription d&apos;interview (Zoom, Gong, peu importe). Il en
                sort les besoins non-dits, les points de douleur réels et les verbatims qui
                comptent. Sans perdre une nuance.
              </span>
            </p>
            <p>
              <strong>Script 2 — Le Synthétiseur Multi-Interviews</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Tu as 10, 15, 20 interviews. Ce prompt identifie les patterns transversaux, pondère
                les signaux par fréquence et ségrège ce qui est signal de ce qui est bruit.
              </span>
            </p>
            <p>
              <strong>Script 3 — Le Challenger Stratégique</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Un prompt &quot;Red Team&quot; qui joue le rôle d&apos;un VP Product sceptique. Il
                trouve les failles dans tes hypothèses avant que tu les présentes en comité.
              </span>
            </p>
            <p>
              <strong>Script 4 — Le Mapping d&apos;Opportunités</strong>
              <br />
              <span className="text-[#A3A3A3]">
                À partir de tes insights, il structure les opportunités par impact potentiel et
                niveau de certitude. Une base solide pour prioriser sans te battre avec un tableau.
              </span>
            </p>
            <p>
              <strong>Script 5 — Le POP Builder</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Un Product One Pager décisionnel à partir de ton opportunité prioritaire : problème,
                pourquoi maintenant, KPI, risques, scope V1 / hors scope, décision attendue en
                comité — prêt à partager.
              </span>
            </p>
            <p>
              <strong>Script 6 — Le Prioritiseur RICE assisté</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Compare 3 à 6 options avec RICE explicite (Reach, Impact, Confidence, Effort),
                tableau de scores, biais et décision recommandée avec revue à J+30.
              </span>
            </p>
            <p>
              <strong>Script 7 — Le Trade-off B2B</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Arbitre demandes enterprise vs vision produit : strategic fit, complexité, refus /
                négociation / acceptation, script de réponse client.
              </span>
            </p>
            <p>
              <strong>Script 8 — Le PRD Architect</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Draft PRD v1 (contexte, problem statement, user stories, critères d&apos;acceptation,
                NFR, rollout, risques) pensé pour Notion, Google Docs ou Confluence.
              </span>
            </p>
            <p>
              <strong>Script 9 — Le Stakeholder Alignment</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Mémo d&apos;alignement une page : objections par fonction, concessions possibles,
                lignes rouges, décision attendue et date.
              </span>
            </p>
            <p>
              <strong>Script 10 — Le Suivi 30 jours</strong>
              <br />
              <span className="text-[#A3A3A3]">
                Revue post-lancement : scorecard KPI, causes racines, actions correctives, décision
                scale / itérer / stop — boucle d&apos;apprentissage fermée.
              </span>
            </p>
            <p className="text-[#A3A3A3]">
              Chaque prompt inclut : garde-fous (pas de données inventées), format de sortie Markdown
              pour copier-coller, variables listées, et indications de chaînage avec le prompt
              suivant.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Pourquoi ça marche</h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            L&apos;IA est médiocre en one-shot. Un prompt isolé sans contexte donne un résultat
            générique.
          </p>
          <p className="text-[#A3A3A3] leading-relaxed">
            Ces scripts sont des séquences : chaque prompt utilise la sortie du précédent. Tu
            construis un contexte cumulatif que l&apos;IA utilise pour produire des résultats de
            plus en plus précis.
          </p>
          <p className="text-[#F5F5F5]">
            Le résultat final ressemble à ton discovery, pas à un template ChatGPT.
          </p>
        </div>

        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold">Le gain concret</h2>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-[#141414] text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tâche</th>
                  <th className="px-4 py-3 font-semibold">Avant</th>
                  <th className="px-4 py-3 font-semibold">Avec le pack</th>
                  <th className="px-4 py-3 font-semibold">Gain</th>
                </tr>
              </thead>
              <tbody className="text-[#D4D4D4]">
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">Synthèse de 5 interviews</td>
                  <td className="px-4 py-3">~4h</td>
                  <td className="px-4 py-3">15 min</td>
                  <td className="px-4 py-3 text-[#E8FF8B]">-93%</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">Mapping des opportunités</td>
                  <td className="px-4 py-3">~3h</td>
                  <td className="px-4 py-3">20 min</td>
                  <td className="px-4 py-3 text-[#E8FF8B]">-88%</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">Rédaction V1 PRD</td>
                  <td className="px-4 py-3">~2h</td>
                  <td className="px-4 py-3">5 min</td>
                  <td className="px-4 py-3 text-[#E8FF8B]">-95%</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">Total par cycle</td>
                  <td className="px-4 py-3">~9h</td>
                  <td className="px-4 py-3">~40 min</td>
                  <td className="px-4 py-3 text-[#E8FF8B]">8h libérées</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#A3A3A3] leading-relaxed">
            Un PM senior coûte entre 400€ et 800€ par jour. Ce pack coûte 49€, soit moins
            d&apos;une heure de ton temps. Si tu fais un cycle de discovery par mois, il est
            rentabilisé dès la première utilisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-white/10 bg-[#141414]">
            <h3 className="text-xl font-semibold mb-4">Pour qui</h3>
            <ul className="space-y-2 text-[#A3A3A3] text-sm leading-relaxed">
              <li>- Tu es PM IC ou Lead PM avec au moins 2 ans d&apos;expérience</li>
              <li>- Tu fais du discovery régulièrement (au moins un cycle par mois)</li>
              <li>
                - Tu utilises déjà Claude, ChatGPT ou un autre LLM mais tu improvises les prompts
              </li>
              <li>- Tu veux un système, pas une liste de tips</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border border-white/10 bg-[#141414]">
            <h3 className="text-xl font-semibold mb-4">Ce pack n&apos;est pas pour toi si</h3>
            <ul className="space-y-2 text-[#A3A3A3] text-sm leading-relaxed">
              <li>- Tu découvres le product management</li>
              <li>
                - Tu cherches une formation sur le discovery (ce pack assume que tu sais déjà faire
                du discovery)
              </li>
              <li>
                - Tu veux que l&apos;IA remplace ton jugement (elle ne le remplace pas, elle le
                décharge)
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Ce que ce pack n&apos;est pas</h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            Pas une formation. Pas un ebook avec des théories sur l&apos;IA et le PM. Pas du
            contenu générique recyclé depuis des threads LinkedIn.
          </p>
          <p className="text-[#F5F5F5] leading-relaxed">
            C&apos;est le workflow que j&apos;utilise personnellement sur des cycles de discovery
            réels. Documenté, structuré, prêt à l&apos;emploi.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Format</h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            PDF. 10 prompts. Prêts à copier-coller dans Claude ou ChatGPT. Chaque prompt :
            contexte d&apos;usage, variables, format de sortie Markdown, garde-fous et chaînage
            entre étapes.
          </p>
          <p className="text-[#A3A3A3]">Accès immédiat après paiement. Pas d&apos;abonnement, pas de renouvellement.</p>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 md:py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Qui a créé ce pack ?</h2>
            <p className="text-[#A3A3A3] leading-relaxed">
              Je suis Julien Brionne, Product Leader hands-on. Depuis 10 ans, je pilote le produit
              dans des boîtes comme Heetch, Waalaxy ou Yubo.
            </p>
            <p className="text-[#A3A3A3] leading-relaxed">
              J&apos;utilise l&apos;IA quotidiennement pour stabiliser le discovery, fiabiliser les
              décisions et gagner du temps pour ce qui compte vraiment.
            </p>
            <p className="text-sm text-[#E8FF8B] font-semibold">
              450+ PMs lisent déjà mes workflows IA.
            </p>
          </div>
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-[#1F1F1F]">
              <p className="text-sm md:text-base font-semibold italic leading-relaxed">
                &quot;Le secret, c&apos;est que l&apos;IA ne sait pas faire du produit. Elle sait
                seulement structurer ta pensée si tu lui donnes le bon système.&quot;
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-[#A3A3A3]">
              <div className="p-4 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F]">
                <p className="text-2xl font-bold text-[#E8FF8B]">450+</p>
                <p className="mt-1 text-xs uppercase tracking-widest">PMs abonnés</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F]">
                <p className="text-2xl font-bold text-[#E8FF8B]">8h</p>
                <p className="mt-1 text-xs uppercase tracking-widest">
                  Gagnées / cycle de discovery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="prix"
        className="px-5 sm:px-6 py-16 bg-[#141414] border-y border-white/5 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-[#E8FF8B] font-semibold text-sm uppercase tracking-widest mb-2">
              Prix
            </p>
            <p className="text-4xl font-bold">49€</p>
            <p className="text-[#A3A3A3] mt-2">Paiement unique.</p>
          </div>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#E8FF8B] text-[#0F0F0F] font-bold rounded-md hover:opacity-90 transition-opacity"
          >
            Accéder au Pack Discovery IA
          </a>
        </div>
      </section>

      <section className="px-5 sm:px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details key={item.q} className="p-5 rounded-lg border border-white/10 bg-[#141414]">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-3 text-[#A3A3A3] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
