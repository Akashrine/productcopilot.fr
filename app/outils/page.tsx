import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "../../components/NavMain";
import { tools } from "../../lib/tools";

export const metadata: Metadata = {
  title: "Outils gratuits — Product Copilot",
  description:
    "Des générateurs IA spécialisés pour product managers. Pas de compte, pas de carte bleue. Template PRD, user stories, prompts discovery.",
  alternates: { canonical: "https://productcopilot.fr/outils" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Outils gratuits — Product Copilot",
    description: "Des générateurs IA spécialisés pour product managers. Gratuit.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/outils",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outils gratuits — Product Copilot",
    description: "Des générateurs IA spécialisés pour product managers. Gratuit.",
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

export default function OutilsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain cta={{ label: "Accéder aux prompts", href: "/pack-discovery" }} />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-5 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-4">
            Outils gratuits
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">
            Des générateurs IA pour PMs
          </h1>
          <p className="text-lg text-[#A3A3A3] max-w-xl leading-relaxed">
            Pas de compte. Pas de carte bleue. Tu remplis, tu copies, tu colles dans ton LLM.
          </p>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* TOOLS GRID */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group card-glass p-6 flex flex-col justify-between gap-5 hover:border-[#E8FF8B]/20 transition-all"
            >
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FF8B]/10 text-[#E8FF8B] mb-4">
                  Gratuit
                </span>
                <h2 className="font-bold mb-2 group-hover:text-[#E8FF8B] transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">{tool.description}</p>
              </div>
              <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all self-end">
                <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* CTA PACKS */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tighter mb-3">
            Tu veux aller plus loin ?
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-sm leading-relaxed">
            Les packs combinent outils, templates Notion et workflows complets. Achat unique.
          </p>
          <Link
            href="/packs"
            className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
          >
            Voir les packs
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 sm:px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <span className="text-sm font-bold tracking-tight text-gradient-lime">Product Copilot</span>
            <p className="text-[10px] text-[#666666] mt-1">Des outils IA pour les PMs qui construisent.</p>
          </div>
          <div className="flex gap-6 text-xs text-[#A3A3A3]">
            <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">Blog</Link>
            <Link href="/packs" className="hover:text-[#F5F5F5] transition-colors">Packs</Link>
            <Link href="/a-propos" className="hover:text-[#F5F5F5] transition-colors">À propos</Link>
            <Link href="/mentions-legales" className="hover:text-[#F5F5F5] transition-colors">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
