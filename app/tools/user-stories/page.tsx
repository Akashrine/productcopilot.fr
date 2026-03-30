import type { Metadata } from 'next'
import Generator from '@/components/Generator'
import { TOOL_CONFIGS } from '@/lib/tool-config'

const config = TOOL_CONFIGS['user-stories']

export const metadata: Metadata = {
  title: 'Générateur de User Stories IA — Product Copilot',
  description:
    'Transforme une description de feature en user stories structurées avec critères d\'acceptation Given/When/Then et estimation T-shirt. Gratuit.',
  keywords: [
    'générateur user story',
    'user story ia',
    'user story generator',
    'critères acceptation',
    'product management ia',
    'backlog ia',
  ],
  alternates: {
    canonical: 'https://productcopilot.fr/tools/user-stories',
  },
  openGraph: {
    title: 'Générateur de User Stories IA — Product Copilot',
    description:
      'Transforme une description de feature en user stories structurées. Gratuit et illimité.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://productcopilot.fr/tools/user-stories',
  },
}

export default function UserStoriesPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased selection:bg-[#E8FF8B] selection:text-[#0F0F0F]">
      {/* Header */}
      <header className="px-5 sm:px-6 py-6 sm:py-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 text-sm text-[#A3A3A3]">
          <a href="/" className="font-bold text-[#F5F5F5] hover:text-[#E8FF8B] transition-colors tracking-tight uppercase text-xs border-b border-[#E8FF8B]">
            Product Copilot
          </a>
          <span className="text-[#333]">/</span>
          <span>Outils</span>
          <span className="text-[#333]">/</span>
          <span className="text-[#F5F5F5]">{config.name}</span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 sm:px-6 pb-12 max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#E8FF8B]/10 text-[#E8FF8B] rounded text-[10px] font-bold uppercase tracking-widest mb-4">
          Gratuit — illimité
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tighter mb-4">
          {config.headline}
        </h1>
        <p className="text-[#A3A3A3] text-lg leading-relaxed max-w-2xl">
          {config.description} Format de sortie structuré : user stories, critères d&apos;acceptation Given/When/Then, estimation T-shirt, dépendances.
        </p>
      </section>

      {/* Generator */}
      <section id="generator" className="px-5 sm:px-6 pb-16 md:pb-24 max-w-4xl mx-auto">
        <Generator config={config} />
      </section>

      {/* How it works */}
      <section className="px-5 sm:px-6 py-16 md:py-20 border-t border-white/5 bg-[#141414]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest">01</span>
              <h3 className="font-semibold">Décris ta feature</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Colle ta description en langage naturel. Le contexte, le problème, ce que ça doit faire.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest">02</span>
              <h3 className="font-semibold">Copie le prompt généré</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                L&apos;outil génère un prompt expert calibré avec ton contexte. Copie-le en un clic.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#E8FF8B] uppercase tracking-widest">03</span>
              <h3 className="font-semibold">Colle dans Claude ou ChatGPT</h3>
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                Récupère tes user stories structurées avec critères d&apos;acceptation, T-shirt sizing, dépendances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to home */}
      <section className="px-5 sm:px-6 py-12 max-w-4xl mx-auto">
        <a
          href="/"
          className="text-sm text-[#A3A3A3] hover:text-[#E8FF8B] transition-colors"
        >
          ← Retour à Product Copilot
        </a>
      </section>

      {/* Footer */}
      <footer className="px-5 sm:px-6 py-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-6">
          <div>
            <span className="text-sm font-bold tracking-tighter">Product Copilot</span>
            <p className="text-[10px] text-[#A3A3A3] mt-1">Des outils IA pour les PMs qui construisent.</p>
          </div>
          <div className="flex gap-6 text-xs text-[#A3A3A3]">
            <a href="https://linkedin.com/in/julienbrionne" className="hover:text-[#E8FF8B] transition-colors">
              LinkedIn
            </a>
            <a href="/mentions-legales" className="hover:text-[#F5F5F5] transition-colors">
              Mentions légales
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
