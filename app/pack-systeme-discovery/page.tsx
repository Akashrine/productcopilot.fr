import type { Metadata } from "next";
import Link from "next/link";
import NavMain from "../../components/NavMain";
import PackSystemeForm from "./PackSystemeForm";

export const metadata: Metadata = {
  title: "Pack Système Discovery — Product Copilot",
  description:
    "Le workflow complet : 10 prompts chaînés + templates Notion + guide pas-à-pas + exemples annotés. Bientôt disponible.",
  alternates: { canonical: "https://productcopilot.fr/pack-systeme-discovery" },
  openGraph: {
    title: "Pack Système Discovery — Product Copilot",
    description:
      "Le workflow complet : 10 prompts chaînés + templates Notion + guide pas-à-pas + exemples annotés.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/pack-systeme-discovery",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack Système Discovery — Product Copilot",
    description: "Le workflow complet : 10 prompts chaînés + templates Notion + guide pas-à-pas + exemples annotés.",
  },
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#E8FF8B] shrink-0" aria-hidden="true">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const faqItems = [
  { q: "Quand est-ce que le pack sort ?", a: "Courant avril 2026. Les inscrits seront prévenus en premier." },
  { q: "Les prompts gratuits vont rester gratuits ?", a: "Oui. Les 10 prompts restent accessibles contre un email. Le Pack Système est un niveau au-dessus." },
  { q: "Ça marche avec ChatGPT ?", a: "Oui. Optimisé pour Claude (Sonnet/Opus) mais compatible GPT-4o." },
];

export default function PackSystemeDiscoveryPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      <NavMain variant="sticky" />

      {/* Hero */}
      <section className="relative px-5 sm:px-6 pt-16 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(232,255,139,0.05)_0%,_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8FF8B]/20 bg-[#E8FF8B]/5 text-[#E8FF8B] text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FF8B] animate-pulse" />
            Bientôt disponible
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter leading-[1.08] mb-6">
            Le système complet pour piloter ton discovery avec l&apos;IA
          </h1>
          <p className="text-lg text-[#A3A3A3] max-w-3xl leading-relaxed">
            Les prompts, c&apos;est le début. Le Pack Système ajoute les templates, le workflow structuré et les exemples réels.
          </p>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* What's included */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">Ce que le Pack Système inclut</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { badge: "Inclus", title: "Les 10 prompts chaînés", desc: "Déjà disponibles gratuitement. Le pack les intègre dans un workflow complet avec les connexions entre chaque étape documentées." },
              { badge: "Nouveau", title: "Templates Notion pré-remplis", desc: "Fiche interview, opportunity map, PRD, mémo d'alignement. Prêts à dupliquer dans ton workspace." },
              { badge: "Nouveau", title: "Guide de workflow pas-à-pas", desc: "Quel prompt utiliser quand, comment chaîner les sorties, pièges à éviter. Le mode d'emploi qui manque aux prompts seuls." },
              { badge: "Nouveau", title: "Exemples réels annotés", desc: "Sorties complètes sur un cas de discovery fictif mais réaliste, du transcript au PRD. Chaque étape commentée." },
            ].map((item) => (
              <div key={item.title} className="card-glass p-6">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#E8FF8B]/10 text-[#E8FF8B]/80 mb-3">
                  {item.badge}
                </span>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A3A3A3] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* Comparison */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Prompts gratuits vs Pack Système</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-glass p-6 opacity-80">
              <h3 className="font-bold mb-3">Les prompts gratuits</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Les outils. 10 prompts structurés que tu copies dans Claude ou ChatGPT. Tu as les briques, tu te débrouilles pour les assembler.
              </p>
            </div>
            <div className="card-glass p-6 border-[#E8FF8B]/20">
              <h3 className="font-bold mb-3 text-[#E8FF8B]">Le Pack Système</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Les outils + le mode d&apos;emploi + l&apos;atelier monté. Templates, workflow documenté, exemples annotés. Tu dupliques et tu lances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* For whom */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Pour qui</h2>
          <ul className="space-y-3 text-sm text-[#A3A3A3]">
            <li className="flex items-start gap-2.5"><CheckIcon />PM IC ou Lead avec au moins 2 ans d&apos;expérience</li>
            <li className="flex items-start gap-2.5"><CheckIcon />Tu utilises déjà les prompts gratuits et tu veux aller plus loin</li>
            <li className="flex items-start gap-2.5"><CheckIcon />Tu veux un workflow reproductible, pas juste des one-shots</li>
          </ul>
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* Pricing + Form */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-md mx-auto text-center">
          <p className="text-4xl font-bold mb-2">49&nbsp;&euro;</p>
          <p className="text-[#A3A3A3] text-sm mb-8">Paiement unique. Bientôt disponible.</p>
          <PackSystemeForm />
        </div>
      </section>

      <div className="divider-shimmer max-w-5xl mx-auto" />

      {/* FAQ */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="card-glass p-5 group">
                <summary className="font-semibold text-sm flex items-center justify-between">
                  {item.q}
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#666666] group-open:rotate-180 transition-transform" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-[#A3A3A3] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
