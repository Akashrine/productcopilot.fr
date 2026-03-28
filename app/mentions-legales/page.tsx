import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Product Copilot",
  description: "Informations légales, hébergement, données personnelles et conditions de vente.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#A3A3A3] hover:text-[#E8FF8B] transition-colors mb-10"
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Mentions légales</h1>

        <div className="space-y-10 text-[#A3A3A3] text-sm md:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">Éditeur du site</h2>
            <p>
              Julien Brionne, micro-entrepreneur.
              <br />
              Contact :{" "}
              <a
                href="mailto:julien.brionne@gmail.com"
                className="text-[#E8FF8B] hover:opacity-90 underline underline-offset-2"
              >
                julien.brionne@gmail.com
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">Directeur de la publication</h2>
            <p>Julien Brionne</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">Hébergement</h2>
            <p>
              Vercel Inc.
              <br />
              440 N Barranca Ave #4133, Covina, CA 91723, USA
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">Données personnelles</h2>
            <p>
              Les adresses email collectées via le site sont stockées chez Loops.so. Aucune donnée
              n&apos;est vendue à des tiers.
            </p>
            <p>
              Droit d&apos;accès, de rectification et de suppression :{" "}
              <a
                href="mailto:julien.brionne@gmail.com"
                className="text-[#E8FF8B] hover:opacity-90 underline underline-offset-2"
              >
                julien.brionne@gmail.com
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">Conditions de vente</h2>
            <p>
              Paiement unique via LemonSqueezy (Lemon Squeezy LLC). Accès immédiat après paiement.
            </p>
            <p>
              Pas de droit de rétractation sur les produits numériques livrés immédiatement (article
              L221-28 du Code de la consommation), sauf si l&apos;acheteur n&apos;a pas renoncé
              expressément à son droit de rétractation avant livraison.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
