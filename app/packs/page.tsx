import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "../../components/NavMain";
import { packs } from "../../lib/packs";

export const metadata: Metadata = {
  title: "Packs — Product Copilot",
  description:
    "Des kits complets pour structurer ton travail de product manager. Templates Notion, prompts, workflows. Achat unique, pas d'abonnement.",
  alternates: { canonical: "https://productcopilot.fr/packs" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Packs — Product Copilot",
    description:
      "Des kits complets pour structurer ton travail de PM. Achat unique.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/packs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packs — Product Copilot",
    description: "Des kits complets pour structurer ton travail de PM. Achat unique.",
  },
};

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
      <path
        d="M3 8h10m0 0L9 4m4 4L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#E8FF8B] shrink-0" aria-hidden="true">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const packDetails: Record<string, string[]> = {
  "pack-systeme-discovery": [
    "10 prompts chaînés (de l'interview au PRD)",
    "Templates Notion pré-remplis",
    "Guide de workflow pas-à-pas",
    "Cas réel annoté (transcript → PRD)",
  ],
  "vibe-coding-pm": [
    "12 prompts chaînés en 4 phases (Clarifier, Designer, Construire, Vérifier)",
    "1 workflow complet (3 flows, 7 règles, cas réel)",
    "2 cheatsheets PDF (système + design)",
    "3 templates markdown (CLAUDE.md, Spec de page, Audit technique)",
  ],
};

export default function PacksPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain cta={{ label: "Outils gratuits", href: "/outils" }} />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-4">
            Packs
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">
            Kits complets pour PMs
          </h1>
          <p className="text-lg text-[#A3A3A3] max-w-xl leading-relaxed">
            Prompts + templates + workflow. Tu dupliques dans ton workspace et tu lances. Achat unique.
          </p>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* PACKS */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-4">
          {packs.map((pack) => {
            const details = packDetails[pack.slug] ?? [];
            return pack.status === "live" ? (
              <div key={pack.slug} className="card-glass p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{pack.title}</h2>
                    <p className="text-sm text-[#A3A3A3] leading-relaxed max-w-lg">
                      {pack.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-3xl font-bold">{pack.price}</p>
                    <p className="text-xs text-[#666666]">Paiement unique</p>
                  </div>
                </div>
                {details.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {details.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#A3A3A3]">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={pack.href}
                  className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
                >
                  Accéder au pack
                  <ArrowRight />
                </Link>
              </div>
            ) : (
              <div key={pack.slug} className="card-glass p-6 sm:p-8 opacity-60">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-[#666666] mb-3">
                      Bientôt disponible
                    </span>
                    <h2 className="text-xl font-bold mb-2 text-[#A3A3A3]">{pack.title}</h2>
                    <p className="text-sm text-[#666666] leading-relaxed max-w-lg">
                      {pack.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-3xl font-bold text-[#666666]">{pack.price}</p>
                    <p className="text-xs text-[#666666]">Paiement unique</p>
                  </div>
                </div>
                {details.length > 0 && (
                  <ul className="space-y-2">
                    {details.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#666666]">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* CTA OUTILS */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tighter mb-3">
            Pas prêt à acheter ?
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-sm leading-relaxed">
            Commence par les outils gratuits. Même stack, zéro engagement.
          </p>
          <Link
            href="/outils"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold text-sm hover:border-white/20 hover:text-[#F5F5F5] transition-all"
          >
            Voir les outils gratuits
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <span className="text-sm font-bold tracking-tight text-gradient-lime">Product Copilot</span>
            <p className="text-[10px] text-[#666666] mt-1">Des systèmes IA pour les PMs qui construisent.</p>
          </div>
          <div className="flex gap-6 text-xs text-[#A3A3A3]">
            <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">Blog</Link>
            <Link href="/outils" className="hover:text-[#F5F5F5] transition-colors">Outils</Link>
            <Link href="/a-propos" className="hover:text-[#F5F5F5] transition-colors">À propos</Link>
            <Link href="/mentions-legales" className="hover:text-[#F5F5F5] transition-colors">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
