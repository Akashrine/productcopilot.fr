import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "@/components/NavMain";
import Generator from "@/components/Generator";
import { TOOL_CONFIGS } from "@/lib/tool-config";

const config = TOOL_CONFIGS["user-stories"];

export const metadata: Metadata = {
  title: "Générateur de User Stories IA — Product Copilot",
  description:
    "Transforme une description de feature en user stories structurées avec critères d'acceptation Given/When/Then et estimation T-shirt. Gratuit.",
  keywords: ["générateur user story", "user story ia", "user story generator", "critères acceptation", "product management ia", "backlog ia"],
  alternates: { canonical: "https://productcopilot.fr/tools/user-stories" },
  openGraph: {
    title: "Générateur de User Stories IA — Product Copilot",
    description: "Transforme une description de feature en user stories structurées. Gratuit et illimité.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/tools/user-stories",
  },
  twitter: {
    card: "summary_large_image",
    title: "Générateur de User Stories IA — Product Copilot",
    description: "Transforme une description de feature en user stories structurées avec critères d'acceptation Given/When/Then. Gratuit.",
  },
};

export default function UserStoriesPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain variant="sticky" cta={{ label: "Accéder aux prompts", href: "/pack-discovery" }} />

      {/* Hero */}
      <section className="px-5 sm:px-6 pt-12 pb-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8FF8B]/20 bg-[#E8FF8B]/5 text-[#E8FF8B] text-xs font-semibold mb-4">
          Gratuit &middot; illimité
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tighter mb-4">
          {config.headline}
        </h1>
        <p className="text-[#A3A3A3] text-lg leading-relaxed max-w-2xl">
          {config.description} Format de sortie structuré : user stories, critères d&apos;acceptation Given/When/Then, estimation T-shirt, dépendances.
        </p>
      </section>

      {/* Generator */}
      <section className="px-5 sm:px-6 pb-16 md:pb-24 max-w-4xl mx-auto">
        <Generator config={config} />
      </section>

      <div className="divider-shimmer max-w-4xl mx-auto" />

      {/* How it works */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Décris ta feature", desc: "Colle ta description en langage naturel. Le contexte, le problème, ce que ça doit faire." },
              { n: "02", title: "Copie le prompt généré", desc: "L'outil génère un prompt expert calibré avec ton contexte. Copie-le en un clic." },
              { n: "03", title: "Colle dans Claude ou ChatGPT", desc: "Récupère tes user stories structurées avec critères d'acceptation, T-shirt sizing, dépendances." },
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

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <span className="text-sm font-bold tracking-tight text-gradient-lime">Product Copilot</span>
            <p className="text-[10px] text-[#666666] mt-1">Des outils IA pour les PMs qui construisent.</p>
          </div>
          <div className="flex gap-6 text-xs text-[#A3A3A3]">
            <a href="https://linkedin.com/in/julienbrionne" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F5F5] transition-colors">LinkedIn</a>
            <Link href="/mentions-legales" className="hover:text-[#F5F5F5] transition-colors">Mentions légales</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
