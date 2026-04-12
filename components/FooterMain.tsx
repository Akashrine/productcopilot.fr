import Link from "next/link";

export default function FooterMain() {
  return (
    <footer className="border-t border-white/5 px-5 sm:px-6 py-12 md:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 mb-10">
          <div className="max-w-xs space-y-2">
            <span className="text-base font-bold tracking-tight text-gradient-lime">
              Product Copilot
            </span>
            <p className="text-xs text-[#666666] leading-relaxed">
              Des systèmes IA pour les PMs qui construisent.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            {/* Outils */}
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                Outils
              </h6>
              <Link
                href="/outils/template-prd-ia"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Template PRD IA
              </Link>
              <Link
                href="/pack-discovery"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                10 Prompts Discovery
              </Link>
            </div>

            {/* Blog */}
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                Blog
              </h6>
              <Link
                href="/blog"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Tous les articles
              </Link>
            </div>

            {/* Pack */}
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                Pack
              </h6>
              <Link
                href="/packs/vibe-coding-pm"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Pack Vibe Coding for PMs
              </Link>
              <Link
                href="/pack-systeme-discovery"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Pack Système Discovery
              </Link>
            </div>

            {/* Légal */}
            <div className="space-y-2.5">
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                Légal
              </h6>
              <Link
                href="/mentions-legales"
                className="block text-sm text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <p className="text-[10px] text-[#666666]">
            Product Copilot — productcopilot.fr
          </p>
        </div>
      </div>
    </footer>
  );
}
