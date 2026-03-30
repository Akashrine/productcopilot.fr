import type { Metadata } from "next";
import FormulaireLoops from "../components/FormulaireLoops";
import PackSystemeForm from "./pack-systeme-discovery/PackSystemeForm";

export const metadata: Metadata = {
  title: "Product Copilot — 10 prompts IA pour ton discovery produit",
  description:
    "10 prompts structurés en séquence, de l'interview brute au PRD. Gratuit, contre ton email.",
  keywords: [
    "ia product management",
    "workflow IA PM",
    "prompts discovery",
    "product discovery",
    "PRD IA",
  ],
  alternates: {
    canonical: "https://productcopilot.fr",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Product Copilot — 10 prompts IA pour ton discovery produit",
    description:
      "10 prompts structurés en séquence, de l'interview brute au PRD. Gratuit, contre ton email.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Copilot — 10 prompts IA pour ton discovery produit",
    description:
      "10 prompts structurés en séquence, de l'interview brute au PRD. Gratuit, contre ton email.",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      {/* 1. HERO */}
      <section className="relative px-5 sm:px-6 pt-20 pb-16 md:pt-32 md:pb-20 max-w-6xl mx-auto">
        <header className="absolute top-6 sm:top-8 left-5 sm:left-6">
          <span className="text-sm font-bold tracking-tight uppercase border-b border-[#E8FF8B]">
            Product Copilot
          </span>
        </header>

        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 bg-[#E8FF8B]/10 text-[#E8FF8B] rounded text-[10px] font-bold uppercase tracking-widest mb-6">
            10 prompts IA &bull; accès gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 tracking-tighter">
            Tu fais du discovery comme en 2019.
            <br />
            <span className="text-[#A3A3A3]">L&apos;IA ne changera rien à ça.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A3A3A3] mb-10 md:mb-12 max-w-2xl leading-relaxed">
            Le problème n&apos;est pas l&apos;outil. C&apos;est que tu l&apos;utilises sans système.
            10 prompts structurés en séquence, de l&apos;interview brute au PRD.
            Chaque sortie alimente la suivante. Gratuit, contre ton email.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="/pack-discovery"
              className="inline-block px-8 py-4 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
            >
              Accéder aux 3 prompts gratuits
            </a>
            <p className="text-xs text-[#A3A3A3]">
              3 prompts visibles immédiatement. Les 7 suivants après inscription.
            </p>
          </div>
        </div>
      </section>

      {/* 2. LE PROBLÈME */}
      <section className="px-5 sm:px-6 py-16 md:py-24 border-y border-white/5 bg-[#141414]">
        <div className="max-w-3xl mx-auto space-y-6 text-[#A3A3A3] leading-relaxed text-base md:text-lg">
          <p>
            Tu as ChatGPT ouvert à côté de tes notes d&apos;interview. Tu lui demandes
            &laquo;&nbsp;résume cet entretien&nbsp;&raquo;. Il te sort un pavé lisse, sans aspérité,
            sans signal. Tu le lis en diagonale et tu retournes faire ta synthèse à la main.
          </p>
          <p>
            Même chose pour le mapping d&apos;opportunités. Pour le PRD. Pour l&apos;alignement.
            À chaque étape, tu repars de zéro. L&apos;IA oublie tout ce que tu lui as donné avant.
          </p>
          <p className="text-[#F5F5F5] font-semibold">
            Le résultat : 9h par cycle de discovery. Pas parce que le travail est compliqué. Parce
            que ton outil n&apos;a aucune mémoire de ce que tu construis.
          </p>
        </div>
      </section>

      {/* 3. CE QUE LES PROMPTS CHANGENT */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Un système, pas une collection de prompts
          </h2>
          <p className="text-[#A3A3A3] max-w-3xl text-lg leading-relaxed">
            Ces 10 prompts fonctionnent en chaîne. La sortie du premier est l&apos;entrée du
            deuxième. Le contexte s&apos;accumule. À la fin, l&apos;IA connaît tes utilisateurs, tes
            hypothèses, tes arbitrages. Elle ne te donne pas un résultat générique. Elle te donne
            ton résultat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <span className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest">
              Phase 1 — Extraction
            </span>
            <div className="mt-3 space-y-2">
              <p className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  01
                </span>
                L&apos;Extracteur de Signaux
              </p>
              <p className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  02
                </span>
                Le Synthétiseur Multi-Interviews
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <span className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest">
              Phase 2 — Analyse et Décision
            </span>
            <div className="mt-3 space-y-2">
              <p className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  03
                </span>
                Le Challenger Stratégique
              </p>
              <p className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  04
                </span>
                Le Mapping d&apos;Opportunités
              </p>
              <p className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  05
                </span>
                Le Décideur
              </p>
              <p className="flex items-center gap-2 text-sm text-[#A3A3A3]">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  06
                </span>
                L&apos;Arbitre de Trade-offs
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <span className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest">
              Phase 3 — Exécution et Pilotage
            </span>
            <div className="mt-3 space-y-2 text-sm text-[#A3A3A3]">
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  07
                </span>
                Le POP Builder
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  08
                </span>
                Le PRD Architect
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  09
                </span>
                Le Mémo d&apos;Alignement
              </p>
              <p className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[10px] font-bold text-[#A3A3A3]">
                  10
                </span>
                La Revue 30 Jours
              </p>
            </div>
          </div>
        </div>

        <p className="text-[#A3A3A3] text-sm leading-relaxed mb-10 max-w-3xl">
          Chaque prompt inclut les variables à remplir, un format de sortie Markdown, et les
          instructions de chaînage avec le suivant. Optimisés pour Claude (Sonnet/Opus), compatibles
          GPT-4o.
        </p>

        <div>
          <a
            href="/pack-discovery"
            className="inline-block px-8 py-4 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity"
          >
            Voir les prompts
          </a>
        </div>
      </section>

      {/* 4. LE GAIN */}
      <section className="px-5 sm:px-6 py-16 md:py-24 border-y border-white/5 bg-[#141414]">
        <div className="max-w-3xl mx-auto space-y-6 text-[#A3A3A3] leading-relaxed text-base md:text-lg">
          <p>
            Un cycle de discovery complet — 5 interviews, synthèse croisée, mapping, arbitrage,
            PRD v1 — prend environ 9 heures de travail cumulé.
          </p>
          <p>
            Avec ces prompts chaînés, tu passes à 40 minutes. Pas parce que l&apos;IA fait le
            travail à ta place. Parce qu&apos;elle arrête de perdre le contexte entre chaque étape.
          </p>
          <p className="text-[#F5F5F5] font-semibold">
            Tu gardes le jugement. L&apos;IA gère la structure.
          </p>
        </div>
      </section>

      {/* 5. QUI */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Qui est derrière</h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            Julien Brionne. Product Leader depuis 2012. Heetch, Waalaxy, Back Market.
          </p>
          <p className="text-[#A3A3A3] leading-relaxed">
            J&apos;interviens dans des organisations produit qui ont grandi plus vite que leur
            capacité à décider. Mon outil principal : forcer la clarté. Nommer ce que personne
            n&apos;ose dire. Fermer les décisions ouvertes.
          </p>
          <p className="text-[#A3A3A3] leading-relaxed">
            Ces prompts embarquent la même logique. La méthodologie FRAME (Focus, Risques,
            Alignement, Mesure, Expérimentation) est intégrée dans la chaîne. L&apos;IA ne sait pas
            faire du produit. Elle sait structurer ta pensée si tu lui donnes le bon système.
          </p>
          <p className="text-sm text-[#E8FF8B] font-semibold">
            450+ PMs lisent les workflows IA de Product Copilot.
          </p>
        </div>
      </section>

      {/* 5b. OUTILS IA */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="space-y-4 mb-8">
          <div className="inline-block px-3 py-1 bg-[#E8FF8B]/10 text-[#E8FF8B] rounded text-[10px] font-bold uppercase tracking-widest">
            Nouveau
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Outils IA pour Product Managers
          </h2>
          <p className="text-[#A3A3A3] max-w-2xl text-lg leading-relaxed">
            Des outils spécialisés qui produisent des sorties structurées. Pas du texte brut. Du contenu prêt pour ton backlog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/tools/user-stories"
            className="group p-6 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#E8FF8B]/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E8FF8B]/10 text-[#E8FF8B] rounded">
                Live
              </span>
              <h3 className="font-bold group-hover:text-[#E8FF8B] transition-colors">
                Générateur de User Stories
              </h3>
            </div>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              Transforme une description de feature en user stories structurées avec critères d&apos;acceptation et estimation T-shirt.
            </p>
            <span className="inline-block mt-4 text-xs font-bold text-[#E8FF8B] opacity-0 group-hover:opacity-100 transition-opacity">
              Essayer gratuitement →
            </span>
          </a>

          <div className="p-6 rounded-xl bg-[#141414] border border-[#1F1F1F] opacity-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#333] text-[#A3A3A3] rounded">
                Bientôt
              </span>
              <h3 className="font-bold text-[#A3A3A3]">
                Générateur de Critères d&apos;Acceptation
              </h3>
            </div>
            <p className="text-sm text-[#555] leading-relaxed">
              Transforme une user story brute en critères Given/When/Then testables.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TEASER PACK SYSTÈME */}
      <section className="px-5 sm:px-6 py-16 md:py-24 bg-[#141414] border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Bientôt : le Pack Système Discovery
          </h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            Les prompts, c&apos;est le point de départ. Le Pack Système ajoute ce qui manque pour
            que ton discovery tourne sans toi : templates Notion pré-remplis, guide de workflow
            pas-à-pas, exemples annotés sur un cas réel complet.
          </p>
          <p className="text-[#A3A3A3] leading-relaxed">
            Les prompts te donnent les briques. Le Pack Système te donne le plan de construction.
          </p>
          <div className="pt-2">
            <PackSystemeForm />
            <p className="mt-3 text-xs text-[#A3A3A3]">
              49&euro;. Paiement unique. Disponible courant avril.
            </p>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Une newsletter pour PMs qui construisent
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-lg leading-relaxed">
            Un workflow IA concret par semaine. Le raisonnement derrière, pas la recette.
          </p>
          <FormulaireLoops centered source="landing-page" />
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="px-5 sm:px-6 py-14 md:py-16 text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
          <div className="max-w-xs space-y-4">
            <span className="text-lg font-bold tracking-tighter">Product Copilot</span>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Des systèmes IA pour les PMs qui construisent.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="space-y-4">
              <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Connect</h6>
              <a
                href="https://linkedin.com/in/julienbrionne"
                className="block text-sm hover:text-[#E8FF8B] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="/pack-systeme-discovery"
                className="block text-sm hover:text-[#E8FF8B] transition-colors"
              >
                Pack Système Discovery
              </a>
            </div>
            <div className="space-y-4">
              <h6 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Legal</h6>
              <a
                href="/mentions-legales"
                className="block text-sm opacity-40 hover:opacity-100 transition-all"
              >
                Mentions légales
              </a>
              <p className="text-[10px] opacity-20">© {new Date().getFullYear()} Product Copilot</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
