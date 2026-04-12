import type { Metadata } from "next";
import Link from "next/link";
import TrackLink from "../components/TrackLink";
import NavMain from "../components/NavMain";
import FooterMain from "../components/FooterMain";
import { getAllPosts } from "../lib/blog";

export const metadata: Metadata = {
  title: "Product Copilot — Outils IA pour Product Managers",
  description:
    "Prompts, templates et workflows pour les Product Managers qui veulent shipper plus vite. Pack Vibe Coding for PMs : 12 prompts, 4 phases, 29 €.",
  keywords: [
    "outils product manager",
    "templates PM",
    "prompts ia product management",
    "prd template gratuit",
    "vibe coding product manager",
  ],
  alternates: { canonical: "https://productcopilot.fr" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Product Copilot — Outils IA pour Product Managers",
    description:
      "Prompts, templates et workflows pour les Product Managers qui veulent shipper plus vite.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Copilot — Outils IA pour Product Managers",
    description:
      "Prompts, templates et workflows pour les Product Managers qui veulent shipper plus vite.",
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Page() {
  const recentPosts = getAllPosts().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://productcopilot.fr/#organization",
        name: "Product Copilot",
        url: "https://productcopilot.fr",
        description: "Templates, prompts et workflows pour les Product Managers qui construisent.",
      },
      {
        "@type": "WebSite",
        "@id": "https://productcopilot.fr/#website",
        url: "https://productcopilot.fr",
        name: "Product Copilot",
        publisher: { "@id": "https://productcopilot.fr/#organization" },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
        <NavMain cta={{ label: "Pack Vibe Coding — 29 €", href: "/packs/vibe-coding-pm" }} />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(232,255,139,0.05)_0%,transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tighter mb-5">
              Des outils PM concrets.<br className="hidden sm:block" />
              Testés. Augmentés par l&apos;IA.
            </h1>
            <p className="text-lg sm:text-xl text-[#A3A3A3] max-w-xl leading-relaxed mb-10">
              Prompts, templates et workflows pour les Product Managers qui veulent shipper plus vite.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <TrackLink
                href="/packs/vibe-coding-pm"
                event="home_cta_pack"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold"
              >
                Voir le Pack Vibe Coding
                <ArrowRight />
              </TrackLink>
              <TrackLink
                href="/outils/template-prd-ia"
                event="home_cta_outil"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold hover:border-white/20 hover:text-[#F5F5F5] transition-all"
              >
                Essayer un outil gratuit
              </TrackLink>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── LE SYSTÈME COMPLET ── */}
        <section className="px-5 sm:px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
              Le système complet
            </h2>

            <div className="border border-[#E8FF8B]/20 rounded-2xl p-7 sm:p-10 bg-[#E8FF8B]/3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Pack Vibe Coding for PMs</h3>
                  <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed max-w-lg">
                    De l&apos;idée au produit qui tourne. 12 prompts chaînés, 4 phases.
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-2xl font-bold">29 €</div>
                  <div className="text-xs text-[#666666] mt-0.5">Paiement unique</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Clarifier", "Designer", "Construire", "Vérifier"].map((phase) => (
                  <span
                    key={phase}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8FF8B]/10 text-[#E8FF8B]"
                  >
                    {phase}
                  </span>
                ))}
              </div>

              <TrackLink
                href="/packs/vibe-coding-pm"
                event="home_pack_cta"
                className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
              >
                Découvrir le pack →
              </TrackLink>

              <p className="mt-5 text-xs text-[#666666]">
                Utilisé pour construire ce site. Le cas réel est dans le pack.
              </p>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── COMMENCE ICI ── */}
        <section className="px-5 sm:px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
              Commence ici
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TrackLink
                href="/outils/template-prd-ia"
                event="home_tool_click"
                eventProps={{ tool_slug: "template-prd-ia" }}
                className="group card-glass p-6 flex flex-col justify-between gap-5 hover:border-[#E8FF8B]/20 transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FF8B]/10 text-[#E8FF8B] mb-4">
                    Gratuit
                  </span>
                  <h3 className="font-bold mb-2 group-hover:text-[#E8FF8B] transition-colors">
                    Template PRD IA
                  </h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    Réponds à 7 questions. Récupère un prompt qui génère un PRD structuré.
                  </p>
                </div>
                <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all self-end">
                  <ArrowRight />
                </span>
              </TrackLink>

              <TrackLink
                href="/pack-discovery"
                event="home_tool_click"
                eventProps={{ tool_slug: "pack-discovery" }}
                className="group card-glass p-6 flex flex-col justify-between gap-5 hover:border-[#E8FF8B]/20 transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FF8B]/10 text-[#E8FF8B] mb-4">
                    Gratuit
                  </span>
                  <h3 className="font-bold mb-2 group-hover:text-[#E8FF8B] transition-colors">
                    10 Prompts Discovery
                  </h3>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    Les prompts de discovery product. Interview, synthèse, décision.
                  </p>
                </div>
                <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all self-end">
                  <ArrowRight />
                </span>
              </TrackLink>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── SUR LE BLOG ── */}
        <section className="px-5 sm:px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
              Sur le blog
            </h2>

            <div className="space-y-3 mb-8">
              {recentPosts.map((post) => (
                <TrackLink
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  event="home_article_click"
                  eventProps={{ article_slug: post.slug }}
                  className="group card-glass p-5 sm:p-6 flex items-start justify-between gap-4 hover:border-[#E8FF8B]/20 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <time dateTime={post.date} className="text-xs text-[#666666]">
                        {formatDate(post.date)}
                      </time>
                      <span className="text-[#333333]">·</span>
                      <span className="text-xs text-[#666666]">{post.readingTime}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-1 group-hover:text-[#E8FF8B] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-1">
                      {post.description}
                    </p>
                  </div>
                  <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all shrink-0 mt-1">
                    <ArrowRight />
                  </span>
                </TrackLink>
              ))}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
            >
              Tous les articles <ArrowRight />
            </Link>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── CTA FINAL ── */}
        <section className="px-5 sm:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center card-glass p-10 sm:p-14">
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6">
              Le pack contient 12 prompts, 2 cheatsheets PDF, 3 templates et un workflow complet.
              29 EUR, paiement unique.
            </p>
            <TrackLink
              href="/packs/vibe-coding-pm"
              event="home_cta_final"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold"
            >
              Acheter le pack →
            </TrackLink>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── BIO ── */}
        <section className="px-5 sm:px-6 py-14 md:py-16">
          <div className="max-w-3xl mx-auto flex items-center gap-5">
            <div className="w-12 h-12 rounded-full border border-[#E8FF8B]/30 flex items-center justify-center text-[#E8FF8B] font-bold text-sm shrink-0">
              JB
            </div>
            <div>
              <p className="font-semibold text-sm">Julien Brionne. Product Leader depuis 2012.</p>
              <p className="text-sm text-[#A3A3A3]">Heetch, Waalaxy, Back Market.</p>
            </div>
            <Link
              href="/a-propos"
              className="ml-auto text-xs text-[#666666] hover:text-[#A3A3A3] transition-colors shrink-0"
            >
              En savoir plus →
            </Link>
          </div>
        </section>

        <FooterMain />
      </main>
    </>
  );
}
