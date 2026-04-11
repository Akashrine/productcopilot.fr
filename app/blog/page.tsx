import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog — Product Copilot",
  description:
    "Guides et ressources pour product managers : PRD, discovery produit, IA, workflows. Contenu pratique, zéro bullshit.",
  alternates: { canonical: "https://productcopilot.fr/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Blog — Product Copilot",
    description:
      "Guides et ressources pour product managers : PRD, discovery produit, IA, workflows.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/blog",
  },
};

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4"
      aria-hidden="true"
    >
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
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 h-14">
          <Link href="/" className="text-sm font-bold tracking-tight">
            Product Copilot
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[#A3A3A3]">
            <Link
              href="/blog"
              className="text-[#F5F5F5] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/pack-discovery"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Prompts
            </Link>
            <Link
              href="/tools/user-stories"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Outils
            </Link>
            <Link
              href="/pack-systeme-discovery"
              className="hover:text-[#F5F5F5] transition-colors"
            >
              Pack Système
            </Link>
          </div>
          <Link
            href="/pack-discovery"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#E8FF8B] text-[#0F0F0F] hover:opacity-90 transition-opacity"
          >
            Accéder aux prompts
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-44 md:pb-16 px-5 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-4">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">
            Guides product management
          </h1>
          <p className="text-lg text-[#A3A3A3] max-w-2xl leading-relaxed">
            PRD, discovery, IA, workflows. Du concret, pas de la théorie.
          </p>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* ARTICLES LIST */}
      <section className="px-5 sm:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card-glass p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:border-[#E8FF8B]/20 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <time
                    dateTime={post.date}
                    className="text-xs text-[#666666]"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="text-[#333333]">·</span>
                  <span className="text-xs text-[#666666]">
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[#E8FF8B] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-[#A3A3A3] leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-[#666666] border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[#666666] group-hover:text-[#E8FF8B] group-hover:translate-x-1 transition-all shrink-0 mt-1">
                <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tighter mb-3">
            Tu veux aller plus loin ?
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-sm leading-relaxed">
            Le Pack Discovery : 10 prompts chaînés pour transformer tes
            interviews en PRD en 40 minutes. Gratuit.
          </p>
          <Link
            href="/pack-discovery"
            className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
          >
            Accéder aux 10 prompts
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 sm:px-6 py-12 md:py-14">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
          <div className="max-w-xs space-y-2">
            <span className="text-base font-bold tracking-tight text-gradient-lime">
              Product Copilot
            </span>
            <p className="text-xs text-[#666666] leading-relaxed">
              Des systèmes IA pour les PMs qui construisent.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                Produit
              </h6>
              <Link
                href="/pack-discovery"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Pack Discovery
              </Link>
              <Link
                href="/pack-systeme-discovery"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Pack Système
              </Link>
              <Link
                href="/tools/user-stories"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                User Stories
              </Link>
            </div>
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                Liens
              </h6>
              <Link
                href="/blog"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Blog
              </Link>
              <a
                href="https://linkedin.com/in/julienbrionne"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                LinkedIn
              </a>
              <Link
                href="/mentions-legales"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Mentions légales
              </Link>
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
