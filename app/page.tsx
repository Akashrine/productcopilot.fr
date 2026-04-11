import type { Metadata } from "next";
import Link from "next/link";
import TrackLink from "../components/TrackLink";
import FormulaireLoops from "../components/FormulaireLoops";
import { clusters } from "../lib/clusters";
import { tools } from "../lib/tools";
import { packs } from "../lib/packs";
import { getAllPosts } from "../lib/blog";

export const metadata: Metadata = {
  title: "Product Copilot — Outils IA pour Product Managers",
  description:
    "Templates, prompts et workflows pour les PMs qui construisent. Outils gratuits, packs thématiques, articles pratiques.",
  keywords: [
    "outils product manager",
    "templates PM",
    "prompts ia product management",
    "prd template gratuit",
    "discovery produit ia",
  ],
  alternates: { canonical: "https://productcopilot.fr" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Product Copilot — Outils IA pour Product Managers",
    description:
      "Templates, prompts et workflows pour les PMs qui construisent. Outils gratuits, packs thématiques, articles pratiques.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Copilot — Outils IA pour Product Managers",
    description:
      "Templates, prompts et workflows pour les PMs qui construisent. Outils gratuits, packs thématiques, articles pratiques.",
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

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14">
          <Link href="/" className="text-sm font-bold tracking-tight">
            Product Copilot
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[#A3A3A3]">
            <Link href="/blog" className="hover:text-[#F5F5F5] transition-colors">Blog</Link>
            <Link href="/outils" className="hover:text-[#F5F5F5] transition-colors">Outils</Link>
            <Link href="/packs" className="hover:text-[#F5F5F5] transition-colors">Packs</Link>
          </div>
          <Link
            href="/outils"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#E8FF8B] text-[#0F0F0F] hover:opacity-90 transition-opacity"
          >
            Voir les outils
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(232,255,139,0.05)_0%,transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tighter mb-5">
            Des outils PM concrets.<br className="hidden sm:block" />
            Testés. Augmentés par l&apos;IA.
          </h1>
          <p className="text-lg sm:text-xl text-[#A3A3A3] max-w-xl leading-relaxed mb-10">
            Templates, prompts et workflows pour les Product Managers qui construisent.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <TrackLink
              href="/outils"
              event="home_cta_outils"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold"
            >
              Voir les outils gratuits
              <ArrowRight />
            </TrackLink>
            <TrackLink
              href="/blog"
              event="home_cta_blog"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold hover:border-white/20 hover:text-[#F5F5F5] transition-all"
            >
              Lire le blog
            </TrackLink>
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── CLUSTERS ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
              Un système par problème PM
            </h2>
            <p className="text-[#A3A3A3] text-lg">
              Chaque thématique combine des articles, un outil gratuit et un pack complet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clusters.map((cluster) => (
              <div key={cluster.id} className="card-glass p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 ${cluster.badgeClasses}`}
                    >
                      {cluster.name}
                    </span>
                    <p className="text-sm text-[#A3A3A3]">{cluster.description}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  {cluster.tool ? (
                    <TrackLink
                      href={cluster.tool.href}
                      event="home_cluster_click"
                      eventProps={{ cluster_id: cluster.id }}
                      className="group flex items-center justify-between text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
                    >
                      <span>{cluster.tool.label}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-[#E8FF8B]">Gratuit</span>
                        <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-0.5 transition-all">
                          <ArrowRight />
                        </span>
                      </span>
                    </TrackLink>
                  ) : (
                    <p className="text-sm text-[#666666] italic">Outil à venir</p>
                  )}

                  {cluster.pack && (
                    cluster.pack.status === "live" ? (
                      <TrackLink
                        href={cluster.pack.href}
                        event="home_cluster_click"
                        eventProps={{ cluster_id: cluster.id }}
                        className="group flex items-center justify-between text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
                      >
                        <span>{cluster.pack.label}</span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-[#F5F5F5]">
                            {cluster.pack.price}
                          </span>
                          <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-0.5 transition-all">
                            <ArrowRight />
                          </span>
                        </span>
                      </TrackLink>
                    ) : (
                      <div className="flex items-center justify-between text-sm text-[#666666]">
                        <span>{cluster.pack.label}</span>
                        <span className="text-[10px] font-semibold">Bientôt · {cluster.pack.price}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── OUTILS GRATUITS ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">
              Outils gratuits
            </h2>
            <p className="text-[#A3A3A3] text-lg">
              Des générateurs IA spécialisés. Pas de compte. Pas de carte bleue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {tools.map((tool) => (
              <TrackLink
                key={tool.slug}
                href={tool.href}
                event="home_tool_click"
                eventProps={{ tool_slug: tool.slug }}
                className="group card-glass p-5 flex flex-col justify-between gap-4 hover:border-[#E8FF8B]/20 transition-all"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8FF8B]/10 text-[#E8FF8B] mb-3">
                    Gratuit
                  </span>
                  <h3 className="font-semibold mb-1 group-hover:text-[#E8FF8B] transition-colors text-sm leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">{tool.description}</p>
                </div>
                <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all self-end">
                  <ArrowRight />
                </span>
              </TrackLink>
            ))}
          </div>

          <Link
            href="/outils"
            className="inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
          >
            Voir tous les outils <ArrowRight />
          </Link>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── PACKS ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">Packs</h2>
            <p className="text-[#A3A3A3] text-lg">
              Des kits complets pour structurer ton travail de PM. Achat unique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {packs.map((pack) => (
              pack.status === "live" ? (
                <TrackLink
                  key={pack.slug}
                  href={pack.href}
                  event="home_pack_click"
                  eventProps={{ pack_slug: pack.slug }}
                  className="group card-glass p-6 flex flex-col justify-between gap-5 hover:border-[#E8FF8B]/20 transition-all"
                >
                  <div>
                    <h3 className="font-bold mb-2 group-hover:text-[#E8FF8B] transition-colors">
                      {pack.title}
                    </h3>
                    <p className="text-sm text-[#A3A3A3] leading-relaxed">{pack.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#F5F5F5]">{pack.price}</span>
                    <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all">
                      <ArrowRight />
                    </span>
                  </div>
                </TrackLink>
              ) : (
                <div
                  key={pack.slug}
                  className="card-glass p-6 flex flex-col justify-between gap-5 opacity-60"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-[#666666] mb-3">
                      Bientôt
                    </span>
                    <h3 className="font-bold mb-2 text-[#A3A3A3]">{pack.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">{pack.description}</p>
                  </div>
                  <span className="text-lg font-bold text-[#666666]">{pack.price}</span>
                </div>
              )
            ))}
          </div>

          <Link
            href="/packs"
            className="inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
          >
            Voir tous les packs <ArrowRight />
          </Link>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── ARTICLES RÉCENTS ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">Articles</h2>
            <p className="text-[#A3A3A3] text-lg">Guides pratiques, méthodes testées, zéro bullshit.</p>
          </div>

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
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-400/10 text-blue-400">
                      PRD
                    </span>
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
            Voir tous les articles <ArrowRight />
          </Link>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── NEWSLETTER ── */}
      <section className="px-5 sm:px-6 py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tighter mb-3">
            Un outil PM gratuit chaque mois.
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-sm">Pas de spam.</p>
          <FormulaireLoops centered source="landing-page" buttonText="S'abonner" />
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ── BIO ── */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
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
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Contenu</h6>
              <Link href="/blog" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Blog</Link>
              <Link href="/outils" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Outils gratuits</Link>
              <Link href="/packs" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Packs</Link>
            </div>
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Produit</h6>
              <Link href="/pack-discovery" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Pack Discovery</Link>
              <Link href="/pack-systeme-discovery" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Pack Système</Link>
              <Link href="/outils/template-prd-ia" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Template PRD IA</Link>
              <Link href="/tools/user-stories" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">User Stories</Link>
            </div>
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Liens</h6>
              <Link href="/a-propos" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">À propos</Link>
              <a href="https://linkedin.com/in/julienbrionne" target="_blank" rel="noopener noreferrer" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">LinkedIn</a>
              <Link href="/mentions-legales" className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">Mentions légales</Link>
            </div>
          </div>
          <p className="text-[10px] text-[#666666]/40 md:self-end">
            &copy; {new Date().getFullYear()} Product Copilot
          </p>
        </div>
      </footer>

    </main>
  );
}
