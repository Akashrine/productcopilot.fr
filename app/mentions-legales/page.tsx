import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Product Copilot",
  description: "Mentions légales et politique de confidentialité de productcopilot.fr.",
  robots: { index: false, follow: false },
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#A3A3A3] hover:text-[#E8FF8B] transition-colors mb-10"
        >
          &larr; Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Mentions légales
        </h1>

        <div className="space-y-10 text-[#A3A3A3] leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Éditeur du site</h2>
            <p>
              Product Copilot est édité par Julien Brionne, entrepreneur individuel.
            </p>
            <ul className="mt-3 space-y-1">
              <li>Responsable de la publication : Julien Brionne</li>
              <li>Contact : julien@productcopilot.fr</li>
              <li>Site : productcopilot.fr</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, prompts, structure, design) est protégé
              par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite sans
              autorisation préalable de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Données personnelles</h2>
            <p>
              Les seules données collectées sur ce site sont les adresses email fournies
              volontairement via les formulaires d&apos;inscription (newsletter, accès aux prompts,
              liste d&apos;intérêt Pack Système).
            </p>
            <p className="mt-3">
              Ces données sont transmises et stockées par notre prestataire email{" "}
              <strong className="text-[#F5F5F5]">Loops.so</strong> (hébergé aux États-Unis,
              conforme aux clauses contractuelles types UE-US).
            </p>
            <p className="mt-3">Finalité du traitement :</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Envoi de la newsletter Product Copilot</li>
              <li>Notification lors du lancement du Pack Système Discovery</li>
              <li>Déblocage de l&apos;accès aux prompts avancés</li>
            </ul>
            <p className="mt-3">
              Base légale : consentement (article 6.1.a du RGPD). Vous pouvez retirer votre
              consentement à tout moment via le lien de désinscription présent dans chaque email,
              ou en contactant julien@productcopilot.fr.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Cookies et analytics</h2>
            <p>
              Ce site utilise Google Analytics pour mesurer l&apos;audience. Google Analytics
              dépose des cookies pour identifier les visiteurs de manière anonyme.
            </p>
            <p className="mt-3">
              Vous pouvez désactiver le suivi Google Analytics en installant le{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8FF8B] underline underline-offset-2 hover:opacity-90"
              >
                module de désactivation Google Analytics
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Droit d&apos;accès et de suppression</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
              et de suppression de vos données personnelles. Pour exercer ces droits, contactez :
              julien@productcopilot.fr.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">Limitation de responsabilité</h2>
            <p>
              Les prompts et outils fournis sur ce site sont des aides à la réflexion produit.
              Ils ne constituent pas un conseil professionnel. L&apos;éditeur ne saurait être tenu
              responsable des décisions prises sur la base des outputs générés par ces prompts.
            </p>
          </section>
        </div>

        <p className="mt-16 text-xs text-[#666666]/50">
          Dernière mise à jour : mars 2026
        </p>
      </div>
    </main>
  );
}
