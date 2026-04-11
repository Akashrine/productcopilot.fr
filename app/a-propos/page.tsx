import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "../../components/NavMain";

export const metadata: Metadata = {
  title: "À propos — Product Copilot",
  description:
    "Product Copilot est une marque produit indépendante créée par Julien Brionne, Product Leader depuis 2012.",
  alternates: { canonical: "https://productcopilot.fr/a-propos" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "À propos — Product Copilot",
    description: "Product Copilot est une marque produit indépendante créée par Julien Brionne.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/a-propos",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos — Product Copilot",
    description: "Product Copilot est une marque produit indépendante créée par Julien Brionne.",
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

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain cta={{ label: "Voir les outils", href: "/outils" }} />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* Bio */}
          <div className="flex items-center gap-5 mb-12">
            <div className="w-16 h-16 rounded-full border border-[#E8FF8B]/30 flex items-center justify-center text-[#E8FF8B] font-bold text-lg shrink-0">
              JB
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Julien Brionne</h1>
              <p className="text-[#A3A3A3] text-sm">Product Leader depuis 2012</p>
            </div>
          </div>

          <div className="space-y-6 text-[#A3A3A3] leading-relaxed">
            <p>
              J&apos;ai passé plus de 10 ans à construire des produits dans des startups en croissance.
              Heetch, Waalaxy, Back Market. Des équipes de 3 personnes à des dizaines de PMs.
            </p>
            <p>
              Ce que j&apos;ai appris : les PMs passent trop de temps à produire des documents et pas assez
              à réfléchir. La rédaction est du bruit. La réflexion est la valeur.
            </p>
            <p>
              Product Copilot est né de ce constat. Des outils qui absorbent le bruit pour que tu te
              concentres sur les décisions qui comptent.
            </p>
          </div>

          <div className="divider-shimmer my-12" />

          {/* Entreprises */}
          <div className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-5">
              Expériences
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Heetch", "Waalaxy", "Back Market"].map((co) => (
                <span
                  key={co}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 text-[#A3A3A3] border border-white/5"
                >
                  {co}
                </span>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="card-glass p-6 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-3">
              Ce que Product Copilot n&apos;est pas
            </h2>
            <ul className="space-y-2 text-sm text-[#A3A3A3]">
              <li>Pas de consulting. Pas de calls. Pas de coaching.</li>
              <li>Pas d&apos;abonnement. Achat unique ou gratuit.</li>
              <li>Pas de contenu générique. Chaque outil est testé sur de vrais projets.</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/outils"
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
            >
              Voir les outils gratuits
              <ArrowRight />
            </Link>
            <a
              href="https://linkedin.com/in/julienbrionne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold text-sm hover:border-white/20 hover:text-[#F5F5F5] transition-all"
            >
              LinkedIn
              <ArrowRight />
            </a>
          </div>
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
            <Link href="/packs" className="hover:text-[#F5F5F5] transition-colors">Packs</Link>
            <Link href="/mentions-legales" className="hover:text-[#F5F5F5] transition-colors">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
