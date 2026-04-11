import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "@/components/NavMain";
import PRDGenerator from "@/components/PRDGenerator";

export const metadata: Metadata = {
  title: "Générateur de PRD IA gratuit — Product Copilot",
  description:
    "Réponds à 7 questions, récupère un prompt expert qui génère un PRD structuré en 7 sections. Gratuit.",
  keywords: [
    "template PRD IA",
    "générateur PRD",
    "PRD product manager template",
    "PRD gratuit",
    "PRD ChatGPT",
    "écrire PRD ia",
  ],
  alternates: { canonical: "https://productcopilot.fr/outils/template-prd-ia" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Générateur de PRD IA gratuit — Product Copilot",
    description:
      "Réponds à 7 questions, récupère un prompt expert qui génère un PRD structuré. Gratuit.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/outils/template-prd-ia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Générateur de PRD IA gratuit — Product Copilot",
    description: "Réponds à 7 questions, récupère un prompt PRD expert. Gratuit.",
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

export default function TemplatePRDIAPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain variant="sticky" cta={{ label: "Accéder aux prompts", href: "/pack-discovery" }} />

      {/* HERO */}
      <section className="px-5 sm:px-6 pt-12 pb-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8FF8B]/20 bg-[#E8FF8B]/5 text-[#E8FF8B] text-xs font-semibold mb-4">
          Gratuit
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tighter mb-4">
          Génère un PRD structuré en 5 minutes
        </h1>
        <p className="text-[#A3A3A3] text-lg leading-relaxed max-w-2xl">
          Réponds à 7 questions. Récupère un prompt expert calibré avec ton contexte. Colle-le dans
          Claude ou ChatGPT.
        </p>
      </section>

      {/* GENERATOR */}
      <section className="px-5 sm:px-6 pb-16 md:pb-20 max-w-4xl mx-auto">
        <PRDGenerator />
      </section>

      <div className="divider-shimmer max-w-4xl mx-auto" />

      {/* HOW IT WORKS */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                title: "Décris ton initiative",
                desc: "7 champs contextuels : nom, problème, contexte produit, hypothèse, métrique cible, contraintes, OKR.",
              },
              {
                n: "02",
                title: "Copie le prompt généré",
                desc: "L'outil assemble un prompt expert calibré avec tes données. Tout est personnalisé avec ton contexte.",
              },
              {
                n: "03",
                title: "Colle dans Claude ou ChatGPT",
                desc: "Récupère ton PRD en 7 sections : problème, opportunité, hypothèse, non-goals, métriques, expé, risques.",
              },
            ].map((step) => (
              <div key={step.n} className="card-glass p-5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#E8FF8B]/30 text-[#E8FF8B] text-[10px] font-bold mb-3">
                  {step.n}
                </span>
                <h3 className="font-semibold mb-1 text-sm">{step.title}</h3>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-4xl mx-auto" />

      {/* CTA PACK */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-3">
            Aller plus loin
          </p>
          <h2 className="text-2xl font-bold tracking-tighter mb-3">
            Tu veux le système complet ?
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-sm leading-relaxed">
            Le Pack PRD + IA inclut 5 prompts, 3 templates Notion et un workflow step-by-step.
            Du problème au PRD signé en moins d&apos;une heure.
          </p>
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[#666666] font-semibold text-sm cursor-default">
            Bientôt disponible
          </span>
        </div>
      </section>

      {/* ARTICLES LIÉS */}
      <section className="px-5 sm:px-6 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#666666] mb-6">
            Lire aussi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Comment écrire un PRD en 2026",
                slug: "comment-ecrire-un-prd-en-2026",
                desc: "La structure en 7 sections qui fonctionne.",
                time: "7 min",
              },
              {
                title: "PRD et IA : le workflow en 4 étapes",
                slug: "prd-et-ia-guide-pratique",
                desc: "L'IA produit le brouillon. Toi, tu produis la pensée.",
                time: "7 min",
              },
            ].map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group card-glass p-5 flex items-start justify-between gap-3 hover:border-[#E8FF8B]/20 transition-all"
              >
                <div>
                  <p className="text-sm font-semibold mb-1 group-hover:text-[#E8FF8B] transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-[#666666]">{article.desc}</p>
                  <span className="text-[10px] text-[#666666] mt-2 block">{article.time}</span>
                </div>
                <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all shrink-0 mt-0.5">
                  <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <span className="text-sm font-bold tracking-tight text-gradient-lime">
              Product Copilot
            </span>
            <p className="text-[10px] text-[#666666] mt-1">
              Des outils IA pour les PMs qui construisent.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-[#A3A3A3]">
            <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">
              Blog
            </Link>
            <a
              href="https://linkedin.com/in/julienbrionne"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              LinkedIn
            </a>
            <Link href="/mentions-legales" className="hover:text-[#F5F5F5] transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
