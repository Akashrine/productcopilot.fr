"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-sans antialiased flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-center">
        Une erreur est survenue
      </h1>
      <p className="text-[#A3A3A3] text-center max-w-md mb-10 text-sm leading-relaxed">
        Quelque chose s&apos;est mal passé. Tu peux réessayer ou revenir à l&apos;accueil.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="btn-glow inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#E8FF8B] text-[#0F0F0F] font-bold text-sm"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/10 text-[#A3A3A3] font-semibold text-sm hover:border-white/20 hover:text-[#F5F5F5] transition-all"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
