import Link from "next/link";

type Props = {
  cluster: "prd" | "vibe-coding" | "discovery";
};

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
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

export default function ArticleCTA({ cluster }: Props) {
  if (cluster === "discovery") {
    return (
      <div className="card-glass p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-2">
            Tu veux passer de tes interviews à une liste d&apos;opportunités ?
          </p>
          <p className="text-sm text-[#A3A3A3] leading-relaxed">
            Le Pack Discovery : 10 prompts chaînés. De l&apos;extraction de signaux à la synthèse finale. Gratuit.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/pack-discovery"
            className="btn-glow inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
          >
            Accéder au Pack Discovery
            <ArrowRight />
          </Link>
          <Link
            href="/outils/template-prd-ia"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A3A3A3] text-sm font-semibold hover:border-white/20 hover:text-[#F5F5F5] transition-all"
          >
            Essayer le Template PRD IA
          </Link>
        </div>
      </div>
    );
  }

  if (cluster === "vibe-coding") {
    return (
      <div className="card-glass p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-2">
            Le système complet pour les PMs qui ship
          </p>
          <p className="text-sm text-[#A3A3A3] leading-relaxed">
            12 prompts. 4 phases. Du PRD au design au code à l&apos;audit. 29 €.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/packs/vibe-coding-pm"
            className="btn-glow inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
          >
            Découvrir le Pack Vibe Coding for PMs
            <ArrowRight />
          </Link>
          <Link
            href="/outils/template-prd-ia"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A3A3A3] text-sm font-semibold hover:border-white/20 hover:text-[#F5F5F5] transition-all"
          >
            Commence par le gratuit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass p-6 sm:p-8 space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8FF8B]/70 mb-2">
          Tu veux un PRD structuré en 5 minutes ?
        </p>
        <p className="text-sm text-[#A3A3A3] leading-relaxed">
          Le Template PRD IA te pose 7 questions et génère un prompt expert calibré. Gratuit.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/outils/template-prd-ia"
          className="btn-glow inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
        >
          Accéder au Template PRD IA
          <ArrowRight />
        </Link>
        <Link
          href="/packs/vibe-coding-pm"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-[#A3A3A3] text-sm font-semibold hover:border-white/20 hover:text-[#F5F5F5] transition-all"
        >
          Voir le système complet — 29 €
        </Link>
      </div>
    </div>
  );
}
