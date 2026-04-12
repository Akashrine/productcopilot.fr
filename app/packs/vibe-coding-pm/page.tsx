import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "../../../components/NavMain";

const LEMON_URL =
  "https://productcopilot.lemonsqueezy.com/checkout/buy/81d43207-7c71-422f-904c-54daf2cc439b";

export const metadata: Metadata = {
  title: "Pack Vibe Coding for PMs — De l'idée au produit qui tourne — Product Copilot",
  description:
    "12 prompts pour passer de l'idée au produit. PRD, design Stitch, code Claude Code, audit. 29 EUR, paiement unique.",
  alternates: { canonical: "https://productcopilot.fr/packs/vibe-coding-pm" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pack Vibe Coding for PMs — De l'idée au produit qui tourne",
    description:
      "12 prompts pour passer de l'idée au produit. PRD, design Stitch, code Claude Code, audit. 29 EUR, paiement unique.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/packs/vibe-coding-pm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack Vibe Coding for PMs — De l'idée au produit qui tourne",
    description:
      "12 prompts pour passer de l'idée au produit. PRD, design Stitch, code Claude Code, audit. 29 EUR, paiement unique.",
  },
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4 text-[#E8FF8B] shrink-0"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4 text-[#666666] shrink-0"
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const phases = [
  {
    n: "Phase 1",
    label: "CLARIFIER",
    desc: "Structurer l'idée en brief/PRD",
    count: "3 prompts",
    prompts: [
      { name: "Le Clarifier", desc: "Mode guidé — idée vague → brief structuré" },
      { name: "Le PRD Builder", desc: "7 inputs → PRD complet en 7 sections" },
      { name: "Le Challenger", desc: "Score /10 avec grille objective + diagnostic par section" },
    ],
  },
  {
    n: "Phase 2",
    label: "DESIGNER",
    desc: "Créer le design dans Google Stitch",
    count: "2 prompts",
    prompts: [
      { name: "Le Vibe Designer", desc: "PRD → prompt Google Stitch prêt à coller, inclut états UI" },
      {
        name: "Le Design-to-Code",
        desc: "Stitch → prompts Claude Code prêts à copier (méthode manuelle ou MCP)",
      },
    ],
  },
  {
    n: "Phase 3",
    label: "CONSTRUIRE",
    desc: "Coder avec Claude Code, bloc par bloc",
    count: "4 prompts",
    prompts: [
      {
        name: "Spec Fondations",
        desc: "PRD → user stories, schéma données, architecture, events analytics",
      },
      {
        name: "Spec Détail",
        desc: "Fondations → routes, composants, API, plan d'implémentation",
      },
      {
        name: "CLAUDE.md Generator",
        desc: "Spec technique → fichier CLAUDE.md prêt à la racine du projet",
      },
      {
        name: "Debug Companion",
        desc: "Bug → diagnostic → prompt fix, rollback si 2+ indicateurs",
      },
    ],
  },
  {
    n: "Phase 4",
    label: "VÉRIFIER",
    desc: "Auditer le résultat, documenter les learnings",
    count: "3 prompts",
    prompts: [
      {
        name: "Audit Technique",
        desc: "6 axes : UX, fonctionnel, SEO, perf, accessibilité, sécurité",
      },
      {
        name: "Audit SEO & Growth",
        desc: "5 dimensions : SEO classique, GEO, AIO, AEO, SXO + scoring /10",
      },
      {
        name: "PRD Reviewer",
        desc: "Review section par section vs résultats réels — format « On pensait / On a observé / Donc »",
      },
    ],
  },
];

const faqItems = [
  {
    q: "Ça marche avec ChatGPT ?",
    a: "Oui. Optimisé pour Claude mais compatible GPT-4o. Le Prompt 04 (Vibe Designer) utilise Google Stitch.",
  },
  {
    q: "J'ai besoin de savoir coder ?",
    a: "Non pour les Phases 1, 2 et 4. La Phase 3 est pour les PMs qui codent. Si tu ne codes pas, les Prompts Spec Fondations/Détail produisent des specs pour ton dev.",
  },
  {
    q: "C'est quoi un CLAUDE.md ?",
    a: "Un fichier texte à la racine du projet. Claude Code le lit automatiquement à chaque session. Le CLAUDE.md Generator le crée pour toi à partir de ta spec technique.",
  },
];

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={LEMON_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm ${className}`}
    >
      Acheter le pack — 29&nbsp;€
    </a>
  );
}

export default function VibeCodingPMPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Pack Vibe Coding for PMs",
    description:
      "12 prompts pour passer de l'idée au produit. PRD, design Stitch, code Claude Code, audit.",
    url: "https://productcopilot.fr/packs/vibe-coding-pm",
    brand: {
      "@type": "Brand",
      name: "Product Copilot",
    },
    offers: {
      "@type": "Offer",
      price: "29",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: LEMON_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
        <NavMain
          variant="sticky"
          cta={{ label: "Acheter le pack", href: LEMON_URL }}
        />

        {/* ── HERO ── */}
        <section className="relative px-5 sm:px-6 pt-16 pb-16 md:pt-24 md:pb-20 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(232,255,139,0.06)_0%,transparent_70%)]" />
          <div className="relative max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8FF8B]/20 bg-[#E8FF8B]/5 text-[#E8FF8B] text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF8B]" />
              Paiement unique · 29 €
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter leading-[1.08] mb-4">
              De l&apos;idée au produit qui tourne
            </h1>
            <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl leading-relaxed mb-8">
              12 prompts. 4 phases. Le système complet pour les PMs qui ship.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <CTAButton />
              <p className="text-xs text-[#666666] self-center">
                Accès immédiat. Fichiers markdown + PDF. Pas d&apos;abonnement.
              </p>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── LE PROBLÈME ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed">
              Tu as une idée. Tu ouvres Claude Code. Tu décris ce que tu veux en 3 phrases.
              3 heures plus tard, tu as un prototype moche qui casse quand tu cliques sur le deuxième bouton.
            </p>
            <p className="text-lg md:text-xl text-[#F5F5F5] leading-relaxed mt-4 font-semibold">
              Le problème n&apos;est pas l&apos;IA. C&apos;est le brief. Et le process.
            </p>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── 4 PHASES ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Le système en 4 phases
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {phases.map((phase) => (
                <div key={phase.n} className="card-glass p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#E8FF8B]/10 text-[#E8FF8B]/80 mb-2">
                        {phase.n}
                      </span>
                      <h3 className="font-bold text-[#F5F5F5]">{phase.label}</h3>
                    </div>
                    <span className="text-xs text-[#666666] shrink-0 mt-1">{phase.count}</span>
                  </div>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── CE QUE TU OBTIENS ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Ce que tu obtiens
            </h2>

            {/* 12 prompts détaillés */}
            <div className="space-y-8 mb-10">
              {phases.map((phase) => (
                <div key={phase.n}>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-3">
                    {phase.n} — {phase.label}
                  </p>
                  <div className="space-y-2">
                    {phase.prompts.map((p) => (
                      <div key={p.name} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                        <CheckIcon />
                        <div>
                          <span className="text-sm font-semibold text-[#F5F5F5]">{p.name}</span>
                          <span className="text-sm text-[#666666]"> — {p.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bonus */}
            <div className="card-glass p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-4">
                Inclus également
              </p>
              <ul className="space-y-3">
                {[
                  "1 workflow complet (mode d'emploi, 3 flows, 7 règles, cas réel)",
                  "2 cheatsheets PDF (système + design)",
                  "3 templates markdown (CLAUDE.md, Spec de page, Audit technique)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#A3A3A3]">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── POUR QUI ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Pour qui</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-4">
                  Ce pack est pour toi si :
                </p>
                <ul className="space-y-3 text-sm text-[#A3A3A3]">
                  {[
                    "Tu es PM et tu veux coder tes propres outils (landing, prototype, micro-SaaS)",
                    "Tu veux écrire des specs que les devs exécutent sans allers-retours",
                    "Tu utilises Claude Code, Cursor, ou un outil de coding IA",
                    "Tu en as marre de passer plus de temps à debug qu'à construire",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#666666] mb-4">
                  Ce pack n'est PAS pour toi si :
                </p>
                <ul className="space-y-3 text-sm text-[#666666]">
                  {[
                    "Tu es développeur senior (tu sais déjà écrire des specs techniques)",
                    "Tu ne comptes ni coder ni travailler avec des devs",
                    "Tu cherches un cours de développement web",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CrossIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── CAS RÉEL ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-4">
              Cas réel
            </p>
            <blockquote className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed border-l-2 border-[#E8FF8B]/30 pl-6">
              Ce pack est la méthode qu&apos;on a utilisée pour construire productcopilot.fr.
              Du PRD à la prod. Le CLAUDE.md, les specs, l&apos;audit des 16 bugs.
              Tout est documenté dans le workflow.
            </blockquote>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── FAQ ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Questions fréquentes
            </h2>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <details key={item.q} className="card-glass p-5 group">
                  <summary className="font-semibold text-sm flex items-center justify-between cursor-pointer list-none">
                    {item.q}
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="w-4 h-4 text-[#666666] group-open:rotate-180 transition-transform shrink-0 ml-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm text-[#A3A3A3] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── CTA FINAL ── */}
        <section className="px-5 sm:px-6 py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <p className="text-5xl font-bold mb-2">29&nbsp;€</p>
            <p className="text-[#A3A3A3] text-sm mb-8">Paiement unique. Accès immédiat.</p>
            <CTAButton className="w-full mb-3" />
            <p className="text-xs text-[#666666]">
              Paiement sécurisé via LemonSqueezy. Accès immédiat après paiement.
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 px-5 sm:px-6 py-12">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <span className="text-sm font-bold tracking-tight text-gradient-lime">
                Product Copilot
              </span>
              <p className="text-[10px] text-[#666666] mt-1">
                Des systèmes IA pour les PMs qui construisent.
              </p>
            </div>
            <div className="flex gap-6 text-xs text-[#A3A3A3]">
              <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">
                Blog
              </Link>
              <Link href="/outils" className="hover:text-[#F5F5F5] transition-colors">
                Outils
              </Link>
              <Link href="/packs" className="hover:text-[#F5F5F5] transition-colors">
                Packs
              </Link>
              <Link
                href="/mentions-legales"
                className="hover:text-[#F5F5F5] transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
