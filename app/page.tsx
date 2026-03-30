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
            Arrête de perdre 9h en discovery produit.
            <br />
            <span className="text-[#A3A3A3]">
              Passe à un système IA qui transforme tes interviews en PRD en 40 minutes.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A3A3A3] mb-10 md:mb-12 max-w-2xl leading-relaxed">
            10 prompts IA chaînés qui conservent le contexte, structurent ta réflexion et produisent des livrables
            exploitables — sans repartir de zéro à chaque étape.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="/pack-discovery"
              className="inline-block px-8 py-4 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
            >
              👉 Accéder aux 3 prompts gratuits
            </a>
            <a
              href="/pack-discovery"
              className="inline-block px-8 py-4 rounded-md border border-[#E8FF8B]/40 text-[#E8FF8B] font-bold hover:opacity-90 transition-opacity w-full sm:w-auto text-center"
            >
              🚀 Tester le système de discovery
            </a>
            <p className="text-xs text-[#A3A3A3] text-center">
              📩 Recevoir les 7 prompts avancés
              <a
                href="/pack-discovery"
                className="text-[#E8FF8B] underline underline-offset-2 hover:opacity-90 transition-opacity ml-1"
              >
                après inscription
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 2b. SOCIAL PROOF */}
      <section className="px-5 sm:px-6 py-10 md:py-14 border-y border-white/5 bg-[#141414]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#0F0F0F] border border-white/5">
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                “On est passés de 1 journée de discovery à moins d&apos;1 heure. Surtout, on a enfin des décisions claires.”
              </p>
              <p className="mt-3 text-xs text-[#E8FF8B] font-bold">— Head of Product, scale-up SaaS</p>
            </div>
            <div className="p-5 rounded-xl bg-[#0F0F0F] border border-white/5">
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                “Ce n&apos;est pas des prompts. C&apos;est un système de pensée.”
              </p>
              <p className="mt-3 text-xs text-[#E8FF8B] font-bold">— Product Manager, fintech</p>
            </div>
            <div className="p-5 rounded-xl bg-[#0F0F0F] border border-white/5">
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                “La première fois que l&apos;IA me donne un vrai output produit exploitable.”
              </p>
              <p className="mt-3 text-xs text-[#E8FF8B] font-bold">— Lead PM, marketplace</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LE PROBLÈME */}
      <section className="px-5 sm:px-6 py-16 md:py-24 border-y border-white/5 bg-[#141414]">
        <div className="max-w-3xl mx-auto space-y-6 text-[#A3A3A3] leading-relaxed text-base md:text-lg">
          <p className="text-[#F5F5F5] font-semibold">
            Tu n&apos;as pas un problème d&apos;outil. Tu as un problème de système.
          </p>
          <p>
            Aujourd&apos;hui, tu fais encore ça :
          </p>
          <ul className="space-y-2">
            <li>Tu copies-colles une interview dans ChatGPT</li>
            <li>Tu demandes un résumé</li>
            <li>Tu récupères un texte générique</li>
            <li>Et tu recommences à zéro à l&apos;étape suivante</li>
          </ul>
          <p className="text-[#F5F5F5] font-semibold">
            Résultat : l&apos;IA oublie tout. Et toi, tu perds des heures.
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
            <h3 className="text-lg font-bold tracking-tight">Garde le contexte (enfin)</h3>
            <p className="mt-2 text-sm text-[#A3A3A3] leading-relaxed">
              Chaque prompt alimente le suivant. L&apos;IA ne repart plus de zéro.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <h3 className="text-lg font-bold tracking-tight">Structure ton thinking produit</h3>
            <p className="mt-2 text-sm text-[#A3A3A3] leading-relaxed">
              De l&apos;interview brute à la décision stratégique, sans perte de signal.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <h3 className="text-lg font-bold tracking-tight">Produit des livrables directement utilisables</h3>
            <p className="mt-2 text-sm text-[#A3A3A3] leading-relaxed">
              PRD, mapping, arbitrages : prêts pour ton équipe.
            </p>
          </div>
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

        <div className="mb-10 max-w-3xl">
          <h3 className="text-2xl font-bold tracking-tight mb-4">Features</h3>
          <ul className="space-y-3 text-[#A3A3A3] leading-relaxed">
            <li>
              <span className="text-[#E8FF8B] font-bold">🔍</span> Extraction intelligente de signaux utilisateurs
            </li>
            <li>
              <span className="text-[#E8FF8B] font-bold">🔗</span> Synthèse multi-interviews automatisée
            </li>
            <li>
              <span className="text-[#E8FF8B] font-bold">🧭</span> Mapping d&apos;opportunités produit
            </li>
            <li>
              <span className="text-[#E8FF8B] font-bold">⚖️</span> Arbitrage stratégique assisté
            </li>
            <li>
              <span className="text-[#E8FF8B] font-bold">📝</span> Génération de PRD structuré
            </li>
            <li>
              <span className="text-[#E8FF8B] font-bold">🔁</span> Boucle de review continue (30 jours)
            </li>
          </ul>
        </div>

        <div>
          <a
            href="/pack-discovery"
            className="inline-block px-8 py-4 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity"
          >
            Voir comment fonctionne le système complet
          </a>
        </div>
      </section>

      {/* 4. LE GAIN */}
      <section className="px-5 sm:px-6 py-16 md:py-24 border-y border-white/5 bg-[#141414]">
        <div className="max-w-3xl mx-auto space-y-6 text-[#A3A3A3] leading-relaxed text-base md:text-lg">
          <p className="text-[#F5F5F5] font-semibold">
            Les décisions deviennent plus rapides, plus claires, et plus actionnables.
          </p>
          <ul className="space-y-3">
            <li>
              ⏱️ Temps de discovery réduit de{" "}
              <span className="text-[#F5F5F5] font-semibold">9h → 40 min</span>
            </li>
            <li>
              📊 <span className="text-[#F5F5F5] font-semibold">+80%</span> de clarté dans les décisions produit
            </li>
            <li>🤝 Alignement équipe accéléré (moins de débats inutiles)</li>
            <li>📉 Moins de rework sur les PRD</li>
            <li>🚀 Time-to-build réduit</li>
          </ul>
        </div>
      </section>

      {/* 5. QUI */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Qui est derrière</h2>
          <p className="text-[#A3A3A3] leading-relaxed">
            Julien Brionne
            <br />
            Product Leader depuis 2012 (Heetch, Waalaxy, Back Market)
          </p>
          <p className="text-[#A3A3A3] leading-relaxed">
            Sa spécialité :
          </p>
          <ul className="space-y-2 text-[#A3A3A3]">
            <li>→ Clarifier</li>
            <li>→ Forcer les décisions</li>
            <li>→ Éliminer le flou produit</li>
          </ul>
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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Offre</h2>
          <div className="space-y-3">
            <p className="text-[#A3A3A3] leading-relaxed">🎁 3 prompts gratuits immédiatement</p>
            <p className="text-[#A3A3A3] leading-relaxed">🔒 7 prompts avancés après inscription</p>
          </div>

          <div className="pt-2">
            <a
              href="/pack-discovery"
              className="inline-block px-8 py-4 rounded-md bg-[#E8FF8B] text-[#0F0F0F] font-bold hover:opacity-90 transition-opacity"
            >
              Accéder maintenant
            </a>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">Upsell — Pack Système Discovery</h3>
            <p className="text-[#A3A3A3] leading-relaxed mt-3">
              Les prompts te donnent les briques. Le Pack te donne le système complet : templates, workflow, cas réel annoté.
            </p>
            <ul className="mt-4 space-y-2 text-[#A3A3A3]">
              <li>• Templates Notion pré-remplis</li>
              <li>• Workflow étape par étape</li>
              <li>• Cas réel annoté</li>
            </ul>

            <div className="pt-4">
              <PackSystemeForm />
              <p className="mt-3 text-xs text-[#A3A3A3]">
                💰 49&euro; — paiement unique. Disponible courant avril.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER */}
      <section className="px-5 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ressources / Inspirations</h2>
          <p className="text-[#A3A3A3] mb-6 text-lg leading-relaxed">
            Des tendances produit qui changent la façon dont on structure la discovery (et comment les appliquer).
          </p>
          <ul className="flex flex-col items-center gap-2 text-sm text-[#A3A3A3] mb-8">
            <li>• Montée des “AI workflows” vs prompts isolés</li>
            <li>• Usage croissant de PRD générés par IA</li>
            <li>• Structuration type Notion + AI copilots</li>
          </ul>
          <FormulaireLoops centered source="landing-page" />
        </div>
      </section>

      {/* SEO keywords (contenu invisible) */}
      <div className="sr-only">
        discovery produit IA, prompts ChatGPT product management, workflow product manager, outils IA PM, automatisation discovery produit,
        générateur PRD IA, user research AI tools, product discovery AI, AI workflow, PRD généré par IA
      </div>

      {/* Note volontairement supprimée: CTA externe (humanhacks.club) */}

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
              <p className="text-[10px] opacity-20">© {new Date().getFullYear()} Product Copilot</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
