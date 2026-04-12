import type { Metadata } from "next";
import NavMain from "../../components/NavMain";
import FooterMain from "../../components/FooterMain";
import BlogListClient from "../../components/BlogListClient";
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
  twitter: {
    card: "summary_large_image",
    title: "Blog — Product Copilot",
    description: "Guides et ressources pour product managers : PRD, discovery produit, IA, workflows.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain cta={{ label: "Pack Vibe Coding — 29 €", href: "/packs/vibe-coding-pm" }} />

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
        <div className="max-w-4xl mx-auto">
          <BlogListClient posts={posts} />
        </div>
      </section>

      <FooterMain />
    </main>
  );
}
