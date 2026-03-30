import type { Metadata } from "next";
import Link from "next/link";
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
  alternates: { canonical: "https://productcopilot.fr" },
  robots: { index: true, follow: true },
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

/* ─── Tiny reusable pieces ─── */

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#E8FF8B] shrink-0" aria-hidden="true">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const phases = [
  {
    label: "Extraction",
    prompts: ["L'Extracteur de Signaux", "Le Synthétiseur Multi-Interviews"],
  },
  {
    label: "Analyse & Décision",
    prompts: [
      "Le Challenger Stratégique",
      "Le Mapping d'Opportunités",
      "Le Décideur",
      "L'Arbitre de Trade-offs",
    ],
  },
  {
    label: "Exécution & Pilotage",
    prompts: [
      "Le POP Builder",
      "Le PRD Architect",
      "Le Mémo d'Alignement",
      "La Revue 30 Jours",
    ],
  },
];

const gains = [
  { value: "40 min", sub: "au lieu de 9 h", desc: "Temps de discovery" },
  { value: "+80 %", sub: "de clarté", desc: "Dans les décisions produit" },
  { value: "0", sub: "rework", desc: "PRD structuré dès la v1" },
];

/* ─── Page ─── */

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14">
          <Link href="/" className="text-sm font-bold tracking-tight">
            Product Copilot
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[#A3A3A3]">
            <Link href="/pack-discovery" className="hover:text-[#F5F5F5] transition-colors">Prompts</Link>
            <Link href="/tools/user-stories" className="hover:text-[#F5F5F5] transition-colors">Outils</Link>
            <Link href="/pack-systeme-discovery" className="hover:text-[#F5F5F5] transition-colors">Pack Système</Link>
          </div>
          <Link
            href="/pack-discovery"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#E8FF8B] text-[#0F0F0F] hover:opacity-90 transition-opacity"
          >
            Accéder aux prompts
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 overflow-hidden">
        {/* Glow orb */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(232,255,139,0.06)_0%,_transparent_70%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8FF8B]/20 bg-[#E8FF8B]/5 text-[#E8FF8B] text-xs font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF8B] animate-pulse" />
            10 prompts IA &middot; accès gratuit
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] tracking-tighter mb-6">
            Arrête de perdre 9 h<br className="hidden sm:block" /> en discovery produit.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gradient-hero max-w-2xl mx-auto leading-snug mb-10">
            Passe à un système IA qui transforme tes interviews en PRD en 40 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              href="/pack-discovery"
              className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-base"
            >
              Accéder aux 10 prompts
              <ArrowRight />
            </Link>
            <Link
              href="#systeme"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold text-base hover:border-white/20 hover:text-[#F5F5F5] transition-all"
            >
              Voir le système
            </Link>
          </div>
          <p className="text-xs text-[#666666]">
            3 prompts accessibles immédiatement, 7 après inscription (gratuit).
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { quote: "On est passés de 1 journée de discovery à moins d'1 heure. Surtout, on a enfin des décisions claires.", author: "Head of Product", co: "scale-up SaaS" },
            { quote: "Ce n'est pas des prompts. C'est un système de pensée.", author: "Product Manager", co: "fintech" },
            { quote: "La première fois que l'IA me donne un vrai output produit exploitable.", author: "Lead PM", co: "marketplace" },
          ].map((t, i) => (
            <div key={i} className="card-glass p-6 relative">
              <span className="absolute top-4 left-5 text-3xl text-white/[0.04] font-serif leading-none select-none">&ldquo;</span>
              <p className="text-sm text-[#A3A3A3] leading-relaxed mb-4 pt-4">
                {t.quote}
              </p>
              <p className="text-xs font-semibold text-[#E8FF8B]">{t.author}</p>
              <p className="text-xs text-[#666666]">{t.co}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── PROBLEM ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Tu n&apos;as pas un problème d&apos;outil.<br />
            <span className="text-[#A3A3A3]">Tu as un problème de système.</span>
          </h2>
          <div className="space-y-3 text-[#A3A3A3] leading-relaxed mb-8">
            {[
              "Tu copies-colles une interview dans ChatGPT",
              "Tu demandes un résumé",
              "Tu récupères un texte générique",
              "Et tu recommences à zéro à l'étape suivante",
            ].map((item, i) => (
              <p key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0" />
                {item}
              </p>
            ))}
          </div>
          <div className="pl-4 border-l-2 border-[#E8FF8B]/40">
            <p className="text-[#F5F5F5] font-semibold">
              Résultat : l&apos;IA oublie tout. Et toi, tu perds des heures.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── SYSTEM ── */}
      <section id="systeme" className="px-5 sm:px-6 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Un système, pas une collection de prompts
            </h2>
            <p className="text-[#A3A3A3] max-w-2xl mx-auto text-lg leading-relaxed">
              Ces 10 prompts fonctionnent en chaîne. La sortie du premier est l&apos;entrée du
              deuxième. Le contexte s&apos;accumule jusqu&apos;au livrable final.
            </p>
          </div>

          {/* Phase timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {phases.map((phase, pi) => (
              <div key={pi} className="card-glass p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full border border-[#E8FF8B]/40 flex items-center justify-center text-[10px] font-bold text-[#E8FF8B]">
                    {pi + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/80">
                    {phase.label}
                  </span>
                </div>
                <div className="space-y-2">
                  {phase.prompts.map((p, j) => (
                    <p key={j} className="flex items-center gap-2.5 text-sm text-[#A3A3A3]">
                      <span className="w-5 h-5 rounded-md bg-[#0F0F0F] border border-[#1F1F1F] flex items-center justify-center text-[9px] font-bold text-[#666666]">
                        {String(
                          pi === 0 ? j + 1 : pi === 1 ? j + 3 : j + 7,
                        ).padStart(2, "0")}
                      </span>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { title: "Garde le contexte", desc: "Chaque prompt alimente le suivant. L'IA ne repart plus de zéro." },
              { title: "Structure ton thinking", desc: "De l'interview brute à la décision stratégique, sans perte de signal." },
              { title: "Livrables exploitables", desc: "PRD, mapping, arbitrages : prêts pour ton équipe." },
            ].map((v, i) => (
              <div key={i} className="card-glass p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckIcon />
                  <h3 className="font-semibold text-sm">{v.title}</h3>
                </div>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/pack-discovery"
              className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold"
            >
              Explorer les 10 prompts
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── GAINS ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {gains.map((g, i) => (
            <div key={i} className="card-glass p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-gradient-lime mb-1">{g.value}</p>
              <p className="text-xs font-semibold text-[#A3A3A3] mb-3">{g.sub}</p>
              <p className="text-sm text-[#666666]">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── WHO ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <div className="w-14 h-14 rounded-full border border-[#E8FF8B]/30 flex items-center justify-center text-[#E8FF8B] font-bold text-lg shrink-0">
            JB
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-2">Julien Brionne</h2>
            <p className="text-[#A3A3A3] leading-relaxed mb-4">
              Product Leader depuis 2012. Sa spécialité : clarifier, forcer les décisions, éliminer le flou produit.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Heetch", "Waalaxy", "Back Market"].map((co) => (
                <span
                  key={co}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-[#A3A3A3] border border-white/5"
                >
                  {co}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── TOOLS ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
              Outils <span className="text-gradient-lime">gratuits</span>
            </h2>
            <p className="text-[#A3A3A3] text-lg">
              Des outils spécialisés qui produisent du contenu prêt pour ton backlog.
            </p>
          </div>

          <Link
            href="/tools/user-stories"
            className="group card-glass p-6 flex items-center justify-between max-w-lg hover:border-[#E8FF8B]/20"
          >
            <div>
              <h3 className="font-semibold mb-1 group-hover:text-[#E8FF8B] transition-colors">
                Générateur de User Stories
              </h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Feature en entrée, user stories structurées en sortie.
              </p>
            </div>
            <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── OFFER ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="card-glass p-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8FF8B]/10 text-[#E8FF8B] mb-4">
              Gratuit
            </span>
            <h3 className="text-xl font-bold mb-4">Pack Discovery</h3>
            <ul className="space-y-3 text-sm text-[#A3A3A3] mb-6">
              <li className="flex items-start gap-2"><CheckIcon />3 prompts accessibles immédiatement</li>
              <li className="flex items-start gap-2"><CheckIcon />7 prompts après inscription (email)</li>
              <li className="flex items-start gap-2"><CheckIcon />Système chaîné complet, de l&apos;interview au PRD</li>
            </ul>
            <Link
              href="/pack-discovery"
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
            >
              Accéder maintenant
              <ArrowRight />
            </Link>
          </div>

          {/* Pack Système */}
          <div className="relative card-glass p-8 border-[#E8FF8B]/20">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8FF8B]/10 text-[#E8FF8B] mb-4">
              Bientôt disponible
            </span>
            <h3 className="text-xl font-bold mb-2">Pack Système Discovery</h3>
            <p className="text-sm text-[#A3A3A3] mb-4">
              Les prompts + le système complet pour les appliquer.
            </p>
            <ul className="space-y-3 text-sm text-[#A3A3A3] mb-6">
              <li className="flex items-start gap-2"><CheckIcon />Templates Notion pré-remplis</li>
              <li className="flex items-start gap-2"><CheckIcon />Workflow étape par étape</li>
              <li className="flex items-start gap-2"><CheckIcon />Cas réel annoté (transcript → PRD)</li>
            </ul>
            <PackSystemeForm />
            <p className="mt-3 text-xs text-[#666666]">
              49&nbsp;&euro; — paiement unique. Disponible courant avril.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── NEWSLETTER ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Ressources & Inspirations</h2>
          <p className="text-[#A3A3A3] mb-8 text-sm leading-relaxed">
            Tendances produit, workflows IA, et retours terrain. Une fois par semaine.
          </p>
          <FormulaireLoops centered source="landing-page" />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-5 sm:px-6 py-12 md:py-14">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
          <div className="max-w-xs space-y-2">
            <span className="text-base font-bold tracking-tight text-gradient-lime">Product Copilot</span>
            <p className="text-xs text-[#666666] leading-relaxed">
              Des systèmes IA pour les PMs qui construisent.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Produit</h6>
              <Link href="/pack-discovery" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Pack Discovery</Link>
              <Link href="/pack-systeme-discovery" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Pack Système</Link>
              <Link href="/tools/user-stories" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">User Stories</Link>
            </div>
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Liens</h6>
              <a href="https://linkedin.com/in/julienbrionne" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">LinkedIn</a>
              <Link href="/mentions-legales" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Mentions légales</Link>
            </div>
          </div>
          <p className="text-[10px] text-[#666666]/40 md:self-end">
            &copy; {new Date().getFullYear()} Product Copilot
          </p>
        </div>
      </footer>

      {/* SEO keywords */}
      <div className="sr-only">
        discovery produit IA, prompts ChatGPT product management, workflow product manager, outils IA PM,
        automatisation discovery produit, générateur PRD IA, user research AI tools, product discovery AI
      </div>
    </main>
  );
}
