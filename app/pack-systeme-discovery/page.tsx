import type { Metadata } from "next";
import Link from "next/link";
import PackSystemeForm from "./PackSystemeForm";

export const metadata: Metadata = {
  title: "Pack Système Discovery — Product Copilot",
  description:
    "Le workflow complet : 10 prompts chaînés + templates Notion + guide pas-à-pas + exemples annotés. Bientôt disponible.",
  alternates: {
    canonical: "https://productcopilot.fr/pack-systeme-discovery",
  },
  openGraph: {
    title: "Pack Système Discovery — Product Copilot",
    description:
      "Le workflow complet : 10 prompts chaînés + templates Notion + guide pas-à-pas + exemples annotés.",
    type: "website",
    locale: "fr_FR",
    url: "https://productcopilot.fr/pack-systeme-discovery",
  },
};

const faqItems = [
  {
    q: "Quand est-ce que le pack sort ?",
    a: "Courant avril 2026. Les inscrits seront prévenus en premier.",
  },
  {
    q: "Les prompts gratuits vont rester gratuits ?",
    a: "Oui. Les 10 prompts restent accessibles contre un email. Le Pack Système est un niveau au-dessus.",
  },
  {
    q: "Ça marche avec ChatGPT ?",
    a: "Oui. Optimisé pour Claude (Sonnet/Opus) mais compatible GPT-4o.",
  },
];

export default function PackSystemeDiscoveryPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      {/* NAV */}
      <section className="px-5 sm:px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#A3A3A3] hover:text-[#E8FF8B] transition-colors"
        >
          &larr; Retour
        </Link>
      </section>

      {/* 1. HERO */}
      <section className="px-5 sm:px-6 pb-16 max-w-5xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#E8FF8B]/10 text-[#E8FF8B] rounded text-[10px] font-bold uppercase tracking-widest mb-6">
          Pack Système Discovery &bull; Bientôt disponible
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-6">
          Le système complet pour piloter ton discovery avec l&apos;IA
        </h1>
        <p className="text-xl text-[#A3A3A3] max-w-3xl leading-relaxed">
          Les prompts, c&apos;est le début. Le Pack Système ajoute les templates, le workflow
          structuré et les exemples réels pour que ton discovery tourne tout seul.
        </p>
      </section>

      {/* 2. CE QUE LE PACK INCLUT */}
      <section className="px-5 sm:px-6 py-16 border-y border-white/5 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Ce que le Pack Système inclut</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F]">
              <p className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest mb-3">
                Inclus
              </p>
              <h3 className="text-lg font-bold mb-2">Les 10 prompts chaînés</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Déjà disponibles gratuitement. Le pack les intègre dans un workflow complet avec les
                connexions entre chaque étape documentées.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F]">
              <p className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest mb-3">
                Nouveau
              </p>
              <h3 className="text-lg font-bold mb-2">Templates Notion pré-remplis</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Fiche interview, opportunity map, PRD, mémo d&apos;alignement. Prêts à dupliquer
                dans ton workspace.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F]">
              <p className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest mb-3">
                Nouveau
              </p>
              <h3 className="text-lg font-bold mb-2">Guide de workflow pas-à-pas</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Quel prompt utiliser quand, comment chaîner les sorties, pièges à éviter. Le mode
                d&apos;emploi qui manque aux prompts seuls.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#0F0F0F] border border-[#1F1F1F]">
              <p className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest mb-3">
                Nouveau
              </p>
              <h3 className="text-lg font-bold mb-2">Exemples réels annotés</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Sorties complètes sur un cas de discovery fictif mais réaliste, du transcript au PRD.
                Chaque étape commentée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIFFERENCE AVEC LES PROMPTS GRATUITS */}
      <section className="px-5 sm:px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Différence avec les prompts gratuits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-[#141414] border border-[#1F1F1F]">
            <h3 className="text-lg font-bold mb-3">Les prompts gratuits</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Les outils. 10 prompts structurés que tu copies dans Claude ou ChatGPT. Tu as les
              briques, tu te débrouilles pour les assembler.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#141414] border border-[#E8FF8B]/30">
            <h3 className="text-lg font-bold mb-3 text-[#E8FF8B]">Le Pack Système</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed">
              Les outils + le mode d&apos;emploi + l&apos;atelier monté. Templates, workflow
              documenté, exemples annotés. Tu dupliques et tu lances.
            </p>
          </div>
        </div>
        <p className="mt-6 text-[#A3A3A3] text-sm leading-relaxed">
          Les prompts te donnent les briques. Le Pack Système te donne le plan de construction.
        </p>
      </section>

      {/* 4. POUR QUI */}
      <section className="px-5 sm:px-6 py-16 border-y border-white/5 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Pour qui</h2>
          <ul className="space-y-3 text-[#A3A3A3] text-sm leading-relaxed">
            <li className="flex gap-3 items-start">
              <span className="text-[#E8FF8B] mt-0.5">&#10003;</span>
              PM IC ou Lead avec au moins 2 ans d&apos;expérience
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-[#E8FF8B] mt-0.5">&#10003;</span>
              Tu utilises déjà les prompts gratuits et tu veux aller plus loin
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-[#E8FF8B] mt-0.5">&#10003;</span>
              Tu veux un workflow reproductible, pas juste des one-shots
            </li>
          </ul>
        </div>
      </section>

      {/* 5. PRIX + FORMULAIRE */}
      <section id="prix" className="px-5 sm:px-6 py-16 max-w-5xl mx-auto scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#E8FF8B] font-semibold text-sm uppercase tracking-widest mb-2">
            Prix
          </p>
          <p className="text-4xl font-bold mb-2">49&euro;</p>
          <p className="text-[#A3A3A3] mb-8">Paiement unique. Bientôt disponible.</p>
          <PackSystemeForm />
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="px-5 sm:px-6 py-16 border-t border-white/5 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <details key={item.q} className="p-5 rounded-lg border border-white/10 bg-[#141414]">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-3 text-[#A3A3A3] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
