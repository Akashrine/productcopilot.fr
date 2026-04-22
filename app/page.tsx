import type { Metadata } from "next";
import Link from "next/link";
import TrackLink from "../components/TrackLink";
import NavMain from "../components/NavMain";
import FooterMain from "../components/FooterMain";
import { getAllPosts } from "../lib/blog";

const TITLE = "Product Copilot — Blog Product Management pour PMs francophones";
const DESCRIPTION =
  "Méthodes, outils IA et réflexions sur le Product Management. Par Julien Brionne, Product Leader depuis 2012.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "blog product management",
    "product manager france",
    "outils pm ia",
    "prd template",
    "discovery produit",
    "okr product manager",
  ],
  alternates: { canonical: "https://productcopilot.fr" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Product Copilot",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
        description: "Blog Product Management pour PMs francophones.",
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
        <NavMain />

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(232,255,139,0.05)_0%,transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tighter mb-5">
              Product Management.<br className="hidden sm:block" />
              Sans bullshit.
            </h1>
            <p className="text-lg sm:text-xl text-[#A3A3A3] max-w-xl leading-relaxed mb-10">
              Méthodes, outils IA et réflexions pour les PMs francophones qui construisent des produits qui comptent.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <TrackLink
                href="/blog"
                event="home_cta_blog"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold"
              >
                Lire le blog
                <ArrowRight />
              </TrackLink>
              <a
                href="https://julien-brionne.fr/ressources"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold hover:border-white/20 hover:text-[#F5F5F5] transition-all"
              >
                Outils &amp; ressources
                <ArrowRight />
              </a>
            </div>
          </div>
        </section>

        <div className="divider-shimmer max-w-5xl mx-auto" />

        {/* ── SUR LE BLOG ── */}
        <section className="px-5 sm:px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-8">
              Derniers articles
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

        {/* ── RESSOURCES ── */}
        <section className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-4">
              Les outils, templates et packs sont sur julien-brionne.fr
            </p>
            <a
              href="https://julien-brionne.fr/ressources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
            >
              julien-brionne.fr/ressources <ArrowRight />
            </a>
          </div>
        </section>

        <FooterMain />
      </main>
    </>
  );
}
