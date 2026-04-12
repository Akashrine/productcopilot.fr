import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "../../components/NavMain";
import FooterMain from "../../components/FooterMain";

export const metadata: Metadata = {
  title: "Outils PM gratuits — Product Copilot",
  description:
    "Des outils gratuits pour les Product Managers. Prompts, templates, générateurs.",
  alternates: { canonical: "https://productcopilot.fr/outils" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Outils PM gratuits — Product Copilot",
    description: "Des outils gratuits pour les Product Managers. Prompts, templates, générateurs.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/outils",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outils PM gratuits — Product Copilot",
    description: "Des outils gratuits pour les Product Managers. Prompts, templates, générateurs.",
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

const TOOLS = [
  {
    slug: "template-prd-ia",
    title: "Template PRD IA",
    description: "Réponds à 7 questions. Récupère un prompt qui génère un PRD structuré.",
    href: "/outils/template-prd-ia",
  },
  {
    slug: "pack-discovery",
    title: "10 Prompts Discovery",
    description: "Les prompts de discovery product. Interview, synthèse, décision.",
    href: "/pack-discovery",
  },
];

export default function OutilsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain />

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
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map((tool) => (
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

      {/* CTA PACK */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#A3A3A3] mb-6 text-sm leading-relaxed">
            Tu veux aller plus loin ? Le Pack Vibe Coding for PMs contient 12 prompts chaînés. 29 €.
          </p>
          <Link
            href="/packs/vibe-coding-pm"
            className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
          >
            Découvrir le Pack Vibe Coding for PMs
            <ArrowRight />
          </Link>
        </div>
      </section>

      <FooterMain />
    </main>
  );
}
