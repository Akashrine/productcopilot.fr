import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import NavMain from "../../../components/NavMain";
import { getPostBySlug, getAllSlugs } from "../../../lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Product Copilot`,
    description: post.description,
    alternates: { canonical: `https://productcopilot.fr/blog/${post.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "fr_FR",
      url: `https://productcopilot.fr/blog/${post.slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function ArrowLeft() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path
        d="M13 8H3m0 0l4-4M3 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl sm:text-4xl font-bold tracking-tighter mt-12 mb-5 first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold tracking-tight mt-12 mb-4 text-[#F5F5F5]"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-semibold mt-8 mb-3 text-[#F5F5F5]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[#A3A3A3] leading-relaxed mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-5 pl-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2 mb-5 pl-5 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-3 text-[#A3A3A3] leading-relaxed">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#E8FF8B]/50 shrink-0" />
      <span {...props} />
    </li>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-[#F5F5F5]" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-[#A3A3A3] not-italic" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="pl-4 border-l-2 border-[#E8FF8B]/40 my-6 text-[#A3A3A3] italic"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="px-1.5 py-0.5 rounded bg-white/5 text-[#E8FF8B] text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-[#141414] border border-white/5 rounded-xl p-5 overflow-x-auto mb-6 text-sm font-mono text-[#D4D4D4] leading-relaxed"
      {...props}
    />
  ),
  hr: () => <div className="divider-shimmer my-10" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal =
      props.href?.startsWith("http") || props.href?.startsWith("//");
    return (
      <a
        className="text-[#E8FF8B] hover:underline underline-offset-4"
        {...props}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      />
    );
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://productcopilot.fr/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Julien Brionne",
      url: "https://productcopilot.fr/a-propos",
    },
    publisher: {
      "@type": "Organization",
      name: "Product Copilot",
      url: "https://productcopilot.fr",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain cta={{ label: "Accéder aux prompts", href: "/pack-discovery" }} />

      {/* ARTICLE */}
      <article className="pt-28 pb-20 md:pt-40 md:pb-28 px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-[#A3A3A3] transition-colors mb-10"
          >
            <ArrowLeft />
            Tous les articles
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <time dateTime={post.date} className="text-xs text-[#666666]">
              {formatDate(post.date)}
            </time>
            <span className="text-[#333333]">·</span>
            <span className="text-xs text-[#666666]">{post.readingTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-[1.1] mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-[#666666] border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="divider-shimmer mb-10" />

          {/* MDX Content */}
          <div className="prose-custom">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tighter mb-3">
            Passe au système complet
          </h2>
          <p className="text-[#A3A3A3] mb-8 text-sm leading-relaxed">
            Le Pack Discovery : 10 prompts chaînés pour transformer tes
            interviews en PRD en 40 minutes. Gratuit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/pack-discovery"
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
            >
              Accéder aux 10 prompts
              <ArrowRight />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold text-sm hover:border-white/20 hover:text-[#F5F5F5] transition-all"
            >
              Lire d&apos;autres articles
            </Link>
          </div>
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
          <p className="text-[10px] text-[#666666] md:self-end">
            &copy; {new Date().getFullYear()} Product Copilot
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}
